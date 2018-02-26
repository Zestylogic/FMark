# FMark - Citations and Table of Contents

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
  
|Test|Rationale|
|----|---------|
|Basic Test|Basic functionality|
|Depth Test|Able to count the number of hashes to get the level for header|
|Need space between hash and header text|A new line starting with hash can still be normal text if there is no space after the chain of hashes|
|More fake hashes|The parser should be able to rebuild the correct number of hashes after realising they are not of a header|
|Hash character support within header text|A hash can appear in the header text and this must be taken as a literal and not the start of another header|
|Picking out header in document|The parser should be able to pick out headers between texts|
|Header numbering|A document with more than one header need all headers with different identifiers|
|Emphasis in header text|`parseLine` in header parsing should be able to handle formats, more formats will be added once merged in group phase|
|Multiple headers with emphasis|A general test with multiple test points|

* Footer tests
  * Stored similar to Header tests in `testDataFt`.
  
|Test|Rationale|
|----|---------|
|Basic footer test|Basic footer text|
|Basic footer within text|Basic footer in text, testing the identifier replacement functionality|
|Fake footer|Not a real footer|
|Footer text continuation over multiple lines|Footer texts can be written in multiple lines in source, as long as the next line is started with a whitespace of more than 4|
|Footer texts sorting|Footer texts can be written in any order, and they will be sorted before passed forward|
|Emphasis in footer|Similar to Emphasis in header|

### Anything notable learnt during testing.

* Finding items to test can be difficult, but each new test greatly improves the confidence I had on my code.
* Having a systematic testing system is useful to ensure, if changing the code to fulfill one test accidently break something else, it can be quickly spotted.
