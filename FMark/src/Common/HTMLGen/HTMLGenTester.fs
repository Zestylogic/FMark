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

let catStr strList =
    String.concat "" strList

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
            "<p>Go go go!<a href=\"brokenURL\">broken link</a>"+NewLineStr+"Come!</p>", "indent test"
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
            [PCells([CellLine([FrmtedString(Literal "head")], true, NoAlign)], true)],
            "<table><thead><tr><th>head</th></tr></thead><tbody></tbody></table>", "one thead only"
        );
        (
            [PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)],
            "<table><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead><tbody></tbody></table>", "two theads with different align"
        );
    ]

[<Tests>]
let listTests =
    makeExpectoTestList id id strList "list tests" [
        (
            {ListType=OL;ListItem=[StringItem[FrmtedString(Literal "first")]];Depth=1},
            "<ol><li>first</li></ol>", "ol, 1 li"
        );
        (
            {ListType=UL;ListItem=[StringItem[FrmtedString(Literal "first")]];Depth=1},
            "<ul><li>first</li></ul>", "ul, 1 li"
        );
        (
            {ListType=UL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];Depth=1},
            "<ul><li>first</li><li>second</li></ul>", "ul, 2 li"
        );
        (
            {ListType=UL;ListItem=
            [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                NestedList{ListType=OL;ListItem=
                [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];Depth=2} ];
            Depth=1},
            "<ul><li>first</li><li>second</li><ol><li>first</li><li>second</li></ol></ul>", "ol inside ul"
        );
    ]

[<Tests>]
let headerTests =
    makeExpectoTestList id id strHeader "header tests" [
        (
            {HeaderName=[FrmtedString(Literal "header")]; Level=1},
            "<h1>header</h1>", "h1"
        );
        (
            {HeaderName=[FrmtedString(Literal "header")]; Level=2},
            "<h2>header</h2>", "h2"
        );
    ]

[<Tests>]
let inlineFootnoteTests =
    makeExpectoTestList id id strInlineFootnote "inline footnote tests" [
        (
            FtID 3,
            "<sup><a href=\"#footnote-3\">3</a></sup>", "footer 3"
        );
        (
            RefID "abcd",
            "<sup><a href=\"#footnote-abcd\">abcd</a></sup>", "footer string"
        );
    ]

[<Tests>]
let ``HTML head generation test``=
    makeExpectoTestList id id genHead "HTML head generation test" [
        (
            "tiny title",
            "<head><meta name=\"viewport\" content=\"width=device-width\"><title>tiny title</title></head>",
            "simple header"
        );
    ]

[<Tests>]
let TOCTests =
    let hLst1 = [{HeaderName=[FrmtedString(Literal "header1")]; Level=1}
                     ;{HeaderName=[FrmtedString(Literal "header2")]; Level=1}
                     ;{HeaderName=[FrmtedString(Literal "header3")]; Level=1}
                     ]
    let hLst2 = hLst1@[{HeaderName=[FrmtedString(Literal "header4")]; Level=2}]

    let hLst3 =       [{HeaderName=[FrmtedString(Literal "header1")]; Level=1}
                      ;{HeaderName=[FrmtedString(Literal "header2")]; Level=2}
                      ;{HeaderName=[FrmtedString(Literal "header3")]; Level=2}
                      ;{HeaderName=[FrmtedString(Literal "header4")]; Level=3}]
    let hLst4 =       [{HeaderName=[FrmtedString(Literal "header1")]; Level=1}
                      ;{HeaderName=[FrmtedString(Literal "header2")]; Level=2}
                      ;{HeaderName=[FrmtedString(Literal "header3")]; Level=3}
                      ;{HeaderName=[FrmtedString(Literal "header4")]; Level=1}]
    
    let hLst5 =       [{HeaderName=[FrmtedString(Literal "header1")]; Level=1}
                      ;{HeaderName=[FrmtedString(Literal "header2")]; Level=2}
                      ;{HeaderName=[FrmtedString(Literal "header3")]; Level=3}
                      ;{HeaderName=[FrmtedString(Literal "header4")]; Level=2}
                      ;{HeaderName=[FrmtedString(Literal "header5")]; Level=1}]
    makeExpectoTestList id Shared.removeWhitespace strToC "Table of contents test" [
        (
            {HeaderLst=hLst1; MaxDepth=3},
            "<ol>
                <li>header1</li>
                <li>header2</li>
                <li>header3</li>
             </ol>",
            "Simple TOC test, all same level"
        );
        (
            {HeaderLst=hLst2; MaxDepth=3},
            "<ol>
                <li>header1</li>
                <li>header2</li>
                <li>header3</li>
                <ol>
                    <li>header4</li>
                </ol>
             </ol>",
            "Simple TOC test, one header2"
        );
        (
            {HeaderLst=hLst3; MaxDepth=3},
            "<ol>
                <li>header1</li>
                <ol>
                    <li>header2</li>
                    <li>header3</li>
                    <ol>
                        <li>header4</li>
                    </ol>
                </ol>
            </ol>",
            "Harder TOC test, two header 2s and a header 3"
        );
        (
            {HeaderLst=hLst4; MaxDepth=3},
            "<ol>
                <li>header1</li>
                <ol>
                    <li>header2</li>
                    <ol>
                        <li>header3</li>
                    </ol>
                </ol>
                <li>header4</li>
            </ol>",
            "Deep then shallow TOC"
        );
        (
            {HeaderLst=hLst5; MaxDepth=3},
            "<ol>
                <li>header1</li>
                <ol>
                    <li>header2</li>
                    <ol>
                        <li>header3</li>
                    </ol>
                    <li>header4</li>
                </ol>
                <li>header5</li>
            </ol>",
            "Pyramid test"
        );
    ]

[<Tests>]
let fullBodyTests =
    makeExpectoTestList id catStr strBody "full body tests" [
        (
            [
                Header{HeaderName=[FrmtedString(Literal "header")]; Level=1};
                List{ListType=UL;ListItem=
                    [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                        NestedList{ListType=OL;ListItem=
                        [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];
                        Depth=2} ];
                    Depth=1};
                Table[PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)];
                Paragraph[[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]]
            ],
            ["<h1>header</h1>";
            "<ul><li>first</li><li>second</li><ol><li>first</li><li>second</li></ol></ul>";
            "<table><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead><tbody></tbody></table>";
            "<p>Go go go!<a href=\"brokenURL\">broken link</a>";NewLineStr;"Come!</p>"]
            , "the bodyshop"
        );
    ]

[<Tests>]
let ``global simple test`` =
    makeExpectoTestList id id genHTML "top level genHTML test" [
        ("FMarkToHtml fisrt release",
            [
                Header{HeaderName=[FrmtedString(Literal "header")]; Level=1};
                List{ListType=UL;ListItem=
                    [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                        NestedList{ListType=OL;ListItem=
                        [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];
                        Depth=2} ];
                    Depth=1};
                Table[PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)];
                Paragraph[[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]]
            ]),
        "<!DOCTYPE html><head><meta name=\"viewport\" content=\"width=device-width\"><title>FMarkToHtml fisrt release</title></head><body><h1>header</h1><ul><li>first</li><li>second</li><ol><li>first</li><li>second</li></ol></ul><table><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead><tbody></tbody></table><p>Go go go!<a href=\"brokenURL\">broken link</a>Come!</p></body>", "all in one"
    ]