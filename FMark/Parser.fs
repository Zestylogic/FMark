module Parser
open Types


// helper functions
let SPACE = " "
let NOSTRING = ""

type TEmphasis = UNDER | STAR // underscore and asterisk

let mapTok = function
    | CODEBLOCK _ -> "CODEBLOCK" // not supposed to be read be matchTok
    | LITERAL str-> str
    | WHITESPACE n -> String.replicate n " "
    | NUMBER str -> str
    | HASH -> "#"
    | PIPE->  "|"
    | EQUAL-> "="
    | MINUS-> "-"
    | PLUS->  "+"
    | ASTERISK-> "*"
    | DOT-> "."
    | DASTERISK-> "**"
    | TASTERISK-> "***"
    | UNDERSCORE-> "_"
    | DUNDERSCORE-> "__"
    | TUNDERSCORE-> "___"
    | TILDE-> "~"
    | DTILDE-> "~~"
    | TTILDE-> "~~~"
    | LSBRA-> "["
    | RSBRA-> "]"
    | LBRA-> "("
    | RBRA-> ")"
    | BSLASH-> "\\"
    | SLASH-> "/"
    | LABRA-> "<"
    | RABRA-> ">"
    | LCBRA -> "{"
    | RCBRA -> "}"
    | BACKTICK -> "`"
    | TBACKTICK -> "``"
    | EXCLAMATION -> "!"
    | ENDLINE -> "\n"
    | COLON -> ":"
    | CARET -> "^"
    | PERCENT -> "%"
let stringAllTokens toks =
    let matchTok i tok =
        i + mapTok tok
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

/// potential new inline format
let (|IsNewFrmt|_|) toks =
    match toks with
        | UNDERSCORE::_ | DUNDERSCORE::_ | TUNDERSCORE::_   // em and strong
        | ASTERISK::_ | DASTERISK::_ | TASTERISK::_         // em and strong
        | BACKTICK:: _                                      // code
        | LBRA:: _ | RBRA:: _ | EXCLAMATION:: _ | LSBRA:: _ | RSBRA:: _ //link and picture
            -> toks |> Some
        | _ -> None

let (|IsWordSepAndNewFrmt|_|) toks =
    match toks with
    | WHITESPACE _::toks' ->
        match toks' with
        | IsNewFrmt _ -> toks |> Some
        | _ -> None
    | _ -> None

let (|MatchEmStart|_|) toks =
    match toks with
    | WHITESPACE _:: UNDERSCORE:: _ -> (UNDER ,toks.[2..]) |> Some // omit space
    | ASTERISK ::_ -> (STAR , toks.[1..]) |> Some
    | _ -> None

/// match underscore
/// underscore em needs space after it
let (|MatchEmEndUDS|_|) toks =
    match toks with
    | UNDERSCORE:: ENDLINE:: _ | UNDERSCORE:: WHITESPACE _:: _ -> toks.[1..] |> Some
    | [UNDERSCORE] -> [] |> Some
    | _ -> None

/// match asterisk
/// asterisk em allow no space after it
let (|MatchEmEndATR|_|) toks =
    match toks with
    | ASTERISK::toks' -> toks' |> Some
    | _ -> None

let (|MatchNewParagraph|_|) toks =
    match countNewLines toks with
    | n when n>=2 -> toks.[n..] |> Some
    | _ -> None

let (|MatchMapTok|_|) = function
    | tok:: toks -> (mapTok tok, toks) |> Some
    | _ -> None

