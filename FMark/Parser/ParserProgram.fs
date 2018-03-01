open ParserTest

[<EntryPoint>]
let parserMain argv =
    runParserTest |> ignore
    printfn "Hello World from F#!"
    0