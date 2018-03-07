open System.IO
open System

let (|Int|_|) (s:string) =
  match Int32.TryParse(s) with
  | (true, int) -> Some(int)
  | _ -> None

let parseLine1724 (line:string) =
  match (line.Split('/').[0], line.Split('/').[1]) with
  | (Int i1, Int i2) -> Some((i1, i2))
  | _ -> None

let addComponentToBridge (bridgeComponent: (int * int)) (bridge: int list) =
  match bridgeComponent with
  | (x,y) when x = List.head bridge -> Some(y::x::bridge)
  | (x,y) when y = List.head bridge -> Some(x::y::bridge)
  | _ -> None

let rec getStrongestBridge (bridgeComponents: (int * int) list) (bridge: int list) = 
  match bridgeComponents with
  | [] -> bridge
  | _ ->
    match (List.choose (fun e ->
      match (addComponentToBridge e bridge) with
      | Some newBridge -> Some(getStrongestBridge (List.filter (fun eF -> eF <> e) bridgeComponents) newBridge)
      | None -> None) bridgeComponents) with
    | [] -> bridge
    | l -> List.maxBy (List.sum) l

let rec getLongestBridge bridgeComponents bridge =
  match bridgeComponents with
  | [] -> bridge
  | _ ->
    match (List.choose (fun e -> match (addComponentToBridge e bridge) with
      | Some newBridge -> Some(getStrongestBridge (List.filter (fun eF -> eF <> e) bridgeComponents) newBridge)
      | None -> None) bridgeComponents) with
    | [] -> bridge
    | l -> List.maxBy (List.length) (List.sortBy (fun b -> (List.sum b) * (-1)) l)

let execute1724P1 bridgeComponents =
  getStrongestBridge bridgeComponents [ 0 ] |> List.sum

let execute1724P2 bridgeComponents =
  getLongestBridge bridgeComponents [ 0 ] |> List.sum


let input1724 = File.ReadAllLines (Path.GetFullPath "aoc2017_24_input266234.txt" )

let parsedInput1724 = Array.toList (Array.choose parseLine1724 input1724)

// execute1724P1 parsedInput1724
// 1940 for input_266234

// execute1724P2 parsedInput1724
// 1928 for input_266234