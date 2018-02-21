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

type Operand =
    | CellRef of uint32*uint32
    | Integer of int
    | Float of float

type Exp =
    | AddExp of Exp * Exp
    | BinExp of (int->int->int)*Exp*Exp
    //| FloatBinaryExpression of (float->float->float Option) * Expression * Expression
    | Op of Operand

// return everything before and after the next delimeter
// Possible inputs: | ... |, [], ... |, |
let rec delimBeforeAfter delim before t =
    match t with
    | d :: after when d = delim -> Ok (before,after) // If delim then token list, return d and everything after the delim
    | x :: after -> delimBeforeAfter delim (x::before) after // If non-PIPE token then token list, recurse adding the tokens to the before list
    | [] -> Error (before,[]) // Did not find delimeter

let makeFloat i d = 
    sprintf "%A.%A" i d |> float
let makeInt (i:string) =
    i |> int
let makeCellRef (row:string,col:string) =
    CellRef (row|>uint32,col|>uint32)
// let makeFloatOperand i d =
//     makeFloat i d |> Float

/// Return matched text and remaining text
let (|RegexMatch|_|) regex input =
    let m = Regex.Match (input, regex)
    match m.Success with
    | true -> (m.Value, input.Substring(m.Value.Length)) |> Some
    | false -> None

(* Relevant tokens
EQUAL, MINUS, PLUS, ASTERISK, DOT, CARET, SLASH
LSBRA, RSBRA, LBRA, RBRA
NUMBER of string (?)
LITERAL of string

*)
let rec (|Expression|_|) (toks:Token list) = 
    // Active pattern to match and construct an Integer, Float or CellRef
    let (|Literal|_|) (toks:Token list) =
        match toks with
        | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d |> Float |> Op, after) |> Some
        | NUMBER(i) :: after -> (makeInt i |> int |> Integer |> Op, after) |> Some
        | LSBRA :: NUMBER(col) :: RSBRA :: LSBRA :: NUMBER(row) :: RSBRA :: after -> ((col,row) |> makeCellRef |> Op, after) |> Some
        | _ -> None
    let (|BinaryPat|_|) func delim (toks:Token list) =
        match delimBeforeAfter delim [] toks with
        | Error(_) -> None
        | Ok (Expression (exp1,_), Expression (exp2,after)) -> (BinExp (func,exp1,exp2),after) |> Some
        | Ok (_) -> None
    
    let (|ModPat|_|) = (|BinaryPat|_|) (%) PERCENT
    let (|MultPat|_|)= (|BinaryPat|_|) (*) ASTERISK
    let (|DivPat|_|) = (|BinaryPat|_|) (/) SLASH
    let (|AddPat|_|) = (|BinaryPat|_|) (+) PLUS
    let (|SubPat|_|) = (|BinaryPat|_|) (-) MINUS
    // Active Pattern to match and construct an add expression
    //let (|AdditionExpression|_|) (toks:Token list) =
    //    match delimBeforeAfter PLUS [] toks with
    //    | Error(_) -> None
    //    | Ok (Expression (exp1,_), Expression (exp2,after)) -> (AddExp (exp1,exp2),after) |> Some
    //    // | Ok ([],_ | _,[]) -> None // If either of the outputs are empty, no valid add expression present
    //    | Ok (_) -> None
    // Active pattern to match and construct a bracketed expression
    let (|BracketPat|_|) (toks:Token list) =
        match toks with
        | LBRA :: after -> match delimBeforeAfter RBRA [] after with
                           | Error(_) -> failwithf "No right bracket found %A" toks // No right bracket found
                           | Ok (Expression(x), RBRA :: after) -> (x,after) |> Some
                           | Ok (Expression(x), []) -> (x,[]) |> Some
                           | Ok ([],[]) | Ok ([],_) -> None // () can be invalid syntax except for functions
                           | Ok (_) -> failwithf "Catch all for bracket expression triggered with %A" toks
        | _ -> None
    
    match toks with
    | ModPat(m,after) -> (m,after) |> Some
    | MultPat(m,after) -> (m,after) |> Some
    | DivPat(m,after) -> (m,after) |> Some
    | AddPat(m,after) -> (m,after) |> Some
    | SubPat(m,after) -> (m,after) |> Some
    | Literal (m,after) -> (m,after) |> Some
    // | Expression (exp,after) -> (exp, after) |> Some
    | _ -> None

// evaluate single expression recursively
let rec evalExp (e:Exp) =
    match e with
    | BinExp(f,x,y) -> f (evalExp(x)) (evalExp(y))
    | Op (Integer(x)) -> x
    | Op (CellRef(col,row)) -> 1
    | _ -> 2

// Parse 1+1 etc, going to have to pass in Table
let parseExpTop (toks:Token list) =
    // Remove all whitespace
    let rWhitespace = function | WHITESPACE(_) -> false | _ -> true
    // Check that it is a valid expression (?)

    // =() symbolises an expression, so keep parsing until you find the final right bracket?
    let rec parseExp' a (toks:Token list) =
        match toks with
        | [] -> a |> Ok // No more tokens, return previously parsed tokens
        | Expression (exp,after) -> parseExp' (exp::a) after
        | _ -> sprintf "Not valid expression %A" toks |> Error
   
    let expList = List.filter rWhitespace toks |> parseExp' [] 
    match expList with 
    | Error(e) -> printfn "Error parsing expression: %A" e
                  Error toks 
    | Ok(x) -> List.map evalExp x |> Ok

//        | Literal (operand,after) -> parseExp' (operand::a) after
//        | NUMBER(i) :: after -> parseExp' (Operand(Int (i|>int))) after
//        | LSBRA :: NUMBER(col) :: RSBRA :: LSBRA :: NUMBER(row) :: RSBRA :: after ->
//            parseExp' ((col,row) |> CellReference |> Operand)::a after // Match [[0-9]+][[0-9]+], turn into CellReference, append to Expression list
        //| LBRA :: after -> match after with
        //                   | // stuff and then stuff and then a right bracket
        // | Expression(x) :: ASTERISK :: after -> BinaryExpression((*),x,parseExp') // Match binary operators, turn into BinaryExpression, match higher precedences first
        // | // Match left bracket, parse until find right bracket
        // | // Match keyword, parse arguments and apply function
    
// 
// let top (toks:Token list) =
//     // If the first token isn't an EQ, return error
//     // Although, check for leading/trailing formatters and remove and replace them afterwards.
//     match toks with
//     | EQUAL :: _ -> parseExp toks
//     | x -> Error "Not an expression."