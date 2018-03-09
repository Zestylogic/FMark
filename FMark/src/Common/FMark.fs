module FMark

open Types

let preLexParse = 
    Preprocessor.preprocessList
    >> Lexer.lexList
    >> Parser.parse
let processString' formatFunc =
    preLexParse >> Result.map formatFunc

let processString format =
    match format with
    | f when f = HTML -> processString' (HTMLGen.strBody)
    | f when f = Markdown -> processString' (MarkdownGen.mdBody)
    | _ -> failwithf "Invalid format type generated, this should not be possible."
