module Preprocessor

open EEExtensions

type TCodeBlock =
    | Space
    | Delimited

type Block =
    | Source of content: string list
    | CodeBlock of language: string * content: string list

type Macros = {Name: string; Parameters: string list; Body: string list}

let (|RegexMatch|_|) regex str =
    match String.regexMatch regex str with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        Some (m, grp, str.[lchar..])

let (|EmptyLine|NonEmptyLine|) = function
    | RegexMatch @"^\s*$" _ -> EmptyLine
    | _ -> NonEmptyLine

let (|CodeDelim|_|) = function
    | RegexMatch @"^(?:```+|~~~+)[ ]*([a-zA-Z\-_]*)" (_, s, _) ->
        match s with
        | [a] -> Some (a, [], Delimited)
        | _ -> Some ("", [], Delimited)
    | RegexMatch "^    (.*)" (_, s, _) -> Some ("", s, Space)
    | _ -> None

let identify = function
    | CodeLine l :: _ | CodeDelim l :: _ as x ->
        l
    | a :: _ -> Source [a]
    | _ -> Source []

let rec trimSource = function
    | EmptyLine :: tl -> trimSource tl
    | s -> s

// let nextBlock (source: string list): Block * rest: string list =
//     let init = trimSource source |> identify
//     let nextBlock' (block: Block) (rest: string list) =
        

let evalMacros source macros =
    source, macros

let preprocess (fileSource: string list) : Block list =
    [Source [""]]
