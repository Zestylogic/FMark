module TOCiteTest
open Types
open TOCite
open Expecto

// --------------------------------------------------------------------------------
let testDataHd = [
    "Basic Test",
    [ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"],
    (
        [{HeaderName = [FrmtedString (Literal "H1")]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0]
    );

    "Depth Test",
    [ENDLINE;ENDLINE; HASH; HASH; HASH; WHITESPACE 1; LITERAL "h3"],
    (
        [{HeaderName = [FrmtedString (Literal "h3")]; Level = 3;}],
        [ENDLINE;ENDLINE;HEADER 0]
    );

    "Need space between hash and header text",
    [ENDLINE;ENDLINE; HASH; LITERAL "H1"],
    (
        [],
        [ENDLINE;ENDLINE; HASH; LITERAL "H1"]
    );

    "More fake hashes",
    [ENDLINE;ENDLINE; HASH; HASH; HASH; LITERAL "NotHeader"; ENDLINE],
    (
        [],
        [ENDLINE;ENDLINE; HASH; HASH; HASH; LITERAL "NotHeader"; ENDLINE]
    )

    "Hash character support within header text",
    [ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"; HASH; WHITESPACE 1; LITERAL "H2"],
    (
        [{HeaderName = [FrmtedString (Literal "H1# H2")]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0]
    );

    "Picking out header in document",
    [LITERAL "text1"; ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "H1"; ENDLINE;ENDLINE;
        LITERAL "text2"; ENDLINE],
    (
        [{HeaderName = [FrmtedString (Literal "H1")]; Level = 1;}],
        [LITERAL "text1"; ENDLINE;ENDLINE;HEADER 0; ENDLINE;ENDLINE; LITERAL "text2"; ENDLINE]
    );

    "Header numbering",
    [ENDLINE;ENDLINE; HASH; HASH; WHITESPACE 1; LITERAL "h1"; ENDLINE;ENDLINE;
        HASH; WHITESPACE 1; LITERAL "h2"],
    (
        [{HeaderName = [FrmtedString (Literal "h1")]; Level = 2;};
            {HeaderName = [FrmtedString (Literal "h2")]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0; ENDLINE;ENDLINE;HEADER 1]
    )

    "Emphasis in header text",
    [ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "NotBold"; ASTERISK; LITERAL "bold"; ASTERISK],
    (
        [{HeaderName = [FrmtedString (Literal "NotBold");
            FrmtedString (Emphasis [FrmtedString (Literal "bold")])]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0]
    );
        
    "Multiple headers with emphasis",
    [ENDLINE;ENDLINE; HASH; HASH; WHITESPACE 1;LITERAL "h1"; LITERAL "h2";
        ENDLINE;ENDLINE; LITERAL "This is a Paragraph"; ENDLINE;ENDLINE; HASH; HASH; HASH; WHITESPACE 3;
        ASTERISK; LITERAL "Another Title"; ASTERISK; ENDLINE],
    (
        [{HeaderName =[FrmtedString (Literal "h1h2")]; Level = 2;};
            {HeaderName = [FrmtedString (Emphasis [FrmtedString (Literal "Another Title")])];
            Level = 3;}],
        [ENDLINE;ENDLINE;HEADER 0; ENDLINE;ENDLINE; LITERAL "This is a Paragraph"; ENDLINE;ENDLINE;HEADER 1; ENDLINE]
    );

    "Unclosed emphasis in header text",
    [ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "NotBold"; ASTERISK; LITERAL "bold"],
    (
        [{HeaderName = [FrmtedString (Literal "NotBold*bold")]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0]
    );

    "Footer in header",
    [ENDLINE;ENDLINE; HASH; WHITESPACE 1; LITERAL "text1"; FOOTNOTE 3; LITERAL "text2"],
    (
        [{HeaderName = [FrmtedString (Literal "text1");
                        Reference (Literal "3","footnote-3");
                        FrmtedString (Literal "text2");
                       ]; Level = 1;}],
        [ENDLINE;ENDLINE;HEADER 0]
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
        [Footnote (1, [FrmtedString (Literal "text1text2")])],
        []
    );

    "Basic reference text",
    [LSBRA; CARET; LITERAL "Eric"; RSBRA; COMMA; LITERAL "author"; EQUAL; WHITESPACE 1;
        LITERAL "Zifan"; WHITESPACE 1; LITERAL "Wang"; COMMA; LITERAL "title"; EQUAL;
        WHITESPACE 1; LITERAL "Not a real book"; COMMA; LITERAL "year"; EQUAL;
        WHITESPACE 1; LITERAL "2018"; ENDLINE],
    (
        [Citation ("Eric", Literal "(Wang)", [FrmtedString (Literal "Wang, ");
            FrmtedString (Literal "Z. ");
            FrmtedString (Emphasis [FrmtedString(Literal "Not a real book. ")])])],
        []
    );

    "Basic footer within text",
    [LITERAL "textbefore"; LSBRA; CARET; NUMBER "3"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [LITERAL "textbefore"; FOOTNOTE 3; LITERAL "textAfter"; ENDLINE]
    );

    "Basic reference within text",
    [LITERAL "textbefore"; LSBRA; CARET; LITERAL "Eric"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [LITERAL "textbefore"; CITATION "Eric"; LITERAL "textAfter"; ENDLINE]
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
        [Footnote (2, [FrmtedString (Literal "text1text2")]);],
        [LITERAL "text3"; ENDLINE]
    );

    "Footer texts no sorting",
    [LSBRA; CARET; NUMBER "3"; RSBRA; COMMA; LITERAL "text3"; ENDLINE;
        LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; LITERAL "text1"; ENDLINE],
    (
        [Footnote (3,[FrmtedString (Literal "text3")]);
            Footnote (1,[FrmtedString (Literal "text1")])],
        []
    )

    "Emphasis in footer",
    [LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; WHITESPACE 1; UNDERSCORE;
        LITERAL "text1"; UNDERSCORE; WHITESPACE 1; LITERAL "text2"; ENDLINE],
    (
        [Footnote (1,[FrmtedString (Literal " ");
            FrmtedString (Emphasis [FrmtedString (Literal "text1")]);
            FrmtedString (Literal " text2")])],
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

let testDataFull =
    [
    "Inline footer and references",
    [LITERAL "textbefore"; LSBRA; CARET; NUMBER "3"; RSBRA;
        LITERAL "textBetween"; LSBRA; CARET; LITERAL "Eric"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [],
        [LITERAL "textbefore"; FOOTNOTE 3; LITERAL "textBetween";
            CITATION "Eric"; LITERAL "textAfter"; ENDLINE]
    )

    "Stupidly big test",
    [PERCENT; PERCENT; LITERAL "Style"; EQUAL; WHITESPACE 1; LITERAL "Chicago";
        ENDLINE; LITERAL "text1"; HASH; LITERAL "text2"; ENDLINE; ENDLINE; HASH; WHITESPACE 1;
        LITERAL "Header1"; ENDLINE; LITERAL "text3"; LSBRA; CARET; NUMBER "1";
        RSBRA; LITERAL "text4"; ENDLINE; ENDLINE; LSBRA; CARET; NUMBER "1";
        RSBRA; COMMA; LITERAL "footer1"; ENDLINE; LITERAL "text5"; LSBRA; CARET;
        LITERAL "Eric"; RSBRA; LITERAL "text6"; ENDLINE; ENDLINE; LSBRA; CARET;
        LITERAL "Eric"; RSBRA; COMMA; LITERAL "type";EQUAL; WHITESPACE 1;
        LITERAL "Website"; COMMA; LITERAL "author"; EQUAL; WHITESPACE 1;
        LITERAL "Eric"; WHITESPACE 1; LITERAL "Wang"; COMMA; LITERAL "title";
        EQUAL; WHITESPACE 1; LITERAL "Not a real website"; COMMA; LITERAL "year";
        EQUAL; WHITESPACE 1; NUMBER "2017"; COMMA; LITERAL "url"; EQUAL;
        WHITESPACE 1; LITERAL "www.example.com/website"; COMMA;
        LITERAL "access"; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "3";
        MINUS; NUMBER "4"; ENDLINE],
    (
        [{HeaderName = [FrmtedString (Literal "Header1")]; Level = 1;}],
        [Footnote (1,[FrmtedString (Literal "footer1")]);
            Citation (
                "Eric",
                Literal "(Wang, 2017)",
                [FrmtedString (Literal "Eric Wang. ");
                FrmtedString (Literal "2017. ");
                FrmtedString (Literal "\"Not a real website.\" ");
                FrmtedString (Literal "Accessed March 4, 2018. ");
                Link (Literal "www.example.com/website","www.example.com/website")]
            )
        ],
        [ENDLINE; LITERAL "text1"; HASH; LITERAL "text2"; ENDLINE;ENDLINE;HEADER 0; ENDLINE;
            LITERAL "text3"; FOOTNOTE 1; LITERAL "text4"; ENDLINE; ENDLINE;
            LITERAL "text5"; CITATION "Eric"; LITERAL "text6"; ENDLINE; ENDLINE]
    )
    
    ]

let testConvHd =
    let rf (a,b) = (a,[],b)
    testDataHd |> List.map (fun (a,b,c) -> a, b, rf c)

let testConvFt = 
    let rf (a,b) = ([],a,b)
    testDataFt |> List.map (fun (a,b,c) -> a, b, rf c)

let makeFullTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (preParser inn) out "Unit test"

[<Tests>]
let fullTests =
    [testDataFull; testConvHd; testConvFt]
    |> List.reduce List.append
    |> List.map makeFullTest
    |> Expecto.Tests.testList "Preparser full unit tests"