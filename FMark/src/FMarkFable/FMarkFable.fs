module Main
open Types
open FMark

let processMarkdownString fileDir str =
    str
    |> Array.toList
    |> processString HTML fileDir
