#load "Logger.fs"

open Logger

let slowConsoleWrite msg = 
    msg |> String.iter (fun ch->
        System.Threading.Thread.Sleep(1)
        System.Console.Write ch
        )

let logger = Logger(LogLevel.DEBUG)
Some 2 |> logger.Debug "Hello world"
