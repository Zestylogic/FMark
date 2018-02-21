module Preprocessor

open EEExtensions

type Block =
    | Paragraph of content: string list
    | Code of language: string * content: string list

type Macro = {Name: string; Parameters: string list; Body: string list}

type MacroToken =
    | TEXT of string
    | WORD of string
    | 
    | ASSIGN | MACRO | OPENDEF | CLOSEDEF | OPENEVAL | CLOSEEVAL

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
        | [a] -> Some a
        | _ -> Some ""
    | _ -> None

let (|CodeSpaced|_|) = function
    | RegexMatch "^    " (_, _, r) -> Some r
    | _ -> None

let rec trimText = function
    | EmptyLine :: tl -> trimText tl
    | t -> t

let revBlock = function
    | Code (l, c) -> Code (l, List.rev c)
    | Paragraph s -> List.rev s |> Paragraph

let parseCodeSpaced code =
    let rec parseCodeSpaced' block rest =
        match block, rest with
        | Code (l, c), CodeSpaced s :: tl ->
            parseCodeSpaced' (Code (l, s :: c)) tl
        | Code (l, c), EmptyLine :: tl ->
            parseCodeSpaced' (Code (l, "" :: c)) tl
        | _, _ ->
            revBlock block, rest
    parseCodeSpaced' (Code ("", [])) code

let parseCodeDelim code l delim =
    let triple x =
        x+x+x
    let rec parseCodeSpaced' block rest =
        match block, rest with
        | Code (l, c), RegexMatch (sprintf "^%s+" (triple delim)) _ :: tl ->
            revBlock block, tl
        | Code (l, c), a :: tl ->
            parseCodeSpaced' (Code (l, a :: c)) tl
        | _, _ ->
            revBlock block, rest
    parseCodeSpaced' (Code (l, [])) code

let parseParagraph par =
    let rec parseParagraph' b r =
        match b, r with
        | _, EmptyLine :: r' -> revBlock b, r'
        | Paragraph p, a :: tl ->
            parseParagraph' (Paragraph (a :: p)) tl
        | _, _ ->
            revBlock b, r
    parseParagraph' (Paragraph []) par

let nextBlock par =
    match trimText par with
    | CodeDelim l :: tl -> parseCodeDelim tl l "`"
    | CodeSpaced _ :: _ as c -> parseCodeSpaced c
    | p -> parseParagraph p

let evalMacros source macros =
    source, macros

let preprocess (fileSource: string list) : Block list =
    [Paragraph [""]]
