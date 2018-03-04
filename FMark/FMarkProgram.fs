open System
open FMarkCLI
open Argu

[<EntryPoint>]
let main argv =
    printfn "Welcome to FMark!"
    let errorHandler = ProcessExiter(colorizer = function ErrorCode.HelpText -> None | _ -> Some ConsoleColor.Red)
    let parser = ArgumentParser.Create<CLIArguments>(programName = "FMark", errorHandler = errorHandler)
    let results = parser.ParseCommandLine argv

    printfn "Got parse results %A" <| results.GetAllResults()
    ifFlagRunTests results
    0
