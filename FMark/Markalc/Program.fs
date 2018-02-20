// Learn more about F# at http://fsharp.org

open System
open MarkalcTests

[<EntryPoint>]
let main argv =
    printfn "Running tests..."
    runTests
    0 // return an integer exit code
