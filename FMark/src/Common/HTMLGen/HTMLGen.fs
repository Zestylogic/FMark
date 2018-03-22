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
    | Line l -> strInlineElements l
    | Strike l -> strInlineElements l |> attachSimpleTag "del"

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
        | Reference (ht, id) ->  // style for inline referencing the footnotes and citations in the end
            ht
            |> strFStr
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
let strToC (toc: Ttoc) =
    let excludeSelfSkip x = match x with | None -> None | Some 1 -> None | Some n -> Some (n-1)
    /// get all list items in current item level and sub lists
    let rec getCurrentHeaders currentLv hdListItems headers =
        match headers with
        | header:: reHeaders ->
            match header.Level with
            | hdLv when currentLv <= hdLv -> // list item and sub list item
                getCurrentHeaders currentLv (header::hdListItems) reHeaders
            | _ -> hdListItems |> List.rev
        | [] -> hdListItems |> List.rev

    let rec parseHdsIntoList level (headers: THeader list) =
        let depth = (List.head headers).Level
        let headerFolder (currentLv, listItems, (skipNo: int option), currentHdNo) header =
            match skipNo with
            | None ->
                match header.Level with
                | hdLv when hdLv=currentLv ->
                    (currentLv, StringItem(header.HeaderName)::listItems, None, currentHdNo+1)
                | hdLv when hdLv>currentLv ->
                    let (listItem, skip) =
                        xOnwards currentHdNo headers
                        |> getCurrentHeaders (currentLv+1) []
                        |> parseHdsIntoList (currentLv+1)
                    (currentLv, NestedList(listItem)::listItems, skip |> excludeSelfSkip, currentHdNo+1)
                | _ -> failwith "list item level < current level, not possible"
            | Some skip ->
                match skip with
                | 1 -> (currentLv, listItems, None, currentHdNo+1)
                | n when n>1 -> (currentLv, listItems, Some (n-1), currentHdNo+1)
                | _ -> failwith "negative or zero skip number, not possible"
        List.fold headerFolder (level, [], None, 0) headers
        |> (fun (_, lis, _, _) ->
            let doSkip =
                match List.length headers with
                | 0 -> None
                | n -> Some n
            {ListType=OL; ListItem=lis |> List.rev; Depth=depth}, doSkip)
    toc.HeaderLst
    |> parseHdsIntoList 1
    |> fst
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