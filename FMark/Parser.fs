module Parser
open Types


// helper functions
let SPACE = " "
let NOSTRING = ""

let stringAllTokens toks =
    let matchTok i tok =
        let mappedTok =
            match tok with
            | CODEBLOCK _ -> "CODEBLOCK "
            | LITERAL str-> sprintf "L(%A) " str
            | WHITESPACE n ->  sprintf "S(%A) " n
            | NUMBER str -> sprintf "N(%A) " str
            | HASH -> "# "
            | PIPE->  "| "
            | EQUAL-> "= "
            | MINUS-> "- "
            | PLUS->  "+ "
            | ASTERISK-> "* "
            | DOT-> ". "
            | DASTERISK-> "** "
            | TASTERISK-> "*** "
            | UNDERSCORE-> "_ "
            | DUNDERSCORE-> "__ "
            | TUNDERSCORE-> "___ "
            | TILDE-> "~ "
            | DTILDE-> "~~ "
            | TTILDE-> "~~~ "
            | LSBRA-> "[ "
            | RSBRA-> "] "
            | LBRA-> "( "
            | RBRA-> ") "
            | BSLASH-> "\ "
            | SLASH-> "/ "
            | LABRA-> "< "
            | RABRA-> "> "
            | LCBRA -> "{ "
            | RCBRA -> "} "
            | BACKTICK -> "` "
            | TBACKTICK -> "`` "
            | EXCLAMATION -> "! "
            | ENDLINE -> "CRLF "
            | COLON -> ": "
            | CARET -> "^ "
        i + mappedTok
    List.fold matchTok "" toks

/// count continuous spaces
let rec countSpaces toks =
    match toks with
    | WHITESPACE n :: toks' -> countSpaces toks' |> (+) n
    | _ -> 0

let rec countNewLines toks =
    match toks with
    | ENDLINE :: toks' -> countNewLines toks' |> (+) 1
    | _ -> 0


/// newline but not new paragraoh
/// is 2>= spaces and 1 newline, and potential spaces
let (|IsNewTLine|_|) toks =
    let rec takeAwaySpaces toks =
        match toks with
        | WHITESPACE _ :: toks' -> takeAwaySpaces toks'
        | _ -> toks
    match countSpaces toks >=2 with
    | true ->
        let toksWOSpaces =  toks |> takeAwaySpaces
        match countNewLines toksWOSpaces = 1 with
        | true -> toksWOSpaces.[1..] |> takeAwaySpaces |> Some // remove leading spaces in new line
        | false -> None
    | false -> None

let (|IsWordSepAndNewFrmt|_|) toks =
    match toks with
    | WHITESPACE _::toks' ->
        match toks' with
        | UNDERSCORE::_ | DUNDERSCORE::_ | TUNDERSCORE::_
        | ASTERISK::_ | DASTERISK::_ | TASTERISK::_
            -> toks |> Some
        | _ -> None
    | _ -> None

let (|MatchEmStart|_|) toks =
    match toks with
    | WHITESPACE _:: UNDERSCORE:: _ | WHITESPACE _:: ASTERISK ::_ -> toks.[2..] |> Some
    | ASTERISK ::_ -> toks.[1..] |> Some
    | _ -> None

let (|MatchEmEnd|_|) toks =
    match toks with
    | UNDERSCORE:: ENDLINE:: _ | UNDERSCORE:: WHITESPACE _:: _ -> toks.[1..] |> Some
    | [UNDERSCORE] -> [] |> Some
    | _ -> None

let (|MatchNewParagraph|_|) toks =
    match countNewLines toks with
    | n when n>=2 -> toks.[n..] |> Some
    | _ -> None

/// parse literals, return any unrecognized tokens
let parseLiteral toks =
    let rec parseLiteral' toks str =
        let appendString newstr sep retoks =
            match String.length str with
            | 0 -> [] | _ -> [str]
            |> (fun sl -> List.append sl [newstr])
            |> String.concat sep |> parseLiteral' retoks
        match toks with
        | IsWordSepAndNewFrmt retoks -> str+SPACE, retoks
        | WHITESPACE _:: LITERAL str':: toks' -> appendString str' SPACE toks'
        | LITERAL str' :: toks' -> appendString str' NOSTRING toks'
        | ENDLINE::LITERAL str'::toks' -> appendString str' SPACE toks'
        | _ -> str, toks
    parseLiteral' toks NOSTRING

