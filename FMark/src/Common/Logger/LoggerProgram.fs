// Learn more about F# at http://fsharp.org

open Expecto

[<EntryPoint>]
let main argv =
    Tests.runTestsInAssembly Tests.defaultConfig argv
