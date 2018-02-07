module Lexer

open Types

type LexerState = Normal | InCodeBlock

type LexerData = {Source: string; State: LexerState}

let nextToken source = END

let tokenize st =
    let rec tokenize' tokList st =
        match st.Source with
        | "" -> END :: tokList
        | _ ->
            match 
