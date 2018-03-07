# FMark
FSharp markdown.

## Test Status

[![Build Status](https://travis-ci.org/ymherklotz/FMark.svg?branch=master)](https://travis-ci.org/ymherklotz/FMark)

## Modules

```
Overall Flowchart:

            ┌─────────────────────┐                      ┌───────────────┐
Source ───> │ Lex and Preprocessor│ ───> Token list ───> │ TOCite Parse  │ ──> Token list with identifiers ┐
            └─────────────────────┘           │          └───────────────┘                                 │
                                    │         │                                                            │
                                    │         └──────────────────────────────> Header+Footer list ────>────┤
                                    │                                                                      │
                                    │          ┌──────────────┐                                            │
                                    └────────> │ Markalc Parse│────────── Table ────────────>──────────────│
                                               └──────────────┘                                            │
                                                                                                           │
                                   ┌─────────┐                            ┌─────────────┐                  │
             Final Document  <──── │ HTMLGen │ <──── ParsedObj list <──── │ Main Parser │ <────────────────┘
                                   └─────────┘                            └─────────────┘
```

1. [Lexer and Preprocessor](FMark/src/Common/Lexer/README.md)
2. [TOCite: Table of Contents and Citations](FMark/src/Common/TOCite/README.md)
3. [Markalc: Spreadsheet functionality](FMark/src/Common/Markalc/README.md)
4. [Main Parser](FMark/src/Common/Parser/README.md)

## Specification

A reference specification for the simple markdown that we are going to follow can be found
at [CommonMark](http://spec.commonmark.org/0.27/).

A reference implementation of the simple markdown can be found [here](http://spec.commonmark.org/dingus/).

## Markdown extensions (not included in standard Markdown)

- Math equation rendering (Mathjax)
- Citation
- Table of contents
- Spreadsheet functionality
- Macros

### Potential extensions

- References ()
- Realtime rendering
- Diagrams (Graphviz)
- Autoformatting
- Syntax/Error highlighting

