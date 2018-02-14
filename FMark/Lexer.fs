module Lexer

open EEExtensions
open Types

type LexerState = Normal | InCodeBlock | EmptyLine

type LexerData = {Source: string; State: LexerState}

let textRegex = @"[a-zA-Z0-9,. '\-]+"
let text = @"^"+textRegex
let italics = @"^(?:\*("+textRegex+")\*|_("+textRegex+")_)"
let bold = @"^(?:\*\*("+textRegex+")\*\*|__("+textRegex+")__)"
let strike = @"^~("+textRegex+")~"
let emptyLine = "^[ \t]*$"

let (|LMatch|_|) regex str =
    match String.regexMatch regex str with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        printfn "%A, %A" m grp
        Some (m, grp, str.[lchar..])

let retMatch =
    List.reduce (+)

let nextToken st =
    let newSt s = {st with Source = s}
    let noFormat = {Bold = false; Italic = false; Strike = false; InlineCode = false}
    match st.Source with
    | LMatch emptyLine (_, _, s) ->
        EMPTYLINE, newSt s
    | LMatch "^#" (_, _, s) ->
        HASH, newSt s
    | LMatch italics (_, grp, s) ->
        TEXT (retMatch grp, {noFormat with Italic = true}), newSt s
    | LMatch bold (_, grp, s) ->
        TEXT (retMatch grp, {noFormat with Bold = true}), newSt s
    | LMatch bold (_, grp, s) ->
        TEXT (retMatch grp, {noFormat with Strike = true}), newSt s
    | LMatch text (t, _, s) -> TEXT (t, noFormat), newSt s
    | _ -> failwithf "Not Matched"

let tokenize source =
    let rec tokenize' st tokList =
        match st.Source with
        | "" -> tokList
        | _ ->
            let nt, st' = nextToken st
            nt :: tokList |> tokenize' st'
    tokenize' {Source=source; State=Normal} [] |> List.rev
