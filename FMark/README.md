# FMark - Citations and Table of Contents

## Submission Write-up

### How will (or might) your code contribute to the group deliverable? What have you done to ensure interfaces etc will be compatible? What are your interfaces (enough information for your module to be used by someone else not in your team. Assessment here is based on best efforts while allowing independent development, not whether the code is actually useful. Typical length 1/4 page.

* My part includes parsers for headers and footers. `Token list -> ParsedObj list`.
  * These two will be run after the tokeniser but before the main parser to pick out the headers and footers in the document.
  * These two should be collected and then will be used to build a table of contents and a citation list.
 
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
 
|Test     |Expected output|Rationale           |
|---      |------         |--------            |
|# H1     |H1, 1          |Basic header        |
|### h3   |h3, 3          |Header depth        |
|#H1      | -             |Not a header without space after hash|
|# H1 # H2|H1 # H2, 1     |Hash in header      |
|text <br># H1<br> text|H1, 1|text before and after header|

* Footer tests
 
|Test     |Expected output|Rationale           |
|---      |------         |--------            |
|\[^1]    |1              |Basic footer        |
|\[^1]: text|1, text     |Basic footer text   |
|\[^2]: line0<br>&nbsp;&nbsp;&nbsp;&nbsp;line1<br>line2|2, line0<br>line1|Multiple line footer text|


### Anything notable learnt during testing.
