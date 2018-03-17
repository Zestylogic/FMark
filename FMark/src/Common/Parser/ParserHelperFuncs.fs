module ParserHelperFuncs
open Types
open Shared

let SPACE = " "
let NOSTRING = ""

type TEmphasis = UNDER | STAR // underscore and asterisk

type ParagraphState = {Par: Token list; ReToks: Token list; ParMatched: bool}

/// delete leading ENDLINEs and return the rest
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


/// match underscore and asterisk emphasis start squence
/// match underscore and asterisk emphasis end sequence
/// return content of emphasis, the rest of line,
/// and the necessary edge InlineElement
/// e.g. ` _i_`, the edge InlineElements are `Some(FrmtedString(Literal " "))` and `None`
let (|MatchEm|_|) toks =
    let attachInlineEle front back = Option.map (fun (x,y) -> x,y,front,back)
    match toks with
    | WHITESPACE _:: UNDERSCORE:: WHITESPACE _:: _ -> None      // not em
    | WHITESPACE frontWhite:: UNDERSCORE:: potential ->
        let frontLiteral = String.replicate frontWhite " " |> Literal |> FrmtedString |> Some
        let rec endFinder content toks =
            match toks with
            | [] -> None
            | WHITESPACE _:: UNDERSCORE:: WHITESPACE _:: rtks -> // keep finding
                endFinder (List.append content toks.[0..2]) rtks
            | _:: UNDERSCORE:: WHITESPACE backWhite:: rtks ->
                let backLiteral = String.replicate backWhite " " |> Literal |> FrmtedString |> Some
                (List.append content [List.head toks], rtks)
                |> Some
                |> attachInlineEle frontLiteral backLiteral
            | _::[UNDERSCORE] ->
                (List.append content [List.head toks], [])
                |> Some
                |> attachInlineEle frontLiteral None
            | _ ->
                xOnwards 1 toks
                |> endFinder (List.append content [toks.[0]])
        endFinder [] potential
    | ASTERISK:: WHITESPACE _:: _ -> None // not asterisk em
    | ASTERISK:: potential ->
        let rec endFinder content toks =
            match toks with
            | [] -> None
            | WHITESPACE _:: ASTERISK:: rtks -> // keep finding
                endFinder (List.append content toks.[0..1]) rtks
            | _:: ASTERISK:: rtks ->
                (List.append content [List.head toks], rtks)
                |> Some
                |> attachInlineEle None None
            | _ ->
                xOnwards 1 toks
                |> endFinder (List.append content [toks.[0]])
        endFinder [] potential
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
let parseInLineElements2 ftLst toks =
    let attachInlineEle front back ele =
        [front;ele;back]
    let rec parseInLineElements' ftLst currentLine toks =
        match toks with
        | MatchSym BACKTICK (content, rtks) -> (content|> strAllToks|> Code|> FrmtedString )::currentLine, rtks
        | MatchEm (content, rtks, frontLiteral, backLiteral) ->
            let inlineContent = (parseInLines [] content |> Emphasis |> FrmtedString)
            match frontLiteral, backLiteral with
                | Some fl, Some bl ->
                    [bl;inlineContent;fl]
                | Some fl, None ->
                    [inlineContent;fl]
                | None, Some bl ->
                    [bl;inlineContent]
                | None, None ->
                    [inlineContent]
            |> (fun x -> x@currentLine), rtks
        | FOOTNOTE i :: rtks ->
            let rec matchFootnote id pObjs = 
                match pObjs with
                | Footnote (i, _)::_ when i = id -> true
                | _ -> false
            let ft = matchFootnote i ftLst
            if ft then //make into link if exist
                [(("Footer" + string i |> Literal),"#footnote-"+string i) |> Link], rtks
            else //just superscript if does not exist
                ["Footer" + string i |> Literal |> FrmtedString], rtks
        | CITATION str :: rtks ->
            let rec matchCitation id pObjs = 
                match pObjs with
                | Citation (s, inLineRef, _) :: _ when s = id -> Some inLineRef
                | _ :: tl -> matchCitation id tl
                | [] -> None
            let ft = matchCitation str ftLst
            match ft with
            | Some ref -> [Link(ref,"#footnot-"+str)], rtks
            | None ->
                ["Footer " + str + " not found" |> Literal |> FrmtedString], rtks
        | _ ->
            let str = mapTok toks.[0]
            FrmtedString (Literal str)::currentLine, xOnwards 1 toks
    and parseInLines currentLine toks =
        match toks with
        | [] -> []
        | _ ->
            let (newLine, retoks) = parseInLineElements' ftLst currentLine toks
            match retoks with
            | [] -> newLine |> List.rev
            | _ ->
                parseInLines newLine retoks
                |> combineLiterals
    parseInLines [] toks

let parseInLineElements toks = parseInLineElements2 [] toks