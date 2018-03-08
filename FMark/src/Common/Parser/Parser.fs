module Parser
open Types
open Shared
open ParserHelperFuncs
open Markalc
open Logger

let logger = Logger(LogLevel.ERROR)

// helper functions

/// parse literals, return any unrecognized tokens
let parseLiteral toks =
    let rec parseLiteral' (str, toks) =
        match toks with
        | MatchEmStart (pre, _, _) -> str+pre, toks
        | MatchEmEnd (pretk, _, _) -> str+(mapTok pretk), toks
        | IsNewTLine _ -> str, toks                         // New TLine
        | IsNewFrmt _ -> str, toks                          // NewFrmt
        | MatchNewParagraph _ -> str, toks                  // 2>= endlines
        | WHITESPACE _:: toks' -> (str+" ", toks') |> parseLiteral' // reduce spaces to 1
        | MatchMapTok (str', toks') -> (str+str', toks') |> parseLiteral' // convert the rest to string
        | [] -> str, toks                                   // nothing to parse
        | _ -> sprintf "unmatched token should never happen: %A" toks |> failwith
    parseLiteral' (NOSTRING, toks)

/// parse inline code
let rec parseCode toks =
    match toks with
    | BACKTICK::_ -> ("", toks.[1..]) |> Ok
    | tok::toks' ->
        parseCode toks'
        |> Result.map (fun (str, tks) ->
        mapTok tok + str, tks )
    | e ->  logger.Error None (sprintf "%A" e)
            ("\\`", xOnwards 1 toks) |> Ok

/// parse inline text, including links and pictures, terminate on 2>= `ENDLINE`s
let parseInLineElements toks =
    let rec parseInLineElements' toks =
        match toks with
        | BACKTICK:: _ ->
            parseCode toks.[1..]
            |> Result.map(fun (str, rtks) -> FrmtedString(Code str), rtks )
        | MatchEmStart (_, sym, toks') ->      // record the start em symbol
            parseInLines toks'
            |> Result.map (fun (inlines, retoks) ->
                match retoks with
                | MatchEmEnd (_, lsym, retoks') ->
                    if sym=lsym then
                        (FrmtedString(Emphasis(inlines)), retoks')
                    else        // em does not match -> treat as literal
                        let pstr, rtks = parseLiteral toks'
                        (FrmtedString(Literal ( (mapTEmphasis sym)+pstr) ), rtks)
                | _ ->
                    let pstr, rtks = parseLiteral toks'
                    (FrmtedString(Literal ( (mapTEmphasis sym)+pstr) ), rtks)
            )
        | _ ->
            let pstr, retoks = parseLiteral toks
            (FrmtedString (Literal pstr), retoks) |> Ok
    and parseInLines toks =
        match toks with
        | [] -> ([], []) |> Ok
        | _ ->
        parseInLineElements' toks
        |> Result.bind (fun (inLine, retoks) ->
            match retoks with
            | [] -> ([inLine], []) |> Ok
            | MatchEmEnd _ -> ([inLine], retoks) |> Ok
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

/// parse a paragraph which counts for contents in  `<p>`
/// parseParagraph eats 2>= ENDLINEs
let parseParagraph toks =
    let rec parseParagraph' toks =
        match toks with
        | MatchNewParagraph toks' -> ([], toks') |> Ok
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

/// match table start sequence
/// return table rows, terminates when [] or two continuous ENDLINEs
/// start sequence:
/// something in first line, at least one '|' and three '-' in second line
let (|MatchTable|_|) toks =
    // transform table rows into Table or Pretable depending if valid table.
    let tableTransform (rows,rtks) =
        rows |> Markalc.parseEvaluateTable
        |> function
        | Ok(rows) -> 
            let toPCellList (cell:Cell) = 
                let toks,head,align = (cell.GetParams) 
                let pCellLine = toks |> parseInLineElements |> (function | Ok(x,_) -> x | Error(e) -> [FrmtedString(Literal(e))])
                CellLine(pCellLine,head,align)
            let toPRow row = 
                let clst, rHead = row |> function | Cells(clst',rHead') -> clst',rHead'
                PCells(List.map toPCellList clst, rHead)// Create PRows
            // For each row, unpack into Cell list
            (List.map toPRow rows |> Table,rtks) |> Some
        | Error(_)-> None
    match toks with
    | MatchTableHead rtks ->
        match rtks with
        | MatchTableFormater _ -> cutTableRows toks |> tableTransform
        | _ -> None
    | _ -> None

/// parse supported `ParsedObj`s, turn them into a list
/// assuming each item start at the beginning of the line
/// the returned token head does not have 2>= ENDLINE
let rec parseItem (rawToks: Token list) : Result<ParsedObj * Token list, string> =
    let toks = deleteLeadingENDLINEs rawToks
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), toks') |> Ok
    | MatchListOpSpace _ -> "Lists todo" |> Error
    | MatchTable (rows, rtks) -> (rows, rtks) |> Ok
    | RABRA:: toks' ->
        parseInLineElements toks'
        |> Result.map (fun (line, rtks) -> Quote(line), rtks)
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

/// top-level Parser, which the user should use
/// `parse` will either return result monad with either `ParsedObj list` or a string of Error message.
/// Unparsed Tokens will be in the returned in the Error message.
let parse toks =
    parseItemList toks
    |> Result.bind (fun (pobjs, retoks) ->
        match retoks with
        | None -> pobjs |> Ok
        | Some retoks -> sprintf "Some unparsed tokens: %A" retoks |> Error)
