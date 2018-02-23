module MarkalcTests

open Types
open MarkalcShared
open Markalc
open Expression
open Expecto.ExpectoFsCheck
open Expecto

// ####################### DATA ###################
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
let testTableData = [
    "Test one: Simple table",
    List.map simpleParse ["header1|header2|header3";
                          ":------|:-----:|------:";
                          "Somedfs|tesdfst|stduff"] ,
    // Answer, two lists of aligned cells
    [[Contents ([LITERAL "header1"],true,Left);Contents ([LITERAL "header2"],true,Centre);Contents ([LITERAL "header3"],true,Right) ]] @
    [[Contents ([LITERAL "Somedfs"],false,Left);Contents ([LITERAL "tesdfst"],false,Centre);Contents ([LITERAL "stduff"],false,Right)]] |> Ok;
]
let testExprData = [
    "Full evaluation test with cell references.",
    ["=2+2|header2|header3";
     ":------|:-----:|------:";
     "=[0][0]+1|tesdfst|stduff";
     "=2+3|tesdfst|=[1][0]+[0][0]"]|>List.map simpleParse,
     [[Contents ([NUMBER "4"],true,Left);
       Contents ([LITERAL "header2"],true,Centre);
       Contents ([LITERAL "header3"],true,Right)];
     [Contents ([NUMBER "5"],false,Left);
      Contents ([LITERAL "tesdfst"],false,Centre);
      Contents ([LITERAL "stduff"],false,Right)];
     [Contents ([NUMBER "5"],false,Left);
      Contents ([LITERAL "tesdfst"],false,Centre);
      Contents ([NUMBER "9"],false,Right)]] |> Ok;
    "Circular cell reference.",
    ["=2+2|header2|header3";
     ":------|:-----:|------:";
     "=[0][0]+[2][2]|tesdfst|stduff";
     "=2+3|tesdfst|=[1][0]+[0][0]"]|>List.map simpleParse,
     [[Contents ([NUMBER "4"],true,Left);
       Contents ([LITERAL "header2"],true,Centre);
       Contents ([LITERAL "header3"],true,Right)];
     [Contents ([NUMBER "NaN"],false,Left);
      Contents ([LITERAL "tesdfst"],false,Centre);
      Contents ([LITERAL "stduff"],false,Right)];
     [Contents ([NUMBER "5"],false,Left);
      Contents ([LITERAL "tesdfst"],false,Centre);
      Contents ([NUMBER "NaN"],false,Right)]] |> Ok
]
// ####################### FUNCTIONS #####################
let EQTest func fname name inp outp =
    testCase name <| fun () ->
    Expect.equal (func inp) outp (sprintf "%s" fname)
let addTestList test name dataTransform data = 
    (List.map (dataTransform >> (unfoldTuple3 test)) data)
    |> Expecto.Tests.testList name

let expressionTest = EQTest parseExpTest "parseExpTop"
let parseRowTest = EQTest parseDefaultRow "parseDefaultRow"
let parseAlignmentRowTest = EQTest parseAlignmentRow "parseAlignmentRow"
let transformTableTest = EQTest transformTable "transformTable"
let evalTest = EQTest parseEvaluate "evaluation"

// ####################### TESTS ########################
[<Tests>]
let tests = 
    testList "Should pass" [
        addTestList expressionTest "Expression tests" parseY expressionData;
        addTestList parseRowTest "parseDefaultRow tests" parseY parseDefaultRowData;
        addTestList parseAlignmentRowTest "parseAlignmentRow tests" parseY testAlignData;
        addTestList transformTableTest "transformTable tests" id testTableData;
        addTestList evalTest "transformTable tests" id testExprData;
]

let runTests =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore