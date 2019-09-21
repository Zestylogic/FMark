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

### Example

In markdown using macros, one can write the following:

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

The lexer supports HTML pass through, which can be used to display raw html in markdown. Using this with macros can give very useful and interesting functions.

## Features

Supports escaping of all the special characters defined in [Types](/FMark/FMark/src/Common/Types.fs). This is done by adding
a `\` in front of the character that should be escaped.

Tokens that match multiple characters can also be escaped by just putting a `\` before it. For example, 
`***` can be escaped by writing `\***`.
