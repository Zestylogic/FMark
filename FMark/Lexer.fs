module Lexer

open Types

type LexerState = Normal | InCodeBlock

type LexerData = {Source: string; State: LexerState}

let nextToken st = END, st

let tokenize source =
    let rec tokenize' st tokList =
        match st.Source with
        | "" -> END :: tokList
        | _ ->
            let nt, st' = nextToken st
            nt :: tokList |> tokenize' st
    tokenize' {Source=source; State=Normal} [] |> List.rev
