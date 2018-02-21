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
let nextBlockTest =
    makeSimpleTestList nextBlock "NextBlock" [
        ["Markdown Source"],
        (Paragraph ["Markdown Source"], [])

        ["This is a paragraph"; "It should continue here"; ""; "But this should not be included"],
        (Paragraph ["This is a paragraph"; "It should continue here"], ["But this should not be included"])

        ["    Code Block"],
        (Code ("", ["Code Block"]), [])

        ["    This is the first line"; "    This is the second line"; "It should stop here."],
        (Code ("", ["This is the first line"; "This is the second line"]), ["It should stop here."])

        ["``` python"; "This is in the code"; "```"],
        (Code ("python", ["This is in the code"]), [])

        ["```fsharp"; ""; ""; "let x = 2"; ""; "let y = x"; "```"],
        (Code ("fsharp", [""; ""; "let x = 2"; ""; "let y = x"]), [])
    ]

[<Tests>]
let trimTextTest =
    makeSimpleTestList trimText "TrimSource" [
        [""; "Simple Text"], ["Simple Text"]
        [""; ""; "Simple Text"], ["Simple Text"]
        [""; "\t    "; "Simple Text"; "\t  "; "More"], ["Simple Text"; "\t  "; "More"]
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

[<Tests>]
let tokenizePropertyTest =
    let invCharMap =
        List.map (fun (a, b) -> (b, a)) charList
        |> Map.ofList
    let filterTokList tokList =
        let nTokList = List.collect (function | CODEBLOCK _ | ENDLINE -> [] | a -> [a]) tokList
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
