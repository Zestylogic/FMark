module HTMLGenDummy

open Types


let rec inlineHTMLGen elem =
    match elem with
    //| Strong(x) -> // recursive...
    | Literal(s) -> s
    | Strong(x) -> sprintf "<strong>%s</strong>" (elemListHTMLGen x)
    | e -> failwithf "Unexpected element: %A" e

and elemListHTMLGen elemLst = 
    let folder s x = s + (inlineHTMLGen x)
    List.fold folder elemLst

let rec tableHTMLGenDummy tab =
    let getAlignment = function
    | Centre -> "align=\"center\""
    | Right -> "align=\"right\""
    | Left -> ""
    let getH = function
        | true -> "h"
        | false -> "d"
    let printCell s = function
                      | CellLine(line,h,ali) -> 
                        let cellContents = HTMLGenObjDummy line
                        s + sprintf "<t%s%s>%s</t%s>" (getH h) (getAlignment ali) cellContents (getH h)
    let printRow s = 
        function
        | PCells(clst,h) ->
            let rowTxt = sprintf "<tr>%s</tr>" (List.fold printCell "" clst)
            s + if h then sprintf "<thead>%s</thead>" rowTxt else rowTxt
    let s = "<table>" + printRow "" (List.head tab) + "<tbody>"
    List.fold printRow s tab.[1..]
    + "</tbody></table>"

and HTMLGenObjDummy ob =
    let f ob = 
        match ob with
        | Table(t) -> tableHTMLGenDummy t
        | CellContents(line) -> elemListHTMLGen line 
        | _ -> "Unexpected parsedObj"
    //(Result.bind f) ob
    f ob

let HTMLGen res = 
    let folder s x =
        s + HTMLGenObjDummy x
    match res with
    | Error(e) -> failwithf "Error: %A" e
    | Ok(pObj) -> List.fold folder "" pObj