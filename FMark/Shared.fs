module Shared

open EEExtensions

let (|RegexMatch|_|) regex str =
    match String.regexMatch regex str with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        Some (m, grp, str.[lchar..])

let literalString charList =
    let addEscape (c, _) =
        let replace (o: string) (n: string) (s: string) =
            s.Replace(o, n)
        ["\\"; "."; "^"; "$"; "*"; "+"; "-"; "?"; "("; ")"; "["; "]"; "{"; "}"; "|"; "/"]
        |> List.fold (fun st n -> replace n ("\\"+n) st) c

    let chars =
        List.map (addEscape >> (fun a -> a+"|")) charList
        |> List.fold (+) ""

    "^.+?(?=\\s|"+chars+"$)"

let (|CharMatch|_|) retLastMatch a charList (str: string) =
    let testStartWith (c, t) =
        let ch = a + c
        String.startsWith ch str, ch, t
    List.map testStartWith charList
    |> List.fold retLastMatch None

let (|Character|_|) charList (str: string) =
    let retLastMatch i = function
        | true, c, t -> Some (t, str.[String.length c..])
        | _ -> i
    (|CharMatch|_|) retLastMatch "" charList str

let (|EscapedChar|_|) tType charList (str: string) =
    let retLastMatch i = function
        | true, (c: string), _ -> Some (tType c.[1..], str.[String.length c..])
        | _ -> i
    (|CharMatch|_|) retLastMatch "\\" charList str
