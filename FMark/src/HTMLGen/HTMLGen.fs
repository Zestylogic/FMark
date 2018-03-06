module HTMLGen

open Types
open HTMLGenHelpers



/// convert TFrmtedString to string, with HTML tags where necessary
let rec strFStr fStr =
    match fStr with
    | Literal str -> str
    | Code str -> attachHTMLTag ("code", [], INLINE, true) str
    | Strong a -> strInlineElements a |> attachHTMLTag ("strong", [], INLINE, true)
    | Emphasis e -> strInlineElements e |> attachHTMLTag ("em", [], INLINE, true)

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
    |> attachHTMLTag ("p", [], gIndent, true)

let strBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> strParagraph p
        | Quote q -> strInlineElements q |> attachHTMLTag ("q", [], gIndent, true)
        | CodeBlock (c, l) -> attachHTMLTag ("code", toAttrs [("language", mapLang l)], gIndent, true) c
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs