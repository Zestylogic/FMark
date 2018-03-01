module Lexer

open Types
open LexerShared

/// The list of characters used in the parser
let charList = ["#", HASH; "|", PIPE; "=", EQUAL; "-", MINUS; "+", PLUS; "*", ASTERISK
                ".", DOT; "**", DASTERISK; "***", TASTERISK; "_", UNDERSCORE; "__", DUNDERSCORE
                "___", TUNDERSCORE; "~", TILDE; "~~", DTILDE; "~~~", TTILDE; "[", LSBRA
                "]", RSBRA; "(", LBRA; ")", RBRA; @"\", BSLASH; "/", SLASH; "<", LABRA
                ">", RABRA; "{", LCBRA; "}", RCBRA; "`", BACKTICK; "```", TBACKTICK
                "!", EXCLAMATION; ":", COLON; "^", CARET; "%", PERCENT]

/// An escaped char tokenizer, which identifies the escaped characters and returns them
/// as a literal instead, without the leading '\'
let (|EscapedCharTok|_|) = (|EscapedChar|_|) LITERAL charList

/// Returns the Token type of the identifier token
let (|CharacterTok|_|) = (|Character|_|) charList

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

/// Lexes a list of strings and returns the Token list
let lexList =
    List.collect lex
