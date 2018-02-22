module Parser
open Types

let rec (|NormalWords|_|) tok =
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

let (|EmphasisS|_|) = function
    | ASTERISK :: tl -> Some tl
    | WHITESPACE _ :: UNDERSCORE :: tl -> Some tl
    | _ -> None

let (|EmphasisE|_|) = function
    | ASTERISK :: tl -> Some tl
    | UNDERSCORE :: WHITESPACE _ :: tl -> Some tl
    | _ -> None

let parseText tLst =
    let rec textIn tLst' pLst' :Token list* InlineElement list =
        match tLst' with
        | NormalWords t :: tl -> textIn tl (FrmtedString (Literal t)::pLst')
        | _ -> tLst', pLst'
    textIn tLst []

let rec parseLine pLst tLst: TLine*Token list =
    // printf "parseLine\n%A\n" tLst
    match tLst with
    | ENDLINE::_ -> pLst, tLst
    | EmphasisS tl ->
        let tok,text = parseText tl
        match tok with
        | EmphasisE ttl -> parseLine (FrmtedString (Emphasis text)::pLst) ttl
        | ENDLINE :: ttl -> parseLine (List.append text pLst) ttl
        | [] -> text, []
        | _ -> failwithf "Unaccepted Emphasis Token"
    | NormalWords t :: tl -> parseLine (FrmtedString (Literal t)::pLst) tl
    | _::tl -> parseLine pLst tl
    | [] -> pLst, tLst

let parseLine' tLst = (fun (x,_) -> List.rev x) (parseLine [] tLst)

let rec tocParse tocLst depth =
    // Detect hashes with whitespace after it
    // printf "tocParse %A\n%A\n" depth tocLst
    match tocLst with
    | HASH::tl -> tocParse tl (depth+1)
    | WHITESPACE _ ::tl when depth > 0 ->
        // a bit odd here, maybe replace this by a recursion similar to citeParseIn?
        let (h,t) = List.splitAt (tl |> List.findIndex (fun x -> x = ENDLINE)) tl
        {HeaderName = parseLine' h; Level = depth} :: tocParse t 0
    | _::tl -> tocParse tl 0
    | [] -> []
    
let tocGen tokenLst maxDepth =
    tocParse tokenLst 0
    |> List.filter (fun x -> x.Level <= maxDepth)

//pick out footnotes and send to footLineParse
let rec citeParse tocLst =
    let recFit (a,b) c = Footnote(c,a)::citeParse b
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COLON::tail -> recFit (citeParseIn [] tail) (int key)
        | tail -> citeParse tail // TODO: do something when it is inline?
    | _::tl -> citeParse tl
    | [] -> []

//parse footnotes with parseLine
and citeParseIn tLne tocLst :TLine*Token list =
    match tocLst with
    | ENDLINE::WHITESPACE 4::tl ->
        citeParseIn tLne tl
        |> fun (x,y) -> List.append tLne x, y
    | ENDLINE::tl -> tLne, tl
    | _::_ ->
        parseLine [] tocLst
        |> fun(x,y) -> citeParseIn x y
    | [] -> failwithf "this shouldn't happen"

let citeGen footLst =
    List.sortBy (fun (x,_) -> x) footLst
    