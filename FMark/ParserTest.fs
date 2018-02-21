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
let testList =
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
    makeExpectoTestList id id countSpace "countSpace test" [
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
let allTestsWithExpecto() =
    runTestsInAssembly defaultConfig [||]
let runParserTest =
    allTestsWithExpecto() |> ignore
    0
