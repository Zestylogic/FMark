open HTMLGenTester

[<EntryPoint>]
let parserMain argv =
    printfn "Hello World from F#!"
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig argv