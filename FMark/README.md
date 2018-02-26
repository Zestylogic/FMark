# Preprocessor

This project contains the Preprocessor for FMark. The preprocessor adds templating
capabilities to FMark, which was inspired by [Liquid](https://shopify.github.io/liquid/).

## Specification

### Supported Elements

|Supported|Syntax|Description|Tested|
|---|---|---|---|
|Simple Macro|`{% macro name value %}`| Sets the Macro `name` equal to the string `value`|Unit Test|
|Function Macro|`{% macro name(arg1; arg2) value %}`|Sets the Macro `name` equal to the string `value` with two parameters.|Unit Test|
|Simple Evaluation|`{{ macro_name }}`                   | Evaluates the macro `macro_name` and replaces the evaluation with the evaluated body of the macro.                                        | Unit Test |
| Function Evaluation | `{{ macro_name(arg 1; arg 2) }}`     | Evaluates the macro `macro_name` with the arguments `arg 1` and `arg 2` and replaces the evaluation with the evaluated body of the macro. | Unit Test |

### Supported Features

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
