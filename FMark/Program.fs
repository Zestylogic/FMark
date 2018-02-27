open System
open Expecto

[<EntryPoint>]
let main argv =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    0
