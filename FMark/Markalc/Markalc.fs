module Markalc

open Types
open System
// Do I want to remove any markdown content? Yes... inline markdown should be unaffected! but perhaps too complicated right now.
// return everything before the next pipe
// Possible inputs: | ... |, [], ... |, |
let rec pipeBeforeAfter before t =
    match t with
    //| PIPE :: PIPE :: t' -> if debug then printfn "Double pipe."
    //                        ([]@before,t') // if PIPE followed by PIPE, 
    | PIPE :: t' -> (before,t') // If PIPE then token list, return s and everything after the PIPE
    | x :: t' -> pipeBeforeAfter (x::before) t' // If non-PIPE token then token list, recurse adding the tokens to the before list
    | [] -> (before,[]) // If no more tokens

// HOF for counting any delimeters - doesn't actually work
let countDelim delim tokList =
    List.filter (function | d when d = delim -> true | _ -> false) tokList 
    |> List.length
let makeCellU header tokens  = (tokens,header)
let makeDefaultCellU = makeCellU false
let makeHeaderCellU = makeCellU true
let alignCell alignment cellU = Tokens (fst cellU, snd cellU, alignment)
// Parse a line into a list of cells
let parseRowD debug constructCell (row:Token list) =
    let rec parseRow' a row =
        let b,af = (pipeBeforeAfter [] row) |> (fun (be,af) -> (List.rev be, af))
        if debug then printfn "Row to parse: %A\nBefore: %A, After: %A\n" row b af
        match b,af with
        | ([],[])       -> (constructCell []):: a
        | ([],after)    -> if debug then printfn "empty, %A" after
                           parseRow' ((constructCell [])::a) after // If before is empty, empty cell
        | (before,[])   -> if debug then printfn "%A, empty" before
                           (constructCell before) :: a // If after is empty, add before and stop
        |(before,after) -> if debug then printfn "%A, %A" before after 
                           parseRow' ((constructCell before) :: a) after
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
    // If the list only contains one item, add an empty cell on the end
    |> (fun x -> if List.length x = 1 then (constructCell[])::x else x) 
    |> List.rev
///
let parseDefaultRow = parseNormalRow makeDefaultCellU
/// Parse the second row of the table which defines number of columns and alignment
let parseAlignmentRow (row:Token list) = 
    let getAlignment (toks: Token list) =
        let filt = function | COLON -> true | MINUS -> true | _ -> false 
        // Check it has at least three dashes
        match (countDelim MINUS toks < 3, List.filter filt toks |> List.length <> List.length toks) with
            | (true,false) -> failwith "Less than 3 dashes for table format"
            | (false,true) -> failwithf "Invalid characters in table format, expecting only : or - \n%A\n%A" toks (List.filter filt toks)
            | (true,true) -> failwith "Less than 3 dashes for table format and invalid characters"
            | (false,false) ->
                match (List.rev toks, countDelim COLON toks) with
                | (COLON :: _, 2) when List.head toks = COLON -> Centre
                | (COLON :: _, 1) -> Right
                | (_,1) when List.head toks = COLON -> Left 
                | (_,0) -> Left // default is leftAlign
                | (_,x) -> failwithf "\':\'s in wrong position %A, %A" toks x
    let parseRow' = parseRow getAlignment
    // Ignore the first pipe if there is nothing before it
    match row with
    | PIPE :: row' -> parseRow' row'
    | row' -> parseRow' row'
    |> List.rev

/// Function which takes a parsed row (list of unalignedcells) and the list of alignments, and will create Cells
let alignCells alignList (cells:(Token list * bool) list) =
    let lengths = (List.length alignList, List.length cells)
    match (fst lengths - snd lengths) with
    | x when x > 0 -> cells @ List.replicate x ([], List.head cells |> snd) // If alignList longer than cells, fill in with blank cells
    | x when x < 0 -> cells.[0..fst lengths] // If cells longer than alignList, ignore the extra cells
    | _ -> cells
    |> (List.zip alignList)
    |> List.map (fun (a,uc) -> alignCell a uc)

/// Separate list of tokens into cells with alignment and header/not-header
let transformTable (table:Token list list)  = 
    // Deal with first two rows of format: header1 | header2 | header3
    // Second row tells us how many columns and correct alignment
    let alignments = table.[1] |> parseAlignmentRow
    let s = [List.head table |> parseNormalRow makeHeaderCellU |> alignCells alignments]
    // Map parse normal row for the rest of the table
    let folder s x = (parseDefaultRow x |> alignCells alignments) :: s
    List.fold folder s table.[2..]
    |> List.rev

/// Convert Cell list list into a suitable structure... or create methods for accessing nicely.

/// Top level function
// let process (input:Line list) : (Line List) = 
//     // Take the table and transform it into an array (could return error monad if invalid table?)
//     tableArr = transformTable input
//     // Iterate over the array and apply functions
