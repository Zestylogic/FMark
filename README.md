# FMark
FSharp markdown.

## Test Status

[![Build Status](https://travis-ci.org/ymherklotz/FMark.svg?branch=master)](https://travis-ci.org/ymherklotz/FMark)

## Modules

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
2. [TOCite: Table of Contents and Citations](FMark/src/Common/TOCite/README.md)
3. [Markalc: Spreadsheet functionality](FMark/src/Common/Markalc/README.md)
4. [Main Parser](FMark/src/Common/Parser/README.md)

## Specification

A reference specification for the simple markdown that we are going to follow can be found
at [CommonMark](http://spec.commonmark.org/0.27/).

A reference implementation of the simple markdown can be found [here](http://spec.commonmark.org/dingus/).

# Markdown extensions (not included in standard Markdown)

## Macros

### Supported Constructs

These are the supported constructs in the preprocessor.

|Supported|Syntax|Description|Tested|
|---|---|---|---|
|Simple Macro|`{% macro name value %}`| Sets the Macro `name` equal to the string `value`|Unit Test|
|Function Macro|`{% macro name(arg1; arg2) value %}`|Sets the Macro `name` equal to the string `value` with two parameters.|Unit Test|
|Simple Evaluation|`{{ macro_name }}`|Evaluates the macro `macro_name` and replaces the evaluation with the evaluated body of the macro.|Unit Test|
|Function Evaluation|`{{ macro_name(arg 1; arg 2) }}`|Evaluates the macro `macro_name` with the arguments `arg 1` and `arg 2` and replaces the evaluation with the evaluated body of the macro.|Unit Test|

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

## Spreadsheet functionality
Spreadsheet functions will evaluate in-place in a table, if they are incorrectly formatted then Markalc will leave the cell unchanged as if it were normal text inside. 

To delineate an expression, start the cell with the `=` operator, e.g.

Calcs|39|42|
|---|---|---|
||`=6*5+SUM{4,5}`|`=[1,1]+3`|

### Supported Features

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
|Range Cell Ref|`[0,0]:[2,0]`|Evaluates to list of cell references.|Unit tested, not fully.|
|Keyword Cell Ref|`[col=2,row=0]`|Alternative syntax, order doens't matter.|Unit tested|

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
|Negative numbers using unary operator|`=-a+b`|Subtract number from zero in brackets e.g. `=(0-a)+b`|
|Integer operations|`=5+2`|All calculations done in floating point.|
|Allow formatting around equation|`*=5+2*`|None|
|String operations|e.g. Excel CONCAT|None|
|Assume empty cells are zero|Summing over column with empty cells|Put `=0` in each cell|

## Table of Contents

To be written up.

## Citations

To be written up.

## TODO
- [ ] Write up formatting for Table of Contents and Citations
- [ ] Math equation rendering (Mathjax)

### Potential extensions

- Diagrams (Graphviz)
- Autoformatting
- Syntax highlighting
- Error/Warning/Hints highlighting

