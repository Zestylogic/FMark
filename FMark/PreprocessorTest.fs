module PreprocessorTest

open Preprocessor

open Expecto

let makeTest outf inf name inp outp =
    testCase name <| fun () ->
        let a = inf inp
        let b = outf outp
        Expect.equal a b name

let makeTests tName tList =
    Expecto.Tests.testList tName tList

let makeTestNoOut f =
    makeTest id f

[<Tests>]
let t2 =
    let makePreProcTest name inp inM outp outM =
        testCase name <| fun () ->
            let preproc = evalMacros inp inM
            Expect.equal preproc (outp, outM) (sprintf "Prepoc '%s'" (combine inp))
    Expecto.Tests.testList "Preprocessor tests"
        [
            makePreProcTest "Preprocess1" ["These are words"] [] ["These are words"] []
        ]

[<Tests>]
let trimSourceTest =
    let makeTrimSourceTest =
        makeTestNoOut trimSource
    Expecto.Tests.testList "TrimSource tests"
        [
            makeTrimSourceTest "Trim1" [""; ""; "    "; "These are words"] ["These are words"]
            makeTrimSourceTest "Trim2" [""; "These are words"; ""] ["These are words"; ""]
            makeTrimSourceTest "Trim3" [""; ""; "\t  \t    \t"; "More"; ""; "And another"] ["More"; ""; "And another"]
        ]

[<Tests>]
let identifyBlockTypeTest =
    let makeIdBTTest =
        makeTestNoOut identifyBlockType
    Expecto.Tests.testList "Block Type Identify tests"
        [
            makeIdBTTest "IBT1" ["Hello world"] (Source ["Hello world"])
            makeIdBTTest "IBT2" ["    Code"] (CodeBlock ("python", ["    Code"]))
        ]

[<Tests>]
let nextBlockTest =
    testCase "Next Block Test" <| fun () ->
        let t = nextBlock [""; ""; ""; "      ";"\t     \t"; " random Word"]
        Expect.equal t (Source [" random Word"], []) "trimSourceTest1"
