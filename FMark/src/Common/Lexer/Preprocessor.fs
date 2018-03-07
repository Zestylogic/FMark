module Preprocessor

open System

open Shared
open LexerShared

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

/// Converts a token list to a string
let tokToString tList =
    let tokString st = function
        | LITERAL l -> st+l
        | t ->
            match charList @ keywordList |> listTryFind t with
            | Some s -> st+s
            | _ -> st
    List.fold tokString "" tList

/// Retrieves the next token from a string and returns it, together
/// with the rest of the string
let nextToken str =
    let literalMatch = charList |> literalString
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

/// Checks if the Token list matches an argument list, which could be one of the
/// following:
/// (arg1; arg2)
/// (arg 1; arg 2)
/// (arg1)
/// ()
let (|ArgList|_|) =
    /// Matches if there is a list of literals, and returns all of them until it reaches
    /// a Token that is not a literal
    let rec (|NameList|_|) = function
        | LITERAL n :: NameList (nList, r) ->
            Some (n :: nList, r)
        | LITERAL n :: r ->
            Some ([n], r)
        | _ -> None

    /// Matches a semicolon separated list of Literal lists
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

/// Matches a literal, which will be the name of the function, which can be followed by
/// an argument list
let (|Function|_|) = function
    | WhiteSpace :: LITERAL n :: tl ->
        match tl with
        | ArgList (nl, WhiteSpace :: tl)
        | ArgList (nl, tl) ->
            Some (n, nl, tl)
        | WhiteSpace :: t
        | t ->
            Some (n, [], t)
    | _ -> None

/// Matches the start syntax for a macro, the closing CLOSEDEF can be on a differen line and
/// after a Parse list, so that is matched in the parse function
let (|MacroDef|_|) = function
    | OPENDEF :: KeyWord (MACRO, Function f) ->
        Some f
    | _ -> None

/// Matches an evaluation of a macro
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

/// Matches a special character or keyword
let (|SChar|_|) tok =
    charList @ keywordList
    |> List.map invTuple
    |> Map.ofList
    |> mapTryFind tok

/// Parses a Token list into a Parser list
let parse tList =

    /// Returns the raw token list for a macro evaluation
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

    /// The recursive part of the parser, which build the Parser list
    let rec parse' endToken tList pList =
        let pRec f c tl = f c :: pList |> parse' endToken tl
        let recText = pRec ParseText
        match tList, endToken with
        | MacroDef (a, b, tl), _ ->
            let p, tl' = parse' (Some CLOSEDEF) tl []
            pRec MacroDefinition {Name=a; Args=b; Body=List.rev p} tl'
        | EvalDef (n, args, tl), _ ->
            pRec MacroSubstitution {Name=n; Args=args; Raw=getRaw tList |> tokToString} tl
        | ENDLINE :: tl, _ ->
            pRec id ParseNewLine tl
        | WhiteSpace :: a :: tl, Some e | a :: tl, Some e when e = a ->
            match tl with
            | WhiteSpace :: ENDLINE :: b
            | WhiteSpace :: b
            | ENDLINE :: b
            | b ->
                pList, b
        | LITERAL f :: tl, _ ->
            recText f tl
        | SChar c :: tl, _ ->
            recText c tl
        | _ -> pList, []
    let p, _ = parse' None tList []
    List.rev p

/// Evaluates and strips macros from the markdown, and also evaluates macro substitutions
/// by seeing which macros are in scope or if the substitution is a parameter.
/// This supports shadowing of previously defined macros, and scopes can be defined
/// by declaring a macro inside another macro
let evaluate pList =

    /// Makes an empty parmeter list for the current parameters, so that they
    /// are not substituted
    let makeEmptyParam args: Map<string, string option> =
        List.replicate (List.length args) None
        |> List.zip args
        |> Map.ofList

    /// Add a parameter to a parameter map
    let addParam p (macro: Macro) args =
        List.zip macro.Args args
        |> List.fold (fun (s: Map<string, string option>) (a, b) -> s.Add(a, Some b)) p

    /// Make a Macro record type
    let makeMacro n args p =
        {Name = n; Args = args; Body = p}

    /// Adds an element to a map with key k and value v
    let mapAdd (map: Map<'a, 'b>) k v =
        map.Add(k, v)

    /// Evaluates and creates a new simplified Parser list with all the macros stripped
    /// and substitutions evaluated
    let rec evalulate' pList newPList param (scope: Map<string, Macro>) =

        /// Function for use with different currying that the original
        let evalulateInv' pList newPList scope param =
            evalulate' pList newPList param scope

        /// Evaluate without adding any values to the param or scope maps
        let evalulate'' pList list =
            evalulate' pList (list @ newPList) param scope

        match pList with
        | MacroDefinition {Name=n; Args=args; Body=p} :: tl ->
            makeEmptyParam args
            |> evalulateInv' p [] scope
            |> makeMacro n args
            |> mapAdd scope n
            |> evalulate' tl newPList param
        | MacroSubstitution {Name=n; Args=args; Raw=raw} as ms :: tl ->
            let eval =
                match param.TryFind n with
                | Some (Some x) ->
                    [ParseText x]
                | Some _ ->
                    [ms]
                | _ ->
                    match scope.TryFind n with
                    | Some m when List.isEmpty args ->
                        m.Body
                    | Some m ->
                        addParam param m args
                        |> evalulateInv' m.Body [] scope
                        |> List.rev
                    | _ ->
                        [ParseText raw]
            evalulate'' tl eval

        | p :: tl ->
            evalulate'' tl [p]
        | _ -> newPList
    evalulate' pList [] Map.empty<string, string option> Map.empty<string, Macro>
    |> List.rev

/// Converts a Parser list to a string
let parserToString pList =
    List.fold (fun st -> function
               | ParseText x -> st+x
               | ParseNewLine -> st+"\n"
               | _ -> st) "" pList

/// Converts a Parser list to a list of strings without any newlines
let toStringList pList =
    let f st n =
        match st, n with
        | _, ParseNewLine ->
            "" :: st
        | a :: b, ParseText t ->
            a+t :: b
        | _, ParseText t ->
            [t]
        | _ -> st
    List.fold f [] pList |> List.rev

/// perform the parsing, evaluation, while stripping the last endline which is redundant
/// as it was added by the tokenizer
let pETS =
    let stripLastEndline l =
        match List.rev l with
        | [ParseNewLine] as e ->
            e
        | ParseNewLine :: r ->
            List.rev r
        | _ -> l
    parse >> evaluate >> stripLastEndline

/// Preprocess a string and output a string with the macro evaluated
let preprocess =
    tokenize >> pETS >> parserToString

/// Preprocess a list of strings which is returned as a list of strings with the
/// macro evaluated
let preprocessList =
    List.collect tokenize >> pETS >> toStringList
