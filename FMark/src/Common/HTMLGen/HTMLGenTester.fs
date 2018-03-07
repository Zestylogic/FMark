module HTMLGenTester

open Types
open HTMLGen
open HTMLGenHelpers
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
            "<p><strong>Go go go!</strong></p>", "strong tag"
        );
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]],
            "<p><strong>Go go go!</strong><a href=\"brokenURL\">broken link</a></p>", "strong and link tag"
        );
        (
            [[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]],
            "<p>Go go go!<a href=\"brokenURL\">broken link</a>Come!</p>", "indent test"
        );
    ]

[<Tests>]
let bodyTests =
    makeExpectoTestList id id strBody "body tests" [
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]]],
            "<p><strong>Go go go!</strong></p>", "strong tag"
        );
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]]],
            "<p><strong>Go go go!</strong><a href=\"brokenURL\">broken link</a></p>", "strong and link tag"
        );
        (
            [CodeBlock("fsharp is cool", FSharp)],
            "<code language=\"fsharp\">fsharp is cool</code>", "codeblock, noninline"
        );
        (
            [Quote([FrmtedString(Literal "fsharp is cool")])],
            "<q>fsharp is cool</q>", "quote"
        );
    ]

[<Tests>]
let bodyTableTests =
    makeExpectoTestList id id strTable "body table tests" [
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, Left)], true)],
            "<table><tbody><thead><tr><th align=\"left\">head</th></tr></thead></tbody></table>", "one thead only"
        );
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)],
            "<table><tbody><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead></tbody></table>", "two theads with different align"
        );
    ]