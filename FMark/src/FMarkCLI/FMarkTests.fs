module FMarkTests

open FMark
open MarkalcTest
open Expecto
open Types

let htmlTestData = [
    "Simple table",
    ["|h|";
    "|---|";
    "|cell|"],
    "<table><thead><tr><th>h</th></tr></thead><tbody><tr><td>cell</td></tr></tbody></table>"
    |>Ok
    "Testing HTMLGen with table evaluation",
    ["|=5|header2|";
    "|------|-----|";
    "|=[0,0]+7|tesdfst|";],
    "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    |>Ok;
    //"Invalid table cell ref, semicolon instead of comma",
    //["|=5|header2|";
    //"|------|-----|";
    //"|=[0;0]+7|tesdfst|";],
    //"<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    //|>Ok;
    //"Invalid table cell ref, old syntax",
    //["|=5|header2|";
    //"|------|-----|";
    //"|=[0][0]+7|tesdfst|";],
    //"<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    //|>Ok
]
 
let htmlTest = EQTest (processString' HTMLGen.strBody) "top level html test"

[<Tests>]
let tests = 
    testList "Should pass" [
        addTestList htmlTest "HTML tests" id htmlTestData;
]

// PROPERTY BASED TESTS

/// Check if markdown output of FMark is the same if passed through FMark again
[<Tests>]
let FMarkPropertyTest =
    testProperty "FMarkPropertyTest" <| fun (s: string) ->
        let takeEither = function
            | Ok(s)
            | Error(s) -> s
        let splitStr (s:string) = s.Split '\n' |> Array.toList 
        // The functions will not work with a null string
        // There is also a weird interaction with '\' because it escapes itself
        let str = if (isNull s) then "" else s.Replace("\\", "")
                  |> splitStr
        let preprocess1 = str |> (takeEither<<processString Markdown)
        let preprocess2 = str |> (takeEither<<processString Markdown) |> (takeEither<<processString Markdown<<splitStr)
        Expect.equal preprocess1 preprocess2 ""