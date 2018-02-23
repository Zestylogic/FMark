module Markalc

open Types
open MarkalcShared
open Expression
open System

let pipeSplit toks = 
    delimSplit false PIPE toks

let makeCellU header tokens  = (tokens,header)
let makeDefaultCellU = makeCellU false
let makeHeaderCellU = makeCellU true
let alignCell alignment cellU = Tokens (fst cellU, snd cellU, alignment)
// Parse a line into a list of cells
let parseRowD debug constructCell (row:Token list) =
    let rec parseRow' a row =
        match pipeSplit row with
        | Ok([],[])       -> (constructCell []):: a
        | Ok([],after)    -> if debug then printfn "empty, %A" after
                             parseRow' ((constructCell [])::a) after // If before is empty and after is not, empty cell
        | Ok(before,[])   -> if debug then printfn "%A, empty" before
                             (constructCell before) :: a // If after is empty, add before and stop
        | Ok(before,after) -> if debug then printfn "%A, %A" before after 
                              parseRow' ((constructCell before) :: a) after
        | Error(_) -> if List.isEmpty row then a else (constructCell row)::a  // If there is content, add it
    parseRow' [] row
/// TOGGLE DEBUG MODE
let parseRow constructCell row = parseRowD false constructCell row
/// 
let parseNormalRow constructCell row =
    let parseRow' = parseRow constructCell
    // If its the first pipe and there's nothing before it, remove it
    match row with
    | PIPE :: row' -> parseRow' row'
    | row' -> parseRow' row'
    // If the list only contains one item, add an empty cell on the end (empty cells now added later on...)
    |> (fun x -> if List.length x = 1 then (constructCell[])::x else x) 
    |> List.rev
///
let parseDefaultRow = parseNormalRow makeDefaultCellU
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
/// Parse the second row of the table which defines number of columns and alignment
let parseAlignmentRow (row:Token list) = 
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
    let parseRow' = parseRow getAlignment
    // Ignore the first pipe if there is nothing before it
    match whitespaceFilter row with
    | PIPE :: row' -> parseRow' row'
    | row' -> parseRow' row'
    |> List.rev
    |> joinErrorList

/// Function which takes a parsed row (list of unalignedcells) and the list of alignments, and will create Cells
let alignCells' alignList (cells:(Token list * bool) list) =
    let lengths = (List.length alignList, List.length cells)
    match (fst lengths - snd lengths) with
    | x when x > 0 -> cells @ (List.replicate x ([], List.head cells |> snd)) // If alignList longer than cells, fill in with blank cells
    | x when x < 0 -> cells.[0..fst lengths]// If cells longer than alignList, ignore the extra cells
    | _ -> cells
    |> (List.zip alignList)
    |> List.map (fun (a,uc) -> alignCell a uc)

let liftFirstArg func arg1 arg2 =
    match arg1 with
    | Ok(x) -> func x arg2 |> Ok
    | Error(x) -> Error x
let alignCells = liftFirstArg alignCells'
/// Separate list of tokens into cells with alignment and header/not-header
let transformTable (table:Token list list)  = 
    // Deal with first two rows of format: header1 | header2 | header3
    // Second row tells us how many columns and correct alignment
    let alignments = table.[1] |> parseAlignmentRow
    let header = List.head table |> parseNormalRow makeHeaderCellU |> alignCells alignments
    // Fold parse normal row for the rest of the table
    let parseAlignPrepend s x = (parseDefaultRow x |> alignCells alignments) :: s
    List.fold parseAlignPrepend [header] table.[2..]
    |> List.rev
    |> joinErrorList

/// Convert Cell list list into a suitable structure... or create methods for accessing nicely.

/// Top level function
let topLevel (input:Token list list) = 
    // Take the table and transform it into an array (could return error monad if invalid table?)
    let table = transformTable input

    // Iterate over the array and apply functions
    
    
    match table with
    | Error(_) -> input |> Error
    | Ok(x) -> x |> Ok
