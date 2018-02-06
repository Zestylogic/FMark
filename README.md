# FMark
FSharp markdown.

## Features

- Generating html
- Lexer for markdown
- Parser for markdown

### MarkDown

- Headers
- Paragraphs
- Lists
- Links
- BlockQuoting
- Picture embedding
- Tables
- Code box
- Text attributes
- Frontmatter / Metadata

### Extra

- Math equation rendering (Mathjax)
- Citation
- Table of contents
- Spreadsheet functionality

### Desirable Result
- Extensible Code
    - Add names to features, so users can render them differently
      such as editing the type of citation used and how to output them.
- User defined delimiters / patterns -> Preprocessor

### Maybe's

- References
- Realtime rendering
- Diagrams (Graphviz) -> Proof that it is extensible
- autoformatting

## Splitting

Global Types

- Person1 - Lexer `(lex : string -> Token list)`, PreProcessor `(preProcess : string -> string)`
- Person2 - Formatting / print HTML: Header, Paragraph, Lists, Table -> 
Simple parser `(printHtml : ParsedObj list -> string)`, `(printToFile : string -> ())`
- Person3 - Tables: Spreadsheet, DSL `(updateTable : Table -> Table)`
- Person4 - Citations (extensible), Table of contents -> Simple Parser `(parse : Token list -> ParseObj list)`

## Overview

### Pre Processor

Goes through the source of the markdown file and processes #define like directives.

```fsharp
type Macro = { Name : string; Body : string }

val preProcess = string -> string

val readMacros = string -> Macro list

val replaceMacro = string -> Macro list -> string
```

### Lexer

Lexes the source into tokens.

```fsharp
type Token = Word of string | TripleTick | Pipe ...

val lex = string -> Token list
```

### Parser

Parses the Token list

```fsharp
type InlineObj = Word | FormattedWord
type Line = InlineObj list
type PInside = Line
type ParsedObj = Paragraph of PInside list | CodeBlock | MDList...

type Table = Line list list

val parse = Token list -> ParseObj list

// outputs table with updated cells, which is determined by the DSL.
val updateTable = Table -> Table
```

### AST

Outputs html

```fsharp
val printHtml = ParsedObj list -> string

val printToFile = string -> ()
```
