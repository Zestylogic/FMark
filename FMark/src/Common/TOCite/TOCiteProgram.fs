open TOCiteTest
open Types
open RefParse
open HTMLGen

[<EntryPoint>]
let TOCiteMain _ =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore

(*     let k = testDataRef |> List.map (fun (a,b,c,d) -> [refParser c b] |> Paragraph) |> strBody
    printf "%A" k *)

    0
