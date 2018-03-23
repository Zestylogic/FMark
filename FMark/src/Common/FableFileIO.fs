module FileIO

open Fable.Import.Node.Exports

let writeToFile str path =
    let errorHandler _err = () // Ignore all errors
    fs.writeFile(path, str, errorHandler)

let splitString (s:string) =
    s.Split("\n") |> Array.toList

let checkExists (path:string) =
    fs.existsSync(Fable.Core.U2.Case1 path)
let readFilePath path =
    path 
    |> checkExists
    |> function
    | true ->
        fs.readFileSync(path,()) 
        |> (fun s -> s.toString ())
        |> splitString
    | false -> path |> splitString

