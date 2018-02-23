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
// HELPER FUNCTIONS
let makeFloat i d = 
    sprintf "%A.%A" i d |> float
let makeInt (i:string) =
    i |> int
let makeCellRefOp (row:string,col:string) =
    RowCol(row|>uint32,col|>uint32) |> CellRef |> Op

/// EXPRESSION PARSER
let parseExp toks = 
    let rec (|Expression|_|) (toks:Token list) =
        let (|BasePat|_|) (toks:Token list) =
            match toks with
            | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d |> Float |> Op,after) |> Some
            | NUMBER(i) :: after ->( makeInt i |> float |> Float |> Op,after) |> Some
            // Parsing in reverse so right and left brackets swapped
            | RSBRA :: NUMBER(row) :: LSBRA :: RSBRA :: NUMBER(col) :: LSBRA :: after 
                -> ((col,row) |> makeCellRefOp,after) |> Some
            | RBRA :: Expression (x,LBRA::after) -> (x,after) |> Some
            | _ -> None
        // Active pattern to construct precedence-aware active patterns; descends recursively until highest precedence match.
        // Quirk: Returns right-associative results, so parsing in reverse to get left-associativity.
        let rec (|HOFPat|_|) (|PrevPat|_|) op (t:Token) toks =
            match toks with
            | PrevPat (exp1, after) -> 
                match after with
                | x :: (HOFPat (|PrevPat|_|) op t (exp2, after')) when x = t -> 
                    (BinExp (op, exp2, exp1), after') |> Some // exp1 and exp2 swapped because parsing in reverse
                | _ -> (exp1, after) |> Some
            | _ -> None
        let (|ModPat|_|) = (|HOFPat|_|) (|BasePat|_|)( % ) PERCENT
        let (|PowPat|_|) = (|HOFPat|_|) (|ModPat|_|) ( **) CARET
        let (|MulPat|_|) = (|HOFPat|_|) (|PowPat|_|) ( * ) ASTERISK
        let (|DivPat|_|) = (|HOFPat|_|) (|MulPat|_|) ( / ) SLASH
        let (|SubPat|_|) = (|HOFPat|_|) (|DivPat|_|) ( - ) MINUS
        let (|AddPat|_|) = (|HOFPat|_|) (|SubPat|_|) ( + ) PLUS
        match toks with
        | AddPat x -> Some x
        | _ -> None
    match List.rev toks with 
    | Expression (exp,[]) -> Ok exp
    | _ ->  sprintf "Not valid expression %A" toks |> Error

let parseExpression toks = 
    match toks with
    | EQUAL :: tail -> 
         whitespaceFilter tail |> parseExp |> function
             | Error(e) -> Error toks
             | Ok(x) ->  Ok x
    | toks -> Error toks

// ################## TEST FUNCTIONS ####################
// Recursively evaluate expression AST. CellRef will need access to whole table, this is used to test everything else
let rec evalExpTest e = 
    match e with
    | BinExp(f,x,y) -> f (evalExpTest(x)) (evalExpTest(y))
    | Op (Float(x)) -> x
    | _ -> 13.0



// Test evaluation without table
let parseExpTest (toks:Token list) =
    whitespaceFilter toks // Remove whitespace
    |> parseExp
    |> function // Perhaps monads not necessary
       | Error(e) -> printfn "Error parsing expression: %A" e
                     Error toks 
       | Ok(x) -> evalExpTest x |> Ok