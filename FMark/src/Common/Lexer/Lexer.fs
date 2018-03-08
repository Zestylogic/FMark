module Lexer

open Types
open Shared
open LexerShared

type LexerState = Normal | InCodeBlock

/// An escaped char tokenizer, which identifies the escaped characters and returns them
/// as a literal instead, without the leading '\'
let (|EscapedCharTok|_|) = (|EscapedChar|_|) LITERAL charList

/// Returns the Token type of the identifier token
let (|CharacterTok|_|) = (|Character|_|) charList

let (|MatchLang|_|) = function
    | "python" -> Some Python | "F#" -> Some FSharp
    | "C++" -> Some CPP | "C" -> Some C | "" -> Some Empty
    | _ -> None

/// Returns the next Token of a string
let nextToken = function
    | EscapedCharTok n
    | CharacterTok n -> n
    | RegexMatch @"^\s+" (m, _, s) ->
        String.length m |> WHITESPACE, s
    | RegexMatch "^[0-9]+" (m, _, s) ->
        NUMBER m, s
    | RegexMatch (literalString charList) (m, _, s) ->
        LITERAL m, s
    | s -> toString s.[0] |> LITERAL, s.[1..]

/// Lexes a whole string and returns the result as a Token list
let lexS state (cstr, l) source =
    let rec lexS' s tokList =
        match s with
        | ""-> ENDLINE :: tokList
        | _ ->
            let nt, st' = nextToken s
            nt :: tokList |> lexS' st'
    match source, state with
    | RegexMatch "^```+([a-zA-Z0-9+\\-_]*)" (_, [MatchLang lang], _), Normal ->
        [], InCodeBlock, ("", lang)
    | RegexMatch "^```+" _, InCodeBlock ->
        [CODEBLOCK (cstr, l); ENDLINE], Normal, ("", Empty)
    | _, InCodeBlock ->
            [], state, (cstr+"\n"+source, l)
    | RegexMatch @"^\s*$" _, _ -> [ENDLINE], state, ("", Empty)
    | _ -> lexS' source [] |> List.rev, state, ("", Empty)

let lex str =
    lexS Normal ("", Empty) str |> takeFirst

/// Lexes a list of strings and returns the Token list
let lexList strl =
    let f (flist, state, cb) nstr =
        let (lst, st, c) = lexS state cb nstr
        flist @ lst, st, c
    List.fold f ([], Normal, ("", Empty)) strl |> takeFirst
