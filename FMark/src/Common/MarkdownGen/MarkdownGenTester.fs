module MarkdownGenTester

open Types
open MarkdownGen
open Expecto

let id x = x
let makeExpectoTestList inputTransform outputTransform testFunc name listOfIOPairs =
    let makeOneTest i (inn, out, msg) = testCase (sprintf "test markdown: %d" i) <| fun () ->
        Expect.equal (inn |> inputTransform |> testFunc) (outputTransform out) msg
    listOfIOPairs
    |> List.indexed
    |> List.map (fun (i, triple) -> makeOneTest i triple )
    |> Expecto.Tests.testList name

let catStr strList =
    String.concat "" strList

//////////////////////////////////
// tests
//////////////////////////////////

[<Tests>]
let mdInlineElementsTests =
    makeExpectoTestList id id mdInlineElements "mdInlineElementsTests" [
        (
            [FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))],
            "**Go go go!**", "strong tag"
        );
        (
            [FrmtedString(Emphasis([FrmtedString(Literal "Go go go!")]))],
            "*Go go go!*", "em tag"
        );
        (
            [Link(Emphasis([FrmtedString(Literal "Go go go!")]), "www.google.co.uk")],
            "[*Go go go!*](www.google.co.uk)", "a tag"
        );
        (
            [Picture("404 not found", "www.google.co.uk/img.jpg")],
            "![404 not found](www.google.co.uk/img.jpg)", "picture tag"
        );
    ]

[<Tests>]
let paragraphTests =
    makeExpectoTestList id id mdParagraph "paragraph tests" [
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]],
            "**Go go go!**\n\n", "strong tag"
        );
        (
            [[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]],
            "**Go go go!**[broken link](brokenURL)\n\n", "strong and link tag"
        );
        (
            [[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]],
            "Go go go![broken link](brokenURL)Come!\n\n", "indent test"
        );
    ]

[<Tests>]
let bodyTests =
    makeExpectoTestList id id mdBody "body tests" [
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")]))]]],
            "**Go go go!**\n\n", "strong tag"
        );
        (
            [Paragraph[[FrmtedString(Strong([FrmtedString(Literal "Go go go!")])); Link(Literal "broken link", "brokenURL")]]],
            "**Go go go!**[broken link](brokenURL)\n\n", "strong and link tag"
        );
        (
            [CodeBlock("fsharp is cool", FSharp)],
            "```fsharp\nfsharp is cool\n```", "codeblock, noninline"
        );
        (*
        (
            [Quote([FrmtedString(Literal "fsharp is cool")])],
            "\`fsharp is cool\`", "quote"
        );
        *)
    ]

[<Tests>]
let bodyTableTests =
    makeExpectoTestList id id mdTable "body table tests" [
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, NoAlign)], true)],
            "|head|\n|---|\n\n", "one thead only"
        );
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)],
            "|head|head|\n|:---|---:|\n\n", "two theads with different align"
        );
    ]


[<Tests>]
let listTests =
    makeExpectoTestList id id mdList "list tests" [
        (
            {ListType=OL;ListItem=[StringItem[FrmtedString(Literal "first")]];Depth=1},
            "1. first\n", "ol, 1 li"
        );
        (
            {ListType=UL;ListItem=[StringItem[FrmtedString(Literal "first")]];Depth=1},
            "- first\n", "ul, 1 li"
        );
        (
            {ListType=UL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];Depth=1},
            "- first\n- second\n", "ul, 2 li"
        );
        (
            {ListType=OL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];Depth=1},
            "1. first\n2. second\n", "ol, 2 li"
        );
        (
            {ListType=OL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];NestedList{ListType=UL;ListItem=
                [StringItem[FrmtedString(Literal "third")]; StringItem[FrmtedString(Literal "fourth")] ];Depth=2}  ];Depth=1},
            "1. first\n2. second\n\t- third\n\t- fourth\n", "ol, 2 li, nested 1 ul"
        );
        (
            {ListType=UL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                NestedList{ListType=OL;ListItem=
                [StringItem[FrmtedString(Literal "third")]; StringItem[FrmtedString(Literal "fourth")] ];Depth=2} ];
            Depth=1},
            "- first\n- second\n\t1. third\n\t2. fourth\n", "ol inside ul"
        );
    ]

[<Tests>]
let headerTests =
    makeExpectoTestList id id mdHeader "header tests" [
        (
            {HeaderName=[FrmtedString(Literal "header")]; Level=1},
            "# header\n", "h1"
        );
        (
            {HeaderName=[FrmtedString(Literal "header")]; Level=2},
            "## header\n", "h2"
        );
    ]

(*
[<Tests>]
let inlineFootnoteTests =
    makeExpectoTestList id id mdInlineFootnote "inline footnote tests" [
        (
            3,
            "<sup><a href=\"#footnote3\">3</a></sup>", "footer3"
        );
    ]
*)
[<Tests>]
let fullBodyTests =
    makeExpectoTestList id catStr mdBody "full body tests" [
        (
            [
                Header({HeaderName=[FrmtedString(Literal "header")]; Level=1},"HEADER STRING NOT IMPLEMENTED");
                List{ListType=UL;ListItem=
                    [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                        NestedList{ListType=OL;ListItem=
                        [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];
                        Depth=2} ];
                    Depth=1};
                Table[PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)];
                Paragraph[[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]]
            ],
            ["# header\n";
            "- first\n- second\n\t1. first\n\t2. second\n\n";
            "|head|head|\n|:---|---:|\n\n";
            "Go go go![broken link](brokenURL)Come!\n\n"]
            , "the bodyshop"
        );
    ]