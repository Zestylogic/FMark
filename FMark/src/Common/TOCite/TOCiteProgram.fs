open TOCite
open Parser
open TOCiteTest
open Types
open RefParse

[<EntryPoint>]
let TOCiteMain _ =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore

(*     let k = testDataRef |> List.map (fun (a,b,c,d) -> [refParser c b] |> Paragraph) |> strBody
    printf "%A" k *)
    //printf "%A" (mountedParser' [LITERAL "NotBold"; ASTERISK; LITERAL "bold"; ASTERISK])

    let k = (parseInLineElements [LITERAL "NotBold"; WHITESPACE 1; ASTERISK; LITERAL "bold"; ASTERISK])
    match k with
    | Ok a -> printf "%A" a
    | Error a -> printf "%A" a
    0
