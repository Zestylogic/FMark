// Learn more about F# at http://fsharp.org

open MarkalcTests

[<EntryPoint>]
let main argv =
    printfn "Running tests..."
    runTests
    printfn "Updated TESTS.md document with \'Should pass\' tests."
    testMarkdown
    0 // return an integer exit code
