module ParserHelperFuncs
open Types

let SPACE = " "
let NOSTRING = ""

type TEmphasis = UNDER | STAR // underscore and asterisk

let mapTEmphasis = function
    | UNDER -> "_"
    | STAR -> "*"

let rec deleteLeadingEDNLINEs toks =
    match toks with
    | ENDLINE:: tks -> deleteLeadingEDNLINEs tks
    | _ -> toks

let mapTok = function
    | CODEBLOCK _ -> "CODEBLOCK" // not supposed to be read by matchTok
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

/// convert all Tokens into a single string
/// see mapTok for Token mapping
let stringAllTokens toks =
    let matchTok i tok =
        i + mapTok tok
    List.fold matchTok "" toks

/// count subsquent and continuous Tokens
let countToks (tok: Token) toks =
    let rec countToks' (n, toks') =
        match toks' with
        | t:: rtks when t = tok -> countToks' (n+1, rtks)
        | _ -> n, toks'
    countToks' (0, toks) |> fst


/// count continuous spaces
let countSpaces toks =
    let rec countToks' (n, toks') =
        match toks' with
        | WHITESPACE no:: rtks -> countToks' (n+no, rtks)
        | _ -> n, toks'
    countToks' (0, toks) |> fst

/// count continuoues ENDLINEs
let countNewLines = countToks (ENDLINE)

/// count pipes in a line
let countInlinePipes toks =
    let pipeCounter tok =
        match tok with
        | PIPE -> 1
        | _ -> 0
    List.sumBy pipeCounter toks

/// first element is the line
/// second element is remaining tokens
let cutLine toks =
    let rec cutLine' line rtks =
        match rtks with
        | ENDLINE:: rtks -> ENDLINE::line |> List.rev, rtks
        | tok:: rtks -> cutLine' (tok::line) rtks
        | [] -> line |> List.rev, []
    cutLine' [] toks

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

/// returns a string, representing a space before UNDERSCORE
let (|MatchEmStart|_|) toks =
    match toks with
    | WHITESPACE _:: UNDERSCORE:: WHITESPACE _:: _ -> None      // not em
    | WHITESPACE _:: UNDERSCORE:: rtks -> (" ", UNDER, rtks) |> Some
    | ASTERISK :: WHITESPACE _:: _ -> None                      // nor em
    | ASTERISK :: rtks -> ("", STAR, rtks) |> Some
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

let (|MatchEmEnd|_|) toks =
    match toks with
    | WHITESPACE _:: UNDERSCORE:: _ -> None         // not em end
    | tk:: UNDERSCORE:: ENDLINE:: _ -> (tk, UNDER, toks.[2..]) |> Some
    | tk:: UNDERSCORE:: WHITESPACE _:: _ -> (tk, UNDER, toks.[2..]) |> Some
        // preserve ENDLINE and WHITESPACE
    | [tk;UNDERSCORE] -> (tk, UNDER, []) |> Some
    | WHITESPACE _:: ASTERISK:: _ -> None           // nor em end
    | tk:: ASTERISK:: toks' -> (tk, STAR, toks') |> Some
    | _ -> None

/// omit EDNLINEs
let (|MatchNewParagraph|_|) toks =
    match countNewLines toks with
    | n when n>=2 -> toks.[n..] |> Some
    | _ -> None

let (|MatchMapTok|_|) = function
    | tok:: toks -> (mapTok tok, toks) |> Some
    | _ -> None

/// match hashes, returns no of hashes and the first
/// non-WHITESPACE token
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

let (|MatchList|_|) toks =
    match toks with
    | NUMBER _:: DOT:: WHITESPACE _:: toks' -> (OL, toks') |> Some
    | ASTERISK:: WHITESPACE _:: toks' -> (UL, toks') |> Some
    | _ -> None

let (|MatchListOpSpace|_|) toks =
    match toks with
    | WHITESPACE _:: MatchList content -> content |> Some
    | MatchList content -> content |> Some
    | _ -> None

let (|MatchTableHead|_|) toks =
    let line, rtks = cutLine toks
    match countInlinePipes line with
    | n when n>=2 -> rtks |> Some
    | _ -> None

/// take one PIPE, return the rest
let pipeMatch oToks =
    oToks
    |> Option.bind (fun toks ->
        match toks with
        | PIPE:: rtks -> Some rtks
        | _ -> None )



/// take all subsequent MINUSes
let minusMatch oToks =
    let takeAwayMinuses toks =
        let rec takeAwayMinuses' n toks =
            match toks with
            | MINUS:: rtks -> takeAwayMinuses' (n+1) rtks
            | _ -> n, toks
        takeAwayMinuses' 0 toks
    oToks
    |> Option.bind (fun toks ->
        let n, rtks = toks |> takeAwayMinuses 
        if n>0 then
            Some rtks
        else
            None
        )

let (|MatchTableFormater|_|) toks =
    let line, rtks = cutLine toks
    line |> Some |> pipeMatch |> minusMatch |> pipeMatch
    |> Option.map (fun _ -> Some rtks)

/// row list, remaining Tokens
let cutTableRows toks =
    let rec cutTableRow' rows toks =
        match toks with
        | ENDLINE:: rtks -> rows |> List.rev, rtks // one endline followed by another
        | [] -> rows |> List.rev, []
        | _ ->
            let row, rtks = cutLine toks
            cutTableRow' (row::rows) rtks
    cutTableRow' [] toks

let (|MatchTable|_|) toks =
    match toks with
    | MatchTableHead rtks ->
        match rtks with
        | MatchTableFormater _ -> cutTableRows toks |> Some
        | _ -> None
    | _ -> None
