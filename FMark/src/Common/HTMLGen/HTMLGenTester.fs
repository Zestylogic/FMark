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

/// "\b" is used as one indent character because backspace would never appear in input string
/// convert "\b" to `INDENT`, which is defined in HTMLGenHelpers
let fixNewLineAndIndent (str: string) =
    str.Replace("\b", INDENT).Replace("\n", NLS)

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
    makeExpectoTestList id fixNewLineAndIndent strParagraph "paragraph tests" [
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]],
            "<p>\n\b<strong>Go go go!</strong>\n</p>", "strong tag"
        );
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]],
            "<p>\n\b<strong>Go go go!</strong><a href=\"brokenURL\">broken link</a>\n</p>", "strong and link tag"
        );
        (
            [[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]],
            "<p>\n\bGo go go!<a href=\"brokenURL\">broken link</a>\n\bCome!\n</p>", "indent test"
        );
    ]

[<Tests>]
let bodyTests =
    makeExpectoTestList id fixNewLineAndIndent strBody "body tests" [
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]]],
            "<p>\n\b<strong>Go go go!</strong>\n</p>", "strong tag"
        );
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]]],
            "<p>\n\b<strong>Go go go!</strong><a href=\"brokenURL\">broken link</a>\n</p>", "strong and link tag"
        );
        (
            [CodeBlock("fsharp is cool", FSharp)],
            "<code language=\"fsharp\">\n\bfsharp is cool\n</code>", "codeblock, noninline"
        );
        (
            [Quote([FrmtedString(Literal "fsharp is cool")])],
            "<q>\n\bfsharp is cool\n</q>", "quote"
        );
    ]

[<Tests>]
let bodyTableTests =
    makeExpectoTestList id fixNewLineAndIndent strTable "body table tests" [
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, Left)], true)],
            "<tbody>\n\b<thead>\n\b\b<tr>\n\b\b\b<th align=\"left\">head</th>\n\b\b</tr>\n\b</thead>\n</tbody>", "strong tag"
        );
    ]