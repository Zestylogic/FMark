open Expecto
open Logger

[<EntryPoint>]
let lexerMain argv =
    "Welcome to FMark Lexer and Preprocessor" |> globLog.Info (Some 6)
    runTestsInAssembly defaultConfig argv