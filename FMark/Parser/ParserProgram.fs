open ParserTest

[<EntryPoint>]
let parserMain argv =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    printfn "Hello World from F#!"
    0