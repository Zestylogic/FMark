module FMarkTests

open FMark
open MarkalcTest
open Expecto
open Types
open Logger
open Shared

let logger = Logger(LogLevel.DEBUG)

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
    // Don't know TOC format yet.
    // "Testing HTMLGen TOC",
    // ["# header1";
    // "# header2";
    // "# header3";
    // "# header3";],
    // "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>12</td><td>tesdfst</td></tr></tbody></table>"
    // |>Ok;
    "Invalid table cell ref, semicolon instead of comma",
    ["|=5|header2|";
    "|------|-----|";
    "|=[0;0]+7|tesdfst|";],
    "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>=[0;0]+7</td><td>tesdfst</td></tr></tbody></table>"
    |>Ok;
    "Invalid table cell ref, old syntax",
    ["|=5|header2|";
    "|------|-----|";
    "|=[0][0]+7|tesdfst|";],
    "<table><thead><tr><th>5</th><th>header2</th></tr></thead><tbody><tr><td>=[0][0]+7</td><td>tesdfst</td></tr></tbody></table>"
    |>Ok;
    "Empty line test",
    ["  ";
    "";
    "";
    "";
    "     ";
    "jdkfjd";
    "";
    "";
    "     ";
    "hello"],
    "<p>jdkfjd</p><p>hello</p>"
    |>Ok;
    "List test",
    ["* ul1";
     "* ul2";
     "  * nest1";
     "  * nest12";
     "      * nest2";
     "  * nest13";
     "* ul3";
     ""],
    "<ul>
        <li>ul1</li>
        <li>ul2</li>
        <ul>
            <li>nest1</li>
            <li>nest12</li>
            <ul><ul>
                <li>nest2</li>
            </ul></ul>
            <li>nest13</li>
        </ul>
        <li>ul3</li>
    </ul>"
    |> Shared.removeWhitespace |>Ok
]
 
let htmlTest = EQTest (processString' "" HTMLGen.strBody) "top level html test"

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
        let splitStr (s:string) = s.Split '\n' |> Array.toList |> (List.filter (fun s -> s<>""))
        // The functions will not work with a null string
        // There is also a weird interaction with '\' because it escapes itself
            //|> logPass None logger.Debug
        let str = if (isNull s) then "" else removeChars ["\\"] s
                  //|> logPass None logger.Debug
                  |> splitStr
        let preprocess1 = str |> (removeChars ["\n"]<<takeEither<<processString "" Markdown)
        let preprocess2 = str |> (takeEither<<processString "" Markdown) |> (removeChars ["\n"]<<takeEither<<processString "" Markdown<<splitStr)
        Expect.equal preprocess1 preprocess2 ""
