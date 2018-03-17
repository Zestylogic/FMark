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
            ({HeaderName=[FrmtedString(Literal "header")]; Level=1},"header1"),
            "<h1 id=\"header1\">header</h1>", "h1"
        );
        (
            ({HeaderName=[FrmtedString(Literal "header")]; Level=2},"header2"),
            "<h2 id=\"header2\">header</h2>", "h2"
        );
    ]

[<Tests>]
let footnoteTests =
    makeExpectoTestList id id strRef "footnote tests" [
        (
            (string 3, [FrmtedString (Literal "footer3")]),
            "<p id=\"3\">[3] footer3</p>", "footer 3"
        );
        (
            ("abcd",[FrmtedString (Literal "footer3")]),
            "<p id=\"abcd\">[abcd] footer3</p>", "footer string"
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
                Header({HeaderName=[FrmtedString(Literal "header")]; Level=1},"header1");
                List{ListType=UL;ListItem=
                    [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                        NestedList{ListType=OL;ListItem=
                        [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];
                        Depth=2} ];
                    Depth=1};
                Table[PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)];
                Paragraph[[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]]
            ],
            ["<h1 id=\"header1\">header</h1>";
            "<ul><li>first</li><li>second</li><ol><li>first</li><li>second</li></ol></ul>";
            "<table><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead><tbody></tbody></table>";
            "<p>Go go go!<a href=\"brokenURL\">broken link</a>";NewLineStr;"Come!</p>"]
            , "the bodyshop"
        );
    ]

[<Tests>]
let reallyBigTest =
    makeExpectoTestList id catStr genHTML "inherited big test" [
        ("big HTML test",
            [Paragraph [[FrmtedString (Literal "text1#text2")]];
                Header ({HeaderName = [FrmtedString (Literal "Header1")]; Level = 1;},"Header10");
                Paragraph [[Reference ("Footer1","footnote-1"); FrmtedString (Literal "text4")]];
                Paragraph [[Reference ("(Wang, 2017)","footnot-Eric"); FrmtedString (Literal "text6")]];
                Footnote (1,[FrmtedString (Literal "footer1")]);
                Citation (
                    "Eric",Literal "(Wang, 2017)",
                    [FrmtedString (Literal "Eric Wang. "); FrmtedString (Literal "2017. ");
                    FrmtedString (Literal "\"Not a real website.\" ");
                    FrmtedString (Literal "Accessed March 4, 2018. ");
                    Link (Literal "www.example.com/website","www.example.com/website")]
                )
            ]),
            ["<!DOCTYPE html><head><meta name=\"viewport\" content=\"width=device-width\"><title>big HTML test</title></head>";
            "<body><p>text1#text2</p><h1 id=\"Header10\">Header1</h1><p><a href=\"#footnote-1\">Footer1</a>text4</p><p><a href=\"#footnot-Eric\">(Wang, 2017)</a>text6</p><p id=\"#footnote-1\">footer1</p><p id=\"#footnote-Eric\">Eric Wang. 2017. \"Not a real website.\" Accessed March 4, 2018. <a href=\"www.example.com/website\">www.example.com/website</a></p>";
            "<script type=\"text/javascript\" async src=\"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML\"></script>";
            "</body>"],
            "wow very big"
    ]



[<Tests>]
let ``global simple test`` =
    makeExpectoTestList id catStr genHTML "top level genHTML test" [
        ("FMarkToHtml first release",
            [
                Header({HeaderName=[FrmtedString(Literal "header")]; Level=1},"header1");
                List{ListType=UL;ListItem=
                    [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")];
                        NestedList{ListType=OL;ListItem=
                        [StringItem[FrmtedString(Literal "first")]; StringItem[FrmtedString(Literal "second")] ];
                        Depth=2} ];
                    Depth=1};
                Table[PCells([CellLine([FrmtedString(Literal "head")], true, Left);CellLine([FrmtedString(Literal "head")], true, Right)], true)];
                Paragraph[[FrmtedString((Literal "Go go go!")); Link(Literal "broken link", "brokenURL")]; [FrmtedString(Literal "Come!")]]
            ]),
        ["<!DOCTYPE html><head><meta name=\"viewport\" content=\"width=device-width\">";
        "<title>FMarkToHtml first release</title>";
        "</head>";
        "<body><h1 id=\"header1\">header</h1><ul><li>first</li><li>second</li><ol><li>first</li><li>second</li></ol></ul><table><thead><tr><th align=\"left\">head</th><th align=\"right\">head</th></tr></thead><tbody></tbody></table><p>Go go go!<a href=\"brokenURL\">broken link</a>";
        NewLineStr;"Come!</p>";
        "<script type=\"text/javascript\" async src=\"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML\"></script>";
        "</body>"] ,
         "all in one"
    ]