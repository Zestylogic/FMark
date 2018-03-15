open ParserTest

[<EntryPoint>]
let parserMain argv =
    printfn "Hello World from FMark Parser!"
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig argv