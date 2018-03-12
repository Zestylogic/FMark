module Main
open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.Browser
open Types
open FMark

let processMarkdownString str =
    str
    |> Array.toList
    |> processString HTML
