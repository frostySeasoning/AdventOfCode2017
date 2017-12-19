// 8600 for given input
function solve181()
{
  var operations_ArrStr = input.split("\n");
  var register_MapStrInt = initRegister(operations_ArrStr);
  var nextOperationIndex_Int = 0; // index of next operation
  var frequencyOfLastSoundPlayed;
  while(true)
  {
    let operation_ArrStr = operations_ArrStr[nextOperationIndex_Int].split(" ");
    switch (operation_ArrStr[0])
    {
      case "snd":
        if(!isNaN(parseInt(operation_ArrStr[1])))
        {
          frequencyOfLastSoundPlayed = parseInt(operation_ArrStr[1]);
        }
        else if(register_MapStrInt.has(operation_ArrStr[1]))
        {
          frequencyOfLastSoundPlayed = register_MapStrInt.get(operation_ArrStr[1]);
        }
        nextOperationIndex_Int++;
        break;
      case "set":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "add":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) + parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) + register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "mul":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) * parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) * register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "mod":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) % parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) % register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "rcv":
        if(!isNaN(parseInt(operation_ArrStr[1])) && parseInt(operation_ArrStr[1]) != 0)
        {
          return frequencyOfLastSoundPlayed;
        }
        else if(register_MapStrInt.has(operation_ArrStr[1]) && register_MapStrInt.get(operation_ArrStr[1]) != 0)
        {
          return frequencyOfLastSoundPlayed;
        }
        nextOperationIndex_Int++;
        break;
      case "jgz":
        var x = 0;
        if(!isNaN(parseInt(operation_ArrStr[1])))
        {
          x = parseInt(operation_ArrStr[1]);
        }
        else if(register_MapStrInt.has(operation_ArrStr[1]))
        {
          x = register_MapStrInt.get(operation_ArrStr[1]);
        }
        if(x <= 0)
        {
          nextOperationIndex_Int++;
          break;
        }
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          nextOperationIndex_Int += parseInt(operation_ArrStr[2]);
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          nextOperationIndex_Int += register_MapStrInt.get(operation_ArrStr[2]);
        }
        break;
    }
  }
}

function initRegister(operations_ArrStr)
{
  var register_MapStrInt = new Map();
  for(let i = 0, operationsLength = operations_ArrStr.length; i < operationsLength; i++)
  {
    let values = operations_ArrStr[i].split(" ").splice(1);
    values.forEach(value => {
      if(isNaN(parseInt(value, 10)) && !register_MapStrInt.has(value))
      {
        register_MapStrInt.set(value, 0);
      }
    });
  }
  return register_MapStrInt;
}

// 7239 for given input
function solve182()
{
  var operations_ArrStr = input.split("\n");
  var register_MapStrInt = initRegister(operations_ArrStr);
  var register0 = new Map(register_MapStrInt);
  register0.set("p", 0);
  var register1 = new Map(register_MapStrInt);
  register1.set("p", 1);
  register_MapStrInt = new Map(register0);
  var nextOperationIndex_Int = 0; // index of next operation
  var nextOperation0 = 1;
  var nextOperation1 = 1;
  var in_Que = [];
  var out_Que = [];
  
  var count_Int = 0;
  
  var emptyInCount_Int = 0;
  var activeProgramm = 0;
  while(true)
  {
    let operation_ArrStr = operations_ArrStr[nextOperationIndex_Int].split(" ");
    switch (operation_ArrStr[0])
    {
      case "snd":
        if(!isNaN(parseInt(operation_ArrStr[1])))
        {
          out_Que.push(parseInt(operation_ArrStr[1]));
          if(activeProgramm == 1)
          {
            count_Int++;
          }
        }
        else if(register_MapStrInt.has(operation_ArrStr[1]))
        {
          out_Que.push(register_MapStrInt.get(operation_ArrStr[1]));
          if(activeProgramm == 1)
          {
            count_Int++;
          }
        }
        nextOperationIndex_Int++;
        break;
      case "set":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "add":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) + parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) + register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "mul":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) * parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) * register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "mod":
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) % parseInt(operation_ArrStr[2]));
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          register_MapStrInt.set(operation_ArrStr[1], register_MapStrInt.get(operation_ArrStr[1]) % register_MapStrInt.get(operation_ArrStr[2]));
        }
        nextOperationIndex_Int++;
        break;
      case "rcv":
        if(register_MapStrInt.has(operation_ArrStr[1]))
        {
          if(in_Que.length == 0)
          {
            emptyInCount_Int++;
            // check for deadlock
            if(out_Que.length == 0 && emptyInCount_Int >= 2)
            {
              return count_Int;
            }
            if(out_Que.length != 0)
            {
              //emptyInCount_Int = 0; ???
            }
            // change active programm
            if(activeProgramm == 0)
            {
              activeProgramm = 1;
              nextOperation0 = nextOperationIndex_Int;
              nextOperationIndex_Int = nextOperation1 - 1;
              register0 = new Map(register_MapStrInt);
              register_MapStrInt = new Map(register1);
              let a = in_Que.slice();
              in_Que = out_Que.slice();
              out_Que = a.slice(); // = [] (?)
            }
            else if(activeProgramm == 1)
            {
              activeProgramm = 0;
              nextOperation1 = nextOperationIndex_Int;
              nextOperationIndex_Int = nextOperation0 - 1;
              register1 = new Map(register_MapStrInt);
              register_MapStrInt = new Map(register0);
              let a = in_Que.slice();
              in_Que = out_Que.slice();
              out_Que = a.slice(); // = [] (?)
            }
            else
            {
              return -1;
            }
          }
          else
          {
            register_MapStrInt.set(operation_ArrStr[1], in_Que.shift());
          }
        }
        nextOperationIndex_Int++;
        break;
      case "jgz":
        var x = 0;
        if(!isNaN(parseInt(operation_ArrStr[1])))
        {
          x = parseInt(operation_ArrStr[1]);
        }
        else if(register_MapStrInt.has(operation_ArrStr[1]))
        {
          x = register_MapStrInt.get(operation_ArrStr[1]);
        }
        if(x <= 0)
        {
          nextOperationIndex_Int++;
          break;
        }
        if(!isNaN(parseInt(operation_ArrStr[2])))
        {
          nextOperationIndex_Int += parseInt(operation_ArrStr[2]);
        }
        else if(register_MapStrInt.has(operation_ArrStr[2]))
        {
          nextOperationIndex_Int += register_MapStrInt.get(operation_ArrStr[2]);
        }
        break;
    }
  }
}

var input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 735
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

var testinput = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
