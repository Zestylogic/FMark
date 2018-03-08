module RefParse
open Types

let autGen tokLst =
    let rec autGen' tLst:TLine =
        match tLst with
        | LITERAL lit::tl ->
            match tl with
            | [] -> [FrmtedString (Literal (lit+", "))]
            | _ -> FrmtedString (Literal (string lit.[0]+". "))::autGen' tl
        | _::tl -> autGen' tl
        | [] -> []
    match tokLst with
    | None -> []
    | Some a -> List.rev a |> autGen' |> List.rev

let tilGen tokLst = 
    let rec tilGen' tLst:TLine =
        match tLst with
        | LITERAL lit::tl ->
            match tl with
            | [] -> [(FrmtedString (Literal lit))]
            | _ -> FrmtedString (Literal lit)::tilGen' tl
        | _::tl -> tilGen' tl
        | [] -> []
    match tokLst with
    | None -> []
    | Some a -> [tilGen' a |> List.rev |> Emphasis |> FrmtedString]

let yerGen year =
    match year with
    | None -> []
    | Some a -> ["(" + string a + ") "|> Literal |> FrmtedString]

let urlGen url =
    match url with
    | None -> []
    | Some a ->
        [FrmtedString (Literal "Available from: "); Link(Literal a,a);
            FrmtedString (Literal " ")]

let accGen tokLst =
    // to include date formatting
    let rec accGen' tLst:TLine =
        match tLst with
        | LITERAL lit::tl ->
            match tl with
            | [] -> [(FrmtedString (Literal lit))]
            | _ -> FrmtedString (Literal lit)::accGen' tl
        | _::tl -> accGen' tl
        | [] -> []
    match tokLst with
    | None -> []
    | Some a ->
        [FrmtedString (Literal "]")]
        |> List.append (FrmtedString (Literal "[Accessed on: ")::accGen' a)

let rec ref2TLine format ref:TLine =
    match format with
    | IEEE -> [FrmtedString (Literal "IEEE citation not supported yet")]
    | Chicago -> [FrmtedString (Literal "Chicago citation not supported yet")]
    | Harvard ->
        [autGen ref.Author; tilGen ref.Title; yerGen ref.Year;
            urlGen ref.URL; accGen ref.Access]
        |> List.reduce List.append

// parses a single reference entry
// This probably should never see ENDLINE
let refParser frmt tLst =
    let rec refPar' refData tLst =
        let rec refParse' parsing tail =
            match tail with
            | COMMA::tl -> parsing, tl
            | ENDLINE::tl -> parsing, tl
            | a::tl -> refParse' (a::parsing) tl
            | [] -> parsing, []

        match tLst with
        | LITERAL "author"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Author = Some x} y
        | LITERAL "title"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Title = Some x} y
        | LITERAL "year"::EQUAL::WHITESPACE _::NUMBER a::tl ->
            refPar' {refData with Year = Some (int a)} tl
        | LITERAL "url"::EQUAL::WHITESPACE _::LITERAL s::tl ->
            refPar' {refData with URL = Some s} tl
        | LITERAL "access"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Access = Some x} y
        | ENDLINE::tl -> refData,tl
        | _::tl -> refPar' refData tl
        | [] -> refData, []
    tLst    
    |> refPar' {Author = None; Title = None; Year = None; URL = None; Access = None}
    |> fun (x,_) -> ref2TLine frmt x