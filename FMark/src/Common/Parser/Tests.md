# Test Plan (OUTDATD)
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