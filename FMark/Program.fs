open System
open Types

// TODO: Footnote support for
// simple format, hyperlink, picture

let rec tocParse tocLst depth : THeader list =
    match tocLst with
    | HASH::tl -> tocParse tl (depth+1)
    | LITERAL h::tl when depth > 1 ->
        {HeaderName = [h]; Level = depth} :: tocParse tl 0
    | _::tl -> tocParse tl 0
    | [] -> []

let tocGen tokenLst maxDepth =
    List.filter (fun x -> x.Level <= maxDepth) (tocParse tokenLst 0)

let rec footLineParse tocLst : Line =
    match tocLst with
    | LITERAL lit::tl -> FrmtedWordLst [lit] :: footLineParse tl
    | ENDLINE::WHITESPACE 4::tl -> footLineParse tl
    | ENDLINE::_ -> []
    | _::tl -> footLineParse tl
    | [] -> []

let rec citeParse tocLst : ParsedObj list =
    match tocLst with
    | LSBRA::CARET::NUMBER key::RSBRA::tl ->
        match tl with
        | COLON::tail -> Footnote (key, footLineParse tail) :: citeParse tail
        | tail -> citeParse tail // TODO: do something when it is inline?
    | _::tl -> citeParse tl
    | [] -> []

[<EntryPoint>]
let main argv =
    let testTokenLst = [HASH; HASH; LITERAL "hi"; LITERAL "this is a paragraph"; EMPTYLINE;
                        LITERAL "Cool"; HASH; HASH; HASH; LITERAL "Another Title"; ENDLINE]
    let testTokenLst2 = [LSBRA; CARET; NUMBER 1; RSBRA; COLON; LITERAL "This...text.";
                        ENDLINE; WHITESPACE 4; LITERAL "conti...lines."; ENDLINE; 
                        LITERAL "stop...nted."]                  
    printf "\n%A\n" (tocGen testTokenLst 3)
    printf "\n%A\n" (citeParse testTokenLst2)
    0
