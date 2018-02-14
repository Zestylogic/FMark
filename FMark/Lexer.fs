module Lexer

open EEExtensions
open Types

type LexerState = Normal | InCodeBlock | EmptyLine

type LexerData = {Source: string; State: LexerState}

let textRegex = @"[^#|=\-+*_~\[\]()\\/<>{}`!]+"
let literal = @"^"+textRegex
let emphasis = @"^(?:\*("+textRegex+")\*|_("+textRegex+")_)"
let strong = @"^(?:\*\*("+textRegex+")\*\*|__("+textRegex+")__)"
let strike = @"^~("+textRegex+")~"
let emptyLine = "^[ \t]*$"

let (|LMatch|_|) regex st =
    match String.regexMatch regex st.Source with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        printfn "%A, %A" m grp
        Some (m, grp, {st with Source = st.Source.[lchar..]})

let (|Emphasis|_|) = function
    | LMatch emphasis s -> Some s
    | _ -> None

let (|Strong|_|) = function
    | LMatch strong s -> Some s
    | _ -> None

let (|Literal|_|) = function
    | LMatch literal s -> Some s
    | _ -> None

let (|Character|_|) = function
    | LMatch "^#" _ -> Some HASH
    | LMatch @"^\|" _ -> Some PIPE
    | LMatch "^=" _ -> Some EQUAL
    | LMatch "^-" _ -> Some MINUS
    | LMatch @"^\+" _ -> Some PLUS
    | LMatch @"^\*" _ -> Some ASTERISK
    | LMatch "^_" _ -> Some UNDERSCORE
    | LMatch "^~" _ -> Some TILDE
    | LMatch @"^\[" _ -> Some LSBRA
    | LMatch @"^\]" _ -> Some RSBRA
    | LMatch @"^\(" _ -> Some LBRA
    | LMatch @"^\)" _ -> Some RBRA
    | LMatch @"^\\" _ -> Some BSLASH
    | LMatch @"^\/" _ -> Some SLASH
    | LMatch "^<" _ -> Some LABRA
    | LMatch "^>" _ -> Some RABRA
    | LMatch "^{" _ -> Some LCBRA
    | LMatch "^}" _ -> Some RCBRA
    | LMatch "^`" _ -> Some BACKTICK
    | LMatch "^!" _ -> Some EXCLAMATION
    | _ -> None

let retMatch =
    List.reduce (+)

let nextToken st =
    let newSt s = {st with Source = s}
    match st with
    | LMatch emptyLine (_, _, s) ->
        EMPTYLINE, s
    | Emphasis (_, grp, s) ->
        retMatch grp |> EMPHASIS, s
    | Strong (_, grp, s) ->
        retMatch grp |> STRONG, s
    | Literal (t, _, s) ->
        LITERAL t, s
    | Character tok ->
        tok, newSt st.Source.[1..]
    | _ -> failwithf "Not Matched"

let tokenize source =
    let rec tokenize' st tokList =
        match st.Source with
        | "" -> tokList
        | _ ->
            let nt, st' = nextToken st
            nt :: tokList |> tokenize' st'
    tokenize' {Source=source; State=Normal} [] |> List.rev
