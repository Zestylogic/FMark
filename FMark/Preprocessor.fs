module Preprocessor

open EEExtensions

type PToken =
    | PTEXT of string
    | MACRO | OPENDEF | CLOSEDEF | OPENINLINEDEF | CLOSEINLINEDEF
    | OPENEVAL | CLOSEEVAL | PLBRA | PRBRA | PSEMICOLON | PENDLINE

type Parser =
    | MacroDefinition of Macro
    | MacroSubstitution of name: string * arg: string list
    | ParseText of content: string
and Macro = {Name: string; Args: string list; Body: Parser list}

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
    | VarName n :: ArgList (nl, PTEXT WhiteSpace :: tl) -> Some (n, nl, tl)
    | VarName n :: ArgList (nl, tl) -> Some (n, nl, tl)
    | VarName n :: tl -> Some (n, [], tl)
    | _ -> None

let (|MacroDef|_|) = function
    | OPENDEF :: KeyWord (Function f) ->
        Some f
    | _ -> None

let (|EvalDef|_|) = function
    | OPENEVAL :: VarName n :: ArgList (nl, PTEXT WhiteSpace :: CLOSEEVAL :: tl) -> Some (n, nl, tl)
    | OPENEVAL :: VarName n :: ArgList (nl, CLOSEEVAL :: tl) -> Some (n, nl, tl)
    | OPENEVAL :: VarName n :: CLOSEEVAL :: tl -> Some (n, [], tl)
    | _ -> None

let pParse tList =
    let rec pParse' endToken tList pList =
        let pRec f c tl = f c :: pList |> pParse' endToken tl
        let recText = pRec ParseText
        match endToken, tList with
        | _, MacroDef (a, b, tl) ->
            let p, tl' = pParse' (Some CLOSEDEF) tl []
            pRec MacroDefinition {Name=a; Args=b; Body=List.rev p} tl'
        | _, EvalDef (n, args, tl) ->
            pRec MacroSubstitution (n, args) tl
        | _, PTEXT f :: tl ->
            recText f tl
        | _, PENDLINE :: tl ->
            recText "\n" tl
        | _, MACRO :: tl ->
            recText "macro" tl
        | _, PSEMICOLON :: tl ->
            recText ";" tl
        | _, PLBRA :: tl ->
            recText "(" tl
        | _, PRBRA :: tl ->
            recText ")" tl
        | Some e, a :: b when e = a ->
            pList, b
        | _, [] -> pList, []
        | _ ->
            printfn "%A\n%A" tList pList
            failwithf "Could not parse tokens" 
    let p, _ = pParse' None tList []
    List.rev p

let replace (pList: Parser list): Parser list =
    let rec replace' (scope: Macro list) pList =
        match pList with
        | MacroDefinition {Name=n; Args=args; Body=p} :: tl ->
            let nP = replace' scope p
            replace' ({Name=n; Args=args; Body=nP} :: scope) tl
    replace' [] pList
