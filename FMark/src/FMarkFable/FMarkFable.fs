module Main
open Types
open FMark

let processMarkdownString str =
    str
    |> Array.toList
    |> processString HTML
