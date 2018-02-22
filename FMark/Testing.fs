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

[<Tests>]
let pNextTokenTest =
    makeSimpleTestList pNextToken "PNextToken" [
        "{{", (OPENEVAL, "")
        "}}", (CLOSEEVAL, "")
        "{%", (OPENDEF, "")
        ";", (PSEMICOLON, "")

        "This is random text, and should stop here; This should not be included",
        (PTEXT "This is random text, and should stop here", "; This should not be included")
    ]

[<Tests>]
let pTokenizeTest =
    makeSimpleTestList pTokenize "PTokenize" [
        "Text; {{ H }}", [PTEXT "Text"; PSEMICOLON; PTEXT " "; OPENEVAL; PTEXT " H "; CLOSEEVAL; PENDLINE]
        "{% macro InExpr %} ", [OPENDEF; PTEXT " "; MACRO; PTEXT " InExpr "; CLOSEDEF; PTEXT " "; PENDLINE]
    ]

[<Tests>]
let tokenizeTest =
    makeSimpleTestList tokenize "Tokenize" [
        "Hello, world", [LITERAL "Hello,"; WHITESPACE 1; LITERAL "world"; ENDLINE]
        "There is _nothing_ to do", [LITERAL "There"; WHITESPACE 1; LITERAL "is"; WHITESPACE 1; UNDERSCORE
                                     LITERAL "nothing"; UNDERSCORE; WHITESPACE 1; LITERAL "to"; WHITESPACE 1
                                     LITERAL "do"; ENDLINE]
        "", [ENDLINE]
        "``", [BACKTICK; BACKTICK; ENDLINE]
        "```", [TBACKTICK; ENDLINE]
        "***", [TASTERISK; ENDLINE]
        "___", [TUNDERSCORE; ENDLINE]
    ]

[<PTests>]
let tokenizePropertyTest =
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

    testProperty "TokenizePropertyTest" <| fun (tokList: Token list) ->
        let filtered = filterTokList tokList
        let result = filtered |> tokListToString |> tokenize
        Expect.equal filtered result
