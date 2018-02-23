module MarkalcTests

open Types
open MarkalcShared
open Markalc
open Expression
open Expecto.ExpectoFsCheck
open Expecto

let makeEqTest func fname name inp outp =
    testCase name <| fun () ->
    Expect.equal (func inp) outp (sprintf "%s" fname)

let expressionData = [
    "Simple addition.",
    "10+10",
    20.0 |> Ok;
    "Triple addition.",
    "10+10+10",
    30.0 |> Ok;
    "Simple triple multiplication.",
    "3*7*5",
    105.0 |> Ok;
    "Simple division.",
    "16/2",
    8.0 |> Ok;
    "Triple division, test left associativity.",
    "60/2/3",
    10.0 |> Ok;
    "Simple modulo.",
    "3%2",
    1.0 |> Ok;
    "Simple subtraction.",
    "7-2",
    5.0 |> Ok;
    "Triple subtraction.",
    "7-5-2",
    0.0 |> Ok;
    "Bracketed subtraction.",
    "7-(2-1)",
    6.0 |> Ok;
    "Bracketed subtraction then addition.",
    "7-(2-1)+5",
    11.0 |> Ok;
    "7*(2-3)+5",
    "7*(2-3)+5",
    -2.0 |> Ok;
    "7*2-3+5",
    "7*2-3+5",
    16.0 |> Ok;
    "7*2-(3+5)",
    "7*2-(((((((((3+5)))))))))",
    6.0 |> Ok;
    "Testing cellref evaluation (without table)",
    "1+([1][1]+[1][2])",
    27.0 |> Ok;
    "Left to right evaluation",
    "2 -4 +6 -1 -1- 0 +8",
    10.0 |> Ok
    "Pow test",
    "2 ^4 +6 -1 -1- 0 +8",
    28.0 |> Ok
]
let makeExpressionTest = makeEqTest parseExpTest "parseExpTop"
[<Tests>]
let expTest =
    (List.map (parseY >> unfoldTuple3 makeExpressionTest) expressionData)
    |> Expecto.Tests.testList "Expression tests"

let parseDefaultRowData = [
                            "All Pipes",
                            "|hello |mynameis|",
                            [makeDefaultCellU[LITERAL("hello"); WHITESPACE(1)]; makeDefaultCellU[LITERAL("mynameis")]];
                            "Only middle pipe",
                            "hello |my name is",
                            [makeDefaultCellU[LITERAL("hello"); WHITESPACE(1)];makeDefaultCellU[LITERAL("my name is")]];
                            "Empty pipes",
                            "|||",
                            [makeDefaultCellU[];makeDefaultCellU[]];
                            "One pipe",
                            "hi|",
                            [makeDefaultCellU[LITERAL("hi")];makeDefaultCellU[]];
                            "No end pipe",
                            "|hello my |name",
                            [makeDefaultCellU [LITERAL("hello my");WHITESPACE(1)] ; makeDefaultCellU[LITERAL("name")]];
                            "No start pipe",
                            "hello my |name|",
                            [makeDefaultCellU [LITERAL("hello my");WHITESPACE(1)] ; makeDefaultCellU[LITERAL("name")]];
                            "Empty pipes in middle",
                            "some test||stuff 0398 test",
                            [makeDefaultCellU [LITERAL("some test")];makeDefaultCellU[] ; makeDefaultCellU[LITERAL("stuff");WHITESPACE(1);NUMBER("0398");WHITESPACE(1);LITERAL("test")]]
                          ]

let parseDefaultRowData' = List.map parseY parseDefaultRowData
let makeParseRowTest = makeEqTest parseDefaultRow "parseDefaultRow"

[<Tests>]
let parseRowTest =
    List.map (parseY >> unfoldTuple3 makeParseRowTest) (parseDefaultRowData)
    |> Expecto.Tests.testList "parseDefaultRow tests"

// Test parseAlignmentRow
let testAlignData = [
    "No alignments.",
    "---|----|---",
    [Left;Left;Left] |> Ok;
    "Middle right aligned.",
    "---|---:|---",
    [Left;Right;Left] |> Ok;
    "No alignments, superfluous pipes both sides.",
    "|---|---|---|",
    [Left;Left;Left] |> Ok;
    "All centre aligned, both outside pipes",
    "|:---:|:---:|:---:|",
    [Centre;Centre;Centre] |> Ok;
    "All centre aligned, no rhs pipe",
    "|:---:|:---:|:---:",   
    [Centre;Centre;Centre] |> Ok;
    "All centre aligned, no superfluous pipes",
    ":---:|:---:|:---:",   
    [Centre;Centre;Centre] |> Ok;
    "Simple all align types",
    "---|:---:|---:",
    [Left;Centre;Right] |> Ok;
    "Complex non-symmetric using all aligns w/o outside pipes",
    "---|:---:|---:|:---:|:---|---:|:---:|---:|:---",
    [Left;Centre;Right;Centre;Left;Right;Centre;Right;Left] |> Ok;
    "Complex non-symmetric using all aligns with outside pipes",
    "|---|:---:|---:|:---:|:---|---:|:---:|---:|:---|",
    [Left;Centre;Right;Centre;Left;Right;Centre;Right;Left] |> Ok
]
let makeParseAlignmentRowTest = makeEqTest parseAlignmentRow "parseAlignmentRow"

[<Tests>]
let parseAlignmentRowTest =
    List.map (parseY >> unfoldTuple3 makeParseAlignmentRowTest) testAlignData
    |> Expecto.Tests.testList "parseAlignmentRow tests"

let testTableData = [
    "Test one: Simple table",
    List.map simpleParse ["header1|header2|header3";
                          ":------|:-----:|------:";
                          "Somedfs|tesdfst|stduff"] ,
    // Answer, two lists of aligned cells
    [[Contents ([LITERAL "header1"],true,Left);Contents ([LITERAL "header2"],true,Centre);Contents ([LITERAL "header3"],true,Right) ]] @
    [[Contents ([LITERAL "Somedfs"],false,Left);Contents ([LITERAL "tesdfst"],false,Centre);Contents ([LITERAL "stduff"],false,Right)]] |> Ok;
]
let makeTransformTableTest = makeEqTest transformTable "transformTable"
[<Tests>]
let transformTableTest =
    List.map (unfoldTuple3 makeTransformTableTest) testTableData
    |> Expecto.Tests.testList "transformTable tests"

let runTests =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore