module Types

type Language =
    | Python
    | FSharp
    | CPP
    | C

type Token =
    | CODEBLOCK of string * Language
    | LITERAL of string
    | WHITESPACE of size: int
    | NUMBER of string
    | EMPTYLINE
    | HASH | PIPE | EQUAL | MINUS | PLUS | ASTERISK | DOT
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | SLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION | ENDLINE | COLON | CARET | PERCENT

type TFrmtedString =
<<<<<<< HEAD
    | Strong of TFrmtedString
    | Emphasis of TFrmtedString
    | Monospaced of string
    | Literal of string
type InlineElement =
=======
    | Strong of InlineElement list | Emphasis of InlineElement list
    | Literal of string | Code of string
and InlineElement =
>>>>>>> master
    | FrmtedString of TFrmtedString
    | Link of HyperText: TFrmtedString * URL: string
    | Picture of Alt: string * URL: string
type TLine = InlineElement list

type THeader = {HeaderName: TLine; Level: int}

type Ttoc = {MaxDepth: int; HeaderLst: THeader list}

type TListType = | UL | OL
type TList = {ListType: TListType; ListItem: TListItem list; Depth: int}
and TListItem = NestedList of TList | StringItem of TLine

type Alignment = Centre | Right | Left

type Cell =
    | Tokens of Token list * Header: bool * Align:Alignment

type Row =
    | Cells of Cell list

type ParsedObj =
    | CodeBlock of string * Language
    | Header of THeader
    | List of TList
    | Paragraph of TLine list
    | Quote of TLine
    | Table of Row list * Height: int * Width: int
    | PreTable of Content: Token list list * Height: int * Width: int
    | Footnote of ID: int * TLine
