# Preprocessor

The purpose of the preprocessor is to go through the initial markdown source
code and remove all the preprocessing commands which could be options set
by the user, or macros that have been defined. These options could refer to styling
options or if the table of contents should be displayed or not. The macros can be anything
from setting a simple value, to creating custom htlm that should be included when
when the macro gets called again.

## Macros

Macros in FMark are very similar to C style macros, that just replace the macro that
was defined earlier with the value it has been set to. These do not just have to be
simple replacements, but can also be function style macros that can take arguments, and
also macros that can envelope text, and change it that way.

An example of this can be seen below.

```
{% assign Hello 1 %}

{% macro hello_func(arg1 arg2)
__Hello__ {{ arg1 }}, welcome to {{ arg2 }}
%}

@.hello_func(Yann basketball)

@define HELLO2
Hello, world
@end
```

The code above will replace the macro defined as `@HELLO` with the text `Hello, world`
anywhere it is referenced.

More complex macros can also be defined however, such as the example below.

```
@define_ SPECIAL_DIV(INPUT1; INPUT2)
<div class="special">INPUT</div>
@end
```

The above will convert

```
Hello, @SPECIAL_DIV()
```

to

```
Hello, <div class="special">World</div>
```

The `@` sign has to be put when calling the macro, so that the replacement

## Options

## Implementation

### Types

``` fsharp
type TPreProc =
    | Source of string list
    | CodeBlock of string list

type Macro = {Name: string; Parameters: string list; Body: string list}
```

### Functions

``` fsharp
val preProcSource: (string list -> Macro list -> string list * Macro list)

val preprocess; (string list -> TPreProc list)
```

Descriptions of the functions can be seen below.

- `preProcSource`: This function takes in a list of string which represent the source code
that has been read from the file and a `Macro list` which contains all the macros that
have been defined already in the file using the syntax above.
