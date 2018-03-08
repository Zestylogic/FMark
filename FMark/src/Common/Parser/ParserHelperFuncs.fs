module ParserHelperFuncs
open Types
open Shared

let SPACE = " "
let NOSTRING = ""

type TEmphasis = UNDER | STAR // underscore and asterisk

let mapTEmphasis = function
    | UNDER -> "_"
    | STAR -> "*"

/// delete leading ENDLINEs and retur the rest
let rec deleteLeadingENDLINEs toks =
    match toks with
    | ENDLINE:: tks -> deleteLeadingENDLINEs tks
    | _ -> toks

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

/// count leading continuous spaces
let countSpaces toks =
    let rec countToks' (n, toks') =
        match toks' with
        | WHITESPACE no:: rtks -> countToks' (n+no, rtks)
        | _ -> n, toks'
    countToks' (0, toks) |> fst

/// count leading continuoues ENDLINEs
let countNewLines = countToks (ENDLINE)

/// count all pipes in a line
let countDelim delim toks =
    let counter tok =
        match tok with
        | t when t =delim ->1
        | _ -> 0
    List.sumBy counter toks
let countPipes = countDelim PIPE
let countMinus = countDelim MINUS

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

/// match potential new inline format
/// return input Token list
let (|IsNewFrmt|_|) toks =
    match toks with
        | UNDERSCORE::_ | DUNDERSCORE::_ | TUNDERSCORE::_   // em and strong
        | ASTERISK::_ | DASTERISK::_ | TASTERISK::_         // em and strong
        | BACKTICK:: _                                      // code
        | LBRA:: _ | RBRA:: _ | EXCLAMATION:: _ | LSBRA:: _ | RSBRA:: _ //link and picture
            -> toks |> Some
        | _ -> None

/// match potential em sequence
/// return input Token list
let (|IsWordSepAndNewFrmt|_|) toks =
    match toks with
    | WHITESPACE _::toks' ->
        match toks' with
        | IsNewFrmt _ -> toks |> Some
        | _ -> None
    | _ -> None

/// match underscore and asterisk emphasis start squence
/// return 1. string, representing a space before UNDERSCORE
/// 2. TEmphasis, emphasis type
/// 3. Token list after underscore or asterisk
let (|MatchEmStart|_|) toks =
    match toks with
    | WHITESPACE _:: UNDERSCORE:: WHITESPACE _:: _ -> None      // not em
    | WHITESPACE _:: UNDERSCORE:: rtks -> (" ", UNDER, rtks) |> Some
    | ASTERISK :: WHITESPACE _:: _ -> None                      // nor em
    | ASTERISK :: rtks -> ("", STAR, rtks) |> Some
    | _ -> None


/// match underscore and asterisk emphasis end sequence
/// return 1. Token, a Token before emphasis
/// 2. TEmphasis, emphasis type
/// 3. Token list after underscore or asterisk
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

/// match new paragraph sequence
/// return Token list after EDNLINEs
let (|MatchNewParagraph|_|) toks =
    match countNewLines toks with
    | n when n>=2 -> toks.[n..] |> Some
    | _ -> None

/// turn head Token into string
/// return head Token string and tail Token list
let (|MatchMapTok|_|) = function
    | tok:: toks -> (mapTok tok, toks) |> Some
    | _ -> None

/// match hashes
/// returns no of hashes and the first non-WHITESPACE token
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

/// match list begin sequence w/o spaces
/// return list type and Token list after start sequence
let (|MatchList|_|) toks =
    match toks with
    | NUMBER _:: DOT:: WHITESPACE _:: toks' -> (OL, toks') |> Some
    | ASTERISK:: WHITESPACE _:: toks' -> (UL, toks') |> Some
    | _ -> None

/// match list begin sequence with optional spaces
/// return list type and Token list after start sequence
let (|MatchListOpSpace|_|) toks =
    match toks with
    | WHITESPACE _:: MatchList content -> content |> Some
    | MatchList content -> content |> Some
    | _ -> None

/// return the next line
/// next line is seperated by 1 ENDLINE
let (|MatchTableHead|_|) toks =
    let line, rtks = cutLine toks
    match line with
    | [] -> None
    | _ -> rtks |> Some

/// take one PIPE
/// return the rest |> Some
/// otherwise, None
let pipeMatch oToks =
    oToks
    |> Option.bind (fun toks ->
        match toks with
        | PIPE:: rtks -> Some rtks
        | _ -> None )

/// take all leading subsequent MINUSes
/// return the rest Tokens |> Some
/// otherwise, None
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

/// match the table formater line
/// the table formater is usually the second line of a table
/// return the rest Tokens |> Some
/// otherwise, None
let (|MatchTableFormater|_|) toks =
    let line, rtks = cutLine toks
    match (countPipes line, countMinus line) with
    | (p,m) when p>0 && m>2 -> Some(rtks)
    | _ -> None

/// cut Tokens into Token list list for Table parsing
/// terminates when [] or two continuous ENDLINEs
/// return Token list list,
/// remaining Token list
let cutTableRows toks =
    let rec cutTableRow' rows toks =
        match toks with
        | ENDLINE:: rtks -> rows |> List.rev, rtks // one endline followed by another
        | [] -> rows |> List.rev, []
        | _ ->
            let row, rtks = cutLine toks
            cutTableRow' (row::rows) rtks
    cutTableRow' [] toks
