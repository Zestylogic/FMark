module RefParse
open Types

// put these two in the big function later
let yerGen style year =
    match style with
    | Harvard ->
        match year with
        | None -> []
        | Some a -> ["(" + string a + ") "|> Literal |> FrmtedString]
    | Chicago ->
        match year with
        | None -> []
        | Some a -> [string a + ". " |> Literal |> FrmtedString]
    | _ -> []

let urlGen style url =
    match style with
    | Harvard ->
        match url with
        | None -> []
        | Some a ->
            [FrmtedString (Literal "Available from: "); Link(Literal a,a);
                FrmtedString (Literal " ")]
    | Chicago ->
        match url with
        | None -> []
        | Some a -> [Link(Literal a,a)]
    | _ -> []

let plnGen tokLst =
    let rec plainGen' tLst =
        match tLst with
        | LITERAL lit::tl -> lit::plainGen' tl
        | WHITESPACE _::tl -> " "::plainGen' tl
        | _::tl -> plainGen' tl
        | [] -> []
    plainGen' tokLst |> List.rev |> List.reduce (+)

type GenType = HarAut | ChiAut | ChiWebDate | ChiBookTil | ChiWebTil | HarDate | HarTil
let (|OverallM|) =
    let hAut tokLst =
        let rec hAutGen' tLst:TLine =
            match tLst with
            | LITERAL lit::tl ->
                match tl with
                | [] -> [FrmtedString (Literal (lit+", "))]
                | _ -> FrmtedString (Literal (string lit.[0]+". "))::hAutGen' tl
            | _::tl -> hAutGen' tl
            | [] -> []
        List.rev tokLst |> hAutGen' |> List.rev
    let cAut tokLst = [plnGen tokLst + ". " |> Literal |> FrmtedString]
    let cWebTil tokLst = ["\"" + plnGen tokLst + ".\" " |> Literal |> FrmtedString]
    let cWebDate tokLst = ["Accessed " + plnGen tokLst + ". " |> Literal |> FrmtedString]
    let hDate tokLst = ["[Accessed " + plnGen tokLst + "]." |> Literal |> FrmtedString]
    let cTil tokLst = [[plnGen tokLst + ". " |> Literal |> FrmtedString] |> Emphasis |> FrmtedString]
    let hTil tokLst = [[plnGen tokLst + ". " |> Literal |> FrmtedString] |> Emphasis |> FrmtedString]
    function
    | HarAut -> hAut
    | HarDate -> hDate
    | HarTil -> hTil
    | ChiAut -> cAut
    | ChiBookTil -> cTil
    | ChiWebTil -> cWebTil
    | ChiWebDate -> cWebDate

let build gType tokLst =
    match tokLst with
    | None -> []
    | Some tl ->
        match gType with
        | OverallM f -> f tl

let rec ref2TLine format ref:TLine =
    match format with
    | IEEE -> [FrmtedString (Literal "IEEE citation not supported yet")]
    | Chicago ->
        match ref.Cat with
        | Some Book ->
            [build ChiAut ref.Author; yerGen Chicago ref.Year;
                build ChiBookTil ref.Title]
            |> List.reduce List.append
        | Some Website ->
            [build ChiAut ref.Author; yerGen Chicago ref.Year; build ChiWebTil ref.Title;
                build ChiWebDate ref.Access; urlGen Chicago ref.URL]
            |> List.reduce List.append
        | None -> [FrmtedString (Literal "Please specify type of reference")]
    | Harvard ->
        [build HarAut ref.Author; yerGen Harvard ref.Year; build HarTil ref.Title;
            urlGen Harvard ref.URL; build HarDate ref.Access]
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
        | LITERAL "type"::EQUAL::WHITESPACE _::LITERAL t::tl -> 
            match t with
            | "Book" -> refPar' {refData with Cat = Some Book} tl
            | "Website" -> refPar' {refData with Cat = Some Website} tl
            | _ -> refPar' refData tl
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
    |> refPar' {Cat = None; Author = None; Title = None; Year = None; URL = None; Access = None}
    |> fun (x,_) -> ref2TLine frmt x