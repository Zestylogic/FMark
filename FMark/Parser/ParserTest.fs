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

let printParsedObj pobj =
    let printInlineElement inlineEle=
        match inlineEle with
        | FrmtedString str -> printf "It is %A" str
        | _ -> failwithf "not implemented"
    match pobj with
    | Paragraph lines ->
        lines
        |> List.map (fun inlines -> List.map printInlineElement inlines)
    | _ -> failwithf "not implemented"

//////////////////////////////////
// tests
//////////////////////////////////

[<Tests>]
let countSpaceTest =
    makeExpectoTestList id id countSpaces "countSpace test" [
        (
            [WHITESPACE 2; WHITESPACE 4; LITERAL "Mike"],
            6, "2 WHITESPACE and LITERAL"
        );
        (
            [WHITESPACE 2; DOT; WHITESPACE 4; LITERAL "Mike"],
            2, "WHITEPSPACE with DOT in between"
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
            ("I am Mike", []), "All valid literal and space"
        );
        (
            [LITERAL "I"; WHITESPACE 4; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
            ("I am Mike", []), "4 Spaces"
        );
        (
            [LITERAL "I"; ENDLINE; LITERAL "Mike"],
            ("I\nMike", []), "ENDLINE between LITERALs"
        );
        (
            [LITERAL "I"; ENDLINE; ENDLINE; LITERAL "am"],
            ("I", [ENDLINE; ENDLINE; LITERAL "am"]), "two endlines"
        )
    ]

[<Tests>]
let parseInlineElementsTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; ENDLINE],
            ([FrmtedString(Literal "I am")], [])|>Ok, "literal and two ENDLINEs"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 2; ENDLINE],
            ([FrmtedString(Literal "I am")], [])|>Ok, "2 whitespaces and 1 newline"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; UNDERSCORE],
            ([FrmtedString(Literal "I "); FrmtedString(Emphasis([FrmtedString (Literal "am")]))], [])|>Ok,
            "literal and emphasis literal"
        );
        (
            [LITERAL "I"; WHITESPACE 1; UNDERSCORE; LITERAL "am"; UNDERSCORE; WHITESPACE 2; ENDLINE],
            ([FrmtedString(Literal "I "); FrmtedString(Emphasis([FrmtedString(Literal "am")]))], [])|>Ok,
            "literal and emphasis, newTLine"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; ENDLINE; LITERAL "New line"],
            ([FrmtedString(Literal "I am")], [LITERAL "New line"])|>Ok, "Two paragraphs"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK],
            ([FrmtedString(Code "This  is     code")], [])|>Ok, "Only inline code"
        );
        (
            [BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK; LITERAL "na"],
            ([FrmtedString(Code "This  is     code"); FrmtedString(Literal "na")], [])|>Ok,
            "Inline code and literal"
        );
    ]

[<Tests>]
let emphasisTest =
    makeExpectoTestList id id parseInLineElements "parseInLineElements emphasis test" [
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
            "unmatched, matched emphasis"
        );
    ]

[<Tests>]
let ``multiparagraph emphasis test`` =
    makeExpectoTestList id id parseParagraph "multiparagraph emphasis test" [
        (
            [LITERAL "I"; WHITESPACE 1; ASTERISK; LITERAL "am"; ENDLINE; ENDLINE; WHITESPACE 1; UNDERSCORE; LITERAL "Lord"; UNDERSCORE],
            (Paragraph[[FrmtedString(Literal "I "); FrmtedString(Literal "*am")];
                [FrmtedString(Emphasis[FrmtedString(Literal "Lord")])]], [])|>Ok,
            "unmatched emphasis, and new paragraph emphasis"
        );
    ]

[<Tests>]
let parseParagraphTest =
    makeExpectoTestList id id parseParagraph "parseParagraph test" [
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; ENDLINE; ENDLINE; LITERAL "dancing"; WHITESPACE 1; LITERAL "at";
            BACKTICK; LITERAL "This"; WHITESPACE 2; LITERAL "is"; WHITESPACE 5;LITERAL "code"; BACKTICK; LITERAL "na"],
            (Paragraph[[FrmtedString(Literal "I am")];
                [FrmtedString(Literal "dancing at"); FrmtedString(Code "This  is     code"); FrmtedString(Literal "na")]], [])|>Ok,
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
           [Paragraph[[FrmtedString(Literal "I am Mike\n")]]] |> Ok, "Three literals with endline"
        );
        (
            [HASH; HASH; WHITESPACE 2; LITERAL "h2"],
            [Header{HeaderName=[FrmtedString(Literal "h2")]; Level=2}] |>Ok, "h2 header"
        );
        (
            [HASH; HASH; LITERAL "h2"],
            [Paragraph[[FrmtedString(Literal "##h2")]]] |>Ok, "fake h2 header"
        )
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
        )
    ]
let allTestsWithExpecto() =
    runTestsInAssembly defaultConfig [||]
let runParserTest =
    allTestsWithExpecto() |> ignore
    0
