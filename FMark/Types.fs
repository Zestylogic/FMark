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
    | HASH | PIPE | EQUAL | MINUS | PLUS | ASTERISK | DOT
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | SLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION | ENDLINE | COLON | CARET | PERCENT
    | COMMA

type TFrmtedString = | Strong of TFrmtedString | Emphasis of TFrmtedString | Literal of string
type InlineElement =
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
    | Contents of Tokens: Token list * Header: bool * Align:Alignment

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

type CellReference = 
    RowCol of Row:uint32*Col:uint32

type Operand =
    | CellRef of CellReference
    | Integer of int
    | Float of float

type Expr =
    | BinExp of (float->float->float)*Expr*Expr
    | Op of Operand
    | RangeFunction of string*CellReference*CellReference
    | CommaFunction of string*(Expr list)
