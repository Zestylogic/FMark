module Shared

open Types
open Logger
open System.Text.RegularExpressions

// Helpers

/// Inverse the values in a tuple
let invTuple (a, b) = b, a

/// Try to find a key in a map, return Some value when it is found, otherwise it
/// returns None
let mapTryFind k (map: Map<'a, 'b>) = map.TryFind(k)

/// Try find key in a list
let listTryFind s =
    List.map invTuple >> Map.ofList >> mapTryFind s

/// The list of characters used in the parser
let charList = ["#", HASH; "|", PIPE; "=", EQUAL; "-", MINUS; "+", PLUS; "*", ASTERISK
                ".", DOT; "**", DASTERISK; "***", TASTERISK; "_", UNDERSCORE; "__", DUNDERSCORE
                "___", TUNDERSCORE; "~", TILDE; "~~", DTILDE; "~~~", TTILDE; "[", LSBRA
                "]", RSBRA; "(", LBRA; ")", RBRA; @"\", BSLASH; "/", SLASH; "<", LABRA
                ">", RABRA; "{", LCBRA; "}", RCBRA; "`", BACKTICK;
                "!", EXCLAMATION; ":", COLON; "^", CARET; "%", PERCENT; ",", COMMA; ";", SEMICOLON]

let charMap = charList |> List.map invTuple |> Map.ofList

let (|CharTok|_|) tok =
    mapTryFind tok charMap

let mapTok = function
    | CharTok s -> s
    | CODEBLOCK _ -> "CODEBLOCK"
    | FOOTNOTE _ -> sprintf "FOOTNOTE found"
    | CITATION _ -> sprintf "CITATION found"
    | HEADER n -> sprintf "HEADER %d" n
    | NUMBER s -> s
    | LITERAL s -> s
    | WHITESPACE n -> String.replicate n " "
    | _ -> "\n"

/// turn all tokens into string
let strAllToks toks =
    let pacMan str tok =
        str + mapTok tok
    List.fold pacMan "" toks

let mapLang lang =
    match lang with
    | Python -> "python"
    | FSharp -> "fsharp"
    | CPP -> "cpp"
    | C -> "c"
    | Empty -> ""

let xOnwards x lst = if List.length lst > x then lst.[x..] else []
let sOnwards s str = if String.length str > s then str.[s..] else ""
let removeChars lst s =
            let folder (s:string) x = s.Replace(x,"")
            List.fold folder s lst
let replaceChars pat (rep:string) s =
    Regex.Replace(s,pat,rep)
let removeWhitespace (s:string) = 
    s |> removeChars ["\n";"\t";"\r";" "]