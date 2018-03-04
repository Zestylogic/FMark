module FMarkTests

open FMark
open MarkalcTest
open Expecto

let dummyTestData = [
    "Mike sample table",
    ["|h|";
    "|---|";
    "|cell|"],
    "<table><thead><tr><th>Test</th></tr></thead><tbody><tr><td>Test</td></tr></tbody></table>"
    "Testing dummy HTMLGen",
    ["|=5|header2|";
    "|------|-----|";
    "|=7|tesdfst|";],
    "<table><thead><tr><th>Test</th><th>Test</th></tr></thead><tbody><tr><td>Test</td><td>Test</td></tr></tbody></table>"
]
 
let dummyTest = EQTest processDataDummy "top level dummy test"

[<Tests>]
let tests = 
    testList "Should pass" [
        addTestList dummyTest "Dummy tests" id dummyTestData;
]