module LoggerTest

open Logger
open Expecto

/// Tests the log functions.
[<PTests>]
let loggerPropertyTest =
    testProperty "LoggerPropertyTest" <| fun (logLevel: LogLevel) ->
        let logger = Logger(logLevel)
        let res = sprintf "Testing loglevel: %A" logLevel |> logger.Log logLevel None
        Expect.equal res () "Logger did not return Unit."
