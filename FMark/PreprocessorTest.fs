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
let identifyBlockTypeTest =
    makeSimpleTestList identifyBlockType "IdentifyBlockType" [
        ["Markdown Source"], Source ["Markdown Source"]
        ["    Code Block"], CodeBlock ("default", ["    Code Block"])
        ["``` python"; "This is in the code"; "```"], CodeBlock ("python", ["``` python"; "This is in the code"; "```"])
        
    ]

[<Tests>]
let trimSourceTest =
    makeSimpleTestList trimSource "TrimSource" [
        [""; "Simple Text"], ["Simple Text"]
        [""; ""; "Simple Text"], ["Simple Text"]
        [""; "\t    "; "Simple Text"; "\t  "; "More"], ["Simple Text"; "\t  "; "More"]
    ]
