module HTMLGen

open Types
open HTMLGenHelpers

let simpleTag tagName = attachHTMLTag (tagName,[],INLINE,true)
/// convert TFrmtedString to string, with HTML tags where necessary
let rec strFStr fStr =
    match fStr with
    | Literal str -> str
    | Code str -> str |> simpleTag "code"
    | Strong a -> strInlineElements a |> simpleTag "strong"
    | Emphasis e -> strInlineElements e |> simpleTag "em"

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

let strParagraph lines =
    let folder pLinesStr line =
        pLinesStr + strInlineElements line + NLS
    List.fold folder "" lines
    |> deletetrailingNewLines
    |> attachHTMLTag ("p", [], GIndent, true)

let strTable (tab:PRow list) =
    let getAlignment = function
    | Centre -> "align=\"center\""
    | Right -> "align=\"right\""
    | Left -> ""
    let getH = function
        | true -> "th"
        | false -> "td"
    let printCell s = function
        | CellLine(line,h,ali) -> 
          s + 
          (strInlineElements line 
          |> attachHTMLTag ((getH h), [getAlignment ali], INLINE, true))
    let printRow s = function
        | PCells(clst,h) ->
            let rowTxt = (List.fold printCell "" clst) |> simpleTag "tr"
            s + if h then rowTxt |> simpleTag "thead" else rowTxt
    printRow "" (List.head tab)
    + (List.fold printRow "" tab.[1..] |> simpleTag "tbody")
    |> simpleTag "table"

let strBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> strParagraph p
        | Quote q -> strInlineElements q |> attachHTMLTag ("q", [], GIndent, true)
        | CodeBlock (c, l) -> attachHTMLTag ("code", toAttrs [("language", mapLang l)], GIndent, true) c
        | Table(t) -> strTable t
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs