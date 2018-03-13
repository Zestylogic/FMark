module FileIO

open Fable.Import.Node.Exports

let writeToFile str path =
    let errorHandler _err = () // Ignore all errors
    fs.writeFile(path, str, errorHandler)

let splitString (s:string) =
    s.Split("\n") |> Array.toList
let readFilePath path =
    fs.readFileSync(path,()) 
    |> (fun s -> s.toString ())
    |> splitString

