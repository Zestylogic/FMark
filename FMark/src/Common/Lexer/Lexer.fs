module Lexer

open Types
open Shared
open LexerShared

type LexerState =
    | Normal
    | InCodeBlock of content: string * Language
    | InHTMLTag of tag: string * depth: int

let htmlSingleton = [
    "area"; "base"; "br"; "col"; "command"; "embed"; "hr"; "img"; "input"
    "keygen"; "link"; "meta"; "param"; "source"; "track"; "wbr"
]

/// An escaped char tokenizer, which identifies the escaped characters and returns them
/// as a literal instead, without the leading '\'
let (|EscapedCharTok|_|) = (|EscapedChar|_|) LITERAL charList

/// Returns the Token type of the identifier token
let (|CharacterTok|_|) = (|Character|_|) charList

let (|MatchLang|_|) = function
    | RegexMatch "(p|P)ython" _ -> Some Python | RegexMatch "F#|fsharp|f#" _ -> Some FSharp
    | RegexMatch "(C|c)(\\+\\+|pp)" _ -> Some CPP | RegexMatch "C|c" _ -> Some C | _ -> Some Empty

let (|HTMLStartTag|_|) = (|RegexMatch|_|) "^<([a-zA-Z]+)\\s*.*?>"

let (|HTMLEndTag|_|) = (|RegexMatch|_|) "^<\\/([a-zA-Z]+)\\s*.*?>"

let (|HTMLSingleton|_|) = (|RegexMatch|_|) "^<([a-zA-Z]+)\\s*.*?(?:\\/>|>)"

let (|CodeBlockStart|_|) = (|GroupMatch|_|) "^```+\\s*([a-zA-Z0-9+\\-_]*)"

/// Returns the next Token of a string
let nextToken state s =
    match s, state with
    | EscapedCharTok n, _ -> n, state
    | HTMLStartTag (s, [t], r), Normal ->
        (LITERAL s, r), InHTMLTag (t, 1)
    | HTMLStartTag (s, [t], r), InHTMLTag (tag, d) ->
        if t = tag then
            (LITERAL s, r), InHTMLTag (tag, d+1)
        else
            (LITERAL s, r), InHTMLTag (tag, d)
    | HTMLEndTag (s, [t], r), InHTMLTag (tag, d) ->
        if t = tag then
            (LITERAL s, r), Normal
        else
            (LITERAL s, r), InHTMLTag (tag, d)
    | HTMLSingleton (s, _, r), _ ->
        (LITERAL s, r), state
    | CharacterTok n, _ -> n, state
    | RegexMatch @"^\s+" (m, _, s), _ ->
        (String.length m |> WHITESPACE, s), state
    | RegexMatch "^[0-9]+" (m, _, s), _->
        (NUMBER m, s), state
    | RegexMatch (literalString charList) (m, _, s), _ ->
        (LITERAL m, s), state
    | s, _ ->
        sprintf "Unrecognised character: %A" s |> sharedLog.Warn None
        (toString s.[0] |> LITERAL, (sOnwards 1 s)), state

/// Lexes a whole string and returns the result as a Token list
let lexS state source =
    let rec lexS' state s tokList =
        match s with
        | ""-> ENDLINE :: tokList
        | _ ->
            let (nt, st'), nstate = nextToken state s
            nt :: tokList |> lexS' nstate st'
    match source, state with
    | CodeBlockStart (MatchLang lang), Normal ->
        [], InCodeBlock ("", lang)
    | RegexMatch "^```+" _, InCodeBlock (s, lang) ->
        [CODEBLOCK (s, lang); ENDLINE], Normal
    | _, InCodeBlock (s, lang) ->
            [], InCodeBlock (s+source+"\n", lang)
    | RegexMatch @"^\s*$" _, _ ->
        [ENDLINE], state
    | _ ->
        lexS' state source [] |> List.rev, state

/// Return the correct token if it is not close properly at the end
let returnTokens = function
    | _, InCodeBlock (s, l) ->
        [CODEBLOCK (s, l); ENDLINE]
    | tok, InHTMLTag (str, _) ->
        tok @ [LITERAL str; ENDLINE]
    | tok, _ ->
        tok

/// Lex a single string
let lex s =
    lexS Normal s |> returnTokens

/// Lexes a list of strings and returns the Token list
let lexList strl =
    let f (flist, state) nstr =
        let (lst, st) = lexS state nstr
        flist @ lst, st
    List.fold f ([], Normal) strl |> returnTokens
