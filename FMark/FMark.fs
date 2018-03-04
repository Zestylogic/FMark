module FMark

open HTMLGen

let preLexParse = 
    Preprocessor.preprocessList
    >> Lexer.lexList
    >> Parser.parse
let processDataDummy =
    preLexParse
    >> HTMLGenDummy