let parseInLineElements toks =
    let rec parseInLineElements' toks =
        match toks with
        | LITERAL _ :: _ ->
            let pstr, retoks = parseLiteral toks
            //let inlines, retoks' = parseInLineElements' retoks
            (FrmtedString (Literal pstr), retoks) |> Ok
        | MatchEmStart toks' ->
            //let pstr, retoks = parseLiteral toks.[2..]
            //let inlines, retoks = parseInLineElements' toks'
            printfn "em:%A" toks'
            parseInLines toks'
            |> Result.map (fun (inlines, retoks) ->
                match retoks with
                | MatchEmEnd retoks' -> (FrmtedString(Emphasis(inlines)), retoks')
                | _ -> failwithf "underscore not matching")
        | _ -> sprintf "Nothing matched: %A" (stringAllTokens toks) |> Error
    and parseInLines toks =
        match toks with
        | [] -> ([], []) |> Ok
        | _ ->
        parseInLineElements' toks
        |> Result.bind (fun (inLine, retoks) ->
            match retoks with
            | [] -> ([inLine], []) |> Ok
            //| IsNewTLine toks' -> printfn "newTLine"; ([], toks') |> Ok // new TLine equivalent <br>)
            | MatchNewParagraph toks' -> ([inLine], toks') |> Ok // new TLine equivalent <br>)
            | IsNewTLine toks' ->
                parseInLines toks'
                |> Result.map (fun (inLines, tks)->
                    inLine::inLines, tks)
            | _ ->
                parseInLines retoks
                |> Result.map (fun (inLines, retoks')->
                    inLine::inLines, retoks'))
    parseInLines toks

/// parseParagraph eats ENDLINE
let parseParagraph toks =
    let rec parseParagraph' toks =
        match toks with
        | LITERAL _::toks' ->
            parseInLineElements toks
            |> Result.map (fun (inLines, retoks)->
                (inLines, retoks) )
        | ENDLINE::toks' -> ([], toks') |> Ok
        | _ -> failwithf "parseParagraph ele not implemented"
    //let prep, retoks = parseParagraph' toks
    and parseParagraphs toks =
        parseParagraph' toks
        |> Result.bind (fun (p, retoks) ->
            match retoks with
            | [] -> ([p], []) |> Ok
            | MatchNewParagraph retoks' -> ([], retoks') |> Ok
            | _ ->
                parseParagraphs retoks
                |> Result.map (fun (ps, rts) ->
                    (p::ps, rts)))
    parseParagraphs toks


let rec parseItem (toks: Token list) : Result<ParsedObj * Token list, string> =
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), toks') |> Ok
    | ENDLINE _ :: NUMBER _ :: DOT :: WHITESPACE _ :: toks' -> "Lists todo" |> Error
    | LITERAL str :: toks' ->
        // match parseLiteral toks with
        // | lstr, retoks -> (Paragraph([[FrmtedString(Literal lstr)]]), retoks) |> Ok
        parseParagraph toks
        |> Result.map (fun (p, tks) -> Paragraph p, tks)
    | _ -> "not implemented" |> Error

and parseItemList toks : Result<ParsedObj list * option<Token list>, string> =
    parseItem toks
    |> Result.bind (fun (pobj, re) ->
        match List.isEmpty re with
        | true -> ([pobj], None) |> Ok
        | false ->
            parseItemList re
            |> Result.map(fun (pobjs, re') ->
                pobj::pobjs, re' )
        )

let parse toks =
    parseItemList toks
    |> Result.bind (fun (pobjs, retoks) ->
        match retoks with
        | None -> pobjs |> Ok
        | Some retoks -> "Some unparsed tokens" |> Error)