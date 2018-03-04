module FMark

let process x =
    x 
    |> Preprocessor.preprocess
    |> Lexer.lex
    |> Parser.parse