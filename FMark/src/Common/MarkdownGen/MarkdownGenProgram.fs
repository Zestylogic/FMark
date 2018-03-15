open MarkdownGenTester

[<EntryPoint>]
let parserMain argv =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig argv |> ignore
    printfn "Hello World from F#!"
    0