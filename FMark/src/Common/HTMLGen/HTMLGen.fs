module HTMLGen

open Types
open Shared
open Logger
open HTMLGenHelpers

let dLogger = Logger(LogLevel.WARNING)

/// convert TFrmtedString to string, with HTML tags where necessary
let rec strFStr fStr =
    match fStr with
    | Literal str -> str
    | Code str -> str |> attachSimpleTag "code"
    | Strong a -> strInlineElements a |> attachSimpleTag "strong"
    | Emphasis e -> strInlineElements e |> attachSimpleTag "em"

/// convert InlineElement list to string, with HTML tags where necessary
/// not tail recursive because the code looks cleaner this way
and strInlineElements eles =
    let convertHtml pStr ele =
        pStr +
        match ele with
        | FrmtedString fStr -> strFStr fStr
        | Link (ht, url) -> strFStr ht |> attachHTMLTag ("a", [("href", url)], true)
        | Picture (alt, url) ->
            let attrs = [("src", url); ("alt", alt)]
            attachHTMLTag ("img", attrs, false) ""
    List.fold convertHtml "" eles

/// process Markdown paragraph
let strParagraph lines =
    let folder pLinesStr line =
        pLinesStr + strInlineElements line + newLineStr
    List.fold folder "" lines
    |> (fun x -> x.Trim()) // remove leading and trailing whitespaces and CRLFs
    |> attachSimpleTag "p"


/// process Markdown Table
let strTable (rows: PRow list) =
    // filter out table header
    let containHeader (row: PRow) =
        //let PCells(_, isHeader) = row
        match row with
        | PCells(_, isHeader) ->
            isHeader
    let takeoutCells = List.map (fun pRow -> match pRow with | PCells(cells,_) -> cells)
    let headerRows = List.filter (containHeader) rows |> takeoutCells
    let bodyRows = List.filter (containHeader >> not) rows |> takeoutCells
    let foldCells row =
        let cellsFolder pStr cell =
            match cell with
            | CellLine(line, isHeader, align) ->
                let tagName = if isHeader then "th" else "td"
                let cellContent = strInlineElements line
                let alignAttr =
                    match align with
                    | Centre -> ("align", "center")
                    | Right -> ("align", "right")
                    | Left -> ("align", "left")
                    | NoAlign -> ("","")
                pStr + attachHTMLTag (tagName, [alignAttr], true) cellContent
        List.fold cellsFolder "" row
    let foldRows rows =
        let rowsFolder pStr row =
            foldCells row
            |> attachSimpleTag "tr"
            |> fun s -> pStr + s
        List.fold rowsFolder "" rows
    foldRows headerRows |> attachSimpleTag "thead"
    |> fun s ->
        s + (foldRows bodyRows |> attachSimpleTag "tbody")
    |> attachSimpleTag "table"


/// recursively process a list
let rec strList list =
    let strListItem pStr li =
        pStr + (
            match li with
            | StringItem(line) -> strInlineElements line |> attachSimpleTag "li"
            | NestedList(list) -> strList list
            )
    match list with
    | {ListType=lt; ListItem=liS} ->
        let listTag = if lt=UL then "ul" else "ol"
        List.fold strListItem "" liS
        |> attachSimpleTag listTag

/// process header
let strHeader header =
    match header with
    | {HeaderName=line;Level=lv} ->
        let tagName = "h" + string(lv)
        line
        |> strInlineElements
        |> attachSimpleTag tagName

/// process inline footnotes
let strInlineFootnote fnId =
    let idStr = match fnId with | FtID i -> string i | RefID s -> string s
    idStr
    |> attachHTMLTag ("a", ["href", "#footnote-"+idStr], true)
    |> attachSimpleTag "sup"


let (|MatchHeaderAndSubHeader|_|) hds =
    match hds with
    | fstHd::sndHd::_ ->
        let {Level=fstLv} = fstHd
        let {Level=sndLv} =sndHd
        if sndLv > fstLv then (List.head hds, List.tail hds) |> Some else None
    | _ -> None

/// process table of contents

let strToC (toc:Ttoc) =
    let displaySingleHeader headerName =
        headerName |> strInlineElements // can insert unique id for linking
    let appendListItem s i =
        {s with ListItem = i::(s.ListItem)}
    let fstAppendListItem s i = 
        appendListItem (fst s) i
    let appendToNested (s:TList) appendee =
        // if List.head fst s is a nested list, append to that list
        match s.ListItem with
        | NestedList(l)::tail -> 
            sprintf "Append to nested: %A" appendee |> dLogger.Debug None
            {s with ListItem = NestedList({l with ListItem = appendee::l.ListItem})::tail}
        // otherwise if the latest element on the list isn't a nested list, just append
        | _ ->
            sprintf "Create nested with: %A" appendee |> dLogger.Debug None 
            appendee |> appendListItem s
    
    let appendToNestedD n (s:TList) appendee =
        let getNest = function 
                | NestedList(l) -> l 
                | _ -> failwith "Invalid depth."
        
        let rec appendToNestedD' n s =
            let recurse = function
                | head::tail -> ((appendToNestedD' (n-1) (head |> getNest)).ListItem)@tail
                | [] -> failwithf "List shouldn't be empty: %A" s
            match (n,s) with
            | (n,s) when n > 0 ->
                {s with ListItem = recurse s.ListItem}

            | (0,s) -> (appendee |> appendToNested s)
            | (n,_) when n < 0 -> failwith "Negative depth, shouldn't happen."
            | _ -> failwithf "n is: %i, s is: %A" n s
        appendToNestedD' n s

    // Maybe convert header list into a list item
    let fold (s:(TList*int)) =
        function
        |  {HeaderName=headerName; Level=lv} when lv = 1
        // If header has depth 1, put it in the main list
            -> StringItem(headerName) |> fstAppendListItem s,lv
        // If lv is > previous level, create nested list
        | {HeaderName=headerName; Level=lv} when lv > snd s
            ->  NestedList({ListType=OL;ListItem=[StringItem(headerName)];Depth=snd s})
                |> appendToNestedD 0 (fst s), lv
        // Append to current nested list
        | {HeaderName=headerName; Level=lv} when lv = snd s
            -> sprintf "Append: %A %i" headerName lv |> dLogger.Debug None
               StringItem(headerName) |> appendToNested (fst s),lv
        
        | {HeaderName=headerName; Level=lv} when lv < snd s
            ->  StringItem(headerName) |> appendToNestedD (lv-2) (fst s),lv
        | _ -> s
    
    let rec revList (l:TList) =
        let rec revListItemList (li:TListItem list) =
            let revRecurse = function 
                | NestedList(l)->NestedList({l with ListItem=(revListItemList l.ListItem)})
                | l -> l
            List.map revRecurse li
            |> List.rev
        {l with ListItem=List.rev (revListItemList l.ListItem)}

    //sprintf "%A" (toc.HeaderLst) |> dLogger.Debug None
    List.fold fold ({Depth=1; ListItem=[]; ListType=OL},1) (toc.HeaderLst)
    |> fst
    |> (fun l -> {l with ListItem=List.rev l.ListItem})
    |> revList
    |> strList
    // For each header in the list, print it out as a list element
    //let folder' maxLv s (header:THeader) =
    //    // match header with
    //    // | {HeaderName=str; Level=headerLv}

    //    ""
    //let folder = folder' (toc.MaxDepth)
    //List.fold folder "" toc.HeaderLst

    //let rec tocMany currentLv maxLv headers pStr =
    //    match headers with
    //    | {HeaderName=headerName; Level=headerLv}::rHds ->
    //        match headerLv with
    //        | hlv when hlv = currentLv ->
    //            match headers with
    //            | MatchHeaderAndSubHeader (fstHd, rHds) ->
    //                let (cStr, rHds) =
    //                    match fstHd |> strInlineElements |> tocMany currentLv+1 maxLv rHds with
    //                    | Ok (cStr, rHds) -> (cStr, rHds)
    //                    | Error
    //                //pStr + (
    //                    
    //                //    |> attachSimpleTag "li")
    //                
    //            | _ -> pStr + (headerName |> strInlineElements) |> tocMany currentLv maxLv rHds |> Ok
    //        | hlv when hlv 



/// gather footnotes for end of page display
let gatherFootnotes pObjs =
    let footnotesFilter pObj =
        match pObj with
        | Footnote _ -> true
        | _ -> false
    List.filter footnotesFilter pObjs


/// process HTML body part
let strBody pObjs =
    let folder pStr pObj =
        pStr +
        match pObj with
        | Paragraph p -> strParagraph p
        | Quote q -> strInlineElements q |> attachSimpleTag "q"
        | CodeBlock (c, l) -> attachHTMLTag ("code", [("language", mapLang l)], true) c
        | Table rows -> strTable rows
        | List l -> strList l
        | Header h -> strHeader h
        | Footnote (fnId, _) -> strInlineFootnote fnId
        | ContentTable toc -> strToC toc
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs

