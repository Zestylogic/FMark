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
`define HELLO Hello, world
```

The code above will replace the macro defined as `HELLO` with the text `Hello, world` 
anywhere it is referenced.

More complex macros can also be defined however, such as the example below.
```
`define SPECIAL_DIV(INPUT)
<div class="special">INPUT</div>
`end
```

The above will convert

```
Hello, \SPECIAL_DIV(World)
```

to

```
Hello, <div class="special">World</div>
```

## Options