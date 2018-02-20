/// This module should parse tokens into an expression
module Expression

open Types
open System.Text.RegularExpressions

(* SUPPORTED OPERATIONS:
BinaryExpressions (in order of precedence): 
    % - Modulo
    ^ - To the power
    * - Multiply
    / - Divide
    + - Add
    - - Subtract
*)

type CellReference =
    | ColumnRow of uint32*uint32

type Operand =
    | CellReference
    | Integer of int
    | Float of float

type Expression =
    | IntBinaryExpression of (int->int->int Option) * Expression * Expression
    //| FloatBinaryExpression of (float->float->float Option) * Expression * Expression
    | Function
    | Operand

/// Return matched text and remaining text
let (|RegexMatch|_|) regex input =
    let m = Regex.Match (input, regex)
    match m.Success with
    | true -> (m.Value, input.Substring(m.Value.Length)) |> Some
    | false -> None

let (|Literal|_|) tok = 
    match tok with
    | RegexMatch "([0-9]*[.])?[0-9]+" (num, rem) -> num |> float |> Float |> Some
    | RegexMatch "[0-9]+" (num, rem) -> num |> int |> Integer |> Some
    | _ -> None

(* Relevant tokens
EQUAL, MINUS, PLUS, ASTERISK, DOT, CARET, SLASH
LSBRA, RSBRA, LBRA, RBRA
NUMBER of string (?)
LITERAL of string

*)
// parseStringExp
let parseStringExp str rem =
    1

// Parse 1+1 etc.
// let parseExp (toks:Token list) : Result<'a,'b> =
//     // Remove all whitespace
//     let rWhitespace = function | :? WHITESPACE -> false | _ -> true
//     List.filter rWhitespace toks
//     // Check that it is a valid expression (?)
// 
//     // =() symbolises a bracket, so keep parsing until you find a right bracket
//     let rec parseExp' a toks =
//         match toks with
//         | LITERAL(str) -> match str with
//                            // Match Literal
//         | // Match [[0-9]+][[0-9]+], turn into CellReference, append to Expression list
//         | // Match binary operators, turn into BinaryExpression, match higher precedences first
//         | // Match left bracket, parse until find right bracket
//         | // Match keyword, parse arguments and apply function
// 
// 
// let top (toks:Token list) =
//     // If the first token isn't an EQ, return error
//     // Although, check for leading/trailing formatters and remove and replace them afterwards.
//     match toks with
//     | EQUAL :: _ -> parseExp toks
//     | x -> Error "Not an expression."