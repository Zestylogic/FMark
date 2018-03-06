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
            let attrs =  toAttrs [("src", url); ("alt=", alt)]
            attachHTMLTag ("img", attrs, INLINE, false) ""
    List.fold convertHtml "" eles

