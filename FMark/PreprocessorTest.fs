module PreprocessorTest

open Preprocessor

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
let identifyTest =
    makeSimpleTestList identify "Identify" [
        ["Simple text"], Source ["Simple text"]
        ["    Code1"], CodeBlock ("", ["    Code1"])
        ["``` python"], CodeBlock ("python", [])
        ["~~~ruby"], CodeBlock ("ruby", [])
    ]

[<Tests>]
let nextBlockTest =
    makeSimpleTestList nextBlock "NextBlock" [
        ["Markdown Source"],
        (Source ["Markdown Source"], [""])

        ["    Code Block"],
        (CodeBlock ("default", ["Code Block"]), [""])

        ["``` python"; "This is in the code"; "```"],
        (CodeBlock ("python", ["This is in the code"]), [""])

        ["```fsharp"; ""; ""; "let x = 2"; ""; "let y = x"; "```"],
        (CodeBlock ("fsharp", [""; ""; "let x = 2"; ""; "let y = x"]), [""])
    ]

[<Tests>]
let trimSourceTest =
    makeSimpleTestList trimSource "TrimSource" [
        [""; "Simple Text"], ["Simple Text"]
        [""; ""; "Simple Text"], ["Simple Text"]
        [""; "\t    "; "Simple Text"; "\t  "; "More"], ["Simple Text"; "\t  "; "More"]
    ]
