module TOCite
open Types
open TOCiteHelper
open RefParse

// --------------------------------------------------------------------------------
let rec tocParse tocLst depth index : THeader list * Token list =
    // Detect hashes with whitespace after it
    // printf "tocParse %A\n%A\n" depth tocLst

    // rebuild hash if no whitespace after
    let rec fakehash dep =
        match dep with
        | 0 -> [ENDLINE]
        | _ -> HASH :: fakehash (dep-1)

    match tocLst with
    | ENDLINE::HASH::tl -> tocParse tl 1 index
    | HASH::tl when depth > 0 -> tocParse tl (depth+1) index
    | WHITESPACE _ ::tl when depth > 0 ->
        let ind = tl |> List.tryFindIndex (fun x -> x = ENDLINE)
        //split header from rest of tokens by finding ENDLINE
        match ind with
        | Some i ->
            let (h,t) = List.splitAt i tl
            tocParse t 0 (index+1)
            |> fun (x,y) -> {HeaderName = parseLine' h; Level = depth}::x, HEADER index::y
        | None ->
            [{HeaderName = parseLine' tl; Level = depth}], [HEADER index]
    //hash without whitespace, need to rebuild hash
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
    | _ -> failwithf "Invalide maxDepth" // will railway this. not necessary yet

// call this when ParsedObj wanted
let tocGen tLst maxD =
    {MaxDepth = maxD; HeaderLst = tocGen' tLst maxD |> fun (x,_)->x}

// --------------------------------------------------------------------------------
// parse footnotes with parseLine
let rec citeParseIn' tLne tocLst :TLine*Token list =
    match tocLst with
    // continue if next line is indented
    | ENDLINE::WHITESPACE a::tl when a >= 4 ->
        citeParseIn' tLne tl
        |> fun (x,y) -> List.append tLne x, y
    | ENDLINE::tl -> tLne, tl
    | _::_ ->
        parseLine tocLst
        |> fun(x,y) -> citeParseIn' x y
    | [] -> tLne, []

// parse references with refParser
let rec refParse tocLst :TLine*Token list =
    let ind = tocLst |> List.tryFindIndex (fun x -> x = ENDLINE)
    match ind with
    | Some i ->
        let (h,t) = List.splitAt i tocLst
        refParser Harvard h, t.Tail
    | None ->
        refParser Harvard tocLst, []

// main citation parser
let rec citeParse' tocLst :(ID*TLine)list*Token list =
    let recFit (a,b) c =
        citeParse' b
        |> fun (x,y) -> (c,a)::x, y
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COMMA::tail -> recFit (citeParseIn' [] tail) (FtID (int key))
        | tail ->
            citeParse' tail
            |> fun (x,y) -> x, FOOTER (FtID (int key))::y
    | LSBRA::CARET::LITERAL citkey::RSBRA::tl ->
        match tl with
        | COMMA::tail -> recFit (refParse tail) (RefID citkey)
        | tail ->
            citeParse' tail
            |> fun (x,y) -> x, FOOTER (RefID citkey)::y
    | t::tl ->
        citeParse' tl
        |> fun (x,y) -> x, t::y
    | [] -> [], []

//type change and sorting
// might change now that there are string IDs
let citeGen' tLst =
    let ftLst,tLst = citeParse' tLst
    let k = List.sortBy (fun (x,_) -> x) ftLst
            |> List.map (fun (x,y) -> Footnote(x,y))
    k,tLst

let preParser tLst =
    tocGen' tLst 0
    |> fun (x,y) -> x, citeGen' y
    |> fun (x,(y,z)) -> x, y, z
