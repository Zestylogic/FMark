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
        | Reference (ht, id) ->
            ht
            |> attachHTMLTag ("a", [("href", "#"+id)], true)
            |> attachSimpleTag "sup"
    List.fold convertHtml "" eles

/// process Markdown paragraph
let strParagraph lines =
    let folder pLinesStr line =
        pLinesStr + strInlineElements line + NewLineStr
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
let strHeader (header,id) =
    match header with
    | {HeaderName=line;Level=lv} ->
        let tagName = "h" + string(lv)
        line
        |> strInlineElements
        |> attachHTMLTag (tagName, ["id", id], true)

/// process references
/// id: the href id used in inline referencing
/// content: of TLine type, to be displayed at the end of HTML doc
let strRef (id, content) =
    "["+id+"] " + strInlineElements content
    |> attachHTMLTag ("p", ["id", id], true)

let (|MatchHeaderAndSubHeader|_|) hds =
    match hds with
    | fstHd::sndHd::_ ->
        let {Level=fstLv} = fstHd
        let {Level=sndLv} =sndHd
        if sndLv > fstLv then (List.head hds, List.tail hds) |> Some else None
    | _ -> None

/// process table of contents

let strToC (toc:Ttoc) =
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
        | _ -> sprintf "Create nested with: %A" appendee |> dLogger.Debug None 
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
    // Convert header list into a list item
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
    List.fold fold ({Depth=1; ListItem=[]; ListType=OL},1) (toc.HeaderLst)
    |> fst
    |> (fun l -> {l with ListItem=List.rev l.ListItem})
    |> revList
    |> strList

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
        | Header (h,s) -> strHeader (h,s)
        | Footnote (i,s) -> strRef ((string i), s)
        | Citation (i,_,s) -> strRef (i, s)
        | ContentTable toc -> strToC toc
        | _ -> sprintf "%A is not implemented" pObj
    List.fold folder "" pObjs


/// generate HTML head
let genHead htmlTitle =
    let metaData =
        [
            [("name", "viewport");("content", "width=device-width")]
        ]
    let genMetadata pStr md =
        pStr + attachMetaTag "meta" md
    List.fold genMetadata "" metaData
    + attachSimpleTag "title" htmlTitle
    
    |> attachSimpleTag "head"

/// generate HTML body
let genBody (pObjs) =
    strBody pObjs
    // insert javascript in the end of HTML doc to make page rendering faster
    +
    attachHTMLTag ("script",
        [
            ("type", "text/javascript");
            ("async", "");
            ("src", "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML")
        ], true) ""
    |> attachSimpleTag "body"


/// top level HTMLGen
let genHTML (htmlTitle, pObjs) =
    attachMetaTag "!DOCTYPE" ["html", ""]
    + genHead htmlTitle
    + genBody (pObjs)