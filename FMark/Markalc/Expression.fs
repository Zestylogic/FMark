/// This module should parse tokens into an expression
module Expression

open MarkalcShared
open Types

(* SUPPORTED OPERATIONS:
BinaryExpressions (in order of precedence): 
    % - Modulo
    ^ - To the power
    * - Multiply
    / - Divide
    + - Add
    - - Subtract
*)

let makeFloat i d = 
    sprintf "%A.%A" i d |> float
let makeInt (i:string) =
    i |> int
let makeCellRef (row:string,col:string) =
    CellRef (row|>uint32,col|>uint32)
let rec (|Expression|_|) (toks:Token list) = 
    // Active pattern to match and construct an Integer, Float or CellRef
    let (|Literal|_|) (toks:Token list) =
        match toks with
        | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d |> Float |> Op, after) |> Some
        | NUMBER(i) :: after -> (makeInt i |> float |> Float |> Op, after) |> Some
        | LSBRA :: NUMBER(col) :: RSBRA :: LSBRA :: NUMBER(row) :: RSBRA :: after -> ((col,row) |> makeCellRef |> Op, after) |> Some
        | _ -> None
    let (|BinaryPat|_|) func delim (toks:Token list) =
        match delimSplit true delim toks with
        | Error(_) -> None
        | Ok (Expression (exp1,_), Expression (exp2,after)) -> (BinExp (func,exp1,exp2),after) |> Some
        | Ok (_) -> None
    
    let (|ModPat|_|) = (|BinaryPat|_|) (%) PERCENT
    let (|MultPat|_|)= (|BinaryPat|_|) (*) ASTERISK
    let (|DivPat|_|) = (|BinaryPat|_|) (/) SLASH
    let (|AddPat|_|) = (|BinaryPat|_|) (+) PLUS
    let (|SubPat|_|) = (|BinaryPat|_|) (-) MINUS
    // Active pattern to match and construct a bracketed expression
    let (|BracketPat|_|) (toks:Token list) =
        match toks with
        | LBRA :: after -> match delimSplit true RBRA after with
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
    | Op (Float(x)) -> x
    | Op (CellRef(col,row)) -> 1.0
    | _ -> 2.0

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
    | Ok(x) ->  // printfn "expList has %A elements in." (List.length x) expList only ever has one element in it.
                List.map evalExp x |> Ok // Convert back into tokens?
let toNumber x = NUMBER(x|>string)

// let top (toks:Token list) =
//     // If the first token isn't an EQ, return error
//     // Although, check for leading/trailing formatters and remove and replace them afterwards.
//     match toks with
//     | EQUAL :: _ -> parseExp toks
//     | x -> Error "Not an expression."