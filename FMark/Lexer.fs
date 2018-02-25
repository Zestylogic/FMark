module Lexer

open Types
open Shared

let charList = ["#", HASH; "|", PIPE; "=", EQUAL; "-", MINUS; "+", PLUS; "*", ASTERISK
                ".", DOT; "**", DASTERISK; "***", TASTERISK; "_", UNDERSCORE; "__", DUNDERSCORE
                "___", TUNDERSCORE; "~", TILDE; "~~", DTILDE; "~~~", TTILDE; "[", LSBRA
                "]", RSBRA; "(", LBRA; ")", RBRA; @"\", BSLASH; "/", SLASH; "<", LABRA
                ">", RABRA; "{", LCBRA; "}", RCBRA; "`", BACKTICK; "```", TBACKTICK
                "!", EXCLAMATION; ":", COLON; "^", CARET; "%", PERCENT]

let (|EscapedCharTok|_|) = (|EscapedChar|_|) LITERAL charList

let (|CharacterTok|_|) = (|Character|_|) charList

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

let lex source =
    let rec lex' s tokList =
        match s with
        | "" -> ENDLINE :: tokList
        | _ ->
            let nt, st' = nextToken s
            nt :: tokList |> lex' st'
    match source with
    | RegexMatch @"^\s*$" _ -> [ENDLINE]
    | _ -> lex' source [] |> List.rev
