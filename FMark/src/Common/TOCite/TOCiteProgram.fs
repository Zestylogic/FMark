open TOCiteTest
open Types
open HTMLGen

[<EntryPoint>]
let TOCiteMain _ =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore

    let k = testDataRef |> List.map (fun (a,b,c,d) -> [d] |> Paragraph) |> strBody
    printf "%A" k

    0
