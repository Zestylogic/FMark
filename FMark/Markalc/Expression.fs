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

// evaluate single expression recursively
let rec evalExp e =
    match e with
    | BinExp(f,x,y) -> f (evalExp(x)) (evalExp(y))
    | Op (Float(x)) -> x
    | Op (CellRef(col,row)) -> 1.0
    | _ -> 2.0
let toNumber x = NUMBER(x|>string)
let rec (|Expression|_|) (toks:Token list) = 
    // Active pattern to match and construct an Integer, Float or CellRef
    let (|Literal|_|) (toks:Token list) =
        match toks with
        | NUMBER(i) :: DOT :: NUMBER(d) :: _ -> makeFloat i d |> Float |> Op |> Some
        | NUMBER(i) :: _ -> makeInt i |> float |> Float |> Op |> Some
        | LSBRA :: NUMBER(col) :: RSBRA :: LSBRA :: NUMBER(row) :: RSBRA :: _ -> (col,row) |> makeCellRef |> Op |> Some
        | _ -> None
    let (|BinaryPat|_|) func delim (toks:Token list) =
        match delimSplit true delim toks with
        | Error(_) -> None
        | Ok (Expression exp1, Expression exp2) -> BinExp (func,exp1,exp2) |> Some
        | Ok (_) -> None

    let (|ModPat|_|) = (|BinaryPat|_|) (%) PERCENT
    let (|MultPat|_|)= (|BinaryPat|_|) (*) ASTERISK
    let (|DivPat|_|) = (|BinaryPat|_|) (/) SLASH
    let (|AddPat|_|) = (|BinaryPat|_|) (+) PLUS
    let (|SubPat|_|) = (|BinaryPat|_|) (-) MINUS

    // Active pattern to match and construct a bracketed expression
    let (|BracketPat|_|) (toks:Token list) =
        match delimSplit true LBRA toks with
        | Ok (before,after) -> match delimSplit false RBRA after with
                               | Ok(inside,a) -> match parseBracket inside with
                                                 | Error(_) -> failwith "Mismatched brackets"
                                                 | Ok(x) -> match before @ x @ a with
                                                            | Expression(e1) -> e1 |> Some
                                                            | _ -> failwith "Mismatched brackets"
                               | Error(_) -> None
        | _ -> None

    match toks with
    | BracketPat m -> m |> Some
    | ModPat m -> m |> Some
    | MultPat m -> m |> Some
    | DivPat m -> m |> Some
    | AddPat m -> m |> Some
    | SubPat m -> m |> Some
    | Literal m -> m |> Some
    | _ -> None

and parseBracket toks =
    // Remove all whitespace
    let rWhitespace = function | WHITESPACE(_) -> false | _ -> true 
    let parseExp = function | Expression exp -> Ok [exp]
                             | _ ->  sprintf "Not valid expression %A" toks |> Error
    let expList = List.filter rWhitespace toks |> parseExp
    match expList with 
    | Error(e) -> printfn "Error parsing expression: %A" e
                  Error toks 
    | Ok(x) ->  List.map (evalExp>>toNumber) x |> Ok

// Parse 1+1 etc, going to have to pass in Table
let parseExpTop (toks:Token list) =
    // Remove all whitespace
    let rWhitespace = function | WHITESPACE(_) -> false | _ -> true
    let parseExp = function | Expression exp -> Ok [exp]
                             | _ ->  sprintf "Not valid expression %A" toks |> Error
   
    let expList = List.filter rWhitespace toks |> parseExp
   
    match expList with 
    | Error(e) -> printfn "Error parsing expression: %A" e
                  Error toks 
    | Ok(x) ->  // printfn "expList has %A elements in." (List.length x) expList only ever has one element in it.
                List.map evalExp x |> Ok // Convert back into tokens?


// let top (toks:Token list) =
//     // If the first token isn't an EQ, return error
//     // Although, check for leading/trailing formatters and remove and replace them afterwards.
//     match toks with
//     | EQUAL :: _ -> parseExp toks
//     | x -> Error "Not an expression."