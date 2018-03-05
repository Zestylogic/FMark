module IOFuncs
open System.IO

let printToFile fpath s =
    use sw = new StreamWriter(path=fpath)
    let myPrint format = fprintf sw format
    do myPrint "%s" s
    sw.Close()