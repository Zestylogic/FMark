module TOCiteTest
open Types
open RefParse
open TOCite
open Expecto


// --------------------------------------------------------------------------------
let testDataHd = [
    "Basic Test",
    [ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"],
    (
        [{HeaderName = [FrmtedString (Literal "H1")]; Level = 1;}],
        [HEADER 0]
    );

    "Depth Test",
    [ENDLINE; HASH; HASH; HASH; WHITESPACE 1; LITERAL "h3"],
    (
        [{HeaderName = [FrmtedString (Literal "h3")]; Level = 3;}],
        [HEADER 0]
    );

    "Need space between hash and header text",
    [ENDLINE; HASH; LITERAL "H1"],
    (
        [],
        [ENDLINE; HASH; LITERAL "H1"]
    );

    "More fake hashes",
    [ENDLINE; HASH; HASH; HASH; LITERAL "NotHeader"; ENDLINE],
    (
        [],
        [ENDLINE; HASH; HASH; HASH; LITERAL "NotHeader"; ENDLINE]
    )

    "Hash character support within header text",
    [ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"; HASH; WHITESPACE 1; LITERAL "H2"],
    (
        [{HeaderName = [FrmtedString (Literal "H1"); FrmtedString (Literal "#");
            FrmtedString (Literal " "); FrmtedString (Literal "H2")]; Level = 1;}],
        [HEADER 0]
    );

    "Picking out header in document",
    [LITERAL "text1"; ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"; ENDLINE;
        LITERAL "text2"; ENDLINE],
    (
        [{HeaderName = [FrmtedString (Literal "H1")]; Level = 1;}],
        [LITERAL "text1"; HEADER 0; ENDLINE; LITERAL "text2"; ENDLINE]
    );

    "Header numbering",
    [ENDLINE; HASH; HASH; WHITESPACE 1; LITERAL "h1"; ENDLINE;
        HASH; WHITESPACE 1; LITERAL "h2"],
    (
        [{HeaderName = [FrmtedString (Literal "h1")]; Level = 2;};
            {HeaderName = [FrmtedString (Literal "h2")]; Level = 1;}],
        [HEADER 0; HEADER 1]
    )

    "Emphasis in header text",
    [ENDLINE; HASH; WHITESPACE 1; LITERAL "NotBold"; ASTERISK; LITERAL "bold"; ASTERISK],
    (
        [{HeaderName = [FrmtedString (Literal "NotBold");
            FrmtedString (Emphasis [FrmtedString (Literal "bold")])]; Level = 1;}],
        [HEADER 0]
    );
        
    "Multiple headers with emphasis",
    [ENDLINE; HASH; HASH; WHITESPACE 1;LITERAL "hi"; LITERAL "h2";
        ENDLINE; LITERAL "This is a Paragraph"; ENDLINE; HASH; HASH; HASH; WHITESPACE 3;
        ASTERISK; LITERAL "Another Title"; ASTERISK; ENDLINE],
    (
        [{HeaderName =[FrmtedString (Literal "hi");
            FrmtedString (Literal "h2")]; Level = 2;};
            {HeaderName = [FrmtedString (Emphasis [FrmtedString (Literal "Another Title")])];
            Level = 3;}],
        [HEADER 0; ENDLINE; LITERAL "This is a Paragraph"; HEADER 1; ENDLINE]
    )        
    ]

let makeHdTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (tocGen' inn 0) out "Unit test"

[<Tests>]
let hdTests =
    List.map makeHdTest testDataHd
    |> Expecto.Tests.testList "Specific header unit tests"
// --------------------------------------------------------------------------------
let testDataFt = [
    "Basic footer text",
    [LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; LITERAL "text1"; LITERAL "text2"; ENDLINE],
    (
        [Footnote (FtID 1, [FrmtedString (Literal "text1"); FrmtedString (Literal "text2")])],
        []
    );

    "Basic footer within text",
    [LITERAL "textbefore"; LSBRA; CARET; NUMBER "3"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [LITERAL "textbefore"; FOOTER (FtID 3); LITERAL "textAfter"; ENDLINE]
    );

    "Fake footer",
    [LITERAL "text1"; LSBRA; NUMBER "1"; RSBRA; LITERAL "text2"; ENDLINE],
    (
        [],
        [LITERAL "text1"; LSBRA; NUMBER "1"; RSBRA; LITERAL "text2"; ENDLINE]
    )

    "Footer text continuation over multiple lines",
    [LSBRA; CARET; NUMBER "2"; RSBRA; COMMA; LITERAL "text1";
        ENDLINE; WHITESPACE 4; LITERAL "text2"; ENDLINE; 
        LITERAL "text3";ENDLINE],
    (
        [Footnote (FtID 2, [FrmtedString (Literal "text1");
            FrmtedString (Literal "text2")]);],
        [LITERAL "text3"; ENDLINE]
    );

    "Footer texts sorting",
    [LSBRA; CARET; NUMBER "3"; RSBRA; COMMA; LITERAL "text3"; ENDLINE;
        LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; LITERAL "text1"; ENDLINE],
    (
        [Footnote (FtID 1,[FrmtedString (Literal "text1")]);
            Footnote (FtID 3,[FrmtedString (Literal "text3")])],
        []
    )

    "Emphasis in footer",
    [LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; WHITESPACE 1; UNDERSCORE;
        LITERAL "text1"; UNDERSCORE; WHITESPACE 1; LITERAL "text2"; ENDLINE],
    (
        [Footnote (FtID 1,[FrmtedString (Emphasis [FrmtedString (Literal "text1")]);
            FrmtedString (Literal "text2")])],
        []
    )


    ]

let makeFtTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (citeGen' inn) out "Unit test"

[<Tests>]
let ftTests =
    List.map makeFtTest testDataFt
    |> Expecto.Tests.testList "Specific footer unit tests"

// --------------------------------------------------------------------------------

let testDataRef =
    [
    "Basic reference",
    [LITERAL "author"; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; EQUAL; WHITESPACE 1;
        LITERAL "Not a real book"; COMMA],
    Harvard,
    [FrmtedString (Literal "Wang, "); FrmtedString (Literal "Z. ")]
    ]

let makeRefTest (name,inn,frmt,out) =
    testCase name <| fun () -> Expect.equal (refParser frmt inn) out "Unit test"

[<Tests>]
let refTests =
    List.map makeRefTest testDataRef
    |> Expecto.Tests.testList "Specific reference unit tests"
