
# Markalc

Markalc is a parser for GFM tables which adds spreadsheet functionality.

# Functionality
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

Functions support Range Cell References: `[0][0]:[2][0]` will evaluate to `[0][0],[1][0],[2][0]`.

##### Example function: Sum of first two columns rows 0 to 2 + 5 + contents of cell \[0\]\[2\]

`=SUM{[0][0]:[2][0],[0][1]:[2][1],5,[0][2]}`

### Unsupported

|Feature|Example|Workaround|
|---|---|---|
|Negative numbers  |`=-a+b`|Subtract number from zero in brackets e.g. `=(0-a)+b`|
|Integer operations|`=5+2`|All calculations done in floating point.|
|String operations|e.g. Excel CONCAT|None|
|Assume empty cells are zero|Summing over column with empty cells|Put `=0` in each cell|

## Table parsing functionality

Markalc takes in a Token list list, each token list in the input is interpreted as a row of a table. If the evaluation of these Tokens fails, Markalc will return an Error monad containing the original input. Otherwise, if successful, it will return a Row list of the successfully parsed and evaluated table.

### Features

|Feature|Supported?|Tested|
|---|---|---|
|Superfluous Pipes|[x]|Unit Tested|
|No outside pipes|[x]|Unit Tested|
|Cell alignment|[x]|Unit Tested|
|Single cell table|[x]|Unit Tested|
|Single cell table no header pipe|[x]|Unit Tested|
|Single column table no pipes except align|[x]|Unit Tested|
|Filling in missing row elements in body.|[x]|Unit Tested|
|Ignoring extra row elements in body.|[x]|Unit Tested|
|Single row table|[x]|Unit Tested|


