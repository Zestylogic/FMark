module Preprocessor

open System

open Shared

/// Token type for the preprocessor macros
type Token =
    | LITERAL of string
    | MACRO | OPENDEF | CLOSEDEF | OPENEVAL | CLOSEEVAL | LBRA | RBRA
    | SEMICOLON | ENDLINE | BSLASH

/// Type of the parser elements
type Parser =
    | MacroDefinition of Macro
    | MacroSubstitution of Sub
    | ParseText of content: string
    | ParseNewLine

/// Type for a macro
and Macro = {Name: string; Args: string list; Body: Parser list}

/// Type for a substitution
and Sub = {Name: string; Args: string list; Raw: string}

/// Character list for the preprocessor
let charList = ["{%", OPENDEF; "%}", CLOSEDEF; "{{", OPENEVAL
                "}}", CLOSEEVAL; "(", LBRA; ")", RBRA; ";", SEMICOLON;
                "\\", BSLASH]

let keywordList = ["macro", MACRO]

/// Check if a LITERAL is exclusively whitespace 
let (|WhiteSpace|NonWhiteSpace|) = function
    | LITERAL (RegexMatch @"^\s*$" _) -> WhiteSpace
    | _ -> NonWhiteSpace

/// Matches all the escapable characters that are defined in charList
let (|EscapedCharParse|_|) = (|EscapedChar|_|) LITERAL charList

/// Matches all the special characters that are defined in charList
let (|CharacterParse|_|) = (|Character|_|) charList

let (|KeywordParse|_|) = (|Character|_|) keywordList

/// Retrieves the next token from a string and returns it, together
/// with the rest of the string
let nextToken str =
    let literalMatch = charList @ keywordList |> literalString
    match str with
    | EscapedCharParse n | CharacterParse n | KeywordParse n ->
        n
    | RegexMatch @"^\s+" (m, _, r) ->
        LITERAL m, r
    | RegexMatch literalMatch (m, _, r) ->
        LITERAL m, r
    | _ ->
        toString str.[0] |> LITERAL, str.[1..]

/// Tokenizes a string and return it as a list of tokens
let tokenize str =
    let rec pTokenize' tList str =
        match str with
        | "" ->
            ENDLINE :: tList
        | _ ->
            let t, r = nextToken str
            pTokenize' (t :: tList) r
    pTokenize' [] str |> List.rev

/// Tokenizes a list of strings and returns them as a single list of tokens
let tokenizeList = List.collect tokenize

/// Returns if the start of the list of tokens matches a keyword
let (|KeyWord|_|) =
    let listCheckExists t list =
        list
        |> List.map (fun (_, c) -> c)
        |> List.exists ((=) t)
    function
    | WhiteSpace :: a :: tl | a :: tl ->
        match listCheckExists a keywordList with
        | true -> Some (a, tl)
        | _ -> None
    | _ -> None

let (|ArgList|_|) =
    let rec (|NameList|_|) = function
        | LITERAL n :: NameList (nList, r) ->
            Some (n :: nList, r)
        | LITERAL n :: r ->
            Some ([n], r)
        | _ -> None
    let rec (|ParamList|_|) = function
        | WhiteSpace :: tl | tl ->
            match tl with
            | NameList (n, SEMICOLON :: ParamList (lst, r)) ->
                Some (List.fold (+) "" n :: lst, r)
            | NameList (n, r) ->
                Some ([List.fold (+) "" n], r)
            | _ ->
                Some ([], tl)
    function
    | WhiteSpace :: tl | tl ->
        match tl with
        | LBRA :: ParamList (nl, RBRA :: tl) ->
            Some (nl, tl)
        | _ -> None

let (|Function|_|) = function
    | WhiteSpace :: LITERAL n :: tl ->
        match tl with
        | ArgList (nl, WhiteSpace :: tl)
        | ArgList (nl, tl) ->
            Some (n, nl, tl)
        | _ ->
            Some (n, [], tl)
    | _ -> None

let (|MacroDef|_|) = function
    | OPENDEF :: KeyWord (MACRO, Function f) ->
        Some f
    | _ -> None

let (|EvalDef|_|) = function
    | OPENEVAL :: WhiteSpace :: tl | OPENEVAL :: tl ->
        match tl with
        | LITERAL n :: ArgList (nl, WhiteSpace :: CLOSEEVAL :: tl)
        | LITERAL n :: ArgList (nl, CLOSEEVAL :: tl) ->
            Some (n, nl, tl)
        | LITERAL n :: WhiteSpace :: CLOSEEVAL :: tl
        | LITERAL n :: CLOSEEVAL :: tl ->
            Some (n, [], tl)
        | _ -> None
    | _ -> None

let (|SChar|_|) tok =
    List.map invTuple charList
    |> Map.ofList
    |> mapTryFind tok

let getRaw list =
    let rec getRaw' list curr =
        match list with
        | CLOSEEVAL :: _ ->
            CLOSEEVAL :: curr
        | a :: tl ->
            a :: curr |> getRaw' tl
        | _ ->
            curr
    getRaw' list [] |> List.rev

let tokToString tList =
    let tokString st = function
        | LITERAL l -> st+l
        | t ->
            match charList @ keywordList |> listTryFind t with
            | Some s -> st+s
            | _ -> st
    List.fold tokString "" tList

let parse tList =
    let rec parse' endToken tList pList =
        let pRec f c tl = f c :: pList |> parse' endToken tl
        let recText = pRec ParseText
        match endToken, tList with
        | _, MacroDef (a, b, tl) ->
            let p, tl' = parse' (Some CLOSEDEF) tl []
            pRec MacroDefinition {Name=a; Args=b; Body=List.rev p} tl'
        | _, EvalDef (n, args, tl) ->
            pRec MacroSubstitution {Name=n; Args=args; Raw=getRaw tList |> tokToString} tl
        | _, ENDLINE :: tl ->
            pRec id ParseNewLine tl
        | Some e, WhiteSpace :: a :: tl | Some e, a :: tl when e = a ->
            match tl with
            | WhiteSpace :: ENDLINE :: b
            | WhiteSpace :: b
            | ENDLINE :: b
            | b ->
                pList, b
        | _, LITERAL f :: tl ->
            recText f tl
        | _, SChar c :: tl ->
            recText c tl
        | _ -> pList, []
    let p, _ = parse' None tList []
    List.rev p

let evaluate pList =

    let newParam args: Map<string, string option> =
        List.replicate (List.length args) None
        |> List.zip args
        |> Map.ofList

    let makeMacro n args p =
        {Name = n; Args = args; Body = p}

    let mapAdd (map: Map<'a, 'b>) k v =
        map.Add(k, v)

    let rec evalulate' pList newPList param (scope: Map<string, Macro>) =

        let evalulateInv' pList newPList scope param =
            evalulate' pList newPList param scope

        let evalulate'' pList newPList = evalulate' pList newPList param scope

        match pList with
        | MacroDefinition {Name=n; Args=args; Body=p} :: tl ->
            newParam args
            |> evalulateInv' p [] scope
            |> makeMacro n args
            |> mapAdd scope n
            |> evalulate' tl newPList param
        | MacroSubstitution {Name = n; Args = args; Raw = raw} :: tl ->
            let evalulatement =
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
                        | _ ->
                            [ParseText raw] |> Some
                | a ->
                    match scope.TryFind n with
                    | Some m ->
                        evalulate' m.Body [] (List.zip m.Args a
                                              |> List.fold (fun s (a, b) -> s.Add(a, Some b)) param) scope
                        |> List.rev |> Some
                    | None ->
                        [ParseText raw] |> Some
            match evalulatement with
            | Some p ->
                evalulate'' tl (p @ newPList)
            | None ->
                evalulate'' tl (MacroSubstitution {Name = n; Args = args; Raw = raw} :: newPList)

        | ParseText t :: tl ->
            evalulate'' tl (ParseText t :: newPList)
        | ParseNewLine :: tl ->
            evalulate'' tl (ParseNewLine :: newPList)
        | [] -> newPList
    evalulate' pList [] Map.empty<string, string option> Map.empty<string, Macro> |> List.rev

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
        | _ -> failwithf "Failed"
            
    List.fold f [] pList |> List.rev

let pET =
    parse >> evaluate >> toStringList

let preprocess =
    tokenize >> pET

let preprocessList =
    tokenizeList >> pET
