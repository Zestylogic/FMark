module MarkalcTests

open Types
open Markalc
open Expression
open Expecto.ExpectoFsCheck
open Expecto
open System.Text.RegularExpressions
/// Helper function to copy a list i times
let rec listCopies i lst =
    match i with
    | 1 -> lst
    | 0 -> []
    | x when x < 0 -> failwithf "Negative argument: %A" x
    | _ -> lst @ (listCopies (i-1) lst)

let unfoldTuple3 func (a,b,c) =
   func a b c

let makeEqTest func fname name inp outp =
    testCase name <| fun () ->
    Expect.equal (func inp) outp (sprintf "%s" fname)


// Quick parser to generate expression test input
let simpleParse txt = 
    /// Return tuple of matched text and everything afterwards, ignoring whitetspace
    let (|RegexMatch|_|) r txt =
        let m = Regex.Match (txt, "^[\\s]*" + r + "[\\s]*")
        match m.Success with
        | true -> (m.Value, txt.Substring(m.Value.Length)) |> Some
        | false -> None
    let rec simpleParse' a txt =
        match txt with
        | RegexMatch "[0-9]+" (m,after) -> simpleParse' (NUMBER(m)::a) after
        | RegexMatch "\\^" (_,after) -> simpleParse' (CARET::a) after
        | RegexMatch "\\%" (_,after) -> simpleParse' (PERCENT::a) after
        | RegexMatch "\\*" (_,after) -> simpleParse' (ASTERISK::a) after
        | RegexMatch "\\/" (_,after) -> simpleParse' (SLASH::a) after
        | RegexMatch "\\+" (_,after) -> simpleParse' (PLUS::a) after
        | RegexMatch "\\-" (_,after) -> simpleParse' (MINUS::a) after
        | RegexMatch "\\(" (_,after) -> simpleParse' (LBRA::a) after
        | RegexMatch "\\)" (_,after) -> simpleParse' (RBRA::a) after
        | RegexMatch "\\[" (_,after) -> simpleParse' (LSBRA::a) after
        | RegexMatch "\\]" (_,after) -> simpleParse' (RSBRA::a) after
        | "" -> a
        | _ -> failwithf "Unexpected character: %A" txt
    simpleParse' [] txt |> List.rev

let expressionData' = [
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
    3.0 |> Ok;
    "Left to right evaluation",
    "2 -4 +6 -1 -1- 0 +8",
    10.0 |> Ok
    "Pow test",
    "2 ^4 +6 -1 -1- 0 +8",
    28.0 |> Ok
]
let expressionData = List.map (fun (x,y,z) -> (x,y|>simpleParse,z)) expressionData'
let makeExpressionTest = makeEqTest parseExpTop "parseExpTop"
[<Tests>]
let expTest =
    List.map (unfoldTuple3 makeExpressionTest) expressionData
    |> Expecto.Tests.testList "Expression tests"

let parseDefaultRowData = [(
                           "All Pipes",
                           [PIPE; LITERAL("hello"); WHITESPACE(1);PIPE;LITERAL("my name is");PIPE],
                           [makeDefaultCellU[LITERAL("hello"); WHITESPACE(1)]; makeDefaultCellU[LITERAL("my name is")]]);
                           "Only middle pipes",
                           [LITERAL("hello"); WHITESPACE(1); PIPE;LITERAL("my name is")],
                           [makeDefaultCellU[LITERAL("hello"); WHITESPACE(1)];makeDefaultCellU[LITERAL("my name is")]];
                           "Empty pipes",
                           [PIPE;PIPE;PIPE],
                           [makeDefaultCellU[];makeDefaultCellU[]];
                           "One pipe",
                           [LITERAL("hi");PIPE],
                           [makeDefaultCellU[LITERAL("hi")];makeDefaultCellU[]];
                           "No end pipe",
                           [PIPE;LITERAL("hello"); WHITESPACE(1);LITERAL("my");WHITESPACE(1);PIPE;LITERAL("name")],
                           [makeDefaultCellU [LITERAL("hello"); WHITESPACE(1);LITERAL("my");WHITESPACE(1)] ; makeDefaultCellU[LITERAL("name")]];
                           "No start pipe",
                           [LITERAL("hello"); WHITESPACE(1);LITERAL("my");WHITESPACE(1);PIPE;LITERAL("name")],
                           [makeDefaultCellU [LITERAL("hello"); WHITESPACE(1);LITERAL("my");WHITESPACE(1)] ; makeDefaultCellU[LITERAL("name")]];
                           "Empty pipes in middle",
                           [LITERAL("some");LITERAL("test");PIPE;PIPE;LITERAL("stuff");LITERAL("test")],
                           [makeDefaultCellU [LITERAL("some");LITERAL("test")];makeDefaultCellU[] ; makeDefaultCellU[LITERAL("stuff");LITERAL("test")]]
                           ]


