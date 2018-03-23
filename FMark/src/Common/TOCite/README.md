# Preparser

`preParse: Token list -> THeader list * ParsedObj list * Token list`

Parses the headers and footers before the main parser to allow easy
relative linking to table of contents and end of page citations,
respectively.

Takes input from lexer, and extracts the [running marginals](https://english.stackexchange.com/questions/24060/what-word-defines-a-category-suited-for-both-header-and-footer)
from the token list. The headers are parsed into `THeader`s and an
uniquely ID'ed token will be inserted back into the token list to
indicate where they were extracted from.
The footers similarly parsed into `ParsedObj`s and have an ID'ed
token inserted into the token list.
Theses two lists and the token list without the running marginals
are then tupled together and returned.

## Token list
Headers and footers replaced by
* `HEADER 0` -> headers with their order of appearance
* `FOOTNOTE 0` -> simple footer with their given ID
* `CITATION "John"` -> references with their given ID
These are inserted back to provide positional information to the main
parser, allowing relative linking and other nice things.

## THeader list
List of all headers found in the document, arranged by order of
their appearance. This is used to render headers with links in the
main parser, and also table of contents.

### Table of Contents
Build with `%%TOC`, with optional argument `depth` and `exclude`

For example,
```
Paragraph 1 Oh look a butterfly!

%%TOC depth=3

Paragraph 2 Oh noes it flew away :(
```
This will build a table of content between paragraph 1 and 2, and only
contain headers of level 1 2, and 3.

```
%%TOC depth=3, excludes=[Appendix;Acknowledgement]
```
This table of content will exclude headers with the specified name.


## ParsedObj list
Both simple footers and references are given as `Footnote (ID * TLine)`
and `Citation (ID * TFrmtedString * TLine)` in the `ParsedObj list`.
`TFrmtedString` in `Citation` is used to store how the inline part
should be rendered. This allows all style information to be hidden
from the main parser.

The list is sorted, with footnotes in order of their numerical IDs first,
References in order of apperance after. Thus the order each explanatory
text comes in the fmark file does not matter.

### Simple Footers
Simple footers have numerical IDs.
```
this is inline[^1], and so on.

[^1], this is the text to explain such line.
      this line as well.
But not this line.
```
The body will show up with a superscripted link:
> this is inline<sup>1</sup> , and so on.
>
> But not this line.

The footer texts will be collected at the end of the document.
> 1: this is the text to explain such line. this line as well.

### References
Styled references have alphabetic IDs.

Supported rendering styles:

||Chicago|Harvard|IEEE|
|---|---|---|---|
|Book|Yes|Yes|-|
|Website|Yes|Yes|-|

Supported data fields

|Field|Explanation|
|---|---|
|type|`'Book'` or `'Website'`|
|author|Author with surname at the end|
|title|Title|
|year|The year it is written|
|url|Address for website|
|access|Date of access for websites, in `yyyy-mm-dd` format|

Pick a style with `%%RefStyle`, or it will default to Harvard.
```
%%RefStyle = Harvard
```

Then follow `field1=data1, field2=data2, ...` to use references. 
Spaces around equal signs is allowed.
```
This is a citation[^Mark]. This is another[^FMark] one.

[^Mark], type = Book, author = Mark Smith, title = Not a real book, year = 2018
[^FMark], type=Website, author=FMark Smith, title=Not a real website, year=2017 url=www.example.com/website access=2018-3-4
```

With Harvard, it will look like this:
> This is a citation(Smith, 2018). This is another(Smith, 2017) one.

At the end of the document:
> Smith, M. (2018) *Not a real book*.
> 
> Smith, F. (2017) *Not a real website*. Available from: www.example.com/website [Accessed 4th March 2018].

if Chicago style is chosen:

> This is a citation(Smith 2018). This is another(Smith 2017) one.

At the end of the document:
> Mark Smith. 2018. *Not a real book*.
> 
> FMark Smith. 2017. "Not a real website." Accessed March 3, 2018. https://www.example.com/website

---
# ALL INFORMATION AFTER THIS MAYBE OUTDATED
## Submission Write-up

### How will (or might) your code contribute to the group deliverable? What have you done to ensure interfaces etc will be compatible? What are your interfaces (enough information for your module to be used by someone else not in your team. Assessment here is based on best efforts while allowing independent development, not whether the code is actually useful. Typical length 1/4 page.

* My part includes parsers for headers and footers. `Token list -> ParsedObj list`.
  * These two will be run after the tokeniser but before the main parser to pick out the headers and footers in the document.
  * These two should be collected and then will be used to build a table of contents and a citation list.
  * Unique identifiers will be inserted to the token list after pulling out the headers and footers. These will be useful for relative linking in the final HTML document.

```
Overall Flowchart:

            ┌───────────┐                      ┌──────────────┐
Source ───> │ Tokeniser │ ───> Token list ───> │ First Parser │ ───> Token list with identifiers ┐
            └───────────┘           │          └──────────────┘                                  │
                                    │                 │                                          │
                                    │                 └────────────> Header+Footer list ────>────┤
                                    │                                                            │
                                    │          ┌──────────────┐                                  │
                                    └────────> │ Table Parser │────────── PreTable ─────────>────│
                                               └──────────────┘                                  │
                                                                                                 │
                                   ┌─────────┐                            ┌─────────────┐        │
             Final Document  <──── │ HTMLGen │ <──── ParsedObj list <──── │ Main Parser │ <──────┘
                                   └─────────┘                            └─────────────┘
```
* First Parser cooresponds to my code. The other parts are simplified for easy understanding of where this parser fits in the whole program.
 
* To ensure compatible interface, `Types.fs` created as a group, which defines `Token` and `ParsedObj`.
  * This lets me know what to expect as inputs (`Token list`), and what to give as outputs (`ParsedObj`).
  * I just had to make sure my code follow these two type definitions, and in case when it cannot, we had discussions on GitHub to see if `Types.fs` can be modified to fit someone's requirements.

### What is the specification of your code? Detail differences from VisUAL (if doing standard project), and reasons for them. Detail any areas where spec was initially unclear and has been clarified. Typical length 1/2 page + Tables.
_Your markdown file can refer to comments in code, or the code itself, for details of normal functionality. Your markdown file should contain a precise description of how much functionality has been implemented, and how much tested (tables of features are good for this). A precise specification document would be very long: your document should only detail issues not obvious from the initial spec that needed to be resolved. An example of this for the default project would be where upper/lower case is significant, and where not._

* Headers are indicated with any number of `#` on a new line, followed by more than one `WHITESPACE`.
* Footers are indicated by `[^1]`, and its cooresponding text will have `[^1]:` before it.
  * Footer text is parsed as regular text, a new line with 4 `WHITESPACE` can be used to write the text in multiple lines.
  * This text is tupled with its `ID :int`.
  
`Types.fs`
* The shared definition for interface.
  * Under `type Token`,
    * `HEADER of int` and `FOOTER of int` are unique identifiers to be inserted into the token list after the first parsing.
  * Under `type ParsedObj`,
    * `THeader` is the returned headers, consist of the header text of type `TLine`, and its level of type `int`.
    * `Footnote` if the returned footnote, with its ID of type `int`, and the footer text of type `TLine`.
    
`Parser.fs`
* The first parser. Consist of three main parts.
  * Text Parsers, this is primitive, and to be merged with others' work once group stage starts:
    * `parseText (Token list -> Token list * InlineElement list)`, parse all `Literal`s until something different, then return the unparsed portion of the `Token list`, tupled with the list of `Literal`s.
    * `parseLine (TLine -> Token list -> TLine * Token list)`, handles `Emphasis` and calls parseText to parse header and footer texts.
    * `parseLine' (Token list -> InlineElement list)`, _call this when the rest of the token list is not needed._
  * Header Parser.
    * `tocParse (Token list -> int -> int -> THeader list * Token list)`, goes through the token list from the tokeniser, replace the headers with identifiers `HEADER of int`, and generate a list of these headers as `THeader`s for building the table of contents later. depth and index are needed for recusively tracking the level of header and the position of the header in the whole document.
    * `tocGen' (Token list -> int -> THeader list * Token list`, takes in the maximum depth of the table of content, and calls tocParse to generate the desired lists. _Call this function when header parsing is needed._
    * `tocGen (Token list -> int -> Ttoc)`, used when a ParsedObj is required as output.
  * Footer Parser, two versions provided, distinguished by the `'` after the function names. The ones with `'` is more powerful.
    * `citeParse' (Token list -> (int*TLine) list * Token list)`, goes through the token list from tokeniser, replacing in text footers with the identifier `FOOTER of int`, and builds a list of the footer texts by calling `citeParseIn'`.
    * `citeParseIn' (InlineElement list -> Token list -> TLine * Token list)`, parses footer texts by calling `parseLine`, and feed the rest of the unparsed tokens back to `citeParse'`.
    * `citeGen' (Token list -> ParsedObj list * Token list)`, builds the result from `citeParse'`.

### A short description of your Test Plan. Typical length 1/2 page + tables. What you have tested will be clear from the feature specification which includes test status. How you have tested it must be itemised. Again a table is good (could be the same one as used for specification). Add any rationale for your test plan.

`Parsertest.fs`
* Header tests
  * Each test in `testDataHd` is a tuple of three items, name, input, and output.
  * Input is a `Token list`, output is a tuple of a `THeader list` and a `Token list`.
  * The `THeader list` is the list of headers found, and the `Token list` is the original list with headers replaced by identifiers.
  
|Test|Rationale|Passed?|
|----|---------|-------|
|Basic Test|Basic functionality|Yes|
|Depth Test|Able to count the number of hashes to get the level for header|Yes|
|Need space between hash and header text|A new line starting with hash can still be normal text if there is no space after the chain of hashes|Yes|
|More fake hashes|The parser should be able to rebuild the correct number of hashes after realising they are not of a header|Yes|
|Hash character support within header text|A hash can appear in the header text and this must be taken as a literal and not the start of another header|Yes|
|Picking out header in document|The parser should be able to pick out headers between texts|Yes|
|Header numbering|A document with more than one header need all headers with different identifiers|Yes|
|Emphasis in header text|`parseLine` in header parsing should be able to handle formats, more formats will be added once merged in group phase|Yes|
|Multiple headers with emphasis|A general test with multiple test points|Yes|

* Footer tests
  * Stored similar to Header tests in `testDataFt`.
  
|Test|Rationale|Passed?|
|----|---------|-------|
|Basic footer test|Basic footer text|Yes|
|Basic footer within text|Basic footer in text, testing the identifier replacement functionality|Yes|
|Fake footer|Not a real footer|Yes|
|Footer text continuation over multiple lines|Footer texts can be written in multiple lines in source, as long as the next line is started with a whitespace of more than 4|Yes|
|Footer texts sorting|Footer texts can be written in any order, and they will be sorted before passed forward|Yes|
|Emphasis in footer|Similar to Emphasis in header|Yes|

### Anything notable learnt during testing.

* Finding items to test can be difficult, but each new test greatly improves the confidence I had on my code.
* Having a systematic testing system is useful to ensure, if changing the code to fulfill one test accidently break something else, it can be quickly spotted.
