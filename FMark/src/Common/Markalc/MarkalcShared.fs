module MarkalcShared
open Types
open System.Text.RegularExpressions
open Logger

type CellReference = 
    RowCol of Row:uint32*Col:uint32

type Operand =
    | CellRef of CellReference
    | Integer of int
    | Float of float

type Expr =
    | BinExp of (float->float->float)*Expr*Expr
    | Op of Operand
    | CommaFunction of string*(Expr list)
let whitespaceFilter lst = List.filter (function | WHITESPACE(_) -> false | _ -> true) lst
// Count number of delim in token list
let countDelim delim tokList =
    List.filter (function | d when d = delim -> true | _ -> false) tokList 
    |> List.length

// return everything before and after the first/last delimeter searched for, error if delim not found
let delimSplit last delim t =
    let rec delimSplitFirst' delim before t =
        match t with
        | d :: after when d = delim -> Ok (before,after) // If delim then token list, return d and everything after the delim
        | x :: after -> delimSplitFirst' delim (x::before) after // If non-PIPE token then token list, recurse adding the tokens to the before list
        | [] -> Error (before,[]) // Did not find delimeter
    let rec delimSplitLast' delim before t =
        match (t, countDelim delim t) with
        | d :: after,1 when d = delim -> Ok (before,after)
        | x :: after,_ -> delimSplitLast' delim (x::before) after
        | [],_ -> Error (before,[])
    let searchFunc = if last then delimSplitLast' else delimSplitFirst'
    searchFunc delim [] t
    |> function
    | Error(before,a) -> Error(List.rev before,a)
    | Ok (before,a) -> Ok(List.rev before,a)

/// Helper function to copy a list i times
let rec listCopies i lst =
    match i with
    | 1 -> lst
    | 0 -> []
    | x when x < 0 -> failwithf "Negative argument: %A" x
    | _ -> lst @ (listCopies (i-1) lst)

let unfoldTuple3 func (a,b,c) =
   func a b c

// Take in two cell refs and return a list of all refs inbetween or None if invalid e.g. diagonal
let cellRange (p1,p2) = 
    match (p1,p2) with
    | (RowCol(p1r,p1c),RowCol(p2r,p2c)) ->
        let genList a b = if a<b then [a..b] else [b..a]
        match p1r = p2r, p1c = p2c with
        | true,true -> Some [RowCol (p1r,p1c)]
        | true,false -> (List.map ((fun i -> (p1r,i)) >> RowCol) (genList p1c p2c)) |> Some
        | false,true -> (List.map ((fun i -> (i,p1c)) >> RowCol) (genList p1r p2r)) |> Some
        | false,false -> None

// Quick parser to generate tokenise string one row at a time
let simpleLex txt = 
    let (|RegexMatch|_|) r txt =
        let m = Regex.Match (txt,"^"+r)
        match m.Success with
        | true -> (m.Value, txt.Substring(m.Value.Length)) |> Some
        | false -> None
    let rec simpleLex' a txt =
        match txt with
        // Whitespace
        | RegexMatch "[\\s]+" (m,after) -> simpleLex' (WHITESPACE(m.Length)::a) after
        // Contents for expression evaluation
        | RegexMatch "[0-9]+" (m,after) -> simpleLex' (NUMBER(m)::a) after
        | RegexMatch "\\^" (_,after) -> simpleLex' (CARET::a) after
        | RegexMatch "\\%" (_,after) -> simpleLex' (PERCENT::a) after
        | RegexMatch "\\*" (_,after) -> simpleLex' (ASTERISK::a) after
        | RegexMatch "\\/" (_,after) -> simpleLex' (SLASH::a) after
        | RegexMatch "\\+" (_,after) -> simpleLex' (PLUS::a) after
        | RegexMatch "\\-" (_,after) -> simpleLex' (MINUS::a) after
        | RegexMatch "\\(" (_,after) -> simpleLex' (LBRA::a) after
        | RegexMatch "\\)" (_,after) -> simpleLex' (RBRA::a) after
        | RegexMatch "\\[" (_,after) -> simpleLex' (LSBRA::a) after
        | RegexMatch "\\]" (_,after) -> simpleLex' (RSBRA::a) after
        | RegexMatch "\\=" (_,after) -> simpleLex' (EQUAL::a) after
        | RegexMatch "\\." (_,after) -> simpleLex' (DOT::a) after
        | RegexMatch "\\," (_,after) -> simpleLex' (COMMA::a) after
        | RegexMatch "\\{" (_,after) -> simpleLex' (LCBRA::a) after
        | RegexMatch "\\}" (_,after) -> simpleLex' (RCBRA::a) after
        // Contents for table recognition
        | RegexMatch "[a-zA-z]+[0-9]*( [a-zA-z]+[0-9]*)*" (m,after) -> simpleLex' (LITERAL(m)::a) after
        | RegexMatch "\\|" (_,after) -> simpleLex' (PIPE::a) after
        | RegexMatch "\\:" (_,after) -> simpleLex' (COLON::a) after
        | RegexMatch "\\;" (_,after) -> simpleLex' (SEMICOLON::a) after
        | "" -> a
        | _ -> failwithf "Unexpected character: %A" txt
    simpleLex' [] txt |> List.rev

// Experimental Lexr for tokenising from entire table string
// let stringLex (txt:string)=
//     List.map simpleLex (Array.toList (txt.Split("\n")))
let lexY (x,y,z) = x,y|>simpleLex,z

let logger = Logger(LogLevel.INFO)