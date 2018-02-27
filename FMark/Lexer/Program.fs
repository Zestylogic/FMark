open System
open Expecto

[<EntryPoint>]
let main argv =
    printfn "Welcome to FMark"
    Tests.runTestsInAssembly Tests.defaultConfig [||] |> ignore
    0