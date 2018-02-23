module MarkalcShared
open Types
open System.Text.RegularExpressions
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

// Quick parser to generate expression test input
let simpleParse txt = 
    let (|RegexMatch|_|) r txt =
        let m = Regex.Match (txt,"^"+r)
        match m.Success with
        | true -> (m.Value, txt.Substring(m.Value.Length)) |> Some
        | false -> None
    let rec simpleParse' a txt =
        match txt with
        // Whitespace
        | RegexMatch "[\\s]+" (m,after) -> simpleParse' (WHITESPACE(m.Length)::a) after
        // Contents for expression evaluation
        | RegexMatch "[0-9]+" (m,after) -> simpleParse' (NUMBER(m)::a) after
        | RegexMatch "\\^" (_,after) -> simpleParse' (CARET::a) after
        | RegexMatch "\\%" (_,after) -> simpleParse' (PERCENT::a) after
        | RegexMatch "\\*" (_,after) -> simpleParse' (ASTERISK::a) after
        | RegexMatch "\\/" (_,after) -> simpleParse' (SLASH::a) after
        | RegexMatch "\\+" (_,after) -> simpleParse' (PLUS::a) after
        | RegexMatch "\\-" (_,after) -> simpleParse' (MINUS::a) after
        | RegexMatch "\\(" (_,after) -> simpleParse' (LBRA::a) after
        | RegexMatch "\\)" (_,after) -> simpleParse' (RBRA::a) after
        | RegexMatch "\\[" (_,after) -> simpleParse' (LSBRA::a) after
        | RegexMatch "\\]" (_,after) -> simpleParse' (RSBRA::a) after
        | RegexMatch "\\=" (_,after) -> simpleParse' (EQUAL::a) after
        // Contents for table recognition
        | RegexMatch "[a-zA-z]+[0-9]*( [a-zA-z]+[0-9]*)*" (m,after) -> simpleParse' (LITERAL(m)::a) after
        | RegexMatch "\\|" (_,after) -> simpleParse' (PIPE::a) after
        | RegexMatch "\\:" (_,after) -> simpleParse' (COLON::a) after
        | "" -> a
        | _ -> failwithf "Unexpected character: %A" txt
    simpleParse' [] txt |> List.rev

let parseY (x,y,z) = x,y|>simpleParse,z