module ParserTest

open Types
open ParserHelperFuncs
open Parser
open Expecto
open System.Net.Mail

let id x = x
let makeExpectoTestList inputTransform outputTransform testFunc name listOfIOPairs =
    let makeOneTest i (inn, out, msg) = testCase (sprintf "Parser/test number: %d" i) <| fun () ->
        Expect.equal (inn |> inputTransform |> testFunc) (outputTransform out) msg
    listOfIOPairs
    |> List.indexed
    |> List.map (fun (i, triple) -> makeOneTest i triple )
    |> Expecto.Tests.testList name

let makeOk x = x |> Ok

//////////////////////////////////
// tests
//////////////////////////////////

[<Tests>]
let cutIntoLinesTest =
    makeExpectoTestList id id cutIntoLines "cutIntoLines test" [
        (
            [WHITESPACE 2; WHITESPACE 4; LITERAL "Mike"],
            [[WHITESPACE 2; WHITESPACE 4; LITERAL "Mike"]],
            "2 WHITESPACE and LITERAL"
        );
        (
            [LITERAL "Mike";ENDLINE;LITERAL "C"],
            [[LITERAL "Mike"];[LITERAL "C"]],
            "2 lines"
        );
        (
            [ENDLINE;LITERAL "Mike";ENDLINE;LITERAL "C";ENDLINE;ENDLINE],
            [[];[LITERAL "Mike"];[LITERAL "C"];[];[]],
            "2 lines"
        );
    ]

[<Tests>]
let combineLiteralsTest =
    makeExpectoTestList id id combineLiterals "combineLiterals test" [
        (
            [FrmtedString(Literal "Borderlands"); FrmtedString(Literal "2")],
            [FrmtedString(Literal "Borderlands2")],
            "two adjacent Literals"
        );
        (
            [FrmtedString(Literal "Borderlands");FrmtedString(Emphasis[FrmtedString(Literal "!")]);FrmtedString(Literal "2")],
            [FrmtedString(Literal "Borderlands");FrmtedString(Emphasis[FrmtedString(Literal "!")]);FrmtedString(Literal "2")],
            "two adjacent Literals"
        );
    ]

[<Tests>]
let countSpaceTest =
    makeExpectoTestList id id countSpaces "countSpace test" [
        (
            [WHITESPACE 2; WHITESPACE 4; LITERAL "Mike"],
            6, "2 WHITESPACE and LITERAL"
        );
        (
            [WHITESPACE 2; DOT; WHITESPACE 4; LITERAL "Mike"],
            2, "2 WHITEPSPACE with DOT in between"
        );
        (
            [DOT; DOT; LITERAL "Mike"],
            0, "No WHITEPSACE"
        )
    ]

[<Tests>]
let countNewLinesTest =
    makeExpectoTestList id id countNewLines "countENDLINEs test" [
        (
            [ENDLINE; ENDLINE; LITERAL "Mike"],
            2, "2 ENDLINEs and LITERAL"
        );
        (
            [ENDLINE; DOT; ENDLINE; LITERAL "Mike"],
            1, "ENDLINE with DOT in between"
        );
        (
            [DOT; DOT; LITERAL "Mike"],
            0, "No EDNLINE"
        )
    ]

[<Tests>]
let parseInlineElementsTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"],
            [FrmtedString(Literal "I am")], "literal and 2 ENDLINEs"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 2],
            [FrmtedString(Literal "I am  ")], "literal with 2 whitespaces and 1 newline"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK],
            [FrmtedString(Code "This  is     code")], "only inline code"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK; LITERAL "na"],
            [FrmtedString(Code "This  is     code"); FrmtedString(Literal "na")],
            "inline code and literal"
        );
    ]

[<Tests>]
let emphasisTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements emphasis test" [
        (
            [LITERAL "I"; WHITESPACE 2; UNDERSCORE; LITERAL "am"; UNDERSCORE],
            [FrmtedString(Literal "I  "); FrmtedString(Emphasis([FrmtedString (Literal "am")]))],
            "literal and underscore emphasis literal"
        );
        (
            [LITERAL "I"; WHITESPACE 1;LITERAL "who"],
            [FrmtedString(Literal "I who")],
            "literal only"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; UNDERSCORE; WHITESPACE 2],
            [FrmtedString(Literal "I "); FrmtedString(Emphasis([FrmtedString(Literal "am")])); FrmtedString(Literal "  ")],
            "literal and underscore emphasis"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"],
            [FrmtedString(Literal "I _am")],
            "unmatched emphasis, UNDERSCORE"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"],
            [FrmtedString(Literal "I *am")],
            "unmatched emphasis, ASTERISK"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ASTERISK],
            [FrmtedString(Literal "I "); FrmtedString(Emphasis[FrmtedString(Literal "am")])],
            "asterisk as emphasis"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; WHITESPACE 1; UNDERSCORE; LITERAL "at"; UNDERSCORE],
            [FrmtedString(Literal "I "); FrmtedString(Emphasis[FrmtedString(Literal "am _at")])],
            "unmatched, matched emphasis in new line"
        );
        (
            [ASTERISK; LITERAL "am"; ASTERISK],
            [FrmtedString(Emphasis[FrmtedString(Literal "am")])],
            "emphasis, asterisk wo spaces"
        );
    ]

[<Tests>]
let ``strong test for parseInLineElements`` =
    makeExpectoTestList id id parseInLineElements "strong test for parseInLineElements" [
        (
            [LITERAL "I"; WHITESPACE 2; DUNDERSCORE; LITERAL "am"; DUNDERSCORE],
            [FrmtedString(Literal "I  "); FrmtedString(Strong([FrmtedString (Literal "am")]))],
            "literal and underscore strong literal"
        );
        (
            [LITERAL "I"; WHITESPACE 2; DASTERISK; LITERAL "am"; DASTERISK],
            [FrmtedString(Literal "I  "); FrmtedString(Strong([FrmtedString (Literal "am")]))],
            "literal and asterisk strong literal"
        );
        (
            [LITERAL "I";DASTERISK; LITERAL "am"; DASTERISK],
            [FrmtedString(Literal "I"); FrmtedString(Strong([FrmtedString (Literal "am")]))],
            "literal and asterisk strong literal, w/o space"
        );
        (
            [LITERAL "I"; DASTERISK; LITERAL "am"; ASTERISK],
            [FrmtedString(Literal "I**am*")],
            "unmatched double asterisk"
        );
        (
            [LITERAL "I"; DASTERISK; LITERAL "am"; ASTERISK; LITERAL "Commodo";DASTERISK],
            [FrmtedString(Literal "I"); FrmtedString(Strong([FrmtedString (Literal "am*Commodo")]))],
            "unmatched double asterisk, with asterisk inside"
        );
    ]

[<Tests>]
let ``strong and em test for parseInLineElements`` =
    makeExpectoTestList id id parseInLineElements "strong and em test for parseInLineElements" [
        (
            [LITERAL "I"; WHITESPACE 2; TUNDERSCORE; LITERAL "am"; TUNDERSCORE],
            [FrmtedString(Literal "I  "); FrmtedString(Emphasis[FrmtedString(Strong([FrmtedString (Literal "am")]))])],
            "literal and underscore strong and em literal"
        );
        (
            [LITERAL "I"; WHITESPACE 2; TASTERISK; LITERAL "am"; TASTERISK],
            [FrmtedString(Literal "I  "); FrmtedString(Emphasis[FrmtedString(Strong([FrmtedString (Literal "am")]))])],
            "literal and asterisk strong and em literal"
        );
    ]

[<Tests>]
let ``multiparagraph emphasis test`` =
    makeExpectoTestList id id (parseParagraph []) "multiparagraph emphasis test" [
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ENDLINE; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; UNDERSCORE],
            Paragraph[[FrmtedString(Literal "I *am")];
                [FrmtedString(Literal " ");FrmtedString(Emphasis[FrmtedString(Literal "Lord")])]],
            "unmatched emphasis, and new paragraph emphasis"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ASTERISK; ENDLINE; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; WHITESPACE 1; LITERAL "M"; TILDE;UNDERSCORE; ENDLINE; LITERAL "the feet of my"; MINUS; PLUS; HASH],
            Paragraph[[FrmtedString(Literal "I "); FrmtedString(Emphasis[FrmtedString(Literal "am")])];
                [FrmtedString(Literal " ");FrmtedString(Emphasis[FrmtedString(Literal "Lord M~")])]; [FrmtedString(Literal "the feet of my-+#")]],
            "asterisk and underscore em, 1 newline literal, misc Tokens"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; UNDERSCORE; WHITESPACE 1; LITERAL "an"; ASTERISK],
            Paragraph[[FrmtedString (Literal "I ");
                FrmtedString(Emphasis[FrmtedString (Literal "am ");
                    FrmtedString (Emphasis [FrmtedString (Literal "Lord")]);
                    FrmtedString (Literal " an")])]],
            "nested emphasis"
        );
    ]


