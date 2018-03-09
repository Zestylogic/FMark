module HTMLGen

open Types
open Shared
open HTMLGenHelpers


/// convert TFrmtedString to string, with HTML tags where necessary
let rec strFStr fStr =
    match fStr with
    | Literal str -> str
    | Code str -> str |> attachSimpleTag "code"
    | Strong a -> strInlineElements a |> attachSimpleTag "strong"
    | Emphasis e -> strInlineElements e |> attachSimpleTag "em"

/// convert InlineElement list to string, with HTML tags where necessary
/// not tail recursive because the code looks cleaner this way
and strInlineElements eles =
    let convertHtml pStr ele =
        pStr +
        match ele with
        | FrmtedString fStr -> strFStr fStr
        | Link (ht, url) -> strFStr ht |> attachHTMLTag ("a", [("href", url)], true)
        | Picture (alt, url) ->
            let attrs = [("src", url); ("alt", alt)]
            attachHTMLTag ("img", attrs, false) ""
    List.fold convertHtml "" eles

/// process Markdown paragraph
let strParagraph lines =
    let folder pLinesStr line =
        pLinesStr + strInlineElements line
    List.fold folder "" lines
    |> attachSimpleTag "p"


/// process Markdown Table
let strTable (rows: PRow list) =
    // filter out table header
    let containHeader (row: PRow) =
        //let PCells(_, isHeader) = row
        match row with
        | PCells(_, isHeader) ->
            isHeader
    let takeoutCells = List.map (fun pRow -> match pRow with | PCells(cells,_) -> cells)
    let headerRows = List.filter (containHeader) rows |> takeoutCells
    let bodyRows = List.filter (containHeader >> not) rows |> takeoutCells
    let foldCells row =
        let cellsFolder pStr cell =
            match cell with
            | CellLine(line, isHeader, align) ->
                let tagName = if isHeader then "th" else "td"
                let cellContent = strInlineElements line
                let alignAttr =
                    match align with
                    | Centre -> ("align", "center")
                    | Right -> ("align", "right")
                    | Left -> ("align", "left")
                    | NoAlign -> ("","")
                pStr + attachHTMLTag (tagName, [alignAttr], true) cellContent
        List.fold cellsFolder "" row
    let foldRows rows =
        let rowsFolder pStr row =
            foldCells row
            |> attachSimpleTag "tr"
            |> fun s -> pStr + s
        List.fold rowsFolder "" rows
    foldRows headerRows |> attachSimpleTag "thead"
    |> fun s ->
        s + (foldRows bodyRows |> attachSimpleTag "tbody")
    |> attachSimpleTag "table"


/// recursively process a list
let rec strList list =
    let strListItem pStr li =
        pStr + (
            match li with
            | StringItem(line) -> strInlineElements line
            | NestedList(list) -> strList list
            |> attachSimpleTag "li")
    match list with
    | {ListType=lt; ListItem=liS} ->
        let listTag = if lt=UL then "ul" else "ol"
        List.fold strListItem "" liS
        |> attachSimpleTag listTag

/// process header
let strHeader header =
    match header with
    | {HeaderName=line;Level=lv} ->
        let tagName = "h" + string(lv)
        line
        |> strInlineElements
        |> attachSimpleTag tagName

/// process inline footnotes
let strInlineFootnote fnId =
    let idStr = match fnId with | FtID i -> string i | RefID s -> string s
    idStr
    |> attachHTMLTag ("a", ["href", "#footnote-"+idStr], true)
    |> attachSimpleTag "sup"


let (|MatchHeaderAndSubHeader|_|) hds =
    match hds with
    | fstHd::sndHd::_ ->
        let {Level=fstLv} = fstHd
        let {Level=sndLv} =sndHd
        if sndLv > fstLv then (List.head hds, List.tail hds) |> Some else None
    | _ -> None

/// process table of contents
(*
let strToC toc =
    let displaySingleHeader headerName =
        headerName |> strInlineElements // can insert unique id for linking
    let rec tocMany currentLv maxLv headers pStr =
        match headers with
        | {HeaderName=headerName; Level=headerLv}::rHds ->
            match headerLv with
            | hlv when hlv = currentLv ->
                match headers with
                | MatchHeaderAndSubHeader (fstHd, rHds) ->
                    let (cStr, rHds) =
                        match fstHd |> strInlineElements |> tocMany currentLv+1 maxLv rHds with
                        | Ok (cStr, rHds) -> (cStr, rHds)
                        | Error
                    //pStr + (
                        
                    //    |> attachSimpleTag "li")
                    
                | _ -> pStr + (headerName |> strInlineElements) |> tocMany currentLv maxLv rHds |> Ok
            | hlv when hlv 
*)


/// gather footnotes for end of page display
let gatherFootnotes pObjs =
    let footnotesFilter pObj =
        match pObj with
        | Footnote _ -> true
        | _ -> false
    List.filter footnotesFilter pObjs


/// process HTML body part
let strBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> strParagraph p
        | Quote q -> strInlineElements q |> attachSimpleTag "q"
        | CodeBlock (c, l) -> attachHTMLTag ("code", [("language", mapLang l)], true) c
        | Table rows -> strTable rows
        | List l -> strList l
        | Header h -> strHeader h
        | Footnote (fnId, _) -> strInlineFootnote fnId
        //| ContentTable toc -> strToC toc
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs

