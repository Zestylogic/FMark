module Preprocessor

open EEExtensions
open Shared

type PToken =
    | PTEXT of string
    | MACRO | OPENDEF | CLOSEDEF
    | OPENEVAL | CLOSEEVAL | PLBRA | PRBRA | PSEMICOLON | PENDLINE | PBSLASH

type Parser =
    | MacroDefinition of Macro
    | MacroSubstitution of name: string * arg: string list
    | ParseText of content: string
    | ParseNewLine
and Macro = {Name: string; Args: string list; Body: Parser list}

let charList = ["macro", MACRO; "{%", OPENDEF; "%}", CLOSEDEF; "{{", OPENEVAL
                "}}", CLOSEEVAL; "(", PLBRA; ")", PRBRA; ";", PSEMICOLON;
                "\\", PBSLASH]

let (|WhiteSpace|NonWhiteSpace|) = function
    | RegexMatch @"^\s*$" _ -> WhiteSpace
    | _ -> NonWhiteSpace

let (|EscapedCharParse|_|) = (|EscapedChar|_|) PTEXT charList

let (|CharacterParse|_|) = (|Character|_|) charList

let pNextToken str =
    match str with
    | EscapedCharParse n
    | CharacterParse n -> n
    | RegexMatch @"^\s+" (m, _, r) ->
        PTEXT m, r
    | RegexMatch (literalString charList) (m, _, r) ->
        PTEXT m, r
    | _ ->
        String.ofChar str.[0] |> PTEXT, str.[1..]

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
    | PTEXT n -> Some n
    | _ -> None

let (|ArgList|_|) =
    let rec (|NameList|_|) = function
        | PTEXT WhiteSpace :: tl | tl ->
            match tl with
            | VarName n :: PSEMICOLON :: NameList (nameList, rest) ->
                Some (n :: nameList, rest)
            | VarName n :: rest ->
                Some ([n], rest)
            | PTEXT WhiteSpace :: t | t ->
                Some ([], t)
    function
    | PTEXT WhiteSpace :: tl | tl ->
        match tl with
        | PLBRA :: NameList (nl, PRBRA :: tl) ->
            Some (nl, tl)
        | _ -> None

let (|Function|_|) = function
    | PTEXT WhiteSpace :: VarName n :: tl ->
        match tl with
        | ArgList (nl, PTEXT WhiteSpace :: tl)
        | ArgList (nl, tl) ->
            Some (n, nl, tl)
        | _ ->
            Some (n, [], tl)
    | _ -> None

let (|MacroDef|_|) = function
    | OPENDEF :: KeyWord (Function f) ->
        Some f
    | _ -> None

let (|EvalDef|_|) = function
    | OPENEVAL :: PTEXT WhiteSpace :: tl | OPENEVAL :: tl ->
        match tl with
        | VarName n :: ArgList (nl, PTEXT WhiteSpace :: CLOSEEVAL :: tl)
        | VarName n :: ArgList (nl, CLOSEEVAL :: tl) ->
            Some (n, nl, tl)
        | VarName n :: PTEXT WhiteSpace :: CLOSEEVAL :: tl
        | VarName n :: CLOSEEVAL :: tl ->
            Some (n, [], tl)
        | _ -> None
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
        | _, PENDLINE :: tl ->
            pRec id ParseNewLine tl
        | Some e, PTEXT WhiteSpace :: a :: tl | Some e, a :: tl when e = a ->
            match tl with
            | PTEXT WhiteSpace :: PENDLINE :: b
            | PTEXT WhiteSpace :: b
            | PENDLINE :: b
            | b ->
                pList, b
        | _, PTEXT f :: tl ->
            recText f tl
        | _, SChar c :: tl ->
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
