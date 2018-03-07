open System.IO
open System

// AoC 2017 D23

type Cmd1723 =
  | SET of int * int
  | SETSTATIC of int * int 
  | SUB of int * int
  | SUBSTATIC of int * int
  | MUL of int * int
  | MULSTATIC of int * int
  | JNZ of int * int
  | JMP of bool * int // JNZ STATIC STATIC

let getRegisterIdFromName1723 registerName =
  match registerName with
  | 'a' -> Some(0)
  | 'b' -> Some(1)
  | 'c' -> Some(2)
  | 'd' -> Some(3)
  | 'e' -> Some(4)
  | 'f' -> Some(5)
  | 'g' -> Some(6)
  | 'h' -> Some(7)
  | _ -> None

let (|Int|_|) (c:char) =
  match Int32.TryParse(Convert.ToString(c)) with
  | (true, int) -> Some(int)
  | _ -> None

let (|RegisterName|_|) registerName =
  match registerName with
  | 'a' -> Some(registerName)
  | 'b' -> Some(registerName)
  | 'c' -> Some(registerName)
  | 'd' -> Some(registerName)
  | 'e' -> Some(registerName)
  | 'f' -> Some(registerName)
  | 'g' -> Some(registerName)
  | 'h' -> Some(registerName)
  | _ -> None
(*
let getCmd1723 (line:string) (cmd) : Cmd1723 option =
  match getRegisterIdFromName1723 line.[4] with | Some i -> Some(cmd (i, line.Split(' ').[2] |> int)) | None -> None
*)
let parseLine1723 (line:string) =
  match line with
  | l when l.StartsWith("set") ->
    match getRegisterIdFromName1723 l.[4] with
    | Some i ->
      match getRegisterIdFromName1723 l.[6] with
      | Some i2 -> Some(SET (i, i2))
      | None -> Some(SETSTATIC (i, l.Split(' ').[2] |> int))
    | None -> None
  | l when l.StartsWith("sub") ->
    match getRegisterIdFromName1723 l.[4] with
    | Some i -> 
      match getRegisterIdFromName1723 l.[6] with
      | Some i2 -> Some(SUB (i, i2))
      | None -> Some(SUBSTATIC (i, l.Split(' ').[2] |> int))
    | None -> None
  | l when l.StartsWith("mul") ->
    match getRegisterIdFromName1723 l.[4] with
    | Some i ->
      match getRegisterIdFromName1723 l.[6] with
      | Some i2 -> Some(MUL (i, i2))
      | None -> Some(MULSTATIC (i, l.Split(' ').[2] |> int)) 
    | None -> None
  | l when l.StartsWith("jnz") -> 
    match l.[4] with
    | RegisterName n -> match getRegisterIdFromName1723 n with | Some i -> Some(JNZ (i, l.Split(' ').[2] |> int)) | None -> None
    | Int i -> match i with | 0 -> Some(JMP (false, 1)) | _ -> Some(JMP (true,  l.Split(' ').[2] |> int))
    | _ -> None
  | _ -> None

let rec execute1723P1 ((progr: Cmd1723 []), (registerSet: int []), (cmdPointer: int), (mulCount: int)) =
  // if(cmdPointer < 0 || cmdPointer >= progr.Length) return mulCount
  match cmdPointer with
  | x when x < 0 || x >= progr.Length -> mulCount
  | _ ->
    match progr.[cmdPointer] with
    | SET (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1, mulCount) // rv : registerValue
    | SETSTATIC (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> y | _ -> rv) registerSet, cmdPointer + 1, mulCount)
    | SUB (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv - registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1, mulCount)
    | SUBSTATIC (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv - y | _ -> rv) registerSet, cmdPointer + 1, mulCount)
    | MUL (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv * registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1, mulCount + 1)
    | MULSTATIC (x,y) -> execute1723P1 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv * y | _ -> rv) registerSet, cmdPointer + 1, mulCount + 1)
    | JNZ (x,y) -> execute1723P1 (progr, registerSet, (match registerSet.[x] with | 0 -> cmdPointer + 1 | _ -> cmdPointer + y), mulCount)
    | JMP (x,y) -> execute1723P1 (progr, registerSet, (match x with | true -> cmdPointer + y | _ -> cmdPointer + 1), mulCount)

let rec execute1723P2 ((progr: Cmd1723 []), (registerSet: int []), (cmdPointer: int)) =
  // if(cmdPointer < 0 || cmdPointer >= progr.Length) return mulCount
  // printfn "%A" registerSet
  match cmdPointer with
  | x when x < 0 || x >= progr.Length -> registerSet.[7]
  | _ ->
    match progr.[cmdPointer] with
    | SET (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1) // rv : registerValue
    | SETSTATIC (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> y | _ -> rv) registerSet, cmdPointer + 1)
    | SUB (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv - registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1)
    | SUBSTATIC (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv - y | _ -> rv) registerSet, cmdPointer + 1)
    | MUL (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv * registerSet.[y] | _ -> rv) registerSet, cmdPointer + 1)
    | MULSTATIC (x,y) -> execute1723P2 (progr, Array.mapi (fun i rv -> match i with | i when i = x -> rv * y | _ -> rv) registerSet, cmdPointer + 1)
    | JNZ (x,y) -> execute1723P2 (progr, registerSet, (match registerSet.[x] with | 0 -> cmdPointer + 1 | _ -> cmdPointer + y))
    | JMP (x,y) -> execute1723P2 (progr, registerSet, (match x with | true -> cmdPointer + y | _ -> cmdPointer + 1))

let input1723 = File.ReadAllLines (Path.GetFullPath "aoc2017_23_input266234.txt" )

let parsedInput1723 = Array.choose parseLine1723 input1723

//Console.WriteLine( match input1723.Length-parsedInput1723.Length with | 0 -> execute1723P1 ( parsedInput1723, [|0;0;0;0;0;0;0;0|], 0, 0) |> string | _ -> "[ERROR] input couldnt be parsed completely" )

// execute1723P2 (parsedInput1723, [|1;0;0;0;0;0;0;0|], 0)

// algorithm counts how many ints of M={107900 + x*17 | x <=1000} arent primes
// -> M_A={ i | 107900 <= i <= 124900 && i = 107900 + x*17 && i = a*b; i, x, a, b € N}
// -> count(M_A) = 907