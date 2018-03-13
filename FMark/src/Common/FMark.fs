module FMark

open Types

let preLexParse dir = 
    Preprocessor.preprocessListWithDir dir
    >> Lexer.lexList
    >> Parser.parse
let processString' dir formatFunc =
    preLexParse dir >> Result.map formatFunc

let processString dir format =
    match format with
    | f when f = HTML -> processString' dir (HTMLGen.strBody)
    | f when f = Markdown -> processString' dir (MarkdownGen.mdBody)
    | _ -> failwithf "Invalid format type generated, this should not be possible."
