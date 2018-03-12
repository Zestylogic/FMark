module FileIO
open System.IO

let writeToFile fpath s =
    use sw = new StreamWriter(path=fpath)
    let myPrint format = fprintf sw format
    do myPrint "%s" s
    sw.Close()

let readFilePath path = 
     System.IO.File.ReadLines(path)
     |> Seq.toList