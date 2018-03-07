```fsharp
// HTMLGen helper functions
// #################

// convert FrmtedString to string, with HTML tags where necessary
val strFStr = (fStr: FStr) -> string


type TagStyle = INLINE | NONINLINE of indentStr: string

// atach HTML tag to a given string, both start and end tag
// inLine style does not insert newline after start tag and before end tag
// non-inLine style will have indent set to desired string
val attachHTMLTag = (tagName: string, attributes: string list, style: TagStyle) -> content: string ->  -> string



```
