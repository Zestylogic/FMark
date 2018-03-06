module HTMLGenTester

open Types
open HTMLGen
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
let strInlineElementsTests =
    makeExpectoTestList id id strInlineElements "strInlineElementsTests" [
        (
            [FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))],
            "<strong>Go go go!</strong>", "strong tag"
        );
        (
            [FrmtedString(Emphasis([FrmtedString(Literal "Go go go!")]))],
            "<em>Go go go!</em>", "em tag"
        );
        (
            [Link(Emphasis([FrmtedString(Literal "Go go go!")]), "www.google.co.uk")],
            "<a href=\"www.google.co.uk\"><em>Go go go!</em></a>", "a tag"
        );
        (
            [Picture("404 not found", "www.google.co.uk/img.jpg")],
            "<img src=\"www.google.co.uk/img.jpg\" alt=\"404 not found\">", "picture tag"
        );
    ]

[<Tests>]
let paragraphTests =
    makeExpectoTestList id id strParagraph "paragraph tests" [
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]],
            "<p>\n<strong>Go go go!</strong>\n</p>", "strong tag"
        );
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]],
            "<p>\n\t<strong>Go go go!</strong>\n</p>", "strong tag"
        );
    ]


