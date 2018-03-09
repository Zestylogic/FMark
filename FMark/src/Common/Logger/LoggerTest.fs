module LoggerTest
open System.Reflection.Metadata

open Logger
open Expecto

/// Tests the log functions.
[<Tests>]
let loggerPropertyTest =
    testProperty "LoggerPropertyTest" <| fun (logLevel: LogLevel) ->
        let logger = Logger(logLevel)
        let res = sprintf "Testing loglevel: %A" logLevel |> logger.Fatal None
        Expect.equal res () "Logger did not return Unit."