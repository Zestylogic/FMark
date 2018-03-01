// Learn more about F# at http://fsharp.org

open MarkalcTest
open Expecto

[<EntryPoint>]
let markalcMain argv =
    printfn "Running tests..."
    runMarkalcTests
    printfn "Updated TESTS.md document with \'Should pass\' tests."
    testMarkdown
    0 // return an integer exit code
