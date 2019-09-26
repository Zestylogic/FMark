# FMark [![Build Status](https://travis-ci.org/ymherklotz/FMark.svg?branch=master)](https://travis-ci.org/ymherklotz/FMark)
FSharp markdown implementation with additional functionality.

Namely:

- Macros
- Includes
- Spreadsheet functionality
- Table of Contents generation
- Citations and footnotes

See [example.fmark](examples/example.fmark) for usage examples.

# How to use

## FMark Plugin Visual Studio Code

Functions:

- Open Preview (ctrl+shift+M)

Open a live preview of the HTML that will be generated by FMark.

- Create HTML File

Create an HTML file in the same directory as the .fmark file, with .html instead of .fmark.

## Command Line Interface
```
USAGE: FMark [--help] [--output <path>] [--loglevel <debug|info|warning|error|fatal>] [--format <html|markdown>] [--test [<sequential>]] [<path>]

INPUT:
    <path>                specify input file path.

OPTIONS:
    --input, -i <path> CLI flag for input (not necessary, default argument is input.)
    --output, -o <path> specify output file path.
    --loglevel, -l <debug|info|warning|error|fatal> set the log level  ('0:DEBUG', '1:INFO', '2:WARNING', '3:ERROR' ,'4:FATAL').
    --format, -f <html|markdown> specify format, by default: html.
    --test, -t [<sequential>] run CI tests.
    --help display this list of options.
```
Note: Markdown generation is incomplete and should only be used for property based testing.

### Run CLI via Docker

```
# Build/pull docker image
docker build -f Dockerfile.run -t fmark-run .
docker run -e "FILE_PATH=/home/examples/example.fmark" -v examples:/home/examples -it fmark-run
```

Or create a bash function for yourself, e.g.

```bash
fmark () {
  if [ -f $1 ] ; then
    FILE_DIR=`dirname $1`
    FILE_NAME=`basename $1`
    CWD=`pwd`
    shift
    echo "Processing $FILE_NAME in $CWD/$FILE_DIR"
    docker run -e "FILE_PATH=/home/$FILE_DIR/$FILE_NAME" -v $CWD/$FILE_DIR:/home/$FILE_DIR -it fmark-run $@
  fi
}
```

Note, when referring to file paths in additional arguments, must think in the context of the Docker file structure, e.g:

`fmark examples/example.fmark --output /home/examples/test.html` will save to `examples/test.html`.

# Modules

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
2. [TOCite: Preparsing headers and footers](FMark/src/Common/TOCite/README.md)
3. [Markalc: Spreadsheet functionality](FMark/src/Common/Markalc/README.md)
4. [Main Parser](FMark/src/Common/Parser/README.md)

# Vanilla Markdown 

