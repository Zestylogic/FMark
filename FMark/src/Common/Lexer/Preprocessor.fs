module Preprocessor

open FileIO
open Shared
open LexerShared

// --------------------------------------------------
// Tokenizer
// --------------------------------------------------

/// Token type for the preprocessor macros
type Token =
    | LITERAL of string
    | MACRO | OPENDEF | CLOSEDEF | OPENEVAL | CLOSEEVAL | LBRA | RBRA
    | SEMICOLON | ENDLINE | BSLASH | INCLUDE

/// Character list for the preprocessor
let charList = ["{%", OPENDEF; "%}", CLOSEDEF; "{{", OPENEVAL
                "}}", CLOSEEVAL; "(", LBRA; ")", RBRA; ";", SEMICOLON;
                "\\", BSLASH]

let keywordList = ["macro", MACRO; "include", INCLUDE]

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

// --------------------------------------------------
// Parser
// --------------------------------------------------

/// ArgumentList used in the substitution
type Argument<'T> = 'T list

/// Type for a macro
type Macro<'T> = {Name: string; Args: string list; Body: 'T list}

/// Type for a substitution
type Sub<'T> = {Name: string; Args: Argument<'T> list; Raw: string}

/// Type of the parser elements
type Parser =
    | MacroDefinition of Macro<Parser>
    | MacroSubstitution of Sub<Parser>
    | IncludeStatement of link: string
    | ParseText of content: string
    | ParseNewLine

/// Return a parser list until it reaches the token
let findParseUntil otok ctok parser =
    let rec findParseUntil' count parser retlist =
        match parser with
        | t :: tl when t = ctok && count = 1 ->
            Some (retlist |> List.rev, tl)
        | t :: tl when t = ctok ->
            t :: retlist |> findParseUntil' (count - 1) tl
        | t :: tl when t = otok ->
            t :: retlist |> findParseUntil' (count + 1) tl
        | t :: tl ->
            t :: retlist |> findParseUntil' count tl
        | [] -> None
    findParseUntil' 1 parser []

/// Splits a list on a specific element
let splitList esctok cltok tok list =
    let rec splitList' curr final list =
        match list with
        | a :: tl when a = esctok ->
            match findParseUntil esctok cltok tl with
            | Some (l, tl) ->
                splitList' (CLOSEEVAL :: (List.rev (a :: l)) @ curr) final tl
            | _ ->
                splitList' (a :: curr) final tl
        | a :: tl when a = tok ->
            splitList' [] (List.rev curr :: final) tl
        | a :: tl ->
            splitList' (a :: curr) final tl
        | [] ->
            List.rev curr :: final |> List.rev
    splitList' [] [] list

let splitListEval = splitList OPENEVAL CLOSEEVAL SEMICOLON

/// Strips whitespace from a token list
let stripWhiteSpace = function
    | WhiteSpace :: tl | tl ->
        match List.rev tl with
        | WhiteSpace :: tl | tl ->
            List.rev tl

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
let (|ParamList|_|) =
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

let (|ArgList|_|) = function
    WhiteSpace :: tl | tl ->
        match tl with
        | LBRA :: tl ->
            match findParseUntil LBRA RBRA tl with
            | Some (p, tl) ->
                Some (splitListEval p |> List.map stripWhiteSpace, tl)
            | _ -> None
        | WhiteSpace :: tl ->
            Some ([], tl)
        | _ -> None

/// Matches a literal, which will be the name of the function, which can be followed by
/// an argument list
let (|Function|_|) = function
    | WhiteSpace :: LITERAL n :: tl ->
        match tl with
        | ParamList (nl, WhiteSpace :: tl)
        | ParamList (nl, tl) ->
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

