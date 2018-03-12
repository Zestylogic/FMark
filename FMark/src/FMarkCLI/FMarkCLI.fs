module FMarkCLI

open Types
open Argu
open System.Text.RegularExpressions

type CLIArguments =
    | [<MainCommand;AltCommandLine("-i")>] Input of path:string
    | [<AltCommandLine("-s")>] Stdin of text:string
    | [<AltCommandLine("-o")>] Output of path:string
    | [<AltCommandLine("-l")>] Loglevel of level:int
    | [<AltCommandLine("-f")>] Format of OutFormat
    | [<AltCommandLine("-t")>] Test

with
    interface IArgParserTemplate with
        member s.Usage =
            match s with
            | Input _ -> "specify input file path."
            | Stdin _ -> "using tool with stdin"
            | Output _ -> "specify output file path."
            | Loglevel _ -> "set the log level  ('3:DEBUG', '2:INFO', '1:WARNING', '0:ERROR')."
            | Format _ -> "specify format, by default: html."
            | Test _ -> "run CI tests."

let ifFlagRunTests (r:ParseResults<CLIArguments>) =
    r.TryGetResult(Test) |> function | Some(_) -> true | None(_) -> false
    |> function
    | true -> Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    | false -> ()

let ifFileReadFrom (r:ParseResults<CLIArguments>) =
    let readLines filePath = System.IO.File.ReadLines(filePath)
    // If Input is present
    r.TryGetResult(Input) 
    |> function 
    | Some(fname) -> Some(readLines fname |> Seq.toList,fname)
    | None(_) -> None

[<EntryPoint>]
let main argv =
    printfn "Welcome to FMark!"
    let errorHandler = ProcessExiter(colorizer = function ErrorCode.HelpText -> None | _ -> Some System.ConsoleColor.Red)
    let parser = ArgumentParser.Create<CLIArguments>(programName = "FMark", errorHandler = errorHandler)
    let results = parser.ParseCommandLine argv

    printfn "Got parse results %A" <| results.GetAllResults()
    ifFlagRunTests results

    // ############## EXAMPLE, NEEDS TIDYING UP ################
    match ifFileReadFrom results with
    | None(_) -> ()
    | Some(instr,fname) -> 
        let replaceChars pat (rep:string) s =
            Regex.Replace(s,pat,rep)
        let format = results.GetResult(Format,defaultValue = HTML )
        let defaultOutfile = if format=HTML then replaceChars ".md" ".html" fname  else replaceChars ".md" "1.md" fname
        let outFile = results.GetResult(Output,defaultValue=defaultOutfile)
        FMark.processString format instr
        |> function
            | Ok(s)
            | Error(s) -> IOFuncs.printToFile outFile s

    0