[<Tests>]
let parseParagraphTest =
    makeExpectoTestList id id (parseParagraph [])"parseParagraph test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; LITERAL "dancing"; WHITESPACE 1; LITERAL "at";
            BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK; LITERAL "na"],
            Paragraph[[FrmtedString(Literal "I am")];
                [FrmtedString(Literal "dancing at"); FrmtedString(Code "This  is     code"); FrmtedString(Literal "na")]],
            "two simple paragraphs with code"
        );
    ]

[<Tests>]
let testGlobal =
    makeExpectoTestList id id parse "top level test" [
        (
           [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
           [Paragraph[[FrmtedString(Literal "I am Mike")]]] |> Ok, "Three literals with spaces between"
        );
        (
           [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike";ENDLINE],
           [Paragraph[[FrmtedString(Literal "I am Mike")]]] |> Ok, "Three literals with endline"
        );
        (
           [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike";ENDLINE;ENDLINE],
           [Paragraph[[FrmtedString(Literal "I am Mike")]]] |> Ok, "Three literals and new empty paragraph"
        );
        (
            [ENDLINE;ENDLINE; HASH; HASH; WHITESPACE 2; LITERAL "h2"],
            [Header({HeaderName=[FrmtedString(Literal "h2")]; Level=2},"h20")] |>Ok, "h2 header"
        );
        (
            [HASH; HASH; LITERAL "h2"],
            [Paragraph[[FrmtedString(Literal "##h2")]]] |>Ok, "fake h2 header"
        );
        (
            [RABRA; LITERAL "feet"],
            [Quote[FrmtedString(Literal "feet")]] |>Ok,
            "Simple quote"
        );
        (
            [CODEBLOCK("I am dancing at the feet of my lord", FSharp)],
            [CodeBlock("I am dancing at the feet of my lord", FSharp)] |>Ok,
            "Just CODEBLOCK"
        );
        (
            [CODEBLOCK("I am dancing at the feet of my lord", FSharp); ENDLINE; ENDLINE; LITERAL "Yes"],
            [CodeBlock("I am dancing at the feet of my lord", FSharp);
                Paragraph[[FrmtedString(Literal "Yes")]]] |>Ok,
            "CODEBLOCK and new paragraph"
        );
        (
            [LITERAL "Yes1"; ENDLINE; ENDLINE; LITERAL "Yes2"],
            [Paragraph[[FrmtedString(Literal "Yes1")]];Paragraph[[FrmtedString(Literal "Yes2")]]] |>Ok,
            "Just ENDLINE tokens don't break parser"
        );
        (
            [WHITESPACE(6); ENDLINE; ENDLINE;ENDLINE; LITERAL "Yes2"], // TODO: If there's only whitespace in a line should maybe ignore it.
            [Paragraph[[FrmtedString(Literal "      ")]];Paragraph[[FrmtedString(Literal "Yes2")]]] |>Ok, 
            "Just WHITESPACE in a line don't break parser"
        );
    ]

[<Tests>]
let ``reference tests`` =
    let refToks =
        [LSBRA; CARET; NUMBER "1"; RSBRA; COMMA; LITERAL "footer1"; ENDLINE;
            LSBRA; CARET; LITERAL "Eric"; RSBRA; COMMA; LITERAL "type";EQUAL; WHITESPACE 1;
                LITERAL "Website"; COMMA; LITERAL "author"; EQUAL; WHITESPACE 1;
                LITERAL "Eric"; WHITESPACE 1; LITERAL "Wang"; COMMA; LITERAL "title";
                EQUAL; WHITESPACE 1; LITERAL "Not a real website"; COMMA; LITERAL "year";
                EQUAL; WHITESPACE 1; NUMBER "2017"; COMMA; LITERAL "url"; EQUAL;
                WHITESPACE 1; LITERAL "www.example.com/website"; COMMA;
                LITERAL "access"; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "3";
                MINUS; NUMBER "4"; ENDLINE]
    let refStyleToks = [PERCENT; PERCENT; LITERAL "Style"; EQUAL; WHITESPACE 1; LITERAL "Chicago"; ENDLINE]
    let refPobjs =
        [
            Footnote (1,[FrmtedString (Literal "footer1")]);
            Citation (
                    "Eric",Literal "(Wang, 2017)",
                    [FrmtedString (Literal "Eric Wang. "); FrmtedString (Literal "2017. ");
                    FrmtedString (Literal "\"Not a real website.\" ");
                    FrmtedString (Literal "Accessed March 4, 2018. ");
                    Link (Literal "www.example.com/website","www.example.com/website")]
            )]
    makeExpectoTestList id makeOk parse "top level reference tests" [
        (
            refStyleToks
            @[LSBRA; CARET; NUMBER "1"; RSBRA]
            @refToks,
            [Paragraph [[Reference (Literal "1","1")]]]@refPobjs,
            "just 1 footnote"
        );
        (
            refStyleToks
            @[LSBRA; CARET; LITERAL "Eric"; RSBRA]
            @refToks,
            [Paragraph [[Reference (Literal "(Wang, 2017)","Eric")]]]@refPobjs,
            "just 1 citation"
        );
        (
            refStyleToks
            @[LITERAL "text3"; LSBRA; CARET; NUMBER "1"; RSBRA; LITERAL "text4"]
            @refToks,
            [Paragraph [[FrmtedString (Literal "text3");Reference (Literal "1","1"); FrmtedString (Literal "text4")]]]@refPobjs,
            "Literal and 1 footnote"

        );
        (
            refStyleToks
            @[LITERAL "text5"; LSBRA; CARET; LITERAL "Eric"; RSBRA; LITERAL "text6"]
            @refToks,
            [Paragraph [[FrmtedString (Literal "text5");Reference (Literal "(Wang, 2017)","Eric"); FrmtedString (Literal "text6")]]]@refPobjs,
            "Literal and 1 citation"
        );
        (
            refStyleToks
            @[LITERAL "text3"; LSBRA; CARET; NUMBER "1"; RSBRA; LITERAL "text4";ENDLINE]
            @[LITERAL "text5"; LSBRA; CARET; LITERAL "Eric"; RSBRA; LITERAL "text6"]
            @refToks,
            [Paragraph [
                    [FrmtedString (Literal "text3");Reference (Literal "1","1"); FrmtedString (Literal "text4")];
                    [FrmtedString (Literal "text5");Reference (Literal "(Wang, 2017)","Eric"); FrmtedString (Literal "text6")]
                ]]@refPobjs,
            "multiline, 1 footnote, 1 citation"
        );
    ]


[<Tests>]
let ``multiparagraph misc test`` =
    makeExpectoTestList id id parse "multiparagraph misc test" [
        (
            [ENDLINE; ENDLINE; LITERAL "feet"],
            ([Paragraph[[FrmtedString(Literal "feet")]]])|>Ok,
            "paragraph starting with two ENDLINEs"
        );
        (
            [ENDLINE; LITERAL "feet"],
            ([Paragraph[[FrmtedString(Literal "feet")]]])|>Ok,
            "paragraph starting with one ENDLINE"
        );
    ]


[<Tests>]
let ``symbols test`` =
    makeExpectoTestList id id parse "symbols test" [
        (
            [ENDLINE;COMMA;HASH;PIPE;BACKTICK;LBRA;UNDERSCORE;LSBRA],
            ([Paragraph[[FrmtedString(Literal ",#|`(_[")]]])|>Ok,
            "paragraph starting with two ENDLINEs"
        );
    ]

[<Tests>]
let ``preprocess table test`` =
    makeExpectoTestList id id parse "preprocess table test" [
        (   (*|head|
              |---|
              |cell|*)
            [PIPE;  LITERAL "head"; PIPE; ENDLINE; PIPE; MINUS;MINUS;MINUS; PIPE; ENDLINE; PIPE; LITERAL "cell"; PIPE],
            ([Table
                [PCells ([CellLine ([FrmtedString(Literal "head")],true,NoAlign)],true);
                 PCells ([CellLine ([FrmtedString(Literal "cell")],false,NoAlign)],false)]])|>Ok,
            "Sample table"
        );
        (
            [WHITESPACE 1; PIPE; ENDLINE; PIPE; MINUS; PIPE; ENDLINE; PIPE; LITERAL "cell"; PIPE],
            [Paragraph[[FrmtedString (Literal " |")]; [FrmtedString (Literal "|-|")];[FrmtedString (Literal "|cell|")]]]|>Ok,
            "Invalid table"
        );
        (
            [WHITESPACE 1; PIPE; ENDLINE; PIPE; MINUS; MINUS;COLON; MINUS; PIPE; ENDLINE; PIPE; LITERAL "cell"; PIPE],
            [Paragraph[[FrmtedString (Literal " |")]; [FrmtedString (Literal "|--:-|")];[FrmtedString (Literal "|cell|")]]]|>Ok,
            "Invalid table 2"
        )
       
    ]

let listTestData =
    let liPObj = StringItem([FrmtedString(Literal "li1")])
    let asLiToks = [ASTERISK;WHITESPACE 1;LITERAL "li1";ENDLINE]
    let muLiToks = [MINUS;WHITESPACE 1;LITERAL "li1";ENDLINE]
    let noLiToks = [NUMBER "1";DOT;WHITESPACE 1;LITERAL "li1";ENDLINE]
    let invalidNOliToks = [LITERAL "li1";ENDLINE]
    let ulPObj = {ListType=UL; ListItem=[liPObj]; Depth=0}
    let olPObj = {ListType=OL; ListItem=[liPObj]; Depth=0}
    [
        (
            asLiToks,
            {ListType=UL; ListItem=[liPObj]; Depth=0},
            "simple UL"
        );
        (
            asLiToks@asLiToks,
            {ListType=UL; ListItem=[liPObj;liPObj]; Depth=0},
            "simple 2 li UL"
        );
        (
            asLiToks@[WHITESPACE 2]@asLiToks@[WHITESPACE 2]@asLiToks,
            {ListType=UL; ListItem=[liPObj;NestedList({ulPObj with Depth=1; ListItem=[liPObj;liPObj]})]; Depth=0},
            "UL, 1 li, 2 sub li"
        );
        (
            asLiToks@[WHITESPACE 2]@asLiToks@[WHITESPACE 2]@asLiToks@asLiToks,
            {ListType=UL; ListItem=[liPObj;NestedList({ulPObj with Depth=1; ListItem=[liPObj;liPObj]});liPObj]; Depth=0},
            "UL, 1 li, 2 sub li"
        );
        (
            asLiToks@[WHITESPACE 2]@asLiToks@asLiToks,
            {ListType=UL; ListItem=[liPObj;NestedList({ulPObj with Depth=1});liPObj]; Depth=0},
            "UL, 2 li, 1 sub li"
        );
        (
            muLiToks@[WHITESPACE 2]@muLiToks@[WHITESPACE 2]@asLiToks@asLiToks,
            {ListType=UL; ListItem=[liPObj;NestedList({ulPObj with Depth=1; ListItem=[liPObj;liPObj]});liPObj]; Depth=0},
            "UL, 1 li, 2 sub li, minus and asterisk mixed"
        );
        (
            noLiToks@[WHITESPACE 2]@noLiToks@[WHITESPACE 2]@noLiToks@noLiToks,
            {ListType=OL; ListItem=[liPObj;NestedList({olPObj with Depth=1; ListItem=[liPObj;liPObj]});liPObj]; Depth=0},
            "OL, 1 li, 2 sub li"
        );
        (
            noLiToks@[WHITESPACE 2]@asLiToks@[WHITESPACE 2]@noLiToks@noLiToks,
            {ListType=OL; ListItem=[liPObj;NestedList({ulPObj with Depth=1; ListItem=[liPObj;liPObj]});liPObj]; Depth=0},
            "OL with sub UL, 1 li, 2 sub li"
        );
        (
            noLiToks@invalidNOliToks@noLiToks,
            {olPObj with ListItem=[liPObj;liPObj;liPObj]},
            "OL, 3 li, 1 invalid"
        );
        (
            noLiToks@[WHITESPACE 2]@invalidNOliToks@[WHITESPACE 2]@noLiToks@noLiToks,
            {ListType=OL; ListItem=[liPObj;NestedList({ulPObj with Depth=1; ListItem=[liPObj;liPObj]});liPObj]; Depth=0},
            "OL with sub UL, 1 li, 2 sub li begin with invalid list item"
        );
        (
            noLiToks@[WHITESPACE 2]@asLiToks@[WHITESPACE 4]@noLiToks@noLiToks,
            {ListType=OL;
                ListItem=[liPObj;
                    NestedList({ulPObj with Depth=1;ListItem=[liPObj;NestedList({olPObj with Depth=2})]});liPObj]; Depth=0},
            "OL, two nested lists"
        );
    ]

[<Tests>]
let ``parse list test`` =
    makeExpectoTestList deleteTrailingENDLINEs id parseList "parse list test" listTestData

[<Tests>]
let ``parse list test global`` =
    let makeOkAndList x = [x |> List] |> Ok
    makeExpectoTestList deleteTrailingENDLINEs makeOkAndList parse "parse list global test" listTestData

[<Tests>]
let ``TOC tests`` =
    let makeOkList = fun x -> [x] |> Ok
    let tocTok = [PERCENT;PERCENT;LITERAL"TOC"]
    let endline = [ENDLINE]
    let h1Tok = [HASH;WHITESPACE 1;LITERAL "h1"]
    let twoEndlines = endline@endline
    let parsedToc = ContentTable ({HeaderLst=[]})
    let h1THeader = {HeaderName = [Link (Line [FrmtedString (Literal "h1")],"#h10")]; Level = 1}
    let h1THeader2 = {HeaderName = [Link (Line [FrmtedString (Literal "h1")],"#h11")]; Level = 1}

    let h1ContentTable =
        ContentTable
            {HeaderLst =
                [
                h1THeader
                ]
            }
    let h1ContentTable2 =
        ContentTable
            {HeaderLst =
                [
                h1THeader;h1THeader2
                ]
            }
    let h1ParsedObj = Header ({HeaderName = [FrmtedString (Literal "h1")];Level = 1},"h10")
    let h1ParsedObj2 = Header ({HeaderName = [FrmtedString (Literal "h1")];Level = 1},"h11")

    makeExpectoTestList id makeOk parse "TOC tests"[
        (
            tocTok,
            [parsedToc],
            "no header in the doc"
        );
        (
            tocTok@twoEndlines@h1Tok,
            [h1ContentTable]@[h1ParsedObj],
            "TOC in the front, followed by h1"
        );
        (
            tocTok@twoEndlines@h1Tok@twoEndlines@h1Tok,
            [h1ContentTable2]@[h1ParsedObj]@[h1ParsedObj2],
            "TOC in the front, followed by 2 h1"
        );
        (
            h1Tok@twoEndlines@tocTok@twoEndlines@h1Tok,
            [h1ParsedObj]@[h1ContentTable2]@[h1ParsedObj2],
            "TOC in the middle of 2 h1"
        )

    ]

[<Tests>]
let ``picture and links tests`` =
    let hyperTextToks = [LITERAL "hyper"]
    let urlToks = [LITERAL "tmikey.tech"]
    makeExpectoTestList id id parseInLineElements "picture and links parseInLineElements test" [
        [LSBRA]@hyperTextToks@[RSBRA;LBRA]@urlToks@[RBRA],
        [Link(Line([FrmtedString(Literal "hyper")]), "tmikey.tech")],
        "1 link";
        [EXCLAMATION;LSBRA]@hyperTextToks@[RSBRA;LBRA]@urlToks@[RBRA],
        [Picture("hyper", "tmikey.tech")],
        "1 picture";
        [EXCLAMATION;LSBRA]@hyperTextToks@[LBRA]@urlToks@[RBRA],
        [FrmtedString (Literal "![hyper(tmikey.tech)")],
        "1 invalid picture, unclosed square bracket";
        [LSBRA]@hyperTextToks@[RSBRA;LBRA]@urlToks,
        [FrmtedString (Literal "[hyper](tmikey.tech")],
        "1 invalid link, unclosed round bracket"
    ]

[<Tests>]
let ``picture and links top level tests`` =
    let hyperTextToks = [LITERAL "hyper"]
    let urlToks = [LITERAL "tmikey.tech"]
    makeExpectoTestList id makeOk parse "picture and links top level parse test" [
        [LSBRA]@hyperTextToks@[RSBRA;LBRA]@urlToks@[RBRA],
        [Paragraph[[Link(Line([FrmtedString(Literal "hyper")]), "tmikey.tech")]]],
        "1 link";
        [EXCLAMATION;LSBRA]@hyperTextToks@[RSBRA;LBRA]@urlToks@[RBRA],
        [Paragraph[[Picture("hyper", "tmikey.tech")]]],
        "1 picture"
    ]

//let allTestsWithExpecto() =
//    runTestsInAssembly defaultConfig [||]
//let runParserTest =
//    allTestsWithExpecto() |> ignore
//    0