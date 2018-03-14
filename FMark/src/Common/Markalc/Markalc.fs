module Markalc

open Types
open Shared
open MarkalcShared
open Expression
open Logger

type MapContents =
    | MapTok of Cell
    | MapExp of TExpr * Cell

// ################### HELPER FUNCTIONS ###################
/// Return everything (before,after) the first PIPE token
let pipeSplit toks = 
    delimSplit false PIPE toks
// Turn float into token
let toToken x = NUMBER(x|>string)
/// Transform Result<Ok,Error> list into Result<Ok list, Error>
let joinErrorList lst =
    // Filter the list
    let filt x = match x with
                 | Error(_) -> true
                 | Ok(_) -> false
    let unpackOks = function
                 | Ok(x') -> x'
                 | Error(y) ->  sprintf "After filtering, there were still Error monads in the list %A." y
                                |> logPass (Some 27) globLog.Fatal
                                |> failwith
    let combineErrors s x = match x with
                            | Ok(_) -> s // This should never be matched in this usage.
                            | Error(x') -> sprintf "%A %A" x' s |> Error
    match List.filter filt lst with
    | [] -> List.map unpackOks lst |> Ok // If the list is empty there are no errors
    | x  -> List.fold combineErrors (Error "") x
// Lift first argument to result world
let liftFirstArg func arg1 arg2 =
    match arg1 with
    | Ok(x) -> func x arg2 |> Ok
    | Error(x) -> Error x

// ####################### CONSTRUCT CELL HELPERS ###################
let makeCellU header tokens  = (tokens,header)
let defaultCellU = makeCellU false
let headCellU = makeCellU true
let alignCell alignment cellU = Contents (fst cellU, snd cellU, alignment)

// ###################### PARSE TABLE ROWS #####################
// Parse a line into a list of cells
let parsePipesD debug constructCell (row:Token list) =
    let parsePipesDebug line a b =
        if debug then
            sprintf "Markalc/Parse PIPES:\nBefore:%A\nAfter:%A$\n" a b |> globLog.Debug (Some line)
    let rec parsePipes' a row =
        match pipeSplit row with
        | Ok([],[])       -> (constructCell []):: a
        | Ok([],after)    -> parsePipesDebug 55 [] after 
                             parsePipes' ((constructCell [])::a) after // If before is empty and after is not, empty cell
        | Ok(before,[])   -> parsePipesDebug 57 before [] 
                             (constructCell before) :: a // If after is empty, add before and stop
        | Ok(before,after) -> parsePipesDebug 59 before after
                              parsePipes' ((constructCell before) :: a) after
        | Error(_) -> if List.isEmpty row then a else (constructCell row)::a  // If there is content, add it
    parsePipes' [] row
let parsePipes constructCell row = parsePipesD false constructCell row /// TOGGLE DEBUG MODE
/// Parse an ordinary row
let parseRow constructCell row =
    let parseRow' = parsePipes constructCell
    // If its the first pipe and there's nothing before it, remove it
    match row with
    | PIPE :: row' -> parseRow' row'
    | row' -> parseRow' row'
    // If the list only contains one item, add an empty cell on the end (empty cells now added later on...)
    |> (fun x -> if List.length x = 1 then (constructCell[])::x else x) 
    |> List.rev
let parseDefaultRow = parseRow defaultCellU
/// Parse the second row of the table which defines number of columns and alignment
let parseAlignRow (row:Token list) = 
    let parseAlignDebug line s =
        sprintf "Markalc/parseAlignRow\n%s$" s |> logPass (Some line) globLog.Debug
    let getAlignment (toks: Token list) =
        let filt = function | COLON -> true | MINUS -> true | _ -> false 
        // Check it has at least three dashes
        match (countDelim MINUS toks < 3, List.filter filt toks |> List.length <> List.length toks) with
            | (true,false) -> "Less than 3 dashes for table format" |> parseAlignDebug 83 |> Error 
            | (false,true) -> sprintf "Invalid characters in table format, expecting only : or - \n%A\n%A" toks (List.filter filt toks) 
                              |> parseAlignDebug 84
                              |> Error
            | (true,true) -> "Less than 3 dashes for table format and invalid characters" |> parseAlignDebug 87 |> Error 
            | (false,false) ->
                match (List.rev toks, countDelim COLON toks) with
                | (COLON :: _, 2) when List.head toks = COLON -> Centre |> Ok
                | (COLON :: _, 1) -> Right |> Ok
                | (_,1) when List.head toks = COLON -> Left |> Ok
                | (_,0) -> NoAlign |> Ok
                | (_,x) -> sprintf "\':\'s in wrong position %A, %A" toks x |> parseAlignDebug 94 |> Error
    let parseAlign' = parsePipes getAlignment
    // Ignore the first pipe if there is nothing before it
    match whitespaceFilter row with
    | PIPE :: row' -> parseAlign' row'
    | row' -> parseAlign' row'
    |> List.rev
    |> joinErrorList

// ################ BUSINESS END ###############
/// Function which takes a parsed row (list of unalignedcells) and the list of alignments, and will create Cells
let alignCells' alignList (row:(Token list * bool) list * bool) =
    let cells = fst row
    let head = snd row
    let lengths = (List.length alignList, List.length cells)
    match (fst lengths - snd lengths) with
    | x when x > 0 -> cells @ (List.replicate x ([], head)) // If alignList longer than cells, fill in with blank cells
    | x when x < 0 -> cells.[0..((fst lengths)-1)]// If cells longer than alignList, ignore the extra cells
    | _ -> cells
    |> (List.zip alignList)
    |> List.map (fun (a,uc) -> alignCell a uc),head

let alignCells = liftFirstArg alignCells'
/// Separate list of tokens into cells with alignment and header/not-header
let transformTable (table:Token list list)  =
    // Deal with first two rows of format: header1 | header2 | header3
    // Second row tells us how many columns and correct alignment
    let alignments = table.[1] |> parseAlignRow
    // Specify header value true/false and make Row type from cellList
    let makeRow head cells = (cells,head)

    let header = List.head table 
                 |> parseRow headCellU 
                 |> makeRow true 
                 |> alignCells alignments 
                 |> (Result.map Cells)

    // Fold parse normal row for the rest of the table
    let parseAlignPrepend s x = (parseRow defaultCellU x 
                                |> makeRow false 
                                |> alignCells alignments  
                                |> (Result.map Cells)) :: s
    List.fold parseAlignPrepend [header] (xOnwards 2 table)
    |> List.rev
    |> joinErrorList

// Try to evaluate expression, set maxRefs to number of CellRefs before assuming circular reference
let tryEval' maxRefs map e =
    // Evaluate expression
    let rec evalExp (e:TExpr) = 
        let rec evalExp' r map (e:Expr) =
            // Evaluate cell reference
            let evalCellRef ref = 
                match Map.tryFind ref map with
                | Some(MapExp(e2,_)) -> evalExp' (r+1) map (e2|>function|DPExp(e2',_)->e2')  // Evaluating cell references
                | _ -> nan // invalid reference
            // Apply f over list of cell references between two cells
            let rangeFunc f x y = match cellRange (x,y) with
                                  | Some(l) -> f l
                                  | None -> nan
            if r > maxRefs then nan else // Return nan if too many recursive calls, probably circular reference
            match e with
            | BinExp(f,x,y) -> f (evalExp' r map x) (evalExp' r map y)
            | Op (Float(x)) -> x
            | Op (CellRef(ref)) -> evalCellRef ref
            | CommaFunction("SUM",l) -> List.sumBy (evalExp' r map) l
            | CommaFunction("AVG",l) -> List.averageBy (evalExp' r map) l
            | CommaFunction("MIN",l) -> List.min (List.map (evalExp' r map) l)
            | CommaFunction("MAX",l) -> List.max (List.map(evalExp' r map) l)
            | _ -> 11.0
        e |> function
        | DPExp(exp,dp) when dp < 0 -> evalExp' 0 map exp
        | DPExp(exp,dp) -> evalExp' 0 map exp |> round dp
           
    evalExp e
let tryEval = tryEval' 1000
/// Evaluate all expressions inside a cell list list, leave non-expression cells as they are
/// No invalid expressions should be matched.
let evaluateRowList (rowList:Row list) = 
    // Infer Row header value from (List.head cellList) and create Row
    // cellList must not be empty, which is ensured by earlier code
    let inferRow (cellList:Cell list) = Cells(cellList, (List.head cellList).GetHead)
    // Iterate over table, snd s is current column number.
    let innerFold row (s:(CellReference*MapContents) list * uint32) (cell:Cell) =
        let cCol = snd s // current column
        let cCoord,cMap = RowCol(row,cCol),fst s // current coordinate and map
        match parseExpression (cell.GetToks) with
        | Ok(ex) ->   (cCoord,MapExp (ex,cell)) :: cMap, cCol + 1u  // Expression found, put it into the map!
        | Error(_) -> (cCoord,MapTok (cell)) :: cMap, cCol + 1u // No expression, ignore
    // fst s is current row, pass it through to inner fold
    let outerFold (s:uint32* ((CellReference*MapContents) list * uint32)) cells =
        let cRow,cMap = fst s, fst (snd s) // current row
        (cRow + 1u, List.fold (innerFold (cRow)) (cMap,0u) cells)
    let cellList = List.collect (function | Cells(l,_) -> [l]) rowList
    let rowLength = List.length (List.head cellList)
    List.fold outerFold (0u,([],0u)) cellList 
    |> function 
    | (_,(expRefList,_)) -> 
        let expList = List.rev expRefList
        let map = Map.ofList expList
        // Iterate over list, evaluate expression for each MapExp then convert into Token list
        // convert MapContents from MapExp to MapTok (?)
        let expListEval = function
            | MapTok(c) -> c
            | MapExp(e,c) -> [tryEval map e |> toToken] |> (c.ReplaceTokens)
        List.map (snd >> expListEval) expList
        |> (Seq.chunkBySize rowLength) 
        |> Seq.toList 
        |> List.map (Array.toList>>inferRow)

/// Top level function
/// Parse tokens into cell list list with all Expressions evaluated.
/// Return: Result(OK(Cell list list), Error(toks))
let parseEvaluateTable (toks:Token list list) = 
    // Transform Token list list into Cell list list
    let endlFilt = function | ENDLINE -> false | _ -> true
    transformTable (List.map (List.filter endlFilt) toks)
    |> function
    | Error(e) -> sprintf "Markalc/top\nNot a table because of errors: %s\nReturning unchanged tokens.$" e |> globLog.Debug (Some 214)
                  toks |> Error // If there are any errors just return the unchanged Token list list
    | Ok(x) -> evaluateRowList x |> Ok // Else return Ok and Cell list list

let lexParseEvaluate toks = 
    List.map simpleLex toks
    |> parseEvaluateTable
