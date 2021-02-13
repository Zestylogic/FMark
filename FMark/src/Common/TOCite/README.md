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

# Tests

The following may be out of date. Refer to the main documentation.

## Header tests
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

## Footer tests
  
|Test|Rationale|Passed?|
|----|---------|-------|
|Basic footer test|Basic footer text|Yes|
|Basic footer within text|Basic footer in text, testing the identifier replacement functionality|Yes|
|Fake footer|Not a real footer|Yes|
|Footer text continuation over multiple lines|Footer texts can be written in multiple lines in source, as long as the next line is started with a whitespace of more than 4|Yes|
|Footer texts sorting|Footer texts can be written in any order, and they will be sorted before passed forward|Yes|
|Emphasis in footer|Similar to Emphasis in header|Yes|
