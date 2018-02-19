module Types

type Language =
    | Python
    | FSharp
    | CPP
    | C

type Token =
    | CODEBLOCK of string * Language
    | LITERAL of string
    | EMPHASIS of string
    | STRONG of string
    | INLINECODE of string
    | WHITESPACE of size: int
    | NUMBER of int
    | EMPTYLINE
    | HASH | PIPE | EQUAL | MINUS | PLUS | ASTERISK
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | SLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION | ENDLINE | COLON

type WordLst = string list

type URL = string

type HyperText = WordLst

type Element =
    | FrmtedWordLst of WordLst
    | Link of HyperText * URL
    | Picture of WordLst * URL

type ListType = UL | OL

type Line = Element list

type THeader = {HeaderName: WordLst; Level: int}

type Ttoc = {MaxDepth: int; HeaderLst: THeader list}

type Alignment = Centre | Right | Left

type Cell =
    | Tokens of Token list * Header: bool * Align:Alignment

type Row =
    | Cells of Cell list

type ParsedObj =
    | CodeBlock of string * Language
    | Header of THeader
    | List of ListType * Line * Depth: int
    | Paragraph of Line list
    | Quote of Line
    | PreTable of Content: Token list list * Height: int * Width: int
    | Footnote of ID: int * Line
    | Table of Row list * Height: int * Width: int