let (|MatchHeader|_|) toks =
    let rec countHashes n tks =
        match tks with
        | HASH:: tks' -> countHashes (n+1) tks'
        | _ -> n
    match countHashes 0 toks with
    | no when no > 0 ->
        match toks.[no..] with
        | WHITESPACE _ :: toks' ->
            (no, toks') |> Some // omit whitespace
        | _ -> None
    | _ -> None

/// parse literals, return any unrecognized tokens
let parseLiteral toks =
    let rec parseLiteral' (str, toks) =
        match toks with
        | IsWordSepAndNewFrmt retoks -> str+SPACE, retoks   // preserve space before NewFrmt
        | IsNewTLine _ -> str, toks                         // New TLine
        | IsNewFrmt _ -> str, toks                          // NewFrmt
        | MatchNewParagraph _ -> str, toks                  // 2>= endlines
        | WHITESPACE _:: toks' -> (str+" ", toks') |> parseLiteral' // reduce spaces to 1
        //| ENDLINE::toks' -> (str+" ", toks') |> parseLiteral' // convert 1 endline to space
        | MatchMapTok (str', toks') -> (str+str', toks') |> parseLiteral' // convert the rest to string
        | [] -> str, toks
        | _ -> sprintf "unmatched token should never happen: %A" toks |> failwith
    parseLiteral' (NOSTRING, toks)

let rec parseCode toks =
    match toks with
    | BACKTICK::_ -> ("", toks.[1..]) |> Ok
    | tok::toks' ->
        parseCode toks'
        |> Result.map (fun (str, tks) ->
        mapTok tok + str, tks )
    | _ -> "BACKTICK is not match for inline code" |> Error

let parseInLineElements toks =
    let rec parseInLineElements' toks =
        match toks with
        | LITERAL _ :: _ ->
            let pstr, retoks = parseLiteral toks
            (FrmtedString (Literal pstr), retoks) |> Ok
        | BACKTICK:: _ ->
            parseCode toks.[1..]
            |> Result.map(fun (str, rtks) -> FrmtedString(Code str), rtks )
        | MatchEmStart (sym, toks') ->
            parseInLines toks'
            |> Result.map (fun (inlines, retoks) ->
                match sym with
                | UNDER ->
                    match retoks with
                    | MatchEmEndUDS retoks' -> (FrmtedString(Emphasis(inlines)), retoks')
                    | _ ->          // em does not match -> treat as literal
                        let pstr, retoks = parseLiteral toks'
                        (FrmtedString(Literal ("_"+pstr) ), retoks)
                | STAR ->
                    match retoks with
                    | MatchEmEndATR retoks' -> (FrmtedString(Emphasis(inlines)), retoks')
                    | _ ->          // em does not match -> treat as literal
                        let pstr, retoks = parseLiteral toks'
                        (FrmtedString(Literal ("*"+pstr) ), retoks) )
        | _ -> sprintf "Nothing matched: %A" toks |> Error
    and parseInLines toks =
        match toks with
        | [] -> ([], []) |> Ok
        | _ ->
        parseInLineElements' toks
        |> Result.bind (fun (inLine, retoks) ->
            match retoks with
            | [] -> ([inLine], []) |> Ok
            | MatchEmEndUDS _ -> ([inLine], retoks) |> Ok
            | MatchNewParagraph toks' -> ([inLine], toks') |> Ok
            | IsNewTLine toks' -> // new TLine equivalent <br>)
                parseInLines toks'
                |> Result.map (fun (inLines, tks)->
                    inLine::inLines, tks)
            | _ ->
                parseInLines retoks
                |> Result.map (fun (inLines, retoks')->
                    inLine::inLines, retoks'))
    parseInLines toks

/// parseParagraph eats 2>= ENDLINEs
let parseParagraph toks =
    let rec parseParagraph' toks =
        match toks with
        | ENDLINE::toks' -> ([], toks') |> Ok
        | _ ->
            parseInLineElements toks
            |> Result.map (fun (inLines, retoks)->
                (inLines, retoks) )
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
    parseParagraphs toks |> Result.map (fun (lines,tks) -> Paragraph lines, tks)


let rec parseItem (toks: Token list) : Result<ParsedObj * Token list, string> =
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), toks') |> Ok
    | ENDLINE _ :: NUMBER _ :: DOT :: WHITESPACE _ :: toks' -> "Lists todo" |> Error
    | MatchHeader (level, rtks) ->
        parseInLineElements rtks
        |> Result.map (fun (line, rtks') -> Header{HeaderName=line; Level=level}, rtks' )
    | _ -> parseParagraph toks
        |> Result.map (fun (p, tks) -> p, tks)

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