
# Markalc

Markalc is a module which adds spreadsheet-like functionality to GFM tables.

# Functionality
## Supported spreadsheet functionality
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
|Multiply|`a\*b`|a times b|Property based, all integer inputs.
|Division|`a/b`|a divided by b|Property based, all integer inputs.
|Subtraction|`a-b`|a minus b|Property based, all integer inputs.
|Addition|`a+b`|a plus b|Property based, all integer inputs.
|Brackets|`a+(b-c)`|Specify order of operation.|Unit tested.
|Cell References|`[row][col]`|Evaluates to contents of cell specified|Unit tested|

##### Cell reference behaviour

|Referenced cell|Return|
|---|---|
|Contains valid expression `=...`|Contents of cell|
|Does not contain valid expression|nan|
|Is not in table|nan|
|Contains circular reference|nan|

#### Functions

|Function type|Syntax|Effect|
|---|---|---|
|Range|`F{[0][0]:[4][0]}`|Applys function to all cells from the first to the last inclusive. Must either be down same row or column.|
|List|`F{5,4,[0][0]}`|Applies function to all expressions contained in the list.|

Supported functions:

|Function name| Effect| Tested|
|---|---|---|
|`SUM`|Adds all arguments.|Unit tested.|
|`AVG`|Calculates mean of all arguments.|Unit tested.|

Future: 
- Probably possible to make `[0][0]:[2][0]` evaluate to `[0][0],[1][0],[2][0]` in the [Expression](Expression.fs) module instead of in [Markalc](Markalc.fs), making range functions redundant.
- Add more functions (easy to do).

### Unsupported

|Function|Example|Workaround|
|---|---|---|
|Negative numbers  |`=-a+b`|Subtract number from zero in brackets e.g. `=(0-a)+b`|
|Integer operations|`=5+2`|All calculations done in floating point.|

# Spec

Not implementing single column tables. (?)

It would be nice to be able to shunt any text representing a table in and still use without needing the external lexer that inputs into this. Maybe active pattern match on the thing coming in, if it's not a string convert it to a string. Perhaps that's extending my workload a lot.

## From TC below:


## How will (or might) your code contribute to the group deliverable? What have you done to ensure interfaces etc will be compatible? What are your interfaces (enough information for your module to be used by someone else not in your team. Assessment here is based on best efforts while allowing independent development, not whether the code is actually useful. Typical length 1/4 page.

Submit to the EEE upload link a zip file of an F# project with your working code + tests. Documentation a single markdown file README.md + comments in code as needed. There is no maximum length, typical lengths included to prevent excessive report-writing. Specifically include the following in your markdown file.


## What is the specification of your code? Detail any areas where spec was initially unclear and has been clarified. Typical length 1/2 page + Tables.

Your markdown file can refer to comments in code, or the code itself, for details of normal functionality. Your markdown file should contain a precise description of how much functionality has been implemented, and how much tested (tables of features are good for this).

A precise specification document would be very long: your document should only detail issues not obvious from the initial spec that needed to be resolved.

A short description of your Test Plan. Typical length 1/2 page + tables. What you have tested will be clear from the feature specification which includes test status. How you have tested it must be itemised. Again a table is good (could be the same one as used for specification). Add any rationale for your test plan.

Anything notable learnt during testing.
