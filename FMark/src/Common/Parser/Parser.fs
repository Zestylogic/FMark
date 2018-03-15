module Parser
open Types
open Shared
open ParserHelperFuncs
open TOCite

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

/// parse a paragraph which counts for contents in  `<p>`
/// parseParagraph eats 2>= ENDLINEs
let parseParagraph ftLst toks =
    let parseParagraph' lines tokLine = (parseInLineElements2 ftLst tokLine) :: lines
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

let headerIDGen id hd =
    let hdLine = hd.HeaderName
    let rec headerIDGen' hdLine =
        match hdLine with
        | FrmtedString (Literal a)::tl -> a + headerIDGen' tl
        | FrmtedString (Emphasis a)::tl -> (headerIDGen' a) + (headerIDGen' tl)
        | _ -> ""
    headerIDGen' hdLine + string id

/// parse supported `ParsedObj`s, turn them into a list
/// assuming each item start at the beginning of the line
/// the returned token head does not have 2>= ENDLINE
let rec parseItem (hdLst: THeader list) (ftLst: ParsedObj list) (rawToks: Token list) : Result<ParsedObj * Token list, string> =
    let toks = deleteLeadingENDLINEs rawToks
    match toks with
    | CODEBLOCK (content, lang) :: toks' -> (CodeBlock(content, lang), toks') |> Ok
    | MatchListOpSpace _ -> "Lists todo" |> Error
    | MatchTable (rows, rtks) -> (rows, rtks) |> Ok
    | MatchQuote (content, rtks) ->
        (parseInLineElements2 ftLst content |> Quote , rtks)
        |> Ok
    | HEADER i :: rtks -> (Header (hdLst.[i],(headerIDGen i hdLst.[i])), rtks) |> Ok
    | PickoutParagraph (par, retoks) ->
        (parseParagraph ftLst par, retoks) |> Ok
    | _ -> sprintf "Parse item did not match: %A" toks |> removeChars ["[";"]"] |> Error

and parseItemList hdLst ftLst toks : Result<ParsedObj list * option<Token list>, string> =
    match (List.isEmpty toks, not (List.exists (function | WHITESPACE(_) | ENDLINE -> false | _ -> true) toks)) with
    | (false,false) -> 
        parseItem hdLst ftLst toks
        |> Result.bind (fun (pobj, re) ->
            match List.isEmpty re with
            | true -> ([pobj], None) |> Ok
            | false ->
                parseItemList hdLst ftLst re
                |> Result.map(fun (pobjs, re') ->
                    pobj::pobjs, re' )
        )
    | _ -> ([], None) |> Ok // if tokens are only whitespace or endlines, return no parsedObjs


/// top-level Parser, which the user should use
/// `parse` will either return result monad with either `ParsedObj list` or a string of Error message.
/// Unparsed Tokens will be in the returned in the Error message.
let parse toks =
    let (hd, ft, rtoks) = preParser toks
    parseItemList hd ft rtoks
    |> Result.bind (fun (pobjs, retoks) ->
        match retoks with
        | None -> pobjs |> Ok
        | Some retoks -> sprintf "Some unparsed tokens: %A" retoks |> Error)
    |> Result.map (fun pObjs -> List.append pObjs ft)
