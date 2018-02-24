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
    [defaultCellU[LITERAL("hello"); WHITESPACE(1)]; defaultCellU[LITERAL("mynameis")]];
    "Only middle pipe",
    "hello |my name is",
    [defaultCellU[LITERAL("hello"); WHITESPACE(1)];defaultCellU[LITERAL("my name is")]];
    "Empty pipes",
    "|||",
    [defaultCellU[];defaultCellU[]];
    "One pipe",
    "hi|",
    [defaultCellU[LITERAL("hi")];defaultCellU[]];
    "No end pipe",
    "|hello my |name",
    [defaultCellU [LITERAL("hello my");WHITESPACE(1)] ; defaultCellU[LITERAL("name")]];
    "No start pipe",
    "hello my |name|",
    [defaultCellU [LITERAL("hello my");WHITESPACE(1)] ; defaultCellU[LITERAL("name")]];
    "Empty pipes in middle",
    "some test||stuff 0398 test",
    [defaultCellU [LITERAL("some test")];defaultCellU[] ; defaultCellU[LITERAL("stuff");WHITESPACE(1);NUMBER("0398");WHITESPACE(1);LITERAL("test")]]
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
    List.map simpleLex ["header1|header2|header3";
                          ":------|:-----:|------:";
                          "Somedfs|tesdfst|stduff"] ,
    // Answer, two lists of aligned cells
    [[Contents ([LITERAL "header1"],true,Left);Contents ([LITERAL "header2"],true,Centre);Contents ([LITERAL "header3"],true,Right) ]] @
    [[Contents ([LITERAL "Somedfs"],false,Left);Contents ([LITERAL "tesdfst"],false,Centre);Contents ([LITERAL "stduff"],false,Right)]] |> Ok;
]

let align =  ":------|:-----:|------:"
let ans head a b c = [Contents (a,head,Left);
                      Contents (b,head,Centre);
                      Contents (c,head,Right)]

let testFullData = [
    "Full evaluation test with cell references.",
    ["=2+2|header2|header3"; align;
     "=[0][0]+1|tesdfst|stduff";
     "=2+3|tesdfst|=[1][0]+[0][0]" ],
    [ans true [NUMBER "4"] [LITERAL "header2"] [LITERAL "header3"];
     ans false [NUMBER "5"] [LITERAL "tesdfst"] [LITERAL "stduff"];
     ans false [NUMBER "5"] [LITERAL "tesdfst"] [NUMBER "9"]]|> Ok;
    "Circular cell reference.",
    ["=2+2|header2|header3"; align;
    "=[0][0]+[2][2]|tesdfst|stduff";
    "=2+3|tesdfst|=[1][0]+[0][0]"],
    [ans true [NUMBER "4"] [LITERAL "header2"] [LITERAL "header3"];
     ans false [NUMBER "NaN"] [LITERAL "tesdfst"] [LITERAL "stduff"];
     ans false [NUMBER "5"] [LITERAL "tesdfst"] [NUMBER "NaN"]] |> Ok;
    "SUM range function call.",
    ["=5|header2|header3";
    ":------|:-----:|------:";
    "=7|tesdfst|stduff";
    "=2+3|=SUM{[0][0]:[2][0]}|0"],
    [ans true [NUMBER "5"] [LITERAL "header2"] [LITERAL "header3"];
     ans false [NUMBER "7"] [LITERAL "tesdfst"] [LITERAL "stduff"];
     ans false [NUMBER "5"] [NUMBER "17"] [NUMBER "0"]] |> Ok;
    "SUM and avg function calls.",
    ["=5|header2|header3";
    ":------|:-----:|------:";
    "=AVG{1,6,8}|=8|stduff";
    "=2+3|=SUM{[0][0],[2][0],[1][1]}|0"],
    [ans true [NUMBER "5"] [LITERAL "header2"] [LITERAL "header3"];
     ans false [NUMBER "5"] [NUMBER "8"] [LITERAL "stduff"];
     ans false [NUMBER "5"] [NUMBER "18"] [NUMBER "0"]] |> Ok
    "Example usage all",
    ["Calcs|39|42";
    ":------|:-----:|------:";
    "||=6*5+SUM{4,5}|=[1][1]+3"],
    [ans true [LITERAL "Calcs"] [NUMBER "39"] [NUMBER "42"];
     ans false [] [NUMBER "39"] [NUMBER "42"]] |> Ok
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
let parseAlignmentRowTest = EQTest parseAlignRow "parseAlignRow"
let transformTableTest = EQTest transformTable "transformTable"
let fullTest = EQTest lexParseEvaluate "evaluation"

// ####################### TESTS ########################
[<Tests>]
let tests = 
    testList "Should pass" [
        addTestList expressionTest "Expression tests" lexY expressionData;
        addTestList parseRowTest "parseDefaultRow tests" lexY parseDefaultRowData;
        addTestList parseAlignmentRowTest "parseAlignmentRow tests" lexY testAlignData;
        addTestList transformTableTest "transformTable tests" id testTableData;
        addTestList fullTest "transformTable tests" id testFullData;
]

let funcList = [( % ),"%";( ** ),"^";( + ),"+";( - ),"-"; ( * ),"*"; ( / ),"/"]
let expressionPropertyTest op = 
    testProperty (sprintf "Num %A Num is Num %A Num" op op) <|
    (fun (x:int,y:int) ->
        let tostr = function | i when i < 0 -> sprintf "(0-%i)" (-i)
                             | i -> string i
        let instr = tostr x + (snd op) + tostr y
        //sprintf "%i%s%i" x (snd op) y
        Expect.equal
            (instr |> simpleLex |> parseExpTest |> (function | Ok(x)->string x | Error(e) -> string e)) // Actual
            ((fst op) (x|>float) (y|>float) |> string) // Expected
            (sprintf "x %A y is x %A y" op op)
    )
    
[<Tests>]
let propertyTests =
    List.map (expressionPropertyTest) funcList
    |> Expecto.Tests.testList "Expression property tests."
let runTests =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore