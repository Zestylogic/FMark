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
- User defined delimiters / patterns -> Ask Tom

### Maybe's

- References
- Realtime rendering
- Diagrams (Graphviz) -> Proof that it is extensible
- autoformatting

## Splitting

Global Types

Person1 - Lexer

Person2 - Formatting / print HTML: Header, Paragraph, Lists, Table -> Simple parser

Person3 - Tables: Spreadsheet, DSL

Person4 - Citations (extensible), Table of contents -> Simple Parser