module HTMLGen

open Types
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
        | Link (ht, url) -> strFStr ht |> attachHTMLTag ("a", toAttrs [("href", url)], INLINE, true)
        | Picture (alt, url) ->
            let attrs =  toAttrs [("src", url); ("alt", alt)]
            attachHTMLTag ("img", attrs, INLINE, false) ""
    List.fold convertHtml "" eles

/// process Markdown paragraph
let strParagraph lines =
    let folder pLinesStr line =
        pLinesStr + strInlineElements line + NLS
    List.fold folder "" lines
    |> deletetrailingNewLines
    |> attachHTMLTag ("p", [], GIndent, true)


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
                pStr + attachHTMLTag (tagName, toAttrs [alignAttr], INLINE, true) cellContent + NLS
        List.fold cellsFolder "" row
    let foldRows rows =
        let rowsFolder pStr row =
            foldCells row
            |> attachHTMLTag ("tr", [], GIndent, true)
            |> fun s -> pStr + s + NLS
        List.fold rowsFolder "" rows
    foldRows headerRows |> attachNonInlineTag "thead"
    |> fun s ->
    s + foldRows bodyRows |> attachNonInlineTag "tbody"




/// process HTML body part

let strBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> strParagraph p
        | Quote q -> strInlineElements q |> attachHTMLTag ("q", [], GIndent, true)
        | CodeBlock (c, l) -> attachHTMLTag ("code", toAttrs [("language", mapLang l)], GIndent, true) c
        // | Table(t) -> strTable t
        | Table rows -> strTable rows |> attachHTMLTag ("table", [], GIndent, true)
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs
