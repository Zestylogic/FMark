module RefParse
open Types

let harGen tokLst =
    let rec harGen' tLst:TLine =
        match tLst with
        | LITERAL lit::tl ->
            match tl with
            | [] -> [FrmtedString (Literal (lit+", "))]
            | _ -> FrmtedString (Literal (string lit.[0]+". "))::harGen' tl
        | _::tl -> harGen' tl
        | [] -> []
    harGen' tokLst |> List.rev

let rec ref2TLine format ref:TLine =
    match format with
    | IEEE -> [FrmtedString (Literal "IEEE citation not supported yet")]
    | Chicago -> [FrmtedString (Literal "Chicago citation not supported yet")]
    | Harvard -> List.rev ref.Author |> harGen

let refParser frmt tLst =
    let rec refPar' refData tLst =
        let rec refParse' parsing tail =
            match tail with
            | COMMA::tail -> parsing, tail
            | a::tail -> refParse' (a::parsing) tail
            | [] -> parsing,[]

        match tLst with
        | LITERAL "author"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Author = x} y
        | LITERAL "title"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Title = x} y
        | LITERAL "year"::EQUAL::WHITESPACE _::NUMBER a::tl ->
            refPar' {refData with Year = int a} tl
        | LITERAL "url"::EQUAL::WHITESPACE _::LITERAL s::tl ->
            refPar' {refData with URL = s} tl
        | LITERAL "access"::EQUAL::WHITESPACE _::tl ->
            refParse' [] tl
            |> fun (x,y) -> refPar' {refData with Access = x} y
        | ENDLINE::tl -> refData,tl
        | _::tl -> refPar' refData tl
        | [] -> refData, []
    refPar' {Author = []; Title = []; Year = 0; URL = ""; Access = []} tLst
    |> fun (x,_) -> ref2TLine frmt x