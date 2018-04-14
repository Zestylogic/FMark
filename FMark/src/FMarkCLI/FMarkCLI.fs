module FMarkCLI

open Types
open Argu
open Logger
open Shared
open Expecto

let mutable testResult = 0
let setTestResult i =
    testResult <- i

type CLIArguments =
    | [<MainCommand;AltCommandLine("-i")>] Input of path:string
    | [<AltCommandLine("-o")>] Output of path:string
    | [<AltCommandLine("-l")>] Loglevel of LogLevel
    | [<AltCommandLine("-f")>] Format of OutFormat
    | [<AltCommandLine("-t")>] Test of sequential:bool option
with
    interface IArgParserTemplate with
        member s.Usage =
            match s with
            | Input _ -> "specify input file path."
            | Output _ -> "specify output file path."
            | Loglevel _ -> "set the log level  ('0:DEBUG', '1:INFO', '2:WARNING', '3:ERROR' ,'4:FATAL')."
            | Format _ -> "specify format, by default: html."
            | Test _ -> "run CI tests."

let ifFlagRunTests (r:ParseResults<CLIArguments>) =
    r.TryGetResult(Test) |> function
    | Some(s) -> s |> function
                      | Some(true) ->
                        globLog.Info (Some 30) "Running tests sequentially."
                        Tests.runTestsInAssembly defaultConfig [|"--sequenced"|] |> setTestResult
                      | _ ->
                        globLog.Info (Some 33) "Running tests in parallel."
                        Tests.runTestsInAssembly defaultConfig [||] |> setTestResult
    | None(_) -> ()
    r

let ifFileReadFrom (r:ParseResults<CLIArguments>) =
    r.TryGetResult(Input)
    |> function
    | Some(fname) -> Some(FileIO.readFilePath fname,fname)
    | None(_) -> None

let setLoggerLevel (r:ParseResults<CLIArguments>)=
    r.GetResult(Loglevel,defaultValue=LogLevel.FATAL)
    |> function | l -> globLog <- Logger(l) // update the global logger with the new log value
    r

let welcomeMsg a =
    globLog.Info None "Welcome to FMark!"
    a

let logArgs (r:ParseResults<CLIArguments>) =
    sprintf "Got parse results %A" <| r.GetAllResults()
    |> globLog.Info None
    r

let processCLI argv =
    let errorHandler = ProcessExiter(colorizer = function ErrorCode.HelpText -> None | _ -> Some System.ConsoleColor.Red)
    let parser = ArgumentParser.Create<CLIArguments>(programName = "FMark", errorHandler = errorHandler)
    // Get command line options
    let results = parser.ParseCommandLine argv
    results
    |> setLoggerLevel // Set logger level
    |> welcomeMsg
    |> logArgs
    |> ifFlagRunTests
    |> ifFileReadFrom
    |> function
        | None(_) -> () // Do nothing
        | Some(instr,fname) ->
            let format = results.GetResult(Format,defaultValue = HTML)  // Find out format and output file name, convert.
            let defaultOutfile = if format=HTML then replaceChars "\.[a-zA-Z]+$" ".html" fname else replaceChars "\.[a-zA-Z]+$" "1.md" fname
            let outFile = results.GetResult(Output,defaultValue=defaultOutfile)
            FMark.processString "" format instr
            |> FileIO.writeToFile outFile

[<EntryPoint>]
let main argv =
    processCLI argv
    testResult // Return test result as exit code, if no tests ran it will default to 0
