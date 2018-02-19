open System
open Types

type Citation = int * Line

let rec tocParse tocLst depth : THeader list =
    match tocLst with
    | HASH::tl -> tocParse tl (depth+1)
    | LITERAL h::tl when depth > 1 ->
        {HeaderName = [h]; Level = depth} :: tocParse tl 0
    | _::tl -> tocParse tl 0
    | [] -> []

let tocGen tokenLst maxDepth =
    List.filter (fun x -> x.Level <= maxDepth) (tocParse tokenLst 0)

let rec lineParse tocLst : Line =
    []

let rec citeParse tocLst : ParsedObj list =
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COLON::tail -> Footnote (key, lineParse tail) :: citeParse tail
        | tail -> citeParse tail
    | _::tl -> citeParse tl
    | [] -> []



[<EntryPoint>]
let main argv =
    let testTokenLst = [HASH; HASH; LITERAL("hi"); LITERAL("this is a paragraph"); EMPTYLINE;
                        LITERAL("Cool"); HASH; HASH; HASH; LITERAL("Another Title"); END]
    printf "%A" (tocGen testTokenLst 2)
    0
