// Learn more about F# at http://fsharp.org

open MarkalcTest

[<EntryPoint>]
let markalcMain argv =
    printfn "Running tests..."
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig argv
    |> function
    | 0 ->
        // printfn "Updated TESTS.md document with \'Should pass\' tests."
        // testMarkdown true
        0
    | _ -> 1
