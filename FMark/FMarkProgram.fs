open System
open MarkalcTest

[<EntryPoint>]
let main argv =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    0
