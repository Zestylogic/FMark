module Preprocessor

open EEExtensions

type BlockType =
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

let (|CodeLine|SourceLine|) = function
    | RegexMatch @"^(?:```*|~~~*|    )" _ -> CodeLine
    | _ -> SourceLine

let specialChar = "@"

let combine = List.fold (+) ""

let identifyBlockType = function
    | CodeLine :: _ as c -> CodeBlock ("python", c)
    | s -> Source s

let rec trimSource = function
    | EmptyLine :: tl -> trimSource tl
    | s -> s

let nextBlock (src: string list): BlockType * string list =
    let trimmed = trimSource src
    let rec createBlock newBlock currBlock =
        match currBlock with
        | hd :: tl ->
            match hd with
            | NonEmptyLine -> createBlock (hd :: newBlock) tl
            | _ -> List.rev newBlock |> identifyBlockType, currBlock
        | _ -> Source [""], currBlock
    createBlock [] src

let evalMacros source macros =
    source, macros

let preprocess (fileSource: string list) : BlockType list =
    [Source [""]]
