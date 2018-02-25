module Testing

open Expecto

open Preprocessor

let makeTestList inf outf testf name listOfPairs =
    let makeSingleTest index (n, i, o) =
        testCase (sprintf "%s:%s:%d" name n index) <| fun () ->
            Expect.equal (inf i |> testf) (o |> outf) (sprintf "%A" i)
    List.indexed listOfPairs
    |> List.map (fun (i, pair) -> makeSingleTest i pair)
    |> Expecto.Tests.testList name

let makeSimpleTestList f = makeTestList id id f

// --------------------------------------------------
// Unit Tests
// --------------------------------------------------

// Preprocessor tests

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

[<Tests>]
let preprocessorParseTest =
    let makeParseTestList f = makeTestList tokenize id f
    makeParseTestList parse "PreprocessorParse" [
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

[<Tests>]
let preprocessTest =
    makeSimpleTestList preprocess "Preprocess" [
        "Simple text does not change", "This should stay the same", ["This should stay the same"; ""]

        "Simple text does not change with special chars",
        "This should identify the ';', but return the same string",
        ["This should identify the ';', but return the same string"; ""]

        "Simple macro evaluation",
        "{% macro x(y) {{ y }} y %} {{ x(argument) }}",
        ["argument y"; ""]

        "Print out the input when substitution not in scope",
        "{{ x(argument) }}",
        ["{{ x(argument) }}"; ""]
    ]

// Lexer tests

open Types
open Lexer

[<Tests>]
let lexTest =
    makeSimpleTestList lex "Lex" [
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

// --------------------------------------------------
// Property Tests
// --------------------------------------------------
