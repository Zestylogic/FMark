module Preprocessor

open EEExtensions

type PToken =
    | PTEXT of string
    | MACRO | OPENDEF | CLOSEDEF
    | OPENEVAL | CLOSEEVAL | PLBRA | PRBRA | PSEMICOLON | PENDLINE

type Parser =
    | MacroDefinition of Macro
    | MacroSubstitution of name: string * arg: string list
    | ParseText of content: string
    | ParseNewLine
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
    | StartsWith "{{" r -> Some (OPENEVAL, r)
    | StartsWith "}}" r -> Some (CLOSEEVAL, r)
    | StartsWith "(" r -> Some (PLBRA, r)
    | StartsWith ")" r -> Some (PRBRA, r)
    | StartsWith ";" r -> Some (PSEMICOLON, r)
    | RegexMatch "^macro\s+" (_, _, r) -> Some (MACRO, r)
    | _ -> None

let pNextToken str =
    match str with
    | Character r -> r
    | RegexMatch "^.+?(?={%|%}|{{|}}|{!|!}|\\(|\\)|;|macro|$)" (m, _, r) -> PTEXT m, r
    | _ -> String.ofChar str.[0] |> PTEXT, str.[1..]

let pTokenize str =
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
        | PTEXT WhiteSpace :: tl ->
            Some ([], tl)
        | _ ->
            Some ([], tList)
    match tList with
    | PLBRA :: NameList (nl, PRBRA :: tl) ->
        Some (nl, tl)
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

let (|SChar|_|) = function
    | PSEMICOLON -> Some ";"
    | PLBRA -> Some "("
    | PRBRA -> Some ")"
    | MACRO -> Some "macro"
    | CLOSEDEF -> Some "%}"
    | CLOSEEVAL -> Some "}}"
    | OPENDEF -> Some "{%"
    | OPENEVAL -> Some "{{"
    | _ -> None

let (|SCharWhite|_|) = function
    | SChar t :: PTEXT (RegexMatch "^\s+" (m, _, r)) :: tl ->
        Some (t+m, PTEXT r :: tl)
    | SChar t :: tl ->
        Some (t, tl)
    | [SChar t] ->
        Some (t, [])
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
            recText (String.trimStart [|' '|] f) tl
        | _, PENDLINE :: tl ->
            pRec id ParseNewLine tl
        | Some e, a :: b when e = a ->
            pList, b
        | _, SCharWhite (c, tl) ->
            recText c tl
        | _, [] -> pList, []
    let p, _ = pParse' None tList []
    List.rev p

let replace pList=

    let rec replace' pList newPList param scope =

        let addScope =
            List.fold (fun (st: Map<string, Macro>) v -> st.Add(v.Name, v)) scope

        match pList with

        | MacroDefinition {Name=n; Args=args; Body=p} :: tl ->
            let newParam: Map<string, string option> =
                List.replicate (List.length args) None
                |> List.zip args
                |> Map.ofList
            let nP =
                replace' p [] newParam scope
            let macro = {Name=n; Args=args; Body=nP}
            scope.Add(n, macro) |> replace' tl newPList param

        | MacroSubstitution (n, args) :: tl ->
            let replacement =
                match args with
                | [] ->
                    match param.TryFind n with
                    | Some (Some m) ->
                        [ParseText m] |> Some
                    | Some _ ->
                        None
                    | _ ->
                        match scope.TryFind n with
                        | Some m ->
                            m.Body |> Some
                        | _ -> failwithf "Macro '%s' did not match anything in scope" n
                | a ->
                    match scope.TryFind n with
                    | Some m ->
                        replace' m.Body [] (List.zip m.Args a
                                            |> List.fold (fun s (a, b) -> s.Add(a, Some b)) param) scope
                        |> List.rev |> Some
                    | None ->
                        failwithf "Failed"
            match replacement with
            | Some p ->
                replace' tl (p @ newPList) param scope
            | None ->
                replace' tl (MacroSubstitution (n, args) :: newPList) param scope

        | ParseText t :: tl ->
            replace' tl (ParseText t :: newPList) param scope
        | ParseNewLine :: tl ->
            replace' tl (ParseNewLine :: newPList) param scope
        | [] -> newPList
    replace' pList [] Map.empty<string, string option> Map.empty<string, Macro> |> List.rev

let prettyPrint pList =
    List.fold (fun st -> function
               | ParseText x -> st+x
               | ParseNewLine -> st+"\n"
               | _ -> failwithf "Failed to print") "" pList

let toStringList pList =
    let f st n =
        match st, n with
        | _, ParseNewLine ->
            "" :: st
        | a :: b, ParseText t ->
            a+t :: b
        | _, ParseText t ->
            [t]
            
    List.fold f [] pList |> List.rev

let preprocess =
    pTokenize >> pParse >> replace >> toStringList
