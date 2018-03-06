module FMark

let preLexParse = 
    Preprocessor.preprocessList
    >> Lexer.lexList
    >> Parser.parse
let processDataDummy =
    preLexParse >> HTMLGenDummy.HTMLGen
