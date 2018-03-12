module HTMLGenHelpers

open Types

type TagStyle = INLINE | NonInline of indentStr: string


/// concat attributeName and value
/// with quotes
let toAttr attributeName value =
    attributeName + "=\"" + value + "\""

/// convert (attributeName, value) list to string list
/// ready for inserting into HTML tag
let toAttrs attrs =
    let mapper attr =
        match attr with | (attrName, value) -> toAttr attrName value
    List.map mapper attrs

/// atach HTML tag to a given string, both start and end tag
/// inline style does not insert newline after start tag and before end tag
/// non-inline style will have indent set to desired string
let attachHTMLTag (tagName, attributes: list<string * string>, needCloseTag) (content: string) =
    let attrStr =
        match List.isEmpty attributes with
        | true -> ""
        | false ->
            let attrFolder pStr attrNameValue =
                pStr +
                match attrNameValue with
                | ("","") -> ""
                | (attrName, value) ->
                    " " +       // space before attribute
                    if value = "" then attrName
                    else attrName + "=\"" + value + "\""
            List.fold attrFolder "" attributes
    "<" + tagName + attrStr + ">"
    + content
    + if needCloseTag then "</" + tagName + ">" else ""

/// attach (tagName,noAttr,closeTag)
let attachSimpleTag tagName = attachHTMLTag (tagName,[],true)

let attachMetaTag tagName attrs = attachHTMLTag (tagName,attrs,false) ""
