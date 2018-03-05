module HTMLGenDummy

open Types

let rec tableHTMLGenDummy tab =
    let getAlignment = function
    | Centre -> "align=\"center\""
    | Right -> "align=\"right\""
    | Left -> ""
    let getH = function
        | true -> "h"
        | false -> "d"
    let printCell s = function
                      | Contents(toks,h,ali) -> 
                        let cellContents = HTMLGenObjDummy (Parser.parseInLineElements toks 
                                                            |> (function | Ok(x) -> x | _ -> failwithf "Error parsing inside table cell.")
                                                            |> fst
                                                            |> List.head
                                                            |> CellContent)
                        s + sprintf "<t%s%s>%s</t%s>" (getH h) (getAlignment ali) cellContents (getH h)
    let printRow s = 
        function
        | Cells(clst,h) ->
            let rowTxt = sprintf "<tr>%s</tr>" (List.fold printCell "" clst)
            s + if h then sprintf "<thead>%s</thead>" rowTxt else rowTxt
    let s = "<table>" + printRow "" (List.head tab) + "<tbody>"
    List.fold printRow s tab.[1..]
    + "</tbody></table>"

and HTMLGenObjDummy ob =
    let f ob = 
        match ob with
        | Table(t) -> tableHTMLGenDummy t
        | CellContent(FrmtedString(Literal(s))) -> s
        | _ -> "<!--not a table-->"
    //(Result.bind f) ob
    f ob

let HTMLGen res = 
    let folder s x =
        s + HTMLGenObjDummy x
    match res with
    | Error(e) -> failwithf "Error: %A" e
    | Ok(pObj) -> List.fold folder "" pObj