module Parsertest
open Types
open Parser
open Expecto


// --------------------------------------------------------------------------------
let testDataHd = [
    "Basic Test",
    [HASH; WHITESPACE 1; LITERAL "H1"],
    [{HeaderName = [FrmtedString (Literal "H1")]; Level = 1;}];

    "Depth Test",
    [HASH; HASH; HASH; WHITESPACE 1; LITERAL "h3"],
    [{HeaderName = [FrmtedString (Literal "h3")]; Level = 3;}];

    "Need space between hash and header text",
    [HASH; LITERAL "H1"],
    [];

    "Hash character support within header text",
    [HASH; WHITESPACE 1; LITERAL "H1"; HASH; WHITESPACE 1; LITERAL "H2"],
    [{HeaderName = [FrmtedString (Literal "H1"); FrmtedString (Literal "#");
        FrmtedString (Literal " "); FrmtedString (Literal "H2")]; Level = 1;}];

    "Picking out header in document",
    [LITERAL "text1"; ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"; ENDLINE;
        LITERAL "text2"; ENDLINE],
    [{HeaderName = [FrmtedString (Literal "H1")];
        Level = 1;}];

    "Emphasis in header text",
    [HASH; WHITESPACE 1; LITERAL "NotBold"; ASTERISK; LITERAL "bold"; ASTERISK],
    [{HeaderName = [FrmtedString (Literal "NotBold");
        FrmtedString (Emphasis [FrmtedString (Literal "bold")])]; Level = 1;}];
        
    "Multiple headers",
    [HASH; HASH; WHITESPACE 1;LITERAL "hi"; LITERAL "this is a paragraph";
        ENDLINE; LITERAL "Cool"; HASH; HASH; HASH; WHITESPACE 3;
        ASTERISK; LITERAL "Another Title"; ASTERISK; ENDLINE],
    [{HeaderName =[FrmtedString (Literal "hi");
        FrmtedString (Literal "this is a paragraph")]; Level = 2;};
        {HeaderName = [FrmtedString (Emphasis [FrmtedString (Literal "Another Title")])];
        Level = 3;}]
    ]

let makeHdTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (tocGen inn 0) out "Unit test"

[<Tests>]
let hdTests =
    List.map makeHdTest testDataHd
    |> Expecto.Tests.testList "Specific header unit tests"
// --------------------------------------------------------------------------------
let testDataFt = [
    "Basic footer with text",
    [LSBRA; CARET; NUMBER "1"; RSBRA; COLON; LITERAL "text"; ENDLINE],
    [Footnote (1, [FrmtedString (Literal "text")])];

    "Footer continuation over multiple lines",
    [LSBRA; CARET; NUMBER "2"; RSBRA; COLON; LITERAL "text1";
        ENDLINE; WHITESPACE 4; LITERAL "text2"; ENDLINE; 
        LITERAL "text3";ENDLINE],
    [Footnote (2, [FrmtedString (Literal "text1");
        FrmtedString (Literal "text2")]);];

    "Footer sorting",
    [LSBRA; CARET; NUMBER "3"; RSBRA; COLON; LITERAL "text3"; ENDLINE;
        LSBRA; CARET; NUMBER "1"; RSBRA; COLON; LITERAL "text1"; ENDLINE],
    [Footnote (1,[FrmtedString (Literal "text1")]);
        Footnote (3,[FrmtedString (Literal "text3")])]
    ]

let makeFtTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (citeGen inn) out "Unit test"

[<Tests>]
let ftTests =
    List.map makeFtTest testDataFt
    |> Expecto.Tests.testList "Specific footer unit tests"
