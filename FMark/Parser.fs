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
        | _ -> failwithf "Unaccepted Emphasis Token, support to be added"
    | NormalWords t :: tl -> parseLine (FrmtedString (Literal t)::pLst) tl
    | _::tl -> parseLine pLst tl
    | [] -> pLst, tLst

let parseLine' tLst = (fun (x,_) -> List.rev x) (parseLine [] tLst)

// --------------------------------------------------------------------------------
let rec tocParse tocLst depth index : THeader list * Token list =
    // Detect hashes with whitespace after it
    // printf "tocParse %A\n%A\n" depth tocLst
    // let refFit (a,b) = {HeaderName = parseLine' h; Level = depth} :: tocParse t 0
    let rec fakehash dep =
        match dep with
        | 0 -> [ENDLINE]
        | _ -> HASH :: fakehash (dep-1)

    match tocLst with
    | ENDLINE::HASH::tl -> tocParse tl 1 index
    | HASH::tl when depth > 0 -> tocParse tl (depth+1) index
    | WHITESPACE _ ::tl when depth > 0 ->
        let ind = tl |> List.tryFindIndex (fun x -> x = ENDLINE)
        match ind with
        | Some i ->
            let (h,t) = List.splitAt i tl
            tocParse t 0 (index+1)
            |> fun (x,y) -> {HeaderName = parseLine' h; Level = depth}::x, HEADER index::y
        | None ->
            [{HeaderName = parseLine' tl; Level = depth}], [HEADER index]
    | a::tl when depth > 0 ->
        tocParse tl 0 index
        |> fun (x,y) -> x, List.append (fakehash depth |> List.rev) (a::y)
    | a::tl -> 
        tocParse tl 0 index
        |> fun (x,y) -> x, a::y
    | [] -> [], []

let tocGen' tokenLst maxDepth =
    match maxDepth with
    | 0 -> tocParse tokenLst 0 0
    | d when d > 0 ->
        tocParse tokenLst 0 0
        |> fun (x,y) -> List.filter (fun x -> x.Level <= d) x, y
    | _ -> failwithf "Invalide maxDepth" // railway this? not necessary yet

let tocGen tLst maxD =
    {MaxDepth = maxD; HeaderLst = tocGen' tLst maxD |> fun (x,_)->x}

// --------------------------------------------------------------------------------
//pick out footnotes and send to footLineParse
let rec citeParse tocLst =
    let recFit (a,b) c = (c,a)::citeParse b
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COLON::tail -> recFit (citeParseIn [] tail) (int key)
        | tail -> citeParse tail
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
    | [] -> tLne, []

//type change and sorting
let citeGen tLst =
    let ftLst = citeParse tLst
    List.sortBy (fun (x,_) -> x) ftLst
    |> List.map (fun (x,y) -> Footnote(x,y))

// --------------------------------------------------------------------------------
//pick out footnotes and send to footLineParse
//second version for inserting tokens back for linking
//works, but messy compared to the first version
let rec citeParse' tocLst :(int*TLine)list*Token list =
    let recFit (a,b) c =
        citeParse' b
        |> fun (x,y) -> (c,a)::x, y
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COLON::tail -> recFit (citeParseIn' [] tail) (int key)
        | tail ->
            citeParse' tail
            |> fun (x,y) -> x, FOOTER (int key)::y
    | t::tl ->
        citeParse' tl
        |> fun (x,y) -> x, t::y
    | [] -> [], []

//parse footnotes with parseLine
and citeParseIn' tLne tocLst :TLine*Token list =
    match tocLst with
    | ENDLINE::WHITESPACE 4::tl ->
        citeParseIn' tLne tl
        |> fun (x,y) -> List.append tLne x, y
    | ENDLINE::tl -> tLne, tl
    | _::_ ->
        parseLine [] tocLst
        |> fun(x,y) -> citeParseIn' x y
    | [] -> tLne, []


//type change and sorting
let citeGen' tLst =
    let ftLst,tLst = citeParse' tLst
    let k = List.sortBy (fun (x,_) -> x) ftLst
            |> List.map (fun (x,y) -> Footnote(x,y))
    k,tLst