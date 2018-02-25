
# Markalc

Markalc is a parser for Github Flavoured Markdwon (GFM) tables which adds spreadsheet capabilities.

# Specification
## Spreadsheet functionality
Spreadsheet functions will evaluate in-place, if they are incorrectly formatted then Markalc will leave the cell unchanged as if it were normal text inside. 

To delineate an expression, start the cell with the `=` operator, e.g.

Calcs|39|42|
|---|---|---|
||`=6*5+SUM{4,5}`|`=[1][1]+3`|

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
|Cell References|`[row][col]`|Evaluates to contents of cell specified|Unit tested|
|Range Cell Ref|`[0][0]:[2][0]`|Evaluates to list of cell references.|Unit tested, not fully.|


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

Functions support Range Cell References: `[0][0]:[2][0]` will evaluate to `[0][0],[1][0],[2][0]`. This can be used with other arguments, e.g. `SUM{[0][0]:[2][0],1,3+2,[0][0]}`

### Unsupported

|Feature|Example|Workaround|
|---|---|---|
|Negative numbers  |`=-a+b`|Subtract number from zero in brackets e.g. `=(0-a)+b`|
|Integer operations|`=5+2`|All calculations done in floating point.|
|Allow formatting around equation|`*=5+2*`|None|
|String operations|e.g. Excel CONCAT|None|
|Assume empty cells are zero|Summing over column with empty cells|Put `=0` in each cell|

## Table parsing functionality

Markalc takes in a Token list list, each token list in the input is interpreted as a row of a table. If the evaluation of these Tokens fails, Markalc will return an Error monad containing the original input. Otherwise, if successful, it will return a Row list of the successfully parsed and evaluated table.

### Features

|Feature|Supported?|Tested|
|---|---|---|
|Superfluous Pipes|Yes|Unit Tested|
|No outside pipes|Yes|Unit Tested|
|Cell alignment|Yes|Unit Tested|
|Single cell table|Yes|Unit Tested|
|Single cell table no header pipe|Yes|Unit Tested|
|Single column table no pipes except align|Yes|Unit Tested|
|Filling in missing row elements in body.|Yes|Unit Tested|
|Ignoring extra row elements in body.|Yes|Unit Tested|
|Single row table|Yes|Unit Tested|

# Using Markalc

## How does Markalc contribute to FMark?

Markalc is an essential part of the FMark project to implement Markdown and extend its functionality. Firstly, it is essential since it parses tables into `Cell`s which can be easily printed using an HTMLGen function. Secondly, it extends Markdown to add spreadsheet capabilities to GFM tables.

## Interfaces

Top-level function is called `parseEvaluateTable`. The input to the function is a `Token list list` and it returns Ok with the list of rows parsed into `Cell`s if successful, otherwise it passes the input onwards.

``` fsharp
val parseEvaluateTable (toks:Token list list) : Result<Cell list list, Token list list>
```

Interface is compatible with the other modules since we are using a Result monad to inform caller whether or not the table was valid. The caller can then do different functions on the data accordingly.

### Usage guide
```fsharp
val lexer (str:string) : Token list

// Detect potential table (some pipes, 3 dashes, double newline at the end)
// return all tokens until the newline, a list for each row.
val detectPotentialTable (toks:Token list) : Token list list

val HTMLGenTable (Cell list list) : string
val HTMLGenTokenList (Token list list) : string

input
|> lexer
|> detectPotentialTable
|> parseEvaluateTable
|> function
| Ok (rows) -> List.map HTMLGenTable rows
| Error(toks) -> List.map HTMLGenTokenList toks
```

# Testing Plan

This project was developed in test-driven manner. Each main component was tested using unit tests (and property based tests where simple enough) for as many edge cases as possible. These main components were:

- The expression parser and evaluator
- The row parser
- The alignment row parser
- The full `parseEvaluateTable` function.

The benefit of this approach is that it's possible to pinpoint the cause of errors to a specific component of the code, or easily add another test to a particular component to debug errors in the full implementation. It also allowed for much faster development; each component need only be written to fulfil its specification and then tested, and henceforth used with impunity. Combining the components into the top level function was trivial. It would have been good to include more property based tests, however the cost of developing these was deemed too high within the timeframe, so mostly unit tests were used.

[TESTS.md](TESTS.md) is an itemised description of all unit tested functionality.

