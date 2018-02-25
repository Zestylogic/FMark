# Tests
## Expression parser and evaluator

|UnitTest|Pass/Fail
|---|---|
|Nested binary expression test with addition|Pass|
|Simple triple multiplication|Pass|
|Left associativity with triple division|Pass|
|Left associativity with triple subtraction|Pass|
|Bracketed subtraction|Pass|
|Bracketed subtraction then addition|Pass|
|Operator precedence changed with brackets|Pass|
|Operator precedence|Pass|
|Lots of brackets|Pass|
|Testing cellref evaluation (without table)|Pass|
|Test left associativity with extra whitespace|Pass|
|Pow precendence test|Pass|

## Default row parser

|UnitTest|Pass/Fail
|---|---|
|All Pipes|Pass|
|Only middle pipe|Pass|
|Empty pipes|Pass|
|One pipe|Pass|
|No end pipe|Pass|
|No start pipe|Pass|
|Empty pipes in middle|Pass|

## Alignment row parser

|UnitTest|Pass/Fail
|---|---|
|No alignments|Pass|
|Middle right aligned|Pass|
|No alignments, superfluous pipes both sides|Pass|
|All centre aligned, both outside pipes|Pass|
|All centre aligned, no rhs pipe|Pass|
|All centre aligned, no superfluous pipes|Pass|
|Simple all align types|Pass|
|Complex non-symmetric using all aligns w/o outside pipes|Pass|
|Complex non-symmetric using all aligns with outside pipes|Pass|

## Basic table parse

|UnitTest|Pass/Fail
|---|---|
|Table parse into cells with no functions|Pass|

## Full Markalc test

|UnitTest|Pass/Fail
|---|---|
|Single cell table no header pipe|Pass|
|Single cell table|Pass|
|Two rows no pipes|Pass|
|Single row table|Pass|
|Full evaluation test with cell references|Pass|
|Circular cell reference|Pass|
|SUM range function call|Pass|
|SUM and avg function calls|Pass|
|Horizontal cell ref range|Pass|
|Function with cell ref range and other arguments|Pass|
|Function within a function|Pass|
|MIN/MAX function test|Pass|

