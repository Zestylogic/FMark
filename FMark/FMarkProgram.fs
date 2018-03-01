open System

[<EntryPoint>]
let main argv =
    printfn "Welcome to FMark!"
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    0
