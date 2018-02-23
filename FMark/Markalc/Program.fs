// Learn more about F# at http://fsharp.org

open System
open Types
open MarkalcTests
open Markalc

[<EntryPoint>]
let main argv =
    //printfn "Running tests..."
    runTests
    let lst = topLevel testExprData
    //let out =
    //    match map with
    //    | Ok(x) -> Map.tryFind (RowCol(0u,0u)) x |> Ok
    //    | _ -> Error "whatever"

    printfn "Output: List:%A" lst
    0 // return an integer exit code
