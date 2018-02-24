module Markalc

open Types
open MarkalcShared
open Expression
open System

let maxRefs = 1000

type Cell with 
    member c.GetToks = match c with 
                           | Contents(toks,_,_) -> toks
    member c.ReplaceTokens t = match c with 
                               | Contents(_,head,align) -> Contents(t,head,align)

type MapContents =
    | MapTok of Cell
    | MapExp of Expr * Cell

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
                 | Error(y) -> failwithf "After filtering, there were still Error monads in the list %A." y
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
    let rec parsePipes' a row =
        match pipeSplit row with
        | Ok([],[])       -> (constructCell []):: a
        | Ok([],after)    -> if debug then printfn "empty, %A" after
                             parsePipes' ((constructCell [])::a) after // If before is empty and after is not, empty cell
        | Ok(before,[])   -> if debug then printfn "%A, empty" before
                             (constructCell before) :: a // If after is empty, add before and stop
        | Ok(before,after) -> if debug then printfn "%A, %A" before after 
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
    let getAlignment (toks: Token list) =
        let filt = function | COLON -> true | MINUS -> true | _ -> false 
        // Check it has at least three dashes
        match (countDelim MINUS toks < 3, List.filter filt toks |> List.length <> List.length toks) with
            | (true,false) -> "Less than 3 dashes for table format" |> Error 
            | (false,true) -> sprintf "Invalid characters in table format, expecting only : or - \n%A\n%A" toks (List.filter filt toks) |> Error
            | (true,true) -> "Less than 3 dashes for table format and invalid characters" |> Error 
            | (false,false) ->
                match (List.rev toks, countDelim COLON toks) with
                | (COLON :: _, 2) when List.head toks = COLON -> Centre |> Ok
                | (COLON :: _, 1) -> Right |> Ok
                | (_,1) when List.head toks = COLON -> Left |> Ok
                | (_,0) -> Left |> Ok// default is leftAlign
                | (_,x) -> sprintf "\':\'s in wrong position %A, %A" toks x |> Error
    let parseAlign' = parsePipes getAlignment
    // Ignore the first pipe if there is nothing before it
    match whitespaceFilter row with
    | PIPE :: row' -> parseAlign' row'
    | row' -> parseAlign' row'
    |> List.rev
    |> joinErrorList

// ################ BUSINESS END ###############
/// Function which takes a parsed row (list of unalignedcells) and the list of alignments, and will create Cells
let alignCells' alignList (cells:(Token list * bool) list) =
    let lengths = (List.length alignList, List.length cells)
    match (fst lengths - snd lengths) with
    | x when x > 0 -> cells @ (List.replicate x ([], List.head cells |> snd)) // If alignList longer than cells, fill in with blank cells
    | x when x < 0 -> cells.[0..fst lengths]// If cells longer than alignList, ignore the extra cells
    | _ -> cells
    |> (List.zip alignList)
    |> List.map (fun (a,uc) -> alignCell a uc)

let alignCells = liftFirstArg alignCells'
/// Separate list of tokens into cells with alignment and header/not-header
let transformTable (table:Token list list)  = 
    // Deal with first two rows of format: header1 | header2 | header3
    // Second row tells us how many columns and correct alignment
    let alignments = table.[1] |> parseAlignRow
    let header = List.head table |> parseRow headCellU |> alignCells alignments
    // Fold parse normal row for the rest of the table
    let parseAlignPrepend s x = (parseRow defaultCellU x |> alignCells alignments) :: s
    List.fold parseAlignPrepend [header] table.[2..]
    |> List.rev
    |> joinErrorList

let tryEval map e =
    // Evaluate expression
    let rec evalExp r map e =
        // Take in two cell refs and return a list of all refs inbetween or None
        let over (x,y) = 
            match (x,y) with
            | (RowCol(x1,y1),RowCol(x2,y2)) ->
                let x = x1,y1
                let y = x2,y2
                let genList a b = if a<b then [a..b] else [b..a]
                match fst x = fst y, snd x = snd y with
                | true,true -> Some [RowCol x]
                | true,false -> (List.map ((fun i -> (fst x,i)) >> RowCol) (genList (snd x) (snd y))) |> Some
                | false,true -> (List.map ((fun i -> (i,snd x)) >> RowCol) (genList (fst x) (fst y))) |> Some
                | false,false -> None
        // Evaluate cell reference
        let evalCellRef ref = 
            match Map.tryFind ref map with
                | Some(MapExp(e2,_)) -> evalExp (r+1) map e2
                | _ -> nan // invalid reference
        // Apply f over list of cell references between two cells
        let rangeFunc f x y = match over (x,y) with
                              | Some(l) -> f l
                              | None -> nan
        //let commaFunc f = match 
        if r > maxRefs then nan else // Return nan if too many recursive calls, probably circular reference
        match e with
        | BinExp(f,x,y) -> f (evalExp r map x) (evalExp r map y)
        | Op (Float(x)) -> x
        | Op (CellRef(ref)) -> evalCellRef ref
        | RangeFunction("SUM",x,y) -> rangeFunc (List.sumBy evalCellRef) x y
        | RangeFunction("AVG",x,y) -> rangeFunc (List.averageBy evalCellRef) x y
        | CommaFunction("SUM",l) -> List.sumBy (evalExp r map) l
        | CommaFunction("AVG",l) -> List.averageBy (evalExp r map) l
        | _ -> 11.0
    evalExp 0 map e
/// Evaluate all expressions inside a cell list list, leave non-expression cells as they are
/// No invalid expressions should be matched.
let evaluateCellList cellList = 
    // Iterate over table, must know "where am I?" for each cell
    let innerFold row (s:(CellReference*MapContents) list*uint32) (cell:Cell) =
        match parseExpression (cell.GetToks) with
        | Ok(ex) ->   (RowCol(row,snd s),MapExp (ex,cell)) :: (fst s), snd s + 1u  // Expression found, put it into the map!
        | Error(t) -> (RowCol(row,snd s),MapTok (cell)) :: fst s, snd s + 1u // No expression, ignore
    let outerFold (s:uint32*((CellReference*MapContents)list*uint32)) cells =
        (fst s + 1u,List.fold (innerFold (fst s)) (fst(snd s),0u) cells)
    // Get the length of each list.
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
        |> (List.map (Array.toList))

/// Top level function
/// Parse tokens into cell list list with all Expressions evaluated
let parseEvaluate (input:Token list list) = 
    // Transform Token list list into Cell list list
    transformTable input
    |> function
    | Error(_) -> input |> Error // If there are any errors just return the unchanged Token list list
    | Ok(x) -> evaluateCellList x |> Ok // Else return Ok and Cell list list

