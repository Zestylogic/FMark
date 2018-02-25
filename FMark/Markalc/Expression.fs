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
let makeCellReference (row:string,col:string) =
    RowCol(row|>uint32,col|>uint32)

/// EXPRESSION PARSER
let parseExp toks = 
    let rec (|Expression|_|) (toks:Token list) =
        let (|NumberPat|_|) = function
            | NUMBER(i) :: DOT :: NUMBER(d) :: after -> (makeFloat i d, after) |> Some
            | NUMBER(i) :: after -> (makeInt i |> float, after) |> Some
            | _ -> None
        let rec (|CellRefPat|_|) = function
            | RSBRA :: NUMBER(row) :: LSBRA :: RSBRA :: NUMBER(col) :: LSBRA :: after 
                -> ((col,row) |> makeCellReference,after) |> Some
            | _ -> None
        let rec (|ExpressionList|_|) = function
            | Expression(exp,COMMA::ExpressionList(exps,after)) -> (exp::exps,after) |> Some
            | CellRefPat(x,COLON::CellRefPat(y,after)) -> cellRange (x,y) |> function
                | Some lst -> (List.map (CellRef >> Op) lst,after) |> Some
                | _ -> None
            | Expression(exp,after) -> ([exp],after) |> Some
            | _ -> None
        // DEFINE FUNCTIONS
        let funcConstruct funcname = function
        | RCBRA :: ExpressionList (lst,LCBRA::LITERAL(funcname)::after) ->
            (CommaFunction(funcname,lst),after) |> Some
        | _ -> None
        let (|Sum|_|) = funcConstruct "SUM"
        let (|Avg|_|) = funcConstruct "AVG"
        let (|Min|_|) = funcConstruct "MIN"
        let (|Max|_|) = funcConstruct "MAX"
        
        let (|FunctionPat|_|) = function
            | Sum (x,after)  -> (x,after) |> Some
            | Avg (x,after)  -> (x,after) |> Some
            | Min (x,after)  -> (x,after) |> Some
            | Max (x,after)  -> (x,after) |> Some
            | _ -> None

        let (|BasePat|_|) = function
            | NumberPat (x,after) -> (x |> Float |> Op,after) |> Some
            | FunctionPat (x,after) -> (x,after) |> Some
            // Parsing in reverse so right and left brackets swapped
            | CellRefPat (x,after) -> (x |> CellRef |> Op,after) |> Some
            | RBRA :: Expression (x,LBRA::after) -> (x,after) |> Some
            | _ -> None
        // Active pattern to construct precedence-aware active patterns; descends recursively until highest precedence match.
        // Quirk: Returns right-associative results, so parsing in reverse to get left-associativity.
        let rec (|HOFPat|_|) (|PrevPat|_|) op (t:Token) = function
            | PrevPat (exp1, after) -> 
                match after with
                | x :: (HOFPat (|PrevPat|_|) op t (exp2, after')) when x = t -> 
                    (BinExp (op, exp2, exp1), after') |> Some // exp1 and exp2 swapped because parsing in reverse
                | _ -> (exp1, after) |> Some
            | _ -> None
        // Build precendence and normal binary operators
        let patPrecedence = [(%),PERCENT;( **),CARET;(*),ASTERISK;(/),SLASH;(-),MINUS;( + ),PLUS]
        let constructPatterns s x = ((|HOFPat|_|) (List.head s) (fst x) (snd x))::s
        let patterns = List.fold constructPatterns [(|BasePat|_|)] patPrecedence
        let (|FirstPat|_|) = List.head patterns

        // Unary operators, only negative number so far. Doesn't work.
        // let (|UnaryOperators|_|) = function
        //     | FirstPat (exp1, after) ->
        //         match after with
        //         // Negative Numbers
        //         | NumberPat(x,MINUS::after') -> (-x |> Float |> Op,after') |> Some
        //         // ... Could have more patterns here.
        //         | _ -> (exp1,after) |> Some
        //     | _ -> None

        match toks with
        | FirstPat x -> Some x
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
    |> function
       | Error(e) -> printfn "Error parsing expression: %A" e
                     Error toks 
       | Ok(x) -> evalExpTest x |> Ok