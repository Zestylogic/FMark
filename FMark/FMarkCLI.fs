module FMarkCLI
open Argu


type CLIArguments =
    | [<AltCommandLine("-o")>] Output of path:string
    | [<AltCommandLine("-l")>] Loglevel of level:int
    | [<AltCommandLine("-f")>] Format of string
    | [<AltCommandLine("-t")>] Test

with
    interface IArgParserTemplate with
        member s.Usage =
            match s with
            | Output _ -> "specify output file path."
            | Loglevel _ -> "set the log level  ('3:DEBUG', '2:INFO', '1:WARNING', '0:ERROR')."
            | Format _ -> "specify format, by default: html."
            | Test _ -> "run CI tests."

let ifFlagRunTests (r:ParseResults<CLIArguments>) =
    r.TryGetResult(Test) |> function | Some(_) -> true | None(_) -> false
    |> function
    | true -> Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore
    | false -> ()
