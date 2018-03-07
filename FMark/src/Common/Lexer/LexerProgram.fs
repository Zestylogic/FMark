open System
open Expecto

[<EntryPoint>]
let lexerMain argv =
    printfn "Welcome to FMark"
    Tests.runTestsInAssembly Tests.defaultConfig [||] |> ignore
    0