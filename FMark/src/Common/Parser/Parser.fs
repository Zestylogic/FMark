module Parser
open Types
open Shared
open ParserHelperFuncs
open Markalc
open System.Threading

// helper functions


/// parse inline code
let rec parseCode toks =
    match toks with
    | BACKTICK::_ -> ("", toks.[1..]) |> Ok
    | tok::toks' ->
        parseCode toks'
        |> Result.map (fun (str, tks) ->
        mapTok tok + str, tks )
    | e ->  sharedLog.Warn None (sprintf "%A" e)
            ("\\`", xOnwards 1 toks) |> Ok

/// parse inline text, including links and pictures, terminates when nothing left
let parseInLineElements toks =
    let attachInlineEle front back ele =
        [front;ele;back]
    let rec parseInLineElements' currentLine toks =
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
            |> (fun x -> x@currentLine)
            , rtks
        | _ ->
            let str = mapTok toks.[0]
            FrmtedString (Literal str)::currentLine, xOnwards 1 toks
    and parseInLines currentLine toks =
        match toks with
        | [] -> []
        | _ ->
            let (newLine, retoks) = parseInLineElements' currentLine toks
            match retoks with
            | [] -> newLine |> List.rev
            | _ ->
                parseInLines newLine retoks
                |> combineLiterals
    parseInLines [] toks

/// parse a paragraph which counts for contents in  `<p>`
/// parseParagraph eats 2>= ENDLINEs
let parseParagraph toks =
    let parseParagraph' lines tokLine = (parseInLineElements tokLine) :: lines
    toks
    |> trimENDLINEs
    |> cutIntoLines
    |> List.fold parseParagraph' []
    |> List.rev
    |> Paragraph

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
                let pCellLine = toks |> parseInLineElements
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
    | MatchQuote (content, rtks) ->
        (parseInLineElements content |> Quote , rtks)
        |> Ok
    | MatchHeader (level, content, rtks) ->
        let line = parseInLineElements content
        (Header{HeaderName=line; Level=level}, rtks)
        |> Ok
    | PickoutParagraph (par, retoks) ->
        (parseParagraph par, retoks) |> Ok
    | _ -> sprintf "Nothing matched in parseItem for Tokens:\n%A" toks |> Error

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
