module Preprocessor

open EEExtensions

type Macro = {Name: string; Parameters: string list; Body: string list}

type PToken =
    | PTEXT of string
    | MACRO | OPENDEF | CLOSEDEF | OPENINLINEDEF | CLOSEINLINEDEF
    | OPENEVAL | CLOSEEVAL | PLBRA | PRBRA | PSEMICOLON | PENDLINE

type Parse =
    | MacroDefinition of name: string * arg: string list * body: Parse list
    | MacroSubstitution of name: string * arg: string list
    | ParseText of content: string

let strRest c (str: string) =
    str.[String.length c..]

let (|RegexMatch|_|) regex str =
    match String.regexMatch regex str with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        Some (m, grp, str.[lchar..])

let (|StartsWith|_|) c str =
    match String.startsWith c str with
    | true -> strRest c str |> Some
    | _ -> None

let (|WhiteSpace|NonWhiteSpace|) = function
    | RegexMatch @"^\s*$" _ -> WhiteSpace
    | _ -> NonWhiteSpace

let (|Character|_|) = function
    | StartsWith "{%" r -> Some (OPENDEF, r)
    | StartsWith "%}" r -> Some (CLOSEDEF, r)
    | StartsWith "{!" r -> Some (OPENINLINEDEF, r)
    | StartsWith "!}" r -> Some (CLOSEINLINEDEF, r)
    | StartsWith "{{" r -> Some (OPENEVAL, r)
    | StartsWith "}}" r -> Some (CLOSEEVAL, r)
    | StartsWith "(" r -> Some (PLBRA, r)
    | StartsWith ")" r -> Some (PRBRA, r)
    | StartsWith ";" r -> Some (PSEMICOLON, r)
    | StartsWith "macro" r -> Some (MACRO, r)
    | _ -> None

let pNextToken str: PToken * string =
    match str with
    | Character r -> r
    | RegexMatch "^.+?(?={%|%}|{{|}}|{!|!}|\\(|\\)|;|macro|$)" (m, _, r) -> PTEXT m, r
    | _ -> failwithf "Token not found: %s" str

let pTokenize (str: string): PToken list =
    let rec pTokenize' tList str =
        match str with
        | WhiteSpace -> PENDLINE :: tList
        | _ ->
            let t, r = pNextToken str
            pTokenize' (t :: tList) r
    pTokenize' [] str |> List.rev

let (|KeyWord|_|) = function
    | PTEXT WhiteSpace :: MACRO :: tl
    | MACRO :: tl -> Some tl
    | _ -> None

let (|VarName|_|) = function
    | PTEXT n -> String.trim n |> Some
    | _ -> None

let (|ArgList|_|) tList =
    let rec (|NameList|_|) tList =
        match tList with
        | VarName n :: PSEMICOLON :: NameList (nameList, rest) ->
            Some (n :: nameList, rest)
        | VarName n :: rest ->
            Some ([n], rest)
        | _ -> None
    match tList with
    | PLBRA :: NameList (nl, PRBRA :: tl) -> Some (nl, tl)
    | _ -> None

let (|Function|_|) = function
    | VarName n :: ArgList (nl, (PTEXT WhiteSpace :: tl)) -> Some (n, nl, tl)
    | VarName n :: ArgList (nl, tl) -> Some (n, nl, tl)
    | VarName n :: tl -> Some (n, [], tl)
    | _ -> None

let (|ParagraphDef|_|) = function
    | OPENDEF :: KeyWord (Function (a, b, tl)) ->
        Some (MacroDefinition (a, b, [ParseText ""]), tl)
    | _ -> None

let pParse (tList: PToken list): Parse list =
    let rec pParse' tList pList =
        match tList with
        | ParagraphDef (f, CLOSEDEF :: tl) ->
            f :: pList |> pParse' tl
        | PTEXT f :: tl ->
            pParse' tl (ParseText f :: pList)
        | PENDLINE :: tl ->
            ParseText "\n" :: pList |> pParse' tl
        | [] -> pList
        | _ ->
            printfn "%A\n%A" tList pList
            failwithf "Could not parse tokens" 
    pParse' tList [] |> List.rev
