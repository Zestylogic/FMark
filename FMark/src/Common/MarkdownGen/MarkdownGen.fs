module MarkdownGen

open Types
open Shared
open Logger

let logger = Logger(LogLevel.INFO)

// retunr string surrounded by pat
let surround pat str =
    let pat2 = match pat with
               | "(" -> ")"
               | "[" -> "]"
               | "{" -> "}"
               | _   -> pat
    sprintf "%s%s%s" pat str pat2

/// convert TFrmtedString to string
let rec mdFStr fStr =
    match fStr with
    | Literal str -> str
    | Code str -> surround "`" str
    | Strong a ->  mdInlineElements a |> surround "**"
    | Emphasis e -> mdInlineElements e |> surround "*"

/// convert InlineElement list to string, with HTML tags where necessary
/// not tail recursive because the code looks cleaner this way
and mdInlineElements' b eles =
    let braSurround = surround "("
    let sbraSurround = surround "["
    let convertMd pStr ele =
        pStr +
        match ele with
        | FrmtedString fStr -> mdFStr fStr
        | Link (ht, url) -> (mdFStr ht |> sbraSurround) + (url |> braSurround)
        | Picture (alt, url) -> (alt |> sbraSurround |> sprintf "!%s" ) +  (url |> braSurround)
    List.fold convertMd (sprintf "%s" b) eles
and mdInlineElements = mdInlineElements' ""

/// process Markdown paragraph
let mdParagraph lines =
    let folder pLinesStr line =
        pLinesStr + mdInlineElements line
    List.fold folder "" lines
    + "\n\n"

/// process Markdown Table
let mdTable (rows: PRow list) =
    // filter out table header
    let containHeader (row: PRow) =
        //let PCells(_, isHeader) = row
        match row with
        | PCells(_, isHeader) ->
            isHeader
    let takeoutCells = List.map (fun pRow -> match pRow with | PCells(cells,_) -> cells)
    let headerRows = List.filter (containHeader) rows |> takeoutCells
    let bodyRows = List.filter (containHeader >> not) rows |> takeoutCells
    let foldCells alignRow row =
        let cellsFolder alignRow pStr cell =
            match cell with
            | CellLine(line, _, align) ->
                match alignRow with
                | true ->
                    match align with
                    | Centre -> ":---:"
                    | Right -> "---:"
                    | Left -> ":---"
                    | NoAlign -> "---"
                | false ->
                    mdInlineElements line
                |> (fun cellContent -> pStr + cellContent + "|")
                
        List.fold (cellsFolder alignRow) "|" row
    
    let foldRows alignRow rows =
        let rowsFolder alignRow pStr row =
            pStr + (foldCells alignRow) row + "\n"
        List.fold (rowsFolder alignRow) "" rows
    let foldNormalRows = foldRows false
    let foldAlignRow   = foldCells true
    foldNormalRows headerRows
    + (headerRows |> List.head |> foldAlignRow)
    + foldNormalRows bodyRows + "\n\n"

/// recursively process a list
let rec mdList list =
    let mdListItem ord tab (pStr,pCount) li =
            let retFold s = pStr + s, pCount + 1;
            match li with
            | StringItem(line) -> mdInlineElements line |> (fun s -> 
                if ord 
                then 
                    sprintf "%s%i. %s\n" (String.replicate tab "\t") pCount s
                    |> logPassN logger.Debug
                else sprintf "%s- %s\n" (String.replicate tab "\t") s) |> retFold
            | NestedList(list) -> mdList list |> retFold
            
    match list with
    | {ListType=lt; ListItem=liS; Depth=d} ->
        let ord = lt=OL
        List.fold (mdListItem ord (d-1)) ("",1) liS
        |> fst

/// process header
let mdHeader header =
    match header with
    | {HeaderName=line;Level=lv} ->
        (line |> mdInlineElements)
        |> sprintf "%s %s\n" (String.replicate lv "#") 

/// process HTML body part
let mdBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> mdParagraph p
        | Quote q -> mdInlineElements' ">" q
        | CodeBlock (c, l) -> surround "```" (mapLang l + "\n" + c + "\n")
        | Table rows -> mdTable rows
        | List l -> mdList l |> sprintf "%s\n"
        | Header h -> mdHeader h
        //| Footnote (fnId, _) -> mdInlineFootnote fnId
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs



