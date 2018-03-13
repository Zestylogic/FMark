module FileIO

open Fable.Import.Node.Exports

let writeToFile str path =
    let errorHandler _err = () // Ignore all errors
    fs.writeFile(path, str, errorHandler)

let readFilePath path = 
    let mutable outStr = ""
    fs.readFile(path, (fun err data ->
        match err with
        | Some _ -> () // If error while reading file, return empty string
        | None -> outStr <- data.toString () ())) |> ignore
    outStr.Split("\n") |> Array.toList
