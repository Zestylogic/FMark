// Learn more about F# at http://fsharp.org

open MarkalcTest

[<EntryPoint>]
let markalcMain argv =
    printfn "Running tests..."
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore 
    printfn "Updated TESTS.md document with \'Should pass\' tests."
    testMarkdown
    0 // return an integer exit code
