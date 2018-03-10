module ParserTest

open Types
open ParserHelperFuncs
open Parser
open Expecto

let id x = x
let makeExpectoTestList inputTransform outputTransform testFunc name listOfIOPairs =
    let makeOneTest i (inn, out, msg) = testCase (sprintf "test numer: %d" i) <| fun () ->
        Expect.equal (inn |> inputTransform |> testFunc) (outputTransform out) msg
    listOfIOPairs
    |> List.indexed
    |> List.map (fun (i, triple) -> makeOneTest i triple )
    |> Expecto.Tests.testList name

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
let parseLiteralTest =
    makeExpectoTestList id id parseLiteral "parseLiteral test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
            ("I am Mike", []), "all valid literal and space"
        );
        (
            [LITERAL "I"; WHITESPACE 4; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
            ("I am Mike", []), "4 Spaces"
        );
        (
            [LITERAL "I"; ENDLINE; LITERAL "Mike"],
            ("I\nMike", []), "1 ENDLINE between LITERALs"
        );
        (
            [LITERAL "I"; ENDLINE; ENDLINE; LITERAL "am"],
            ("I", [ENDLINE; ENDLINE; LITERAL "am"]), "2 endlines"
        );
    ]

[<Tests>]
let parseLiteralEMTest =
    makeExpectoTestList id id parseLiteral "parseLiteral emphasis test" [
        (
            [LITERAL "I"; ASTERISK; LITERAL "am"],
            ("I", [LITERAL "I"; ASTERISK; LITERAL "am"]), "literal and asterisk"
        );
        (
            [LITERAL "I"; UNDERSCORE; LITERAL "am"],
            ("I", [UNDERSCORE; LITERAL "am"]), "literal and underscore, em end"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"],
            ("I ", [WHITESPACE 1; UNDERSCORE; LITERAL "am"]), "literal and underscore, space before em start"
        );
        (
            [UNDERSCORE; LITERAL "am"],
            ("", [UNDERSCORE; LITERAL "am"]), "underscore, no space before"
        );
    ]

[<Tests>]
let parseInlineElementsTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; ENDLINE],
            ([FrmtedString(Literal "I am")], [])|>Ok, "literal and 2 ENDLINEs"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 2; ENDLINE],
            ([FrmtedString(Literal "I am")], [])|>Ok, "literal with 2 whitespaces and 1 newline"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; ENDLINE; LITERAL "New line"],
            ([FrmtedString(Literal "I am")], [LITERAL "New line"])|>Ok, "two paragraphs"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK],
            ([FrmtedString(Code "This  is     code")], [])|>Ok, "only inline code"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK; LITERAL "na"],
            ([FrmtedString(Code "This  is     code"); FrmtedString(Literal "na")], [])|>Ok,
            "inline code and literal"
        );
    ]

[<Tests>]
let emphasisTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements emphasis test" [
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; UNDERSCORE],
            ([FrmtedString(Literal "I "); FrmtedString(Emphasis([FrmtedString (Literal "am")]))], [])|>Ok,
            "literal and underscore emphasis literal"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; UNDERSCORE; WHITESPACE 2; ENDLINE],
            ([FrmtedString(Literal "I "); FrmtedString(Emphasis([FrmtedString(Literal "am")]))], [])|>Ok,
            "literal and underscore emphasis, newTLine"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"],
            ([FrmtedString(Literal "I "); FrmtedString(Literal "_am")], [])|>Ok,
            "unmatched emphasis, UNDERSCORE"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"],
            ([FrmtedString(Literal "I "); FrmtedString(Literal "*am")], [])|>Ok,
            "unmatched emphasis, ASTERISK"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ASTERISK],
            ([FrmtedString(Literal "I "); FrmtedString(Emphasis[FrmtedString(Literal "am")])], [])|>Ok,
            "asterisk as emphasis"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; WHITESPACE 1; UNDERSCORE; LITERAL "at"; UNDERSCORE],
            ([FrmtedString(Literal "I "); FrmtedString(Literal "_am "); FrmtedString(Emphasis[FrmtedString(Literal "at")])], [])|>Ok,
            "unmatched, matched emphasis in new line"
        );
        (
            [ASTERISK; LITERAL "am"; ASTERISK],
            ([FrmtedString(Emphasis[FrmtedString(Literal "am")])], [])|>Ok,
            "emphasis, asterisk wo spaces"
        );
    ]

[<Tests>]
let ``multiparagraph emphasis test`` =
    makeExpectoTestList id id parseParagraph "multiparagraph emphasis test" [
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ENDLINE; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; UNDERSCORE],
            Paragraph[[FrmtedString(Literal "I "); FrmtedString(Literal "*am")];
                [FrmtedString(Emphasis[FrmtedString(Literal "Lord")])]],
            "unmatched emphasis, and new paragraph emphasis"
        );
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ASTERISK; ENDLINE; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; WHITESPACE 1; LITERAL "M"; TILDE;UNDERSCORE; ENDLINE; LITERAL "the feet of my"; MINUS; PLUS; HASH],
            Paragraph[[FrmtedString(Literal "I "); FrmtedString(Emphasis[FrmtedString(Literal "am")])];
                [FrmtedString(Emphasis[FrmtedString(Literal "Lord M~")])]; [FrmtedString(Literal "the feet of my-+#")]],
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
    makeExpectoTestList id id parseParagraph "parseParagraph test" [
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
            [HASH; HASH; WHITESPACE 2; LITERAL "h2"],
            [Header{HeaderName=[FrmtedString(Literal "h2")]; Level=2}] |>Ok, "h2 header"
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
//let allTestsWithExpecto() =
//    runTestsInAssembly defaultConfig [||]
//let runParserTest =
//    allTestsWithExpecto() |> ignore
//    0