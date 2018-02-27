module LexerTest

open System
open Expecto

open Preprocessor

/// Higher order function to make tests and remove boilerplate
let makeTestList inf outf testf name listOfPairs =
    let makeSingleTest index (n, i, o) =
        testCase (sprintf "%s:%s:%d" name n index) <| fun () ->
            Expect.equal (inf i |> testf) (o |> outf) (sprintf "%A" i)
    List.indexed listOfPairs
    |> List.map (fun (i, pair) -> makeSingleTest i pair)
    |> Expecto.Tests.testList name

/// simple test that does not transform the input or output
let makeSimpleTestList f = makeTestList id id f

let makeTestFromCharList l e =
    List.map (fun (a, b) -> (sprintf "Token %s" a), a, [b; e]) l

// --------------------------------------------------
// Unit Tests
// --------------------------------------------------

// Preprocessor tests

/// Make small test for next token function
[<Tests>]
let preprocessorNextTokenTest =
    makeSimpleTestList nextToken "PreprocessorNextToken" [
        "Openeval", "{{", (OPENEVAL, "")
        "Closeeval", "}}", (CLOSEEVAL, "")
        "Opendef", "{%", (OPENDEF, "")
        "Semicolon", ";", (SEMICOLON, "")

        "Long random text",
        "This is random text, and should stop here; This should not be included",
        (LITERAL "This", " is random text, and should stop here; This should not be included")
    ]

/// Check if all the special characters get tokenized correctly
[<Tests>]
let preprocessorTokenizeTokenTest =
    let tokenTests = makeTestFromCharList charList ENDLINE
    makeSimpleTestList tokenize "PreprocessorTokenize" tokenTests

/// Tokenize tests for the preprocessor
[<Tests>]
let preprocessorTokenizeTest =
    makeSimpleTestList tokenize "PreprocessorTokenize" [
        "Macro",
        "{% macro x() y %}",
        [OPENDEF; LITERAL " "; MACRO; LITERAL " "; LITERAL "x"; LBRA
         RBRA; LITERAL " "; LITERAL "y"; LITERAL " "; CLOSEDEF; ENDLINE]

        "Substitution",
        "{{ x(arg1; arg2) }}",
        [OPENEVAL; LITERAL " "; LITERAL "x"; LBRA; LITERAL "arg1"; SEMICOLON
         LITERAL " "; LITERAL "arg2"; RBRA; LITERAL " "; CLOSEEVAL; ENDLINE]

        "Normal markdown",
        "# Title _with emphasis_",
        [LITERAL "#"; LITERAL " "; LITERAL "Title"; LITERAL " "; LITERAL "_with"; LITERAL " "
         LITERAL "emphasis_"; ENDLINE]

        "Escaped character in sentence",
        "Escaped Semicolon \; \(it becomes a literal\)",
        [LITERAL "Escaped"; LITERAL " "; LITERAL "Semicolon"; LITERAL " "
         LITERAL ";"; LITERAL " "; LITERAL "("; LITERAL "it"; LITERAL " "
         LITERAL "becomes"; LITERAL " "; LITERAL "a"; LITERAL " "
         LITERAL "literal"; LITERAL ")"; ENDLINE]
    ]

/// Parse tests for the preprocessor
[<Tests>]
let preprocessorParseTest =
    let makeParseTestList f = makeTestList tokenize id f
    makeParseTestList parse "PreprocessorParse" [
        "Macro with no args",
        "{% macro Hello Body %}",
        [MacroDefinition {Name="Hello"; Args=[]; Body=[ParseText "Body"]}]

        "Macro with no args but brackets",
        "{% macro Hello() Body %}",
        [MacroDefinition {Name="Hello"; Args=[]; Body=[ParseText "Body"]}]

        "Macro with one argument and inline body",
        "{% macro Hello(arg1) Body %}",
        [MacroDefinition {Name="Hello"; Args=["arg1"]; Body=[ParseText "Body"]}]

        "Macro with multiple arguments and inline body",
        "{% macro Hello(arg1; arg2) Body %}",
        [MacroDefinition {Name="Hello"; Args=["arg1"; "arg2"]; Body=[ParseText "Body"]}]

        "Substitution",
        "{{ x }}",
        [MacroSubstitution {Name="x"; Args=[]; Raw="{{ x }}"}; ParseNewLine]

        "Substitution with argument",
        "{{ x(arg1) }}",
        [MacroSubstitution {Name="x"; Args=["arg1"]; Raw="{{ x(arg1) }}"}; ParseNewLine]

        "Substitution with multiple arguments",
        "{{ x(arg1; arg2) }}",
        [MacroSubstitution {Name="x"; Args=["arg1"; "arg2"]; Raw="{{ x(arg1; arg2) }}"}; ParseNewLine]

        "Substitution with argument and spaces",
        "{{ x(This is the first argument; This is the second argument) }}",
        [MacroSubstitution {Name="x"; Args=["This is the first argument"; "This is the second argument"]
                            Raw="{{ x(This is the first argument; This is the second argument) }}"}
         ParseNewLine]
    ]

