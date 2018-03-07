[<EntryPoint>]
let TOCiteMain argv =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    0
