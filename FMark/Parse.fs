module Parse
open Types

let rec parseLiteral toks str =
    let appendString newstr sep retoks = [str;newstr] |> String.concat sep |> parseLiteral retoks
    match toks with
    | tlist when List.isEmpty tlist -> (str, None)
    | ENDLINE :: LITERAL str' :: toks' -> appendString str' "\n" toks'
    | WHITESPACE _ :: LITERAL str' :: toks' -> appendString str' " " toks'
    | _ -> (str, Some toks)

let rec parseItem (toks: Token list) : Result<ParsedObj * option<Token list>, string> =
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), Some toks') |> Ok
    | ENDLINE _ :: NUMBER _ :: DOT :: WHITESPACE _ :: toks' -> "Lists todo" |> Error
    | LITERAL str :: toks' ->
        match parseLiteral toks' str with
        | lstr, retoks -> (Paragraph([[FrmtedString(Literal lstr)]]), retoks) |> Ok
    | _ -> "not implemented" |> Error

and parseItemList toks : Result<ParsedObj list * option<Token list>, string> =
    parseItem toks
    |> Result.bind (fun (pobj, re) ->
        match re with
        | None -> ([pobj], None) |> Ok
        | Some toks' ->
            parseItemList toks'
            |> Result.map(fun (pobjs, re') ->
                pobj::pobjs, re' )
        )

let parse toks =
    parseItemList toks
    |> Result.bind (fun (pobjs, retoks) ->
        match retoks with
        | None -> pobjs |> Ok
        | Some retoks -> "Some unparsed tokens" |> Error)