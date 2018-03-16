module FMark

open Types

let addEndlines t =
    ENDLINE::ENDLINE::t
let preLexParse dir = 
    Preprocessor.preprocessListWithDir dir
    >> Lexer.lexList
    >> addEndlines
    >> Parser.parse

let processString' dir formatFunc =
    preLexParse dir >> Result.map formatFunc

let processString dir format =
    match format with
    | HTML -> processString' dir (fun x -> HTMLGen.genHTML (dir,x))
    | Markdown -> processString' dir MarkdownGen.mdBody
