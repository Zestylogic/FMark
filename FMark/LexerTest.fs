module LexerTest

open Types
open Lexer

open Expecto

[<Tests>]
let t2 = // test without HOF
    let makeTokenTest name inp outp =
        testCase name <| fun () ->
            let toks = tokenize inp
            Expect.equal toks outp (sprintf "Tokenize '%s'" inp)
    Expecto.Tests.testList "Lexer tests"
        [
            makeTokenTest "Lexer1" "" [EMPTYLINE]
            makeTokenTest "Lexer2" "Literal" [LITERAL "Literal"]
            makeTokenTest "Lexer3" "_emphasized_" [EMPHASIS "emphasized"]
            makeTokenTest "Lexer4" "__bold__" [STRONG "bold"]
            makeTokenTest "Lexer5" "`" [BACKTICK]
        ]
