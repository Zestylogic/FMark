/// This module should parse tokens into an expression
module Expression

open MarkalcShared
open Types
open FsCheck

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
let makeCellRef (row:string,col:string) =
    CellRef (row|>uint32,col|>uint32)
/// Expression parser
let parseExp toks = 
    let rec (|Expression|_|) (toks:Token list) =
        let (|BasePat|_|) (toks:Token list) =
            match toks with
            | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d |> Float |> Op,after) |> Some
            | NUMBER(i) :: after ->( makeInt i |> float |> Float |> Op,after) |> Some
            // Parsing in reverse so right and left brackets swapped
            | RSBRA :: NUMBER(row) :: LSBRA :: RSBRA :: NUMBER(col) :: LSBRA :: after -> ((col,row) |> makeCellRef |> Op,after) |> Some
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
// Recursively evaluate expression AST. CellRef will need access to whole table
let rec evalExp e = 
    match e with
    | BinExp(f,x,y) -> f (evalExp(x)) (evalExp(y))
    | Op (Float(x)) -> x
    | Op (CellRef(col,row)) -> 1.0
    | _ -> 13.0
let toToken x = NUMBER(x|>string)
// Parse 1+1 etc, going to have to pass in Table
let parseExpTop (toks:Token list) =
    List.filter (function | WHITESPACE(_) -> false | _ -> true) toks // Remove whitespace
    |> parseExp
    |> function // Perhaps monads not necessary
       | Error(e) -> printfn "Error parsing expression: %A" e
                     Error toks 
       | Ok(x) -> evalExp x |> Ok
let parseExpression = function 
    | EQUAL :: tail -> 
        parseExpTop tail |> function
            | Ok(x) -> [toToken x] |> Ok
            | Error(e) -> Error e
    | toks -> Error toks