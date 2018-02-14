module Types

type Format = {Bold: bool;
               Italic: bool;
               Strike: bool;
               InlineCode: bool}

type Language =
    | Python
    | FSharp
    | CPP
    | C

type Token =
    | CODEBLOCK of Code: string * Language
    | FORMATTEDTEXT of string * Format
    | LINK of HyperText: string * Link: string
    | HEADING of Level: int
    | EQUALLINE of int
    | MINUSLINE of int
    | IMAGE of HyperText: string * Link: string * Hover: string option
    | EMPTYLINE
    | SPACE | TAB | DOT | POUND | PIPE | COLON | EQUAL | MINUS | PLUS | ASTERISK
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION | END

type WordLst = string list

type URL = string

type HyperText = WordLst

type Element =
    | FrmtedWordLst of WordLst * Format
    | Link of HyperText * URL
    | Picture of WordLst * URL

type ListType = UL | OL

type Line = Element list

type THeader = {HeaderName: WordLst; Level: int}

type Ttoc = {MaxDepth: int; HeaderLst: THeader list}

type ParedObj =
    | CodeBlock of string
    | Header of THeader
    | List of ListType * Line * Depth: int
    | Paragraph of Line list
    | Quote of Line
    | Table of Content: Line list * Height: int * Width: int
    | Footnote of ID: int * Line