/// Complete tests for the preprocessor with evaluation
[<Tests>]
let preprocessTest =
    makeSimpleTestList preprocess "Preprocess" [
        "Simple text does not change",
        "This should stay the same",
        "This should stay the same"

        "Simple text does not change with special chars",
        "This should identify the ';', but return the same string",
        "This should identify the ';', but return the same string"

        "Simple macro with no arguments",
        "{% macro x y %} {{ x }}",
        "y"

        "Simple macro with empty brackets",
        "{% macro x() y %} {{ x }}",
        "y"

        "Simple macro evaluation",
        "{% macro x(y) {{ y }} y %} {{ x(argument) }}",
        "argument y"

        "Print out the input when substitution not in scope",
        "{{ x(argument) }}",
        "{{ x(argument) }}"

        "Escaping macro bracket should make the original input appear",
        "\\{% macro x (y) {{ y }} y %} {{ x(argument one;) }}",
        "{% macro x (y) {{ y }} y %} {{ x(argument one;) }}"

        "Shadowed macros and arguments",
        "{% macro x () macro X %} {% macro y (x) macro Y {{ x }} %} {{ x }}, {{ y(: not x) }}",
        "macro X, macro Y : not x"

        "Shadowed macros",
        "{% macro x() x1 %} {% macro y() {% macro x() x2 %} {{ x }} %} {{ x }}, {{ y }}",
        "x1, x2"

        "Macro with different arguments",
        "{% macro x(arg1; arg2) {{arg1}}, {{arg2}} %} {{x(a; b)}}; {{ x(c;d) }}; {{ x(e; f)}}",
        "a, b; c, d; e, f"

        "Macro with long name",
        "{% macro this_is_a_macro_with_a_long_name(arg1; arg2) {{arg1}}, {{arg2}} %} {{ this_is_a_macro_with_a_long_name(a 1; a 2) }}",
        "a 1, a 2"
    ]

/// Complete multiline tests for the preprocessor
[<Tests>]
let preprocessListTest =
    makeSimpleTestList preprocessList "PreprocessList" [
        "Multiline macro evaluation with newline",
        ["{% macro x"; "Evaluated x"; "%}"; "{{ x }}"],
        ["Evaluated x"; ""]

        "Multiline macro without newline",
        ["{% macro x"; "Evaluated x %}"; "{{ x }}"],
        ["Evaluated x"]

        "Multiline macro with arguments",
        ["{% macro x(arg1; arg2; arg3; arg4)"; "{{arg1}}, {{arg2}}"; "{{arg3}}, {{arg4}}"; "%}"
         "{{ x(arg 1; arg 2; arg 3; arg 4)}}"],
        ["arg 1, arg 2"; "arg 3, arg 4"; ""]
    ]

// Lexer tests

open Types
open Lexer

/// Check if all the tokens are lexed properly
[<Tests>]
let lexTokenizeTokenTest =
    let tokenTests = makeTestFromCharList charList ENDLINE
    makeSimpleTestList lex "PreprocessorTokenize" tokenTests

/// Tests for the complete lexer
[<Tests>]
let lexTest =
    makeSimpleTestList lex "Lex" [
        "Literal",
        "Hello",
        [LITERAL "Hello"; ENDLINE]

        "Number",
        "9",
        [NUMBER "9"; ENDLINE]

        "WhiteSpace",
        "d          ",
        [LITERAL "d"; WHITESPACE 10; ENDLINE]

        "Very simple markdown",
        "Hello, world",
        [Types.Token.LITERAL "Hello,"; WHITESPACE 1; Types.Token.LITERAL "world"; Types.Token.ENDLINE]

        "With special characters",
        "There is _nothing_ to do",
        [LITERAL "There"; WHITESPACE 1; LITERAL "is"; WHITESPACE 1; UNDERSCORE
         LITERAL "nothing"; UNDERSCORE; WHITESPACE 1; LITERAL "to"; WHITESPACE 1
         LITERAL "do"; ENDLINE]

        "Escaping characters",
        @"\_\\\***\%\+",
        [LITERAL "_"; LITERAL @"\"; LITERAL "***"; LITERAL "%"; LITERAL "+"; ENDLINE]
    ]

/// Tests for the complete lexers with a string list as input
[<Tests>]
let lexListTest =
    makeSimpleTestList lexList "LexList" [
        "Very simple multiline markdown",
        ["Hello, world"; "Line 2"],
        [LITERAL "Hello,"; WHITESPACE 1; LITERAL "world"; ENDLINE; LITERAL "Line"; WHITESPACE 1
         NUMBER "2"; ENDLINE]

        "With special characters",
        ["__Bold__"; "_Emphasis_"],
        [DUNDERSCORE; LITERAL "Bold"; DUNDERSCORE; ENDLINE; UNDERSCORE; LITERAL "Emphasis"; UNDERSCORE
         ENDLINE]

        "Escaping characters",
        [@"\_\\\***\%\+"; @"\_\\\***\%\+"; @"\_\\\*\%\+"],
        [LITERAL "_"; LITERAL @"\"; LITERAL "***"; LITERAL "%"; LITERAL "+"; ENDLINE
         LITERAL "_"; LITERAL @"\"; LITERAL "***"; LITERAL "%"; LITERAL "+"; ENDLINE
         LITERAL "_"; LITERAL @"\"; LITERAL "*"; LITERAL "%"; LITERAL "+"; ENDLINE]
    ]

// --------------------------------------------------
// Property Tests
// --------------------------------------------------

/// Check if output of preprocessor is the same if passed through the preprocessor again
[<Tests>]
let preprocessorPropertyTest =
    testProperty "PreprocessorPropertyTest" <| fun (s: string) ->
        let str =
            // The functions will not work with a null string
            if isNull s then ""
            // There is also a weird interaction with '\' because it escapes itself
            else s.Replace("\\", "")
        let preprocess1 = str |> preprocess
        let preprocess2 = str |> preprocess |> preprocess
        Expect.equal preprocess1 preprocess2 ""
