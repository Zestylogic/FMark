module Parse
open Types


let rec parseItem (toks: Token list) : Result<ParsedObj * Token list, string> =
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), toks') |> Ok
    | LITERAL str :: toks' -> ([str] |> FrmtedWordLst |> List.singleton |> List.singleton |> Paragraph,
                                toks') |> Ok
    | EMPHASIS _ :: _ -> "EMPHASIS not implemented" |> Error
    | STRONG _ :: _ -> "STRONG not implemented" |> Error
    | INLINECODE str :: toks' -> // todo: include code styles
            ([str] |> FrmtedWordLst |> List.singleton |> List.singleton |> Paragraph,
                                toks') |> Ok
    | WHITESPACE _ :: toks' -> // can't think of whitespace usage
        parseItem toks'
        |> Result.bind (fun (po, re) -> (po, re) |> Ok)
    | EMPTYLNE::EMPTYLNE::NUMBER _::

    | EMPTYLINE::EMPTYLINE::toks' ->
        parseItem toks'
        |> Result.bind (fun (po, re) -> )
and parseItemList toks : Result<ParsedObj list * Token list, string> =
    parseItem toks
    | Result.bind (fun (item, ))

// let parse toks =
//     parseItemList toks
//     |> Result.bind (fun ())