module Logger

open System

type LogLevel =
    | DEBUG=0
    | INFO=1
    | WARNING=2
    | ERROR=3
    | FATAL=4

let logLevelStr =
    [
        LogLevel.DEBUG, "DEBUG"
        LogLevel.INFO, "INFO"
        LogLevel.WARNING, "WARNING"
        LogLevel.ERROR, "ERROR"
        LogLevel.FATAL, "FATAL"
    ] |> Map.ofList

type Logger(logLevel) =

    // create the mailbox processor
    let agent = MailboxProcessor.Start(fun inbox -> 

        // the message processing function
        let rec messageLoop () = async {

            // read a message
            let! msg = inbox.Receive()

            // write it to the log
            printfn "%s" msg

            // loop to top
            return! messageLoop ()
            }

        // start the loop
        messageLoop ()
        )

    let postStr pType msg = function
        | Some l ->
            sprintf "%s [%s] (%d) %s" pType (DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) l msg |> agent.Post
        | _ ->
            sprintf "%s [%s] %s" pType (DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) msg |> agent.Post

    let log t l msg =
        if t >= logLevel then
            postStr logLevelStr.[t] msg l
        else ()

    // Public API
    member __.Debug = log LogLevel.DEBUG
    member __.Info = log LogLevel.INFO
    member __.Warn = log LogLevel.WARNING
    member __.Error = log LogLevel.ERROR
    member __.Fatal = log LogLevel.FATAL

let logPass line log s =
    s |> log line
    s

let logPassN log s =
    s |> log None
    s