## Implemented
- HTML passthrough
- Lists
- Links (relative links within file don't work in VSCode, use `Create HTML File` and preview that.)
- Images (images don't work in VSCode, use `Create HTML File` and preview that.)
- Headers
- Styling (bold, italic, bold and italic, strikethrough)
- Paragraphs
- Quotes
- Code blocks
- Tables

## Design decisions

### Lists

* A list ends with two endlines, i.e., `\r\n\r\n`
* List items are separated by one endline
* List type is determined by the first item.
  * `NUMBER ; DOT` will be ordered list
  * ` - ` or ` * ` will be unordered list
* If the first item does not start with `NUMDER;DOT;Space| "- " | "* "`, the list type will be default to unordered list
* Ordered list start number is determined by the first item
  * The subsequent counting is `+1` for each list item
* Two spaces as one level of indentation.
* A tab, `\t` character will be interpreted as four spaces, therefore two levels of indentation.

### Header

* All headers must be preceded by two endlines, with an exception made for the first line in a file.

`\n\n# header\n` is a header, otherwise unless the header is the first line in a file it won't be processed as a header.

### Styling

* When using underscores for styling, there must be a space (or endline on the right) on either side in order for it to be recognised.
* Asterisks for styling work as usual.

e.g.

`[ ]_em_[ ]`, `[ ]__a strong__[ ]`, or `[ ]_em_$`, `[ ]__a strong__$`

### Paragraphs

A paragraph is some characters that does not match:
* CodeBlock
* Header
* ContentTable (Table of Contents object)
* List
* Quote
* Table
* Reference

It terminates with two endlines. Any elements mentioned above cannot exist in a paragraph. Otherwise, they will become normal text, and will not be rendered as expected.

# Building

To build fmark, dotnet and fable have to be installed first. To build the javascript as well, yarn or npm are needed.

## Using the Build script

``` shell
# build only javascript
build -b js

# build and test every single module
build -b testall

# build js and cli
build -b all
```

# Markdown extensions

## Macros

### Supported Constructs

These are the supported constructs in the preprocessor.

|Supported|Syntax|Description|Tested|
|---|---|---|---|
|Simple Macro|`{% macro name value %}`| Sets the Macro `name` equal to the string `value`|Unit Test|
|Function Macro|`{% macro name(arg1; arg2) value %}`|Sets the Macro `name` equal to the string `value` with two parameters.|Unit Test|
|Simple Evaluation|`{{ macro_name }}`|Evaluates the macro `macro_name` and replaces the evaluation with the evaluated body of the macro.|Unit Test|
|Function Evaluation|`{{ macro_name(arg 1; arg 2) }}`|Evaluates the macro `macro_name` with the arguments `arg 1` and `arg 2` and replaces the evaluation with the evaluated body of the macro.|Unit Test|
|File Include|`{{ include relative/path/to/file }}`|Includes and preprocesses a file using a relative or absolute path. The macros declared in that file will then be available in the current file|Unit Test|
|Complex Macro Evaluation|`{{ x( {{ y( {{z}} ; Hello ) }} ; {{z}} ) }}`|Nested macro evaulations are supported. This way, default arguments can be created for other macros.|Unit Test|

### Supported Features

These are the features that are currently supported by the preprocessor.

|Feature|Example|Description|Tested|
|---|---|---|---|
| Simple whitespace control|`{% macro x y %}` evaluates to `y` and not ` ` `y` ` `.|Removes whitespace and newlines in macros where one wouldn't expect them to be added to the macro body.|Unit Test|
|Shadowing of macros through|`{% macro x x %} {% macro y(x) {{ x }} %}` with `{{ y(z) }}` will evaluate to `z` but `{{ x }}` outside of the macro will always evaluate to `x`.|Macros can be shadowed by arguments of other macros.|Unit Test|
|Nested macros|`{% macro x {% macro y %} %}`|Macro y is only defined inside macro x and cannot be seen outside of the scope of x.|Unit Test|
|Shadowing of macros through|`{% macro x x %} {% macro y {% macro x z %} {{x}} %} y: {{ y }}, x: {{ x }}` will evaluate to `y: z, x: x`|Macros can be shadowed by other macros which will be used instead for evaluation.|Unit Test|
|Evaluation of large strings|`{{ x(This is the first argument; This is the second argument) }}`|One can pass large strings as arguments to the macros.|Unit Test|
|Escaping of characters inside argument|`{{ x(arg 1 with a \); arg 2 with a \;) }}`|One can esape all the special characters inside macros and substitutions|Unit Test|
|Escaping macros|`\{% macro x y %}`|This will escape the whole macro and not evaluate it|Unit Test|
|Escaping Subsitutions|`\{{ x }}`| will not evaluate the substitution but instead output it literally|Unit Test|
|Outputting unmatched subsituttion|`{{ x }}` -> `{{ x }}` if not in scope|If the subsitution is not matched, it will output it as it got it|Unit Test|
|Nested Evaluations|`{{ x( {{y}} ) }}`|Arguments can now be evaluated inside them.|Unit Test|

### Usage

To use the preprocessor and the lexer, a string or a list of strings can be used, depending on if there are multiple
lines or not. For a single string, the following can be used.

For string, the `preprocess` and `lex` functions.

``` f#
[<EntryPoint>]
let main =
    let inputString = (* Read the string *)

    inputString
    |> preprocess
    |> lex
    ...
```

For a list of strings, one can use the `preprocessList` and `lexList` functions.

``` f#
[<EntryPoint>]
let main =
    let inputStringList = (* Read the string list *)
    
    inputStringList
    |> preprocessList
    |> lexList
    ...
```

### Example

In markdown using the preprocessor, one can then write the following:

```
Text before macro
{% macro Hello(arg1; arg2)
This is text inside the macro, with semicolons;
{% macro local(arg1; arg2)
This is the second macro
%}
Now back in the first macro.
{{ local(arg1; arg2) }}
%}
Outside both macros
Should be printed as not in scope: {{ local(arg1; arg2) }}

{{ Hello(arg1; arg2) }}
```

which then evaluates to

```
Text before macro
Outside both macros
Should be printed as not in scope: {{ local(arg1; arg2) }}


This is text inside the macro, with semicolons;
Now back in the first macro.

This is the second macro 


```

More complicated macros can also be created by writing html in the macros. Due to the 
html passthrough in the lexer, the html will be copied over literally to the output html.

## Lexer

The lexer supports HTML pass through, which can be used to display raw html in markdown. Using this with
macros can give very useful and interesting functions.

## Interface to the Parser

The interface to the parser was done using the following `Token` type, which the parser takes in 
and can parse.

``` f#
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

## Features

Supports escaping of all the special characters defined in [Types](/FMark/FMark/src/Common/Types.fs). This is done by adding
a `\` in front of the character that should be escaped.

Tokens that match multiple characters can also be escaped by just putting a `\` before it. For example, 
`***` can be escaped by writing `\***`.

## Extensibility

It can easily be extended by adding the type of the token to `Token` above. Then the string
has to be linked to the token by adding it as a tuple of type `string * Token` to a list called
`charList` in the [Lexer](/FMark/FMark/src/Common/Lexer/Lexer.fs).

## Spreadsheet functionality
Spreadsheet functions will evaluate in-place, if they are incorrectly formatted then Markalc will leave the cell unchanged as if it were normal text inside. 

To delineate an expression, start the cell with the `=` operator, e.g.

Calcs|39|42|
|---|---|---|
||`=6*5+SUM{4,5}`|`=[1,1]+3`|

### Supported

#### Arithmetic

|Function|Syntax|Effect|Tested|
|---|---|---|---|
|Modulo|`a%b`|a modulo b|Property based, all integer inputs.
|Power|`a^b`|a to the power of b|Property based, all integer inputs.
|Multiply|`a*b`|a times b|Property based, all integer inputs.
|Division|`a/b`|a divided by b|Property based, all integer inputs.
|Subtraction|`a-b`|a minus b|Property based, all integer inputs.
|Addition|`a+b`|a plus b|Property based, all integer inputs.
|Brackets|`a+(b-c)`|Specify order of operation.|Unit tested.
|Cell References|`[0,2]`|Evaluates to contents of cell specified (row 0, col 2)|Unit tested|
|Range Cell Ref|`[0,0]:[2,0]`|Evaluates to list of cell references.|Unit tested.|
|Keyword Cell Ref|`[col=2,row=0]`|Alternative syntax, order doens't matter.|Unit tested|
|Specify Decimal Places|`=5.333,2`|Comma then a number specifies number of decimal places.|Unit tested|

##### Cell reference behaviour

|Referenced cell|Return|
|---|---|
|Contains valid expression `=...`|Contents of cell|
|Does not contain valid expression|nan|
|Is not in table|nan|
|Contains circular reference|nan|

#### Functions

Supported functions:

|Function name| Effect| Tested|
|---|---|---|
|`SUM`|Adds all arguments.|Unit tested.|
|`AVG`|Calculates mean of all arguments.|Unit tested.|
|`MIN`|Returns minimum of all arguments.|Unit tested.|
|`MAX`|Returns maximum of all arguments.|Unit tested.|

Functions support Range Cell References: `[0,0]:[2,0]` will evaluate to `[0,0],[1,0],[2,0]`. This can be used with other arguments, e.g. `SUM{[0,0]:[2,0],1,3+2,[0,0]}`

### Unsupported

|Feature|Example|Workaround|
|---|---|---|
|Negative numbers  |`=-a+b`|Subtract number from zero in brackets e.g. `=(0-a)+b`|
|Integer operations|`=5+2`|All calculations done in floating point.|
|Allow formatting around equation|`*=5+2*`|None|
|String operations|e.g. Excel CONCAT|None|
|Assume empty cells are zero|Summing over column with empty cells|Put `=0` in each cell|

## Table of Contents

Table of Contents can be build anywhere with `%%TOC`. Relative linking is supported,
clicking an item from the contents table will jump to the respective header when viewed
in html.

|Feature|Example|Exaplanation
|---|---|---|
|depth|`%%TOC depth=3`|Build a TOC with headers level less than 3
|exclude|`%%TOC excludes=[Appendix;Acknowledgement]`|Exclude headers with name `Appendix` and `Acknowledgement`|

Multiple features can be stacked with `,` like so:

`%%TOC depth=3, excludes=[Appendix;Acknowledgement]`

## Citations

FMark supports simple footers and styled references.

* If multiple citations with the same reference ID is found, the first citation will be used inline.
  * One `[^fmark]` inline, and two `[^fmark], some author`. The first will be used.
* Reference to non-exist citation will result in `"[Reference: %refID not found!]"` in the HTML generated.

* The list is sorted, with footnotes in order of their numerical IDs first,
References in order of apperance after. Thus the order each explanatory text
comes in the fmark file does not matter.

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

### Styled References

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

Spaces around equal sign are allowed, so `f = d`, `f= d`, `f =d` or `f=d`
all have the same effect.

```
This is a citation[^Mark]. This is another[^FMark] one.

[^Mark], type= Book, author= Mark Smith, title= Not a real book, year= 2018
[^FMark], type= Website, author= FMark Smith, title= Not a real website, year= 2017 url= www.example.com/website access= 2018-3-4
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

## Latex maths rendering

Fmark includes support for Latex maths rendering.

Surround an equation written in Latex with `$$` in order to use this feature.

Example: `$$2+2=4-1=3$$`
