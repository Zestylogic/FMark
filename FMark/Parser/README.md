# Project Contribution
The Parser takes `Token list` from the Lexer(or Tokenizer) and outputs `ParsedObj list`.
After being manipulated be other top level functions, `ParsedObj list` will then be used to generate HTML.

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


# Interface Compatibility

Input: `Token list` :
```fsharp
type Token =
    | CODEBLOCK of string * Language
    | LITERAL of string
    | WHITESPACE of size: int
    | NUMBER of string
    | HASH | PIPE | EQUAL | MINUS | PLUS | ASTERISK | DOT
    | DASTERISK | TASTERISK | UNDERSCORE | DUNDERSCORE | TUNDERSCORE | TILDE | DTILDE
    | TTILDE | LSBRA | RSBRA | LBRA | RBRA | BSLASH | SLASH | LABRA | RABRA | LCBRA
    | RCBRA | BACKTICK | TBACKTICK | EXCLAMATION | ENDLINE | COLON | CARET | PERCENT
```

Output: `ParsedObj list` :
```fsharp
type ParsedObj =
    | CodeBlock of string * Language
    | Header of THeader
    | List of TList
    | Paragraph of TLine list
    | Quote of TLine
    | Table of Row list * Height: int * Width: int
    | PreTable of Content: Token list list * Height: int * Width: int
    | Footnote of ID: int * TLine
```

* The Parser assumes `WHITESPACE`s will be grouped together,
e.g. `[WHITESPACE 1; WHITESPACE 2]` is invalid
and the acceptable form is `[WHITESPACE 3]`.

* `CODEBLOCK` has been preprocessed, so that `CODEBLOCK of string * Language` is used directly to produce `CodeBlock` as a `ParsedObj`

* Any character that does not have a mapping in `Token` is a `LITERAL`

* `Footnote` will be produced by the other function and be inserted to the end of `ParsedObj list` during group work. This will be done before generating HTML.

## Usage
`parse` will either return result monad with either `ParsedObj list` or a string of Error message. Unparsed Tokens will be in the returned in the Error message.

```fsharp
open Parser

val parse = Token list -> Result<ParsedObj list * string>
```

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

# Test Plan
It is difficult to do property tests on a Markdown parser without the help of human interaction.

Every sub-function of the Parser has been unit tested with best effort to make development agile.
Sub-functions have been tested as they are written. Each time the code changes, the test bench will be run to ensure code correctness.
What's more, it is easier to find point of failure from the `Expecto` test result, by examining the list of failed tests.

Property tests can be done to ParserHelperFunctions, where putting a random integer to e.g. `WHITESPACE ()`. But this
does not make too much difference than unit tests since it's the order of Tokens that matters.

## Test cases
### `parser`
Test top level `parser` functionality

| Test Item                            | Rationale                         |
| ------------------------------------ | --------------------------------- |
| literals with spaces between         |                                   |
| literals with endline                |                                   |
| literals and new empty paragraph     |                                   |
| h2 header                            |                                   |
| fake h2 header                       | no space between hash and literal |
| simple quote                         |                                   |
| paragraph starting with two endlines | leading endlines are ignored      |
| paragraph starting with one endline  | leading endlines are ignored      |
| sample table                         | simplest table                    |
| invalid table                        | invalid, therefore Paragraph      |
| just CODEBLOCK                       |                                   |
| CODEBLOCK and new paragraph          |                                   |

### `parseParagraph`

| Test Item                                                  | Rationale                         |
| ---------------------------------------------------------- | --------------------------------- |
| two simple paragraphs with code                            | inline code                       |
| unmatched emphasis and new paragraph emphasis              | unmatched emphasis -> normal text |
| asterisk and underscore em, 1 newline literal, misc Tokens |                                   |
| nested emphasis                                            |                                   |

### `parseInLineElements`

| Test Item                                 | Rationale                          |
| ----------------------------------------- | ---------------------------------- |
| literal and 2 endlines                    |                                    |
| literal with 2 whitespaces and 1 endline  |                                    |
| two paragraphs                            | produce unparsed Tokens            |
| only inline code                          |                                    |
| inline code and literal                   |                                    |
| literal and underscore emphasis literal   |                                    |
| literal and underscore emphasis, newTLine | the same paragraph, effect of <br> |
| asterisk as emphasis                      |                                    |
| emphasis, asterisk w/o spaces             |                                    |
| unmatched emphasis, underscore            | parsed as normal literal           |
| unmatched emphasis, asterisk              | parsed as normal literal           |
| unmatched, matched emphasis in new line   |                                    |

### `parseLiteral`

| Test Item                                     | Rationale                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| all valid literal and space                   |                                                                                        |
| 4 Spaces                                      | will be squashed to 1 space                                                            |
| 1 endline between literals                    | do not stop parsing, add `\n` to string                                                |
| 2 endlines                                    | stop parsing and return endlines and subsequent Tokens                                 |
| literal and asterisk                          | return literal, asterisk and subsequent Tokens                                         |
| literal and underscore, em end                | return literal, underscore and subsequent Tokens                                       |
| literal and underscore, space before em start | return literal(including space) one Token before underscore <br> and subsequent Tokens |
| underscore, no space before                   | return NULL literal, all Tokens                                                        |

### `countSpaces`

| Test Item                        | Rationale |
| -------------------------------- | --------- |
| 2 whitespace and literal         |           |
| 2 whitespace with DOT in between |           |
| no whitespace                    |           |

### `countNewLines`

| Test Item                   | Rationale |
| --------------------------- | --------- |
| 2 endline and literal       |           |
| endline with dot in between |           |
| no endline                  |           |
