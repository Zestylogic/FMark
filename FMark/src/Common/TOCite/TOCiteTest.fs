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

let failHdData = [
    "Unclosed emphasis in header text",
    [ENDLINE; HASH; WHITESPACE 1; LITERAL "NotBold"; ASTERISK; LITERAL "bold"],
    (
        [{HeaderName = [FrmtedString (Literal "NotBold");
            FrmtedString (Literal "*bold")]; Level = 1;}],
        [HEADER 0]
    );
]


let makeHdTest (name,inn,out) =
    testCase name <| fun () -> Expect.equal (tocGen' inn 0) out "Unit test"

[<Tests>]
let hdTests =
    List.map makeHdTest testDataHd
    |> Expecto.Tests.testList "Specific header unit tests"
[<PTests>]
let failHdTests =
    List.map makeHdTest failHdData
    |> Expecto.Tests.testList "Failing header test"
// --------------------------------------------------------------------------------
let testDataFt = [
    "Basic footer text",
    [LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; LITERAL "text1"; LITERAL "text2"; ENDLINE],
    (
        [Footnote (FtID 1, [FrmtedString (Literal "text1"); FrmtedString (Literal "text2")])],
        []
    );

    "Basic reference text",
    [LSBRA; CARET; LITERAL "Eric"; RSBRA; COMMA; LITERAL "author"; EQUAL; WHITESPACE 1;
        LITERAL "Zifan"; WHITESPACE 1; LITERAL "Wang"; COMMA; LITERAL "title"; EQUAL;
        WHITESPACE 1; LITERAL "Not a real book"; COMMA; LITERAL "year"; EQUAL;
        WHITESPACE 1; LITERAL "2018"; ENDLINE],
    (
        [Footnote (RefID "Eric", [FrmtedString (Literal "Wang, ");
            FrmtedString (Literal "Z. ");
            FrmtedString (Emphasis [FrmtedString(Literal "Not a real book")])])],
        []
    );

    "Basic footer within text",
    [LITERAL "textbefore"; LSBRA; CARET; NUMBER "3"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [LITERAL "textbefore"; FOOTER (FtID 3); LITERAL "textAfter"; ENDLINE]
    );

    "Basic reference within text",
    [LITERAL "textbefore"; LSBRA; CARET; LITERAL "Eric"; RSBRA;
        LITERAL "textAfter"; ENDLINE],
    (
        [],
        [LITERAL "textbefore"; FOOTER (RefID "Eric"); LITERAL "textAfter"; ENDLINE]
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
// testing single reference parsing
let testDataRef =
    [
    "Author only",
    [LITERAL "author"; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"],
    Harvard,
    [FrmtedString (Literal "Wang, "); FrmtedString (Literal "Z. ")];

    "Author with multiple given names",
    [LITERAL "author"; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Eric"; WHITESPACE 1; LITERAL "Wang"],
    Harvard,
    [FrmtedString (Literal "Wang, "); FrmtedString (Literal "E. ");
        FrmtedString (Literal "Z. ")];

    "Title only",
    [LITERAL "title";EQUAL; WHITESPACE 1; LITERAL "Book1"],
    Harvard,
    [FrmtedString (Emphasis [FrmtedString (Literal "Book1")])];

    "Title with multiple words",
    [LITERAL "title";EQUAL; WHITESPACE 1; LITERAL "Book1"; WHITESPACE 1;
        LITERAL "Subtitle"],
    Harvard,
    [FrmtedString (Emphasis [FrmtedString (Literal "Book1");
        FrmtedString (Literal "Subtitle")])];

    "Year only",
    [LITERAL "year";EQUAL; WHITESPACE 1; NUMBER "2018"],
    Harvard,
    [FrmtedString (Literal "(2018) ")];

    "URL only",
    [LITERAL "url";EQUAL; WHITESPACE 1; LITERAL "www.example.com"],
    Harvard,
    [FrmtedString (Literal "Available from: ");
        Link (Literal "www.example.com","www.example.com");
        FrmtedString (Literal " ")];

    "Access date only",
    [LITERAL "access";EQUAL; WHITESPACE 1; LITERAL "8th March 2018"],
    Harvard,
    [FrmtedString (Literal "[Accessed ");
        FrmtedString (Literal "8th March 2018"); FrmtedString (Literal "]")];

    "Book reference",
    [LITERAL "author"; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; EQUAL; WHITESPACE 1;
        LITERAL "Not a real book"; COMMA; LITERAL "year"; EQUAL; WHITESPACE 1;
        LITERAL "2018"],
    Harvard,
    [FrmtedString (Literal "Wang, "); FrmtedString (Literal "Z. ");
        FrmtedString (Emphasis [FrmtedString (Literal "Not a real book")])];

    "Website reference",
    [LITERAL "author"; EQUAL; WHITESPACE 1; LITERAL "Eric"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; EQUAL; WHITESPACE 1;
        LITERAL "Not a real website"; COMMA; LITERAL "year"; EQUAL;
        WHITESPACE 1; NUMBER "2017"; COMMA; LITERAL "url"; EQUAL;
        WHITESPACE 1; LITERAL "www.example.com/website"; COMMA;
        LITERAL "access"; EQUAL; WHITESPACE 1; LITERAL "4th March 2018"],
    Harvard,
    [FrmtedString (Literal "Wang, "); FrmtedString (Literal "E. ");
        FrmtedString (Emphasis [FrmtedString (Literal "Not a real website")]);
        FrmtedString (Literal "(2017) "); FrmtedString (Literal "Available from: ");
        Link (Literal "www.example.com/website","www.example.com/website");
        FrmtedString (Literal " "); FrmtedString (Literal "[Accessed ");
        FrmtedString (Literal "4th March 2018"); FrmtedString (Literal "]")]

    ]
let makeRefTest (name,inn,frmt,out) =
    testCase name <| fun () -> Expect.equal (refParser frmt inn) out "Unit test"

[<Tests>]
let refTests =
    List.map makeRefTest testDataRef
    |> Expecto.Tests.testList "Specific reference unit tests"

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
        [LITERAL "textbefore"; FOOTER (FtID 3); LITERAL "textBetween";
            FOOTER (RefID "Eric"); LITERAL "textAfter"; ENDLINE]
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