module LexerShared
open System.Text.RegularExpressions

// --------------------------------------------------
// Helpers
// --------------------------------------------------

/// Take the first element of a tuple of size 3
let takeFirst (a, _, _) = a

/// Match a regular expression Return Some (m,grps) where m is the match string,
/// grps is the list of match groups (if any) return None on no match
let strRegexMatch (regex: string) (str: string) =
    let m = Regex(regex).Match(str)
    if m.Success
    then
        let mLst = [ for x in m.Groups -> x.Value ]
        Some (List.head mLst, List.tail mLst)
    else None

/// Checks if a string starts with another string
let strStartsWith (value: string) (str: string) =
    str.StartsWith(value)

/// Convert a single character to a string
let toString (c: char) =
    System.String.Concat [c]

/// Replace a every occurence of one string in the string s by another
let strReplace (o: string) (n: string) (s: string) =
    s.Replace(o, n)

// --------------------------------------------------
// Shared
// --------------------------------------------------

/// Active Pattern to match a string with a regex pattern, returns the matched string
/// together with the groups in a list and the rest of the string
let (|RegexMatch|_|) regex str =
    match strRegexMatch regex str with
    | None -> None
    | Some (m, grp) ->
        let lchar = String.length m
        Some (m, grp, str.[lchar..])

/// Create a regular expression for a literal that matches everything except the
/// characters defined in charList
let literalString charList =

    /// Escapes every special regex character in a string given to it
    let addEscape (c, _) =
        ["\\"; "."; "^"; "$"; "*"; "+"; "-"; "?"; "("; ")"; "["; "]"; "{"; "}"; "|"; "/"]
        |> List.fold (fun st n -> strReplace n ("\\"+n) st) c

    charList
    |> List.map (addEscape >> (fun a -> a+"|"))
    |> List.fold (+) ""
    |> (fun c -> "^.+?(?=\\s|"+c+"$)")

/// Tests if a string starts with any of the characters in charList,
/// and returns the match after passing it through the retLastMatch
/// function, that will be used in a fold operation with None as a starting
/// value
let (|CharMatch|_|) retLastMatch a charList (str: string) =
    let testStartWith (c, t) =
        let ch = a + c
        strStartsWith ch str, ch, t
    List.map testStartWith charList
    |> List.fold retLastMatch None

/// Checks if a string starts with a character defined in charList, and returns the DU value
/// associated with it
let (|Character|_|) charList (str: string) =
    let retLastMatch i = function
        | true, c, t -> Some (t, str.[String.length c..])
        | _ -> i
    (|CharMatch|_|) retLastMatch "" charList str

/// Checks if a string starts with an escaped char of any character in charList, and returns it
/// by passing the text of the last matched value to a constructor 'tType'
let (|EscapedChar|_|) tType charList (str: string) =
    let retLastMatch i = function
        | true, (c: string), _ -> Some (tType c.[1..], str.[String.length c..])
        | _ -> i
    (|CharMatch|_|) retLastMatch "\\" charList str

/// Match a single group with a regex
let (|GroupMatch|_|) str = function
    | RegexMatch str (m, [t], r) -> Some t
    | _ -> None
