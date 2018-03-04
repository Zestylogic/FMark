module FMark

let processData x =
    x 
    |> Preprocessor.preprocess
    |> Lexer.lex
    |> Parser.parse