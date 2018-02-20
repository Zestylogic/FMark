module Lexer

open EEExtensions
open Types

let (|LMatch|_|) regex s =
    match String.regexMatch regex s with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        Some (m, grp, s.[lchar..])

let charList = ["#", HASH; "|", PIPE; "=", EQUAL; "-", MINUS; "+", PLUS; "*", ASTERISK
                ".", DOT; "**", DASTERISK; "***", TASTERISK; "_", UNDERSCORE; "__", DUNDERSCORE
                "___", TUNDERSCORE; "~", TILDE; "~~", DTILDE; "~~~", TTILDE; "[", LSBRA
                "]", RSBRA; "(", LBRA; ")", RBRA; @"\", BSLASH; "/", SLASH; "<", LABRA
                ">", RABRA; "{", LCBRA; "}", RCBRA; "`", BACKTICK; "```", TBACKTICK
                "!", EXCLAMATION; ":", COLON; "^", CARET]

let literalString =
    let (|CharToEscape|_|) c =
        let eChar = ["-"; "["; "]"; @"\"]
        match List.exists ((=) c) eChar with
        | true -> Some (@"\" + c)
        | _ -> None

    let chars =
        List.map (function | CharToEscape c, _ -> c | c, _ -> c) charList
        |> List.fold (+) ""

    "^[^ "+chars+"]+"

let (|Character|_|) (str: string) =
    let testStartWith (c, t) =
        String.startsWith c str, c, t
    let retLastMatch i = function
        | true, c, t -> Some (t, str.[String.length c..])
        | _ -> i
    List.map testStartWith charList
    |> List.fold retLastMatch None

let nextToken = function
    | Character n -> n
    | LMatch @"^\s+" (m, _, s) ->
        WHITESPACE (String.length m), s
    | LMatch "^[0-9]+" (m, _, s) ->
        NUMBER m, s
    | LMatch literalString (m, _, s) ->
        LITERAL m, s
    | _ -> failwithf "Not Matched"

let tokenize source =
    let rec tokenize' s tokList =
        match s with
        | "" -> ENDLINE :: tokList
        | _ ->
            let nt, st' = nextToken s
            nt :: tokList |> tokenize' st'
    match source with
    | LMatch @"^\s*$" _ -> [ENDLINE]
    | _ -> tokenize' source [] |> List.rev
