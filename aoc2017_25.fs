type TmTapeState = ZERO | ONE

type TmCursorMove = LEFT | RIGHT

type TmStateName = A | B | C | D | E | F

type TmStateTransitionDefinition = {NewValue: TmTapeState; CursorMove: TmCursorMove; NextState: TmStateName}

type TmStateDefinition = {StateName: TmStateName; onZERO: TmStateTransitionDefinition; onONE: TmStateTransitionDefinition}

type TmState = {Tape: TmTapeState [] * TmTapeState []; CursorPosition: int; CurrentState: TmStateName}

let progrTest = [|
  {StateName = A; onZERO = {NewValue = ONE; CursorMove = RIGHT; NextState = B}; onONE = {NewValue = ZERO; CursorMove = LEFT; NextState = B}};
  {StateName = B; onZERO = {NewValue = ONE; CursorMove = LEFT; NextState = A}; onONE = {NewValue = ONE; CursorMove = RIGHT; NextState = A}} |]

let progr266234 = [|
  {StateName = A; onZERO = {NewValue = ONE; CursorMove = RIGHT; NextState = B}; onONE = {NewValue = ZERO; CursorMove = LEFT; NextState = D}};
  {StateName = B; onZERO = {NewValue = ONE; CursorMove = RIGHT; NextState = C}; onONE = {NewValue = ZERO; CursorMove = RIGHT; NextState = F}};
  {StateName = C; onZERO = {NewValue = ONE; CursorMove = LEFT; NextState = C}; onONE = {NewValue = ONE; CursorMove = LEFT; NextState = A}};
  {StateName = D; onZERO = {NewValue = ZERO; CursorMove = LEFT; NextState = E}; onONE = {NewValue = ONE; CursorMove = RIGHT; NextState = A}};
  {StateName = E; onZERO = {NewValue = ONE; CursorMove = LEFT; NextState = A}; onONE = {NewValue = ZERO; CursorMove = RIGHT; NextState = B}};
  {StateName = F; onZERO = {NewValue = ZERO; CursorMove = RIGHT; NextState = C}; onONE = {NewValue = ZERO; CursorMove = RIGHT; NextState = E}} |]

let getStateIdFromName stateName =
  match stateName with
  | A -> 0
  | B -> 1
  | C -> 2
  | D -> 3
  | E -> 4
  | F -> 5

let getTapeStateIntRepresentation ts =
  match ts with
  | ZERO -> 0
  | ONE -> 1

let getCheckSum (tape: TmTapeState [] * TmTapeState []) =
  let t1,t2 = tape
  Array.sumBy (getTapeStateIntRepresentation) t1 + Array.sumBy (getTapeStateIntRepresentation) t2


let getTapeState (tape: TmTapeState [] * TmTapeState []) index =
  match tape with
  | (t,_) when index < 0 -> match -(index+1) < t.Length with | true -> t.[-(index+1)] | false -> ZERO
  | (_,t) -> match index < t.Length with | true -> t.[index] | false -> ZERO

let getArrayWithChangedValue (arr: TmTapeState []) index newValue =
  Array.mapi (fun i e -> match i with | i when i = index -> newValue | _ -> e) arr

let getArrayWithAppendedValue (arr: TmTapeState []) index newValue =
  match index-arr.Length > 0 with
  | true -> Array.concat [| arr; Array.create (index-arr.Length) ZERO; [|newValue|] |]
  | false -> Array.append arr [|newValue|]

let getNewTapeState (tape: TmTapeState [] * TmTapeState []) index newValue =
  match tape with
  | (t,c) when index < 0 ->
    match -(index+1) < t.Length with
    | true -> (getArrayWithChangedValue t -(index+1) newValue, c)
    | false -> (getArrayWithAppendedValue t -(index+1) newValue, c)
  | (c,t) -> 
    match index < t.Length with
    | true -> (c, getArrayWithChangedValue t index newValue)
    | false -> (c, getArrayWithAppendedValue t index newValue)

let getNewCursorPosition currentPosition cursorMove =
  match cursorMove with
  | LEFT -> currentPosition - 1
  | RIGHT -> currentPosition + 1

let executeTmTransition state transition =
  {Tape = getNewTapeState state.Tape state.CursorPosition transition.NewValue;
  CursorPosition = getNewCursorPosition state.CursorPosition transition.CursorMove;
  CurrentState = transition.NextState}

let executeTmStep (progr:TmStateDefinition []) (tmState:TmState) =
  let stateDef = progr.[getStateIdFromName tmState.CurrentState]
  match getTapeState tmState.Tape tmState.CursorPosition with
  | ZERO -> executeTmTransition tmState stateDef.onZERO
  | ONE -> executeTmTransition tmState stateDef.onONE

 // executeTmStep progr266234 {Tape = ([|ZERO|], [|ZERO|]); CursorPosition = 0; CurrentState = A}

// execute1725P1 progr266234 {Tape = ([|ZERO|], [|ZERO|]); CursorPosition = 0; CurrentState = A} 0 12302209;;
// val it : int = 633

// execute1725P1 progrTest {Tape = ([|ZERO|], [|ZERO|]); CursorPosition = 0; CurrentState = A} 0 6;;
let rec execute1725P1 progr state stepCounter checkedStep =
  match stepCounter with
  | _ when stepCounter % 2500 = 0 && stepCounter <> checkedStep ->
    printfn "%i: %i %A" stepCounter (getCheckSum state.Tape) state
    execute1725P1 progr (executeTmStep progr state) (stepCounter + 1) checkedStep
  | _ when stepCounter = checkedStep ->
    printfn "%i: %i %A" stepCounter (getCheckSum state.Tape) state
    getCheckSum state.Tape
  | _ -> execute1725P1 progr (executeTmStep progr state) (stepCounter + 1) checkedStep