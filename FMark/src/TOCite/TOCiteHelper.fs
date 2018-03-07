module TOCiteHelper
open Types

let rec (|NormalWords|_|) tok =
    // special characteres commented out
    match tok with
    | LITERAL lit -> Some lit
    | WHITESPACE _ -> Some " "
    | NUMBER num -> Some num
    | HASH -> Some "#"
    | PIPE -> Some "|"
    | EQUAL -> Some "="
    | MINUS -> Some "-"
    | PLUS -> Some "+"
    // | ASTERISK -> Some "*"
    | DOT -> Some "."
    | DASTERISK -> Some "**"
    | TASTERISK -> Some "***"
    // | UNDERSCORE
    | DUNDERSCORE -> Some "__"
    | TUNDERSCORE -> Some "___"
    | TILDE -> Some "~"
    | DTILDE -> Some "~~"
    | TTILDE -> Some "~~~"
    // | LSBRA -> Some "["
    // | RSBRA -> Some "]"
    | LBRA -> Some "("
    | RBRA -> Some ")"
    | BSLASH -> Some "\\"
    | SLASH -> Some "/"
    | LABRA -> Some "<"
    | RABRA -> Some ">"
    | LCBRA -> Some "{"
    | RCBRA -> Some "}"
    | BACKTICK -> Some "`"
    | TBACKTICK -> Some "```"
    | EXCLAMATION -> Some "!"
    // | ENDLINE
    | COLON -> Some ":"
    | CARET -> Some "^"
    | PERCENT -> Some "%"
    | _ -> None

// start of emphasis
let (|EmphasisS|_|) = function
    | ASTERISK :: tl -> Some tl
    | WHITESPACE _ :: UNDERSCORE :: tl -> Some tl
    | _ -> None

// end of emphasis
let (|EmphasisE|_|) = function
    | ASTERISK :: tl -> Some tl
    | UNDERSCORE :: WHITESPACE _ :: tl -> Some tl
    | _ -> None

// parse all plain text at head of list
let parseText tLst =
    let rec textIn tLst' pLst' :Token list* InlineElement list =
        match tLst' with
        | NormalWords t :: tl -> textIn tl (FrmtedString (Literal t)::pLst')
        | _ -> tLst', pLst'
    textIn tLst []

// parse line with formats
let parseLine toLst =
    let rec parseLineRec pLst tLst: TLine*Token list =
        // printf "parseLine\n%A\n" tLst
        match tLst with
        | ENDLINE::_ -> pLst, tLst
        | EmphasisS tl ->
            let tok,text = parseText tl
            match tok with
            | EmphasisE ttl -> parseLineRec (FrmtedString (Emphasis text)::pLst) ttl
            | ENDLINE :: ttl -> parseLineRec (List.append text pLst) ttl
            | [] -> text, []
            | _ -> failwithf "Unaccepted Emphasis Token, support to be added"
        | NormalWords t :: tl -> parseLineRec (FrmtedString (Literal t)::pLst) tl
        | _::tl -> parseLineRec pLst tl
        | [] -> pLst, tLst
    parseLineRec [] toLst
    |> fun (x,y) -> List.rev x, y

// call this if rest of the token list not needed
let parseLine' tLst = (fun (x,_) -> x) (parseLine tLst)
