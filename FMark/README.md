# Preprocessor

This project contains the Preprocessor for FMark. The preprocessor adds templating
capabilities to FMark, which was inspired by [Liquid](https://shopify.github.io/liquid/).

## Specification

### Supported Elements

| Supported           | Syntax                               | Description                                         | Tested    |
|---------------------|--------------------------------------|-----------------------------------------------------|-----------|
| Simple Macro        | `{% macro name value %}`             | Sets the Macro `name` equal to the string `value`   | Unit Test |
| Function Macro      | `{% macro name(arg1; arg2) value %}` | Sets the Macro `name` equal to the string `value`   | Unit Test |
|                     |                                      | with two parameters.                                |           |
| Simple Evaluation   | `{{ macro_name }}`                   | Evaluates the macro `macro_name` and replaces the   | Unit Test |
|                     |                                      | evaluation with the evaluated body of the macro.    |           |
| Function Evaluation | `{{ macro_name(arg 1; arg 2) }}`     | Evaluates the macro `macro_name` with the arguments | Unit Test |
|                     |                                      | `arg 1` and `arg 2` and replaces the evaluation     |           |
|                     |                                      | with the evaluated body of the macro.               |           |

### Supported Features

| Feature                     | Example                                           | Description                         | Tested    |
|-----------------------------|---------------------------------------------------|-------------------------------------|-----------|
| Simple whitespace control   | `{% macro x y %}` evaluates to `y` and not ` y `. | Removes whitespace and newlines     | Unit Test |
|                             |                                                   | in macros where one wouldn't expect |           |
|                             |                                                   | them to be added to the macro body. |           |
| Shadowing of macros through | `{% macro x x %} {% macro y(x) {{ x }} %}`        | Macros can be shadowed by arguments | Unit Test |
| arguments                   | with `{{ y(z) }}` will evaluate to z but          | of other macros.                    |           |
|                             | `{{ x }}` outside of the macro will always        |                                     |           |
|                             | evaluate to `x`.                                  |                                     |           |
| Nested macros               | `{% macro x {% macro y %} %}`                     | Macro y is only defined inside      | Unit Test |
|                             |                                                   | macro x and cannot be seen outside  |           |
|                             |                                                   | of the scope of x.                  |           |
| Shadowing of macros through | `{% macro x x %} {% macro y {% macro x z %}       | Macros can be shadowed by other     | Unit Test |
| other macros                | {{x}} %} y: {{ y }}, x: {{ x }}` will evaluate to | macros which will be used instead   |           |
|                             | `y: z, x: x`                                      | for evaluation.                     |           |
