module Lexer

type LexerState = Normal | InCodeBlock

type LexerData = {Source: string; State: LexerState}

let nextToken source = 

let tokenize source =
    let rec tokenize' tokenList source =
        match nextToken source with
        | 
