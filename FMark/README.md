# Project Contribution

The preprocessor and lexer are part of FMark, which a markdown parser in F#. This su project contains the 
lexer and the preprocessor for the markdown parser. The preprocessor is a completely separate parser
which preprocesses the markdown before passing it to the lexer and finally the parser.

# Preprocessor

This project contains the Preprocessor for FMark. The preprocessor adds templating
capabilities to FMark, which was inspired by [Liquid](https://shopify.github.io/liquid/).

## Specification

### Supported Constructs

These are the supported constructs in the preprocessor.

|Supported|Syntax|Description|Tested|
|---|---|---|---|
|Simple Macro|`{% macro name value %}`| Sets the Macro `name` equal to the string `value`|Unit Test|
|Function Macro|`{% macro name(arg1; arg2) value %}`|Sets the Macro `name` equal to the string `value` with two parameters.|Unit Test|
|Simple Evaluation|`{{ macro_name }}`                   | Evaluates the macro `macro_name` and replaces the evaluation with the evaluated body of the macro.                                        | Unit Test |
| Function Evaluation | `{{ macro_name(arg 1; arg 2) }}`     | Evaluates the macro `macro_name` with the arguments `arg 1` and `arg 2` and replaces the evaluation with the evaluated body of the macro. | Unit Test |

### Supported Features

These are the features that are currently supported by the preprocessor.

| Feature                     | Example                                                                                                                                         | Description                                                                                             | Tested    |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|-----------|
| Simple whitespace control   | `{% macro x y %}` evaluates to `y` and not ` ` `y` ` `.                                                                                               | Removes whitespace and newlines in macros where one wouldn't expect them to be added to the macro body. | Unit Test |
| Shadowing of macros through | `{% macro x x %} {% macro y(x) {{ x }} %}` with `{{ y(z) }}` will evaluate to `z` but `{{ x }}` outside of the macro will always evaluate to `x`. | Macros can be shadowed by arguments of other macros.                                                    | Unit Test |
| Nested macros               | `{% macro x {% macro y %} %}`                                                                                                                   | Macro y is only defined inside macro x and cannot be seen outside of the scope of x.                    | Unit Test |
| Shadowing of macros through | `{% macro x x %} {% macro y {% macro x z %} {{x}} %} y: {{ y }}, x: {{ x }}` will evaluate to `y: z, x: x`                                      | Macros can be shadowed by other macros which will be used instead for evaluation.                       | Unit Test |
|Evaluation of large strings|`{{ x(This is the first argument; This is the second argument) }}`|One can pass large strings as arguments to the macros.|Unit Test|
|Escaping of characters inside argument|`{{ x(arg 1 with a \); arg 2 with a \;) }}`|One can esape all the special characters inside macros and substitutions|Unit Test|
|Escaping macros|`\{% macro x y %}`|This will escape the whole macro and not evaluate it|Unit Test|
|Escaping Subsitutions|`\{{ x }}`| will not evaluate the substitution but instead output it literally|Unit Test|
|Outputting unmatched subsituttion|`{{ x }}` -> `{{ x }}` if not in scope|If the subsitution is not matched, it will output it as it got it|Unit Test|

### Future improvements

There are many features that will be introduced into the preprocessor in the future. Some of the future
constructs can be seen below.

|Construct|Description|
|---|---|
|for loop|A for loop that will repeat whatever is put into the body|
|ifdef|Check if a macro is defined|
|Expressions|Introduce arithmetic expressions|
|if|Check if a condition is true, which will need the introduction of Expressions|

There are also some features that could be added.

|Feature|Description|
|---|---|
|`{%- -%}`|New delimiter that will completely remove the whitespace of the macro at that point|

# Lexer

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

# Testing

The lexer and the preprocessor were built using a test-driven manner, by writing tests first and then making them pass with
the code. This means that the goal of the code is well defined and can more easily be written. It is then
much easier to test the whole code by just running all the unit tests, instead of manually testing it everytime.

Unit tests were used to make small tests that were going to have to pass. After the code was written,
property based tests made sure that the main functions were working as they were supposed to.

## Unit tests

### Preprocessor

#### Next Token

|Name|Status|
|---|---|
|Openeval|Pass|
|Closeeval|Pass|
|Opendef|Pass|
|Semicolon|Pass|
|Long random text|Pass|

#### Tokenize

|Name|Status|
|---|---|
|Macro|Pass|
|Subsitution|Pass|
|Normal markdown|Pass|
|Escaped character in sentence|Pass|

#### Parse

|Name|Status|
|---|---|
|Macro with multiple arguments and inline body|Pass|
|Substitution|Pass|
|Substitution with argument|Pass|
|Substitution with multiple arguments|Pass|
|Substitution with argument and spaces|Pass|

#### Preprocess

|Name|Status|
|---|---|
|Simple text does not change|Pass|
|Simple text does not change with special chars|Pass|
|Simple macro with no arguments|Pass|
|Simple macro with empty brackets|Pass|
|Simple macro evaluation|Pass|
|Print out the input when substitution not in scope|Pass|
|Escaping macro bracket should make the original input appear|Pass|
|Shadowed macros and arguments|Pass|
|Shadowed macros|Pass|
|Macro with different arguments|Pass|
|Macro with long name|Pass|

#### Preprocess List

|Name|Status|
|---|---|
|Multiline macro evaluation with newline|Pass|
|Multiline macro without newline|Pass|
|Multiline macro with arguments|Pass|

### Lexer

## Property based tests
