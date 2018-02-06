module Types

type Token =
    | WORD of string | MISCCHAR of string | NUMBER of string | SPACE | TAB
    | DOT | POUND | PIPE | COLON | EQUAL | MINUS | PLUS | ASTERISK | DASTERISK
    | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK

type Element =
    | FrmtedWordLst
    | Link

type Frmt = {Bold: bool;
            Italic: bool;
            Strike: bool;
            InlineCode: bool}

type Language = ENGLISH

type WordLst = string list

type Caption = WordLst

type URL = WORD

type HyperText = WordLst

type ListType = UL | OL

type Line = Element list

type Header = {HeaderName: WordLst ; Level: int}

type TOC = {MaxDepth: int; HeaderLst: Header list}

type ParedObj =
    | Code of string * Language
    | FrmtedWordLst of WordLst * Frmt
    | Picture of Caption * URL
    | Link of HyperText * URL
    | Header
    | List of ListType * Line * Depth: int
    | Paragraph of Line list
    | Quote of Line
    | Table of cell: Element list list
    | METADATA
    | Footnote of ID: int * Line
    | TOC
