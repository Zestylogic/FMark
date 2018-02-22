module MarkalcShared

let countDelim delim tokList =
    List.filter (function | d when d = delim -> true | _ -> false) tokList 
    |> List.length

// return everything before and after the first/last delimeter searched for, error if delim not found
let delimSplit last delim t =
    let rec delimSplitFirst' delim before t =
        match t with
        | d :: after when d = delim -> Ok (before,after) // If delim then token list, return d and everything after the delim
        | x :: after -> delimSplitFirst' delim (x::before) after // If non-PIPE token then token list, recurse adding the tokens to the before list
        | [] -> Error (before,[]) // Did not find delimeter
    let rec delimSplitLast' delim before t =
        match (t, countDelim delim t) with
        | d :: after,1 when d = delim -> Ok (before,after)
        | x :: after,_ -> delimSplitLast' delim (x::before) after
        | [],_ -> Error (before,[])
    let searchFunc = if last then delimSplitLast' else delimSplitFirst'
    searchFunc delim [] t
    |> function
    | Error(before,a) -> Error(List.rev before,a)
    | Ok (before,a) -> Ok(List.rev before,a)