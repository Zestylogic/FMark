module FMarkTests

open FMark
open MarkalcTest
open Expecto

let dummyTestData = [
    "Simple table",
    ["|h|";
    "|---|";
    "|cell|"],
    "<table><thead><tr><th>h</th></tr></thead><tbody><tr><td>cell</td></tr></tbody></table>"
    |>Ok
    "Testing dummy HTMLGen with table evaluation",
    ["|=5|header2|";
    "|------|-----|";
    "|=[0,0]+7|tesdfst|";],
    "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    |>Ok;
    // "Invalid table cell ref, semicolon instead of comma",
    // ["|=5|header2|";
    // "|------|-----|";
    // "|=[0;0]+7|tesdfst|";],
    // "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    // |>Ok;
    // "Invalid table cell ref, old syntax",
    // ["|=5|header2|";
    // "|------|-----|";
    // "|=[0][0]+7|tesdfst|";],
    // "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    // |>Ok
]
 
let dummyTest = EQTest processDataDummy "top level dummy test"

[<Tests>]
let tests = 
    testList "Should pass" [
        addTestList dummyTest "Dummy tests" id dummyTestData;
]