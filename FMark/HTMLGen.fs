module HTMLGen

open Types

// TODO: Print contents of cell instead of text
let tableHTMLGenDummy tab =
    let getAlignment = function
    | Centre -> "align=\"center\""
    | Right -> "align=\"right\""
    | Left -> ""
    let getH = function
        | true -> "h"
        | false -> "d"
    // For each row in the table, surround by <tr/thead>
    let printCell s = function
                      | Contents(toks,h,ali) -> s + sprintf "<t%s%s>Test</t%s>" (getH h) (getAlignment ali) (getH h)
    let printRow s = 
        function
        | Cells(clst,h) ->
            let rowTxt = sprintf "<tr>%s</tr>" (List.fold printCell "" clst)
            s + if h then sprintf "<thead>%s</thead>" rowTxt else rowTxt
    let s = "<table>" + printRow "" (List.head tab) + "<tbody>"
    List.fold printRow s tab.[1..]
    + "</tbody></table>"

   
let HTMLGenObjDummy ob =
    match ob with
    | Table(t) -> tableHTMLGenDummy t
    //| LITERAL(l)
    | _ -> "<!--not a table-->"

let HTMLGenDummy res = 
    let folder s x =
        s + HTMLGenObjDummy x
    match res with
    | Error(e) -> failwithf "Error: %A" e
    | Ok(pObj) -> List.fold folder "" pObj