/// Include statement match
let (|Include|_|) = function
    | OPENEVAL :: WhiteSpace :: tl | OPENEVAL :: tl ->
        match tl with
        | INCLUDE :: WhiteSpace :: LITERAL link :: WhiteSpace :: CLOSEEVAL :: tl
        | INCLUDE :: WhiteSpace :: LITERAL link :: CLOSEEVAL :: tl -> Some (link, tl)
        | _ -> None
    | _ -> None

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
            let args' = List.map ((fun a -> parse' None a []) >> (fun (a, _) -> List.rev a)) args
            pRec MacroSubstitution {Name=n; Args=args'; Raw=getRaw tList |> tokToString} tl
        | Include (link, tl), _ ->
            pRec IncludeStatement link tl
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

// --------------------------------------------------
// Evaluation
// --------------------------------------------------

/// Evaluates and strips macros from the markdown, and also evaluates macro substitutions
/// by seeing which macros are in scope or if the substitution is a parameter.
/// This supports shadowing of previously defined macros, and scopes can be defined
/// by declaring a macro inside another macro
let evaluateWithDir fileDir pList =

    /// Makes an empty parmeter list for the current parameters, so that they
    /// are not substituted
    let makeEmptyParam args: Map<string, Argument<Parser> option> =
        List.replicate (List.length args) None
        |> List.zip args
        |> Map.ofList

    /// Add a parameter to a parameter map
    let addParam p (macro: Macro<Parser>) args =
        List.zip macro.Args args
        |> List.fold (fun (s: Map<string, Argument<Parser> option>) (a, b) -> s.Add(a, Some b)) p

    /// Make a Macro record type
    let makeMacro n args p =
        {Name = n; Args = args; Body = p}

    /// Adds an element to a map with key k and value v
    let mapAdd (map: Map<'a, 'b>) k v =
        map.Add(k, v)

    /// Evaluates and creates a new simplified Parser list with all the macros stripped
    /// and substitutions evaluated
    let rec evaluate' pList newPList param (scope: Map<string, Macro<Parser>>) =

        /// Function for use with different currying that the original
        let evaluateInv' pList newPList scope param =
            evaluate' pList newPList param scope

        /// Evaluate without adding any values to the param or scope maps
        let evaluate'' pList list =
            evaluate' pList (list @ newPList) param scope

        match pList with
        | MacroDefinition {Name=n; Args=args; Body=p} :: tl ->
            makeEmptyParam args
            |> evaluateInv' p [] scope
            |> makeMacro n args
            |> mapAdd scope n
            |> evaluate' tl newPList param
        | MacroSubstitution {Name=n; Args=args; Raw=raw} as ms :: tl ->
            let eval =
                match param.TryFind n with
                | Some (Some x) ->
                    evaluate' x [] param scope |> List.rev
                | Some _ ->
                    [ms]
                | _ ->
                    match scope.TryFind n with
                    | Some m when List.isEmpty args ->
                        m.Body
                    | Some m ->
                        addParam param m args
                        |> evaluateInv' m.Body [] scope
                        |> List.rev
                    | _ ->
                        [ParseText raw]
            evaluate'' tl eval
        | IncludeStatement link :: tl ->
            let addDir str =
                match str with
                | RegexMatch "^\\/" _ -> str
                | _ -> fileDir + str
            addDir link
            |> readFilePath
            |> tokenizeList
            |> parse
            |> (fun a -> evaluate' a [] Map.empty<string, Argument<Parser> option> Map.empty<string, Macro<Parser>>)
            |> evaluate'' tl
        | p :: tl ->
            evaluate'' tl [p]
        | _ -> newPList
    evaluate' pList [] Map.empty<string, Argument<Parser> option> Map.empty<string, Macro<Parser>>
    |> List.rev

let evaluate = evaluateWithDir ""

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
let pETS dir =
    let stripLastEndline l =
        match List.rev l with
        | [ParseNewLine] as e ->
            e
        | ParseNewLine :: r ->
            List.rev r
        | _ -> l
    parse >> evaluateWithDir dir >> stripLastEndline

// --------------------------------------------------
// Public API
//--------------------------------------------------

/// Preprocess a string and output a string with the macro evaluated
let preprocess =
    tokenize >> pETS "" >> parserToString

let preprocessWithDir dir =
    tokenize >> pETS dir >> parserToString

/// Preprocess a list of strings which is returned as a list of strings with the
/// macro evaluated
let preprocessList =
    List.collect tokenize >> pETS "" >> toStringList

let preprocessListWithDir dir =
    List.collect tokenize >> pETS dir >> toStringList
