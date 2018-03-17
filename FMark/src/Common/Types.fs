module Types

type Language =
    | Python
    | FSharp
    | CPP
    | C
    | Empty

type Token =
    | CODEBLOCK of string * Language
    | LITERAL of string
    | WHITESPACE of size: int
    | NUMBER of string
    | HASH | PIPE | EQUAL | MINUS | PLUS | ASTERISK | DOT | COMMA
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | SLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | EXCLAMATION | ENDLINE | COLON | CARET | PERCENT | SEMICOLON
    | HEADER of int | FOOTNOTE of int | CITATION of string

type TFrmtedString =
    | Strong of InlineElement list
    | Emphasis of InlineElement list
    | Line of InlineElement list
    | Literal of string
    | Code of string
and InlineElement =
    | FrmtedString of TFrmtedString
    | Link of HyperText: TFrmtedString * URL: string
    | Picture of Alt: string * URL: string
    | Reference of HyperText: string * ID: string
type TLine = InlineElement list

type THeader = {HeaderName: TLine; Level: int}

type Ttoc = {HeaderLst: THeader list}

type TListType = | UL | OL
type TList = {ListType: TListType; ListItem: TListItem list; Depth: int}
and TListItem = NestedList of TList | StringItem of TLine

type Alignment = Centre | Right | Left | NoAlign

type Cell =
    | Contents of Token list * Header: bool * Align:Alignment

type Row =
    | Cells of Cell list * Header:bool

type PCell =
    | CellLine of TLine * Header: bool * Align:Alignment

type PRow =
    | PCells of PCell list * Header:bool

type RefFrmt = IEEE | Harvard | Chicago
type RefType = Book | Website
type Ref = {Cat: RefType option; Author: Token list option; Title: Token list option;
            Year: int option; AccessDate: (int * int * int) option
            URL: string option}

type ParsedObj =
    | CodeBlock of string * Language
    | Header of THeader * string
    | ContentTable of Ttoc
    | List of TList
    | Paragraph of TLine list
    | Quote of TLine
    | Table of PRow list
    | PreTable of Content: Token list list
    | Footnote of int * TLine
    | Citation of string * TFrmtedString * TLine //ID,Inline,End of doc
    
type Cell with 
    member c.GetToks = match c with 
                           | Contents(toks,_,_) -> toks
    member c.ReplaceTokens t = match c with 
                               | Contents(_,head,align) -> Contents(t,head,align)
    member c.GetHead = match c with 
                       | Contents(_,head,_) -> head
    member c.GetParams = match c with 
                         | Contents(toks,head,align) -> toks,head,align

type OutFormat = HTML | Markdown