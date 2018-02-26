# Project Contribution
The Parser takes `Token list` from the Lexer and outputs `ParsedObj list`.
`ParsedObj list` will then be used to generate HTML.

However, the Parser produced in individual-phased work is not a complete Markdown parser.

In order to split work more evenly, the group has agreed that the majority of text will be parsed in this Parser,
with the rest to be done by other team members.

Here is a table of supported `ParsedObj`:
|           |
|-----------|
| CodeBlock |
| Header    |
| Paragraph |
| Quote     |
| PreTable* |

Note:
* `PreTable` is meant to be a _container_ for table `Token`s. It will then be further parsed by another function
written by the other team member to produce `Table`.

* `Footnote` will be produced by the other function and be inserted to `ParsedObj list` during group work.
This will be done before generating HTML.

# Interface Compatibility
The Parser assumes `WHITESPACE`s will be grouped together,
e.g. `[WHITESPACE 1; WHITESPACE 2]` is invalid
and the acceptable form is `[WHITESPACE 3]`.

## Function specs
| Functions           | Spec (all functions return unparsed Tokens unless otherwise said)            |
|---------------------|------------------------------------------------------------------------------|
| parseLiteral        | parse terminates on any unrecognised Token                                   |
| parseInLineElements | parse inline text, including links and pictures, terminate on 2>= `ENDLINE`s |
| parseParagraph      | parse a paragraph which counts for contents in  `<p>`                        |
| parse               | top-level Parser, which the user should use                                  |

## Behaviour
### Unparsed Tokens will result in an `Error` message containing those Tokens.

### Unmatched `UNDERSCORE` and `ASTERISK`, as well as the subsequent inline content, will be turned into `Literal`,until new Inline format.

e.g.
```
_I _love_
```
turned into
```fsharp
[FrmtedString(Literal "_I ");; FrmtedString(Emphasis[FrmtedString(Literal "love")])]
```


# Test Plan
It is difficult to do property tests on a Markdown parser without the help of human interaction.

Every sub-function of the Parser has been unit tested with best effort to make development agile.
Sub-functions have been tested as they are written. Each time the code changes, the test bench will be run to ensure code correctness.
What's more, it is easier to find point of failure from the `Expecto` test result, by examining the list of failed tests.

## Test cases
