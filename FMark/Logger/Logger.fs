module Logger

open System

type Logger() =

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

    // public interface
    member __.Debug = postStr "DEBUG"
    member __.Info = postStr "INFO"
    member __.Warn = postStr "WARNING"
    member __.Error = postStr "ERROR"
    member __.Fatal = postStr "FATAL"