let makeParseRowTest = makeEqTest parseDefaultRow "parseDefaultRow"

[<Tests>]
let parseRowTest =
    List.map (unfoldTuple3 makeParseRowTest) parseDefaultRowData
    |> Expecto.Tests.testList "parseDefaultRow tests"

// Test parseAlignmentRow
let minusX3 = List.replicate 3 MINUS
let centre = COLON :: minusX3 @ [COLON]
let right  =  minusX3 @ [COLON]
let testAlignData = [
    "No alignments.",
    minusX3 @ (PIPE ::minusX3) @ (PIPE ::minusX3),
    [Left;Left;Left] |> Ok;
    "Middle right aligned.",
    minusX3 @ (PIPE :: COLON ::minusX3) @ (PIPE ::minusX3) |> List.rev,
    [Left;Right;Left] |> Ok;
    "No alignments, superfluous pipes both sides.",
    PIPE ::minusX3 @ (PIPE ::minusX3) @ (PIPE ::minusX3) @ [PIPE],
    [Left;Left;Left] |> Ok;
    "All centre aligned, both outside pipes",
    listCopies 3 [PIPE;COLON;MINUS;MINUS;MINUS;COLON] @ [PIPE],   
    [Centre;Centre;Centre] |> Ok;
    "All centre aligned, no rhs pipe",
    listCopies 3 [PIPE;COLON;MINUS;MINUS;MINUS;COLON],   
    [Centre;Centre;Centre] |> Ok;
    "All centre aligned, no superfluous pipes",
    listCopies 3 [PIPE;COLON;MINUS;MINUS;MINUS;COLON] |> List.tail,   
    [Centre;Centre;Centre] |> Ok;
    "Simple all align types",
    minusX3 @ PIPE :: centre @ PIPE :: right,
    [Left;Centre;Right] |> Ok;
    "Complex non-symmetric using all aligns w/o outside pipes",
    minusX3 @ PIPE :: centre @ PIPE :: right @ PIPE::centre @ PIPE::COLON::minusX3  
        @ PIPE :: right @ PIPE :: centre @ PIPE :: right @ PIPE::COLON::minusX3,
    [Left;Centre;Right;Centre;Left;Right;Centre;Right;Left] |> Ok;
    "Complex non-symmetric using all aligns with outside pipes",
    PIPE::minusX3 @ PIPE :: centre @ PIPE :: right @ PIPE::centre @ PIPE::COLON::minusX3  
        @ PIPE :: right @ PIPE :: centre @ PIPE :: right @ PIPE::COLON::minusX3 @ [PIPE],
    [Left;Centre;Right;Centre;Left;Right;Centre;Right;Left] |> Ok
]
let makeParseAlignmentRowTest = makeEqTest parseAlignmentRow "parseAlignmentRow"

[<Tests>]
let parseAlignmentRowTest =
    List.map (unfoldTuple3 makeParseAlignmentRowTest) testAlignData
    |> Expecto.Tests.testList "parseAlignmentRow tests"

// It would be much easier to test this if I had the lex/parse pieces to turn strings into TOKENS!
(* Test one markdown input:
header1|header2|header3
---|:---:|---:
Some|test|=A2+A1
*)
let standardHeader = [LITERAL "header1";PIPE
                     ;LITERAL "header2";PIPE
                     ;LITERAL "header3";PIPE]
let standardAlign = COLON :: minusX3 @ PIPE :: centre @ PIPE :: right
let standardHeaderA = [Tokens ([LITERAL "header1"],true,Left)  
                      ;Tokens ([LITERAL "header2"],true,Centre)
                      ;Tokens ([LITERAL "header3"],true,Right) ]
let testTableData = [
    "Test one: Simple table",
    [standardHeader;standardAlign;[LITERAL("Some");PIPE;LITERAL("test");PIPE;LITERAL("stuff")]],
    [standardHeaderA] @ [[Tokens ([LITERAL "Some"],false,Left)
                         ;Tokens ([LITERAL "test"],false,Centre)
                         ;Tokens ([LITERAL "stuff"],false,Right)]] |> Ok;
    
]
let makeTransformTableTest = makeEqTest transformTable "transformTable"
[<Tests>]
let transformTableTest =
    List.map (unfoldTuple3 makeTransformTableTest) testTableData
    |> Expecto.Tests.testList "transformTable tests"
// Test alignCells

// Test transformTable

 
let runTests =
    Expecto.Tests.runTestsInAssembly Expecto.Tests.defaultConfig [||] |> ignore