module ParserHelperFuncs
open Types
open Shared
open Logger

let logger = Logger(LogLevel.INFO)

let SPACE = " "
let NOSTRING = ""

type TEmphasis = UNDER | STAR // underscore and asterisk

type ParagraphState = {Par: Token list; ReToks: Token list; ParMatched: bool}

type FormatStyle = STRONG | EM | SEM

/// delete leading ENDLINEs and retur the rest
let rec deleteLeadingENDLINEs toks =
    match toks with
    | ENDLINE:: tks -> deleteLeadingENDLINEs tks
    | _ -> toks

let deleteTrailingENDLINEs toks =
    toks
    |> List.rev
    |> deleteLeadingENDLINEs
    |> List.rev

let trimENDLINEs toks =
    toks
    |> deleteLeadingENDLINEs
    |> deleteTrailingENDLINEs

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
let cutFirstLine toks =
    let rec cutLine' line rtks =
        match rtks with
        | ENDLINE:: rtks -> line |> List.rev, rtks
        | tok:: rtks -> cutLine' (tok::line) rtks
        | [] -> line |> List.rev, []
    cutLine' [] toks

/// process token list into lines of tokens, no ENDLINE in the end
let cutIntoLines toks =
    let rec cutIntoLines' tokLines toks =
        let endlineSpliter = function | ENDLINE -> true | _ -> false
        match List.tryFindIndex endlineSpliter toks with
        | None -> toks::tokLines |> List.rev
        | Some idx ->
            match List.splitAt idx toks with
            | (tokLine, retoks) ->
                let tokLineNoEL = tokLine |> deleteTrailingENDLINEs
                cutIntoLines' (tokLineNoEL::tokLines) retoks.Tail
    toks
    |> cutIntoLines' []

/// combine adjacent FrmtedString(Literal "something")
let combineLiterals line =
    let combiner line inlineEle =
        let doNothing = inlineEle::line
        match List.head line with
        | FrmtedString (Literal l) ->
            match inlineEle with
            | FrmtedString (Literal s) -> FrmtedString (Literal (l+s)) :: line.Tail
            | _ -> doNothing
        | _ -> doNothing
    line
    |> List.tail
    |> List.fold combiner [List.head line]
    |> List.rev


/// match start and end symbol for formatting
/// return the match content, w/o the symbols
/// and the rest tokens
let (|MatchSym|_|) sym toks =
    match toks with
    | t::tl when t = sym ->
        match List.tryFindIndex (fun s -> s=sym) (List.tail toks) with
        | Some idx ->
            let (content, restTks) = List.splitAt idx tl
            (content, List.tail restTks) |> Some
        | None -> None
    | _ -> None


/// match paragraph
/// return paragraph contents, w/o trailing ENDLINE,
/// and the rest tokens, w/o leading ENDLINE
let (|PickoutParagraph|_|) toks =
    match toks with
    | [] -> None
    | _ ->
        let folder state tok =
            let {Par=par;ReToks=reToks;ParMatched=matched} = state
            if matched then
                {state with ReToks=tok::reToks}
            else
                match tok with
                | ENDLINE when List.head par = ENDLINE -> {Par=List.tail par;ReToks=reToks;ParMatched=true}
                | HEADER _ -> {Par=par;ReToks=tok::reToks;ParMatched=true}
                | _ -> {state with Par=tok::par}
        let initState = {Par=[];ReToks=[];ParMatched=false}
        match List.fold folder initState toks with
        | {Par=par;ReToks=reToks} ->
            (par |> List.rev, reToks |> List.rev |> deleteLeadingENDLINEs) |> Some

/// match lists
let (|PickoutList|_|) toks =
    match toks with
    | [] -> None
    | ASTERISK:: WHITESPACE _:: _ | MINUS:: WHITESPACE _:: _ // unordered list
    | NUMBER _:: DOT:: WHITESPACE _:: _ ->  // ordered list
        match toks with
        | PickoutParagraph result -> Some result
        | _ -> None
    | _ -> None


let (|MatchTemplate|_|) strongOrEmOrBoth toks =
    let (asteriskFormatter, underscoreFormatter) =
        match strongOrEmOrBoth with
        | STRONG -> DASTERISK, DUNDERSCORE
        | EM -> ASTERISK, UNDERSCORE
        | SEM -> TASTERISK, TUNDERSCORE
    let attachInlineEle front back = Option.map (fun (x,y) -> x,y,front,back)
    match toks with
    | WHITESPACE _:: whatSym:: WHITESPACE _:: _ when whatSym=underscoreFormatter -> None      // not em
    | WHITESPACE frontWhite:: whatSym:: potential when whatSym=underscoreFormatter ->
        let frontLiteral = String.replicate frontWhite " " |> Literal |> FrmtedString |> Some
        let rec endFinder content toks =
            match toks with
            | [] -> None
            | WHITESPACE _:: whatSym:: WHITESPACE _:: rtks when whatSym=underscoreFormatter -> // keep finding
                endFinder (List.append content toks.[0..2]) rtks
            | _:: whatSym:: WHITESPACE backWhite:: rtks when whatSym=underscoreFormatter ->
                let backLiteral = String.replicate backWhite " " |> Literal |> FrmtedString |> Some
                (List.append content [List.head toks], rtks)
                |> Some
                |> attachInlineEle frontLiteral backLiteral
            | _::[whatSym] when whatSym=underscoreFormatter ->
                (List.append content [List.head toks], [])
                |> Some
                |> attachInlineEle frontLiteral None
            | _ ->
                xOnwards 1 toks
                |> endFinder (List.append content [toks.[0]])
        endFinder [] potential
    | whatSym:: WHITESPACE _:: _ when whatSym=asteriskFormatter -> None // not asterisk em
    | whatSym:: potential when whatSym=asteriskFormatter ->
        let rec endFinder content toks =
            match toks with
            | [] -> None
            | WHITESPACE _:: whatSym:: rtks when whatSym=asteriskFormatter -> // keep finding
                endFinder (List.append content toks.[0..1]) rtks
            | _:: whatSym:: rtks when whatSym=asteriskFormatter ->
                (List.append content [List.head toks], rtks)
                |> Some
                |> attachInlineEle None None
            | _ ->
                xOnwards 1 toks
                |> endFinder (List.append content [toks.[0]])
        endFinder [] potential
    | _ -> None


/// match underscore and asterisk emphasis start squence
/// match underscore and asterisk emphasis end sequence
/// return content of emphasis, the rest of line,
/// and the necessary edge InlineElement
/// e.g. ` _i_`, the edge InlineElements are `Some(FrmtedString(Literal " "))` and `None`
let (|MatchEm|_|) toks =
    match toks with
    | MatchTemplate EM result -> Some result
    | _ -> None

/// match underscore and asterisk strong start squence
/// match underscore and asterisk strong end sequence
/// return content of strong, the rest of line,
/// and the necessary edge InlineElement
/// e.g. ` __i__`, the edge InlineElements are `Some(FrmtedString(Literal " "))` and `None`
let (|MatchStrong|_|) toks =
    match toks with
    | MatchTemplate STRONG result -> Some result
    | _ -> None

let (|MatchStrongAndEm|_|) toks =
    match toks with
    | MatchTemplate SEM result -> Some result
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
/// returns no of hashes, the first non-WHITESPACE token list
/// and the tokens in next lines
let (|MatchHeader|_|) toks =
    let rec countHashes n tks =
        match tks with
        | HASH:: tks' -> countHashes (n+1) tks'
        | _ -> n
    match countHashes 0 toks with
    | no when no > 0 ->
        match toks.[no..] with
        | WHITESPACE _ :: toks' ->
            toks'|> cutFirstLine
            |> (fun (f,s) -> no, f,s)
            |> Some // omit whitespace
        | _ -> None
    | _ -> None

/// match quote
let (|MatchQuote|_|) toks =
    match toks with
    | RABRA:: rtks ->
        rtks
        |> cutFirstLine
        |> Some
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
    let line, rtks = cutFirstLine toks
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
    let line, rtks = cutFirstLine toks
    match (countPipes line, countMinus line) with
    | (p,m) when p>0 && m>2 -> Some(rtks)
    | _ -> None

/// match link
let (|MatchLink|_|) toks =
    let returnWhenRSBRALBRA toks =
        let rec concrete (content, toks) =
            match toks with
            | [] -> None
            | RSBRA::LBRA::rtks -> (List.rev content, rtks) |> Some
            | _ -> (List.head toks::content, List.tail toks) |> concrete
        concrete ([], toks)
    let returnWhenRBRA toks =
        let rec whatName (content, toks) =
            match toks with
            | [] -> None
            | RBRA::rtks -> (List.rev content, rtks) |> Some
            | _ -> (List.head toks::content, List.tail toks) |> whatName
        whatName ([], toks)
    match toks with
    | LSBRA::rtks ->
        match returnWhenRSBRALBRA rtks with
        | Some (hyperTextToks, remains) ->
            match returnWhenRBRA remains with
            | Some (urlToks, retoks) ->
                (hyperTextToks, urlToks, retoks) |> Some
            | None -> None
        | None -> None
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
            let row, rtks = cutFirstLine toks
            cutTableRow' (row::rows) rtks
    cutTableRow' [] toks

/// parse inline text, including links and pictures, terminates when nothing left
let parseInLineElements2 refLst toks =
    let attachInlineEle front back ele =
        [front;ele;back]

    let chooseRef refId refs =
        match refs with
        | [] ->
            let msg = sprintf "[Reference: %A not found!]" refId
            msg |> logger.Info (Some 200) |> ignore
            msg |> Error
        | [exactlyOne] -> exactlyOne |> Ok
        | moreThanOne ->
            let msg = sprintf "Reference: %A occurred more than once in reference list, take the first one." refId
            msg |> logger.Info (Some 200) |> ignore
            List.head moreThanOne |> Ok
    /// find footnote in reference list, which contains both footnote and citation
    /// returns error msg if foot is not found
    /// returns first footnote if more than 1 is found
    let findFN fnId refList =
        let filterFN fnId refList =
            let fnFilter ref =
                match ref with
                | Footnote (id, _) when id=fnId -> true
                | _ -> false
            List.filter fnFilter refList
        filterFN fnId refList
        |> chooseRef fnId
    /// find citation in reference list, which contains both footnote and citation
    /// returns error msg if foot is not found
    /// returns first citation if more than 1 is found
    let findCite citeId refList =
        let filterCite fnId refList =
            let citeFilter ref =
                match ref with
                | Citation (id, _, _) when id=fnId -> true
                | _ -> false
            List.filter citeFilter refList
        filterCite citeId refList
        |> chooseRef citeId
    let genFormat (currentLine, inlineContent, frontLiteral, backLiteral) =
        match frontLiteral, backLiteral with
            | Some fl, Some bl ->
                [bl;inlineContent;fl]
            | Some fl, None ->
                [inlineContent;fl]
            | None, Some bl ->
                [bl;inlineContent]
            | None, None ->
                [inlineContent]
        |> (fun x -> x@currentLine)
    let makeList x = [x]
    let rec parseInLineElements' ftLst currentLine toks =
        match toks with
        | MatchSym BACKTICK (content, rtks) -> (content|> strAllToks|> Code|> FrmtedString )::currentLine, rtks
        | MatchStrongAndEm (content, rtks, frontLiteral, backLiteral) ->
            let inlineContent =
                parseInLines [] content |> Strong |> FrmtedString |> makeList |> Emphasis |> FrmtedString
            genFormat (currentLine, inlineContent, frontLiteral, backLiteral)
            , rtks
        | MatchStrong (content, rtks, frontLiteral, backLiteral) ->
            let inlineContent = (parseInLines [] content |> Strong |> FrmtedString)
            genFormat (currentLine, inlineContent, frontLiteral, backLiteral)
            , rtks
        | MatchEm (content, rtks, frontLiteral, backLiteral) ->
            let inlineContent = (parseInLines [] content |> Emphasis |> FrmtedString)
            genFormat (currentLine, inlineContent, frontLiteral, backLiteral)
            , rtks
        | MatchLink (hyperTextToks, urlToks, rtks) ->
            let hyperText = parseInLines [] hyperTextToks |> Line
            let url = strAllToks urlToks
            [(hyperText, url) |> Link]@currentLine, rtks
        | EXCLAMATION:: MatchLink (hyperTextToks, urlToks, rtks) ->
            let hyperText = hyperTextToks |> strAllToks
            let url = strAllToks urlToks
            [(hyperText, url) |> Picture]@currentLine, rtks
        | FOOTNOTE i :: rtks ->
            let idStr = string i
            match findFN i ftLst with
            | Ok _ -> // ok if found at least one reference in refLst
                [(Literal idStr, idStr) |> Reference]@currentLine, rtks
            | Error msg -> // error if no reference is found in refLst
                [msg |> Literal |> FrmtedString], rtks
        | CITATION str :: rtks ->
            match findCite str ftLst with
            | Ok ref -> // ok if found at least one reference in refLst
                match ref with
                | Citation (id, hyperText, _) -> [(hyperText, id) |> Reference]@currentLine, rtks
                | _ -> failwith "non-citation in citation list"
            | Error msg -> // error if no reference is found in refLst
                [msg |> Literal |> FrmtedString], rtks
        | _ ->
            let str = mapTok toks.[0]
            FrmtedString (Literal str)::currentLine, xOnwards 1 toks
    and parseInLines currentLine toks =
        match toks with
        | [] -> []
        | _ ->
            let (newLine, retoks) = parseInLineElements' refLst currentLine toks
            match retoks with
            | [] -> newLine |> List.rev
            | _ ->
                parseInLines newLine retoks
                |> combineLiterals
    parseInLines [] toks

let parseInLineElements toks = parseInLineElements2 [] toks