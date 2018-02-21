module ParserTest

open Types
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

[<Tests>]
/// (input, output, msg)
let testGlobal =
    makeExpectoTestList id id parse "Literal and space only" [
        (
           [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
           [Paragraph[[FrmtedString(Literal "I am Mike")]]] |> Ok, "Three literals with spaces between"
        );
        (
           [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 1; LITERAL "Mike"],
           [Paragraph[[FrmtedString(Literal "I am Mike")]]] |> Ok, "Three literals with endline"
        )
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
            2, "WHITEPSPACE with DOT in between"
        );
        (
            [DOT; DOT; LITERAL "Mike"],
            0, "No WHITEPSACE"
        )
    ]

[<Tests>]
let countENDLINEsTest =
    makeExpectoTestList id id countENDLINEs "countENDLINEs test" [
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
            ("I Mike", []), "ENDLINE between LITERALs"
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
            ([FrmtedString(Literal "I am")], [ENDLINE; ENDLINE]), "literal and two ENDLINEs"
        );
        (
            [LITERAL "I"; WHITESPACE 1; LITERAL "am"; WHITESPACE 3; ENDLINE],
            ([FrmtedString(Literal "I am")], []), "2 whitespaces and 1 newline"
        )
    ]
let allTestsWithExpecto() =
    runTestsInAssembly defaultConfig [||]
let runParserTest =
    allTestsWithExpecto() |> ignore
    0
