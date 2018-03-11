[<EntryPoint>]
let TOCiteMain _ =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    0
