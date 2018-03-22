module TOCite
open Types
open RefParse
open ParserHelperFuncs

// --------------------------------------------------------------------------------
let mountedInLineParser tokLst =
    //only simple footer in header
    let rec mountedInLineParser' toParse tLst =
        match tLst with
        | FOOTNOTE i::tl ->
            let s = string i
            parseInLineElements toParse :: [Reference (Literal s, "footnote-"+s)]
                :: mountedInLineParser' [] tl
        | CITATION _::tl -> mountedInLineParser' toParse tl
        | a::tl -> mountedInLineParser' (a::toParse) tl
        | [] -> [parseInLineElements toParse]
    tokLst
    |> List.rev
    |> mountedInLineParser' []
    |> List.rev
    |> List.reduce List.append

let rec tocParse tocLst depth index : THeader list * Token list =
    // Detect hashes with whitespace after it
    // printf "tocParse %A\n%A\n" depth tocLst

    // rebuild hash if no whitespace after
    let rec fakehash dep =
        match dep with
        | 0 -> [ENDLINE;ENDLINE]
        | _ -> HASH :: fakehash (dep-1)

    match tocLst with
    | ENDLINE::ENDLINE::HASH::tl -> tocParse tl 1 index
    | HASH::tl when depth > 0 -> tocParse tl (depth+1) index
    | WHITESPACE _ ::tl when depth > 0 ->
        let ind = tl |> List.tryFindIndex (fun x -> x = ENDLINE)
        //split header from rest of tokens by finding ENDLINE
        match ind with
        | Some i ->
            let (h,t) = List.splitAt i tl
            tocParse t 0 (index+1)
            |> fun (x,y) -> {HeaderName = mountedInLineParser h; Level = depth}::x, ENDLINE::ENDLINE::(HEADER index)::y
        | None ->
            [{HeaderName = mountedInLineParser tl; Level = depth}], [ENDLINE;ENDLINE;HEADER index]
    // hash without whitespace, need to rebuild hash
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
    | _ -> failwithf "Invalid maxDepth" // will railway this. not necessary yet

// call this when ParsedObj wanted
let tocGen tLst maxD =
    {HeaderLst = tocGen' tLst maxD |> fun (x,_)->x}

// --------------------------------------------------------------------------------
// /parse footnotes with parseInLineElements
let citeParseIn tocLst =
    let rec citeParseIn' toParse tail =
        match tail with
        | ENDLINE::WHITESPACE a::tl when a >= 4 -> citeParseIn' toParse tl
        | ENDLINE::tl -> toParse,tl
        | a::tl -> citeParseIn' (a::toParse) tl
        | [] -> toParse,[]
    citeParseIn' [] tocLst
    |> fun (x,y) -> x |> List.rev |> parseInLineElements, y

/// main citation parser
let rec citeParse' style tocLst :ParsedObj list*Token list =
    let recFitFt (a,b) c =
        citeParse' style b
        |> fun (x,y) -> Footnote (c,a)::x, y
    let recFitRef (a,b,c) d =
        citeParse' style c
        |> fun (x,y) -> Citation (d,a,b)::x, y   
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COMMA::tail -> recFitFt (citeParseIn tail) (int key)
        | tail ->
            citeParse' style tail
            |> fun (x,y) -> x, FOOTNOTE (int key)::y
    | LSBRA::CARET::LITERAL citkey::RSBRA::tl ->
        match tl with
        | COMMA::tail -> recFitRef (refParse style tail) citkey
        | tail ->
            citeParse' style tail
            |> fun (x,y) -> x, CITATION citkey::y
    | t::tl ->
        citeParse' style tl
        |> fun (x,y) -> x, t::y
    | [] -> [], []

let styleParse rLst tocLst =
    let rec styleParse' rLst tocLst =
        let stylify str =
            match str with
            | "Harvard" -> Some Harvard
            | "Chicago" -> Some Chicago
            | "IEEE" -> Some IEEE
            | _ -> None  // use default
        match tocLst with
        | ENDLINE::PERCENT::PERCENT::LITERAL "RefStyle"::AgnoEqual tail ->
            match tail with
            | LITERAL lit::tl -> stylify lit, List.append (List.rev rLst) tl
            | _ -> styleParse' (tocLst.Head::rLst) tocLst.Tail
        | a::tl -> styleParse' (a::rLst) tl
        | [] -> None, rLst
    styleParse' rLst tocLst

//type change and sorting
// might change now that there are string IDs
let citeGen' tLst =
    let style,tl = styleParse [] tLst
    let ftLst,tLst =
        match style with
        | Some s -> citeParse' s tl
        | None -> citeParse' Harvard tLst // use harvard as default style
    let sortFt ft1 ft2 =
        match ft1,ft2 with
        | Footnote (i,_), Footnote (j,_) -> i-j
        | Citation _, Footnote _ -> 1
        | Footnote _, Citation _ -> -1
        | _, _ -> 0
    List.sortWith sortFt ftLst, tLst

let preParser tLst =
    citeGen' tLst
    |> fun (x,y) -> x, tocGen' y 0
    |> fun (x,(y,z)) -> y, x, z