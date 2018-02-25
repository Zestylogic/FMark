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
