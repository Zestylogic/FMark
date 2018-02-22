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
        | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d |> Float |> Op,after) |> Some
        | NUMBER(i) :: after -> (makeInt i |> float |> Float |> Op,after) |> Some
        | LSBRA :: NUMBER(col) :: RSBRA :: LSBRA :: NUMBER(row) :: RSBRA :: after -> ((col,row) |> makeCellRef |> Op,after) |> Some
        | _ -> None
    let (|BinaryPat|_|) func delim (toks:Token list) =
        match delimSplit true delim toks with
        | Error(_) -> None
        | Ok (Expression (exp1,_), Expression (exp2,after)) -> (BinExp (func,exp1,exp2),after) |> Some
        | Ok (_) -> None
    
    // let (|PrimExpr|_|) toks =
    //     match toks with
    //     | Literal x -> Some x
    //     | LBRA :: after ->  match delimSplit false RBRA after with
    //                         | Ok(Expression(exp),_) -> (exp,after) |> Some
    //                         | _ -> None
    //                         //(exp, rst) |> Some
    //     | _ -> None
// 
    // let rec (|BinExpr|_|) (|NextExpr|_|) func delim toks =
    //     match delimSplit false delim toks with
    //     | NextExpr (lVal, rhs) ->
    //         match rhs with
    //         | BinExpr (|NextExpr|_|) delim func (rVal, rst')
    //             -> (BinExp (func, lVal, rVal), rst') |> Some
// 
    //         | _ -> (lVal, rhs) |> Some
    //     | _ -> None

    let (|ModPat|_|) = (|BinaryPat|_|) (%) PERCENT
    let (|MultPat|_|)= (|BinaryPat|_|) (*) ASTERISK
    let (|DivPat|_|) = (|BinaryPat|_|) (/) SLASH
    let (|AddPat|_|) = (|BinaryPat|_|) (+) PLUS
    let (|SubPat|_|) = (|BinaryPat|_|) (-) MINUS

    // Active pattern to match and construct a bracketed expression
    let (|BracketPat|_|) (toks:Token list) =
    // RegexPrefix "\(" (_, Expr (exp, RegexPrefix "\)" (_, rst)) ) -> (exp, rst) |> Some
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
    // | Expression (exp,after) -> (exp, after) |> Some
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
    // Check that it is a valid expression (?)
    
    // let rec parseExp' a toks =
    //     match toks with
    //     | [] -> a |> Ok
    //     | Expression(exp,after) -> parseExp' (exp::a) after
    //     | _ ->  sprintf "Not valid expression %A" toks |> Error
    // let parseExp toks = parseExp' [] toks
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