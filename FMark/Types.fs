module Types

type Token =
    | WORD of string | MISCCHAR of string | NUMBER of string | SPACE | TAB
    | DOT | POUND | PIPE | COLON | EQUAL | MINUS | PLUS | ASTERISK | DASTERISK
    | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION

type WordLst = string list

type Format = {Bold: bool;
               Italic: bool;
               Strike: bool;
               InlineCode: bool}

type URL = string

type HyperText = WordLst

type Element =
    | FrmtedWordLst of WordLst * Format
    | Link of HyperText * URL
    | Picture of WordLst * URL

type Language = ENGLISH

type ListType = UL | OL

type Line = Element list

type THeader = {HeaderName: WordLst ; Level: int}

type Ttoc = {MaxDepth: int; HeaderLst: THeader list}

type ParedObj =
    | Code of string * Language
    | Header of THeader
    | List of ListType * Line * Depth: int
    | Paragraph of Line list
    | Quote of Line
    | Table of cell: Line list
    | METADATA
    | Footnote of ID: int * Line
