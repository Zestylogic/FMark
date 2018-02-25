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
| List      |
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

## Behaviour
### Unmatched `UNDERSCORE` and `ASTERISK`, as well as the subsequent inline content, will be turned into `Literal`,until new Inline format.

e.g.
```Markdown
_I _love_
```
turned into
```fsharp
[FrmtedString(Literal "_I ");; FrmtedString(Emphasis[FrmtedString(Literal "love")])]
```

### 

