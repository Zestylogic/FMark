module Parse
open Types

let rec parseItem (toks: Token list) : Result<ParsedObj>=
    match toks with
    | 

// let parse toks =
//     parseItemList toks
//     |> Result.bind (fun ())