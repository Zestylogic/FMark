module Parsertest
open Types
open Parser
open Expecto





let testTokenLst = [HASH; HASH; WHITESPACE 1;LITERAL "hi"; LITERAL "this is a paragraph";
                    ENDLINE; LITERAL "Cool"; HASH; HASH; HASH; WHITESPACE 3;
                    ASTERISK; LITERAL "Another Title"; ASTERISK; ENDLINE]
let testTokenLst2 = [LSBRA; CARET; NUMBER "2"; RSBRA; COLON; LITERAL "This...text.";
                    ENDLINE; WHITESPACE 4; LITERAL "conti...lines."; ENDLINE; 
                    LITERAL "stop...nted.";ENDLINE; LSBRA; CARET; NUMBER "1"; RSBRA;
                    COLON; LITERAL "Second text"; ENDLINE]

let answer1 = [{HeaderName =[FrmtedString (Literal "hi");
                                FrmtedString (Literal "this is a paragraph")];
                                Level = 2;};
                {HeaderName = [FrmtedString (Emphasis [FrmtedString (Literal "Another Title")])];
  Level = 3;}]
let answer2 = [Footnote (2, [FrmtedString (Literal "This...text.");
                             FrmtedString (Literal "conti...lines.")]);
                Footnote (1,[FrmtedString (Literal "Second text")])]

let makeTest name inn out =
    testCase name <| fun () -> Expect.equal inn out "Unit Test"

[<Tests>]
let HeaderTests =
    Expecto.Tests.testList "General Header Tests"
            [
                makeTest "Test1" (tocParse testTokenLst 0) answer1
            ]

[<Tests>]
let FooterTests =
    Expecto.Tests.testList "General Footer Tests"
            [
                makeTest "Test2" (citeParse testTokenLst2) answer2
            ]
