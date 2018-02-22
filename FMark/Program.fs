open System
open Types

// TODO: parseLine
// ----------------------------------------------------------------------------------------
let rec parseLine tLst =
    // printf "parseLine\n%A\n" tLst
    match tLst with
    | UNDERSCORE::LITERAL l::UNDERSCORE::tl -> FrmtedString (Emphasis (Literal l)) :: parseLine tl
    | LITERAL l::tl -> FrmtedString (Literal l) :: parseLine tl
    | _::tl -> parseLine tl
    | [] -> []

let rec tocParse tocLst depth =
    // Detect hashes with whitespace after it
    // printf "tocParse %A\n%A\n" depth tocLst
    match tocLst with
    | HASH::tl -> tocParse tl (depth+1)
    | WHITESPACE _ ::tl when depth > 0 ->
        // a bit odd here, maybe replace this by a recursion to find ENDLINE?
        let (h,t) = List.splitAt (tl |> List.findIndex (fun x -> x = ENDLINE)) tl
        {HeaderName = parseLine h; Level = depth} :: tocParse t 0
    | _::tl -> tocParse tl 0
    | [] -> []
    
let tocGen tokenLst maxDepth =
    List.filter (fun x -> x.Level <= maxDepth) (tocParse tokenLst 0)

// ----------------------------------------------------------------------------------------
//pick out footnotes and send to footLineParse
let rec citeParse tocLst =
    match tocLst with
    | LSBRA::CARET::NUMBER strkey::RSBRA::tl ->
        match tl with
        | COLON::tail -> citeParseIn tail (int strkey)
        | tail -> citeParse tail // TODO: do something when it is inline?
    | _::tl -> citeParse tl
    | [] -> []

//parse footnotes with parseLine
and citeParseIn tocLst key :ParsedObj list =
    match tocLst with
    | LITERAL lit::tl -> LITERAL lit :: citeParseIn tl
    | ENDLINE::WHITESPACE 4::tl -> citeParseIn tl
    | ENDLINE::tl -> Footnote (key,hsdfa) :: citeParse tl
    | _::tl -> citeParse tl
    | [] -> []


let citeGen footLst =
    List.sortBy (fun (x,_) -> x) footLst
// ----------------------------------------------------------------------------------------
[<EntryPoint>]
let main argv =
    let testTokenLst = [HASH; HASH; WHITESPACE 1;LITERAL "hi"; LITERAL "this is a paragraph";
                        ENDLINE; LITERAL "Cool"; HASH; HASH; HASH; WHITESPACE 3;
                        LITERAL "Another Title"; ENDLINE]
    let testTokenLst2 = [LSBRA; CARET; NUMBER "2"; RSBRA; COLON; LITERAL "This...text.";
                        ENDLINE; WHITESPACE 4; LITERAL "conti...lines."; ENDLINE; 
                        LITERAL "stop...nted.";ENDLINE; LSBRA; CARET; NUMBER "1"; RSBRA;
                        COLON; LITERAL "Second text"; ENDLINE]
    let testTokenLst3 = List.append testTokenLst testTokenLst2
    printf "\n%A\n" (tocParse testTokenLst 0)
(*    printf "\n%A\n" (citeParse testTokenLst2)
    printf "\n%A\n" (citeGen (citeParse testTokenLst2))
    printf "\n%A\n" (tocGen testTokenLst3 3)
    printf "\n%A\n" (citeGen (citeParse testTokenLst3)) *)
    0
