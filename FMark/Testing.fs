module Testing

open Types
open Preprocessor
open Lexer

open Expecto

let makeTestList inf outf testf name listOfPairs =
    let makeSingleTest index (i, o) =
        testCase (sprintf "%s:%d" name index) <| fun () ->
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
let pTokenizeTest =
    makeSimpleTestList pTokenize "PTokenize" [
        "Text; {{ H }}", [PTEXT "Text"; PSEMICOLON; PTEXT " "; OPENEVAL; PTEXT " "; PTEXT "H"; PTEXT " "; CLOSEEVAL; PENDLINE]
        "{% macro InExpr %} ", [OPENDEF; PTEXT " "; MACRO; PTEXT " "; PTEXT "InExpr"; PTEXT " "; CLOSEDEF; PENDLINE]
        "# Title ", [PTEXT "#"; PTEXT " "; PTEXT "Title"; PENDLINE]
        "Escaped Semicolon \;", [PTEXT "Escaped"; PTEXT " "; PTEXT "Semicolon"; PTEXT " "; PTEXT ";"; PENDLINE]
        "Escaped brackets \( other text \)", [PTEXT "Escaped"; PTEXT " "; PTEXT "brackets"; PTEXT " "; PTEXT "("; PTEXT " "; PTEXT "other"; PTEXT " "; PTEXT "text"; PTEXT " "; PTEXT ")"; PENDLINE]
    ]

[<Tests>]
let pParseTest =
    let makeParseTestList f = makeTestList pTokenize id f
    makeParseTestList pParse "PParse" [
        "{% macro Hello(arg1; arg2) Body %}", [MacroDefinition {Name="Hello"; Args=["arg1"; "arg2"]; Body=[ParseText "Body"]}]
        "{{ x }}", [MacroSubstitution ("x", []); ParseNewLine]
        "{{ x(arg1) }}", [MacroSubstitution ("x", ["arg1"]); ParseNewLine]
    ]

[<Tests>]
let pNextTokenTest =
    makeSimpleTestList pNextToken "PNextToken" [
        "{{", (OPENEVAL, "")
        "}}", (CLOSEEVAL, "")
        "{%", (OPENDEF, "")
        ";", (PSEMICOLON, "")

        "This is random text, and should stop here; This should not be included",
        (PTEXT "This", " is random text, and should stop here; This should not be included")
    ]

[<Tests>]
let preprocessTest =
    makeSimpleTestList preprocess "Preprocess" [
        "This should stay the same", ["This should stay the same"; ""]
        "This should identify the ';', but return the same string", ["This should identify the ';', but return the same string"; ""]
        "{% macro x(y) {{ y }} y %} {{ x(argument) }}", ["argument y"; ""]
        "{% x(y) {{ y }} y %} {{ x(argument) }}", ["{% x(y) {{ y }} y %} {{ x(argument) }}"; ""]
    ]

// Lexer tests

[<Tests>]
let lexTest =
    makeSimpleTestList lex "Lex" [
        "Hello, world", [LITERAL "Hello,"; WHITESPACE 1; LITERAL "world"; ENDLINE]
        "There is _nothing_ to do", [LITERAL "There"; WHITESPACE 1; LITERAL "is"; WHITESPACE 1; UNDERSCORE
                                     LITERAL "nothing"; UNDERSCORE; WHITESPACE 1; LITERAL "to"; WHITESPACE 1
                                     LITERAL "do"; ENDLINE]
        "", [ENDLINE]
        "``", [BACKTICK; BACKTICK; ENDLINE]
        "```", [TBACKTICK; ENDLINE]
        "***", [TASTERISK; ENDLINE]
        "___", [TUNDERSCORE; ENDLINE]
        @"\_", [LITERAL "_"; ENDLINE]
        @"\_\\\***\%\+", [LITERAL "_"; LITERAL @"\"; LITERAL "***"; LITERAL "%"; LITERAL "+"; ENDLINE]
    ]

// --------------------------------------------------
// Property Tests
// --------------------------------------------------

[<PTests>]
let lexPropertyTest =
    let invCharMap =
        List.map (fun (a, b) -> (b, a)) charList
        |> Map.ofList

    let filterTokList tokList =
        let nTokList =
            List.collect (function | CODEBLOCK _ | ENDLINE -> [] | a -> [a]) tokList
        nTokList @ [ENDLINE]

    let tokListToString tokList =
        let rec tokListToString' str = function
            | LITERAL s :: tl -> tokListToString' (str+s) tl
            | WHITESPACE n :: tl -> tokListToString' (str+(String.replicate n " ")) tl
            | NUMBER s :: tl -> tokListToString' (str+s) tl
            | ENDLINE :: tl -> tokListToString' str tl
            | s :: tl -> tokListToString' (str+invCharMap.[s]) tl
            | _ -> str
        tokListToString' "" tokList

    testProperty "LexPropertyTest" <| fun (tokList: Token list) ->
        let filtered = filterTokList tokList
        let result = filtered |> tokListToString |> lex
        Expect.equal filtered result
