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

    // ############## EXAMPLE, NEEDS TIDYING UP ################
    match ifFileReadFrom results with
    | None(_) -> ()
    | Some(instr,fname) -> 
        let strip chars s = (String.map (fun c -> if Seq.exists((=)c) chars then ' ' else c) s).Trim()
        let outFile = results.GetResult(Output,defaultValue=strip ".md" fname+".html")
        FMark.processDataDummy instr
        |> MarkalcShared.printToFile outFile

    0
