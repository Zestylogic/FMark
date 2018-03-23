# Project Contribution
The Parser takes `Token list` from the Lexer(or Tokenizer) and outputs `ParsedObj list`.
After being manipulated by other top level functions, `ParsedObj list` will then be used to generate HTML.

It follows [CommonMark Spec](http://spec.commonmark.org/0.28/). However, the Parser produced in individual-phased work is not a complete Markdown parser, due to limited time.

In order to split work more evenly, the group has agreed that the majority of text will be parsed in this Parser,
with the rest to be done by other team members.

`parse` will either return result monad with either `ParsedObj list` or a string of Error message. Unparsed Tokens will be in the returned in the Error message.

```fsharp
open Parser

val parse = Token list -> Result<ParsedObj list * string>
```

It will either return result monad with either `ParsedObj list`
or a string of Error message.

Unparsed Tokens will be in the returned in the Error message.

# Interface Compatibility

Input: `Token list` :
```fsharp
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
```

Output: `ParsedObj list` :
```fsharp
type ParsedObj =
    | CodeBlock of string * Language
    | Header of THeader * string // content of header, HTML id for linking
    | ContentTable of Ttoc
    | List of TList
    | Paragraph of TLine list
    | Quote of TLine
    | Table of PRow list
    | PreTable of Content: Token list list
    | Footnote of int * TLine           // inline id, end of doc
    | Citation of string * TFrmtedString * TLine //ID,Inline,End of doc
```

* The Parser assumes `WHITESPACE`s will be grouped together,
e.g. `[WHITESPACE 1; WHITESPACE 2]` is invalid
and the acceptable form is `[WHITESPACE 3]`.

* `CODEBLOCK` has been preprocessed, so that `CODEBLOCK of string * Language` is used directly to produce `CodeBlock` as a `ParsedObj`

* Any character that does not have a mapping in `Token` is a `LITERAL`

* `Footnote` and `Citation` will be produced by the preparser `TOCite`. These will be inserted at the end of the document before passing to HTMLGen.

## Function specs

| Functions           | Spec (all functions return unparsed Tokens unless otherwise said)            |
| ------------------- | ---------------------------------------------------------------------------- |
| parseLiteral        | parse terminates on any unrecognised Token                                   |
| parseInLineElements | parse inline text, including links and pictures, terminate on 2>= `ENDLINE`s |
| parseParagraph      | parse a paragraph which counts for contents in  `<p>`                        |
| parseItemList       | parse supported `ParsedObj`s, turn them into a list                          |
| parse               | top-level Parser, which the user should use                                  |

## Behaviour
* Unparsed Tokens will result in an `Error` message containing those Tokens.

* Unmatched `UNDERSCORE` and `ASTERISK`, as well as the subsequent inline content, will be turned into `Literal`, until new Inline format.

input string representing Tokens
e.g.
```
_I _love_
```
turned into
```fsharp
[FrmtedString(Literal "_I ");; FrmtedString(Emphasis[FrmtedString(Literal "love")])]
```

* A newline starting with an `UNDERSCORE` emphasis should have at least one space before it.

---

# Individual section, OUTDATED


# Project Contribution
The Parser takes `Token list` from the Lexer(or Tokenizer) and outputs `ParsedObj list`.
After being manipulated by other top level functions, `ParsedObj list` will then be used to generate HTML.

It follows [CommonMark Spec](http://spec.commonmark.org/0.28/). However, the Parser produced in individual-phased work is not a complete Markdown parser, due to limited time.

In order to split work more evenly, the group has agreed that the majority of text will be parsed in this Parser,
with the rest to be done by other team members.

Here is a table of supported `ParsedObj`:

| ParsedObj |
| --------- |
| CodeBlock |
| Header    |
| Paragraph |
| Quote     |
| PreTable* |

Note:
* `Link`, `Picture` and `Strong` are not yet supported.

* `PreTable` is meant to be a _container_ for table `Token`s. It will then be further parsed by another function
written by the other team member to produce `Table`.