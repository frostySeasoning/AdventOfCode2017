function countRedistributionCycles(ai)
{
  var states = [];
  var count = 0;
  while(true)
  {
    states.push(ai.slice());
    count++;
    redistribute(ai);
    var sc = states.length;
    for(var i = 0; i < sc; i++)
    {
      if(areArraysEqual(ai, states[i]))
      {
        return count;
      }
    }
  }
}

function getLoopSizeOfRedCycles(ai)
{
  var states = [];
  var count = 0;
  while(true)
  {
    states.push(ai.slice());
    count++;
    redistribute(ai);
    var sc = states.length;
    for(var i = 0; i < sc; i++)
    {
      if(areArraysEqual(ai, states[i]))
      {
        return sc - i;
      }
    }
  }
}

function redistribute(ai)
{
  var l = ai.length;
  var index = getIndexOfMax(ai);
  var amount = ai[index];
  ai[index] = 0;
  for(var i = 0; i < amount; i++)
  {
    index++;
    if(index >= l )
    {
      index -= l;
    }
    ai[index]++;
  }
  return ai;
}

function getIndexOfMax(ai)
{
  var index = 0;
  var max = ai[0];
  var l = ai.length
  for(var i = 1; i < l; i++)
  {
    if(max < ai[i])
    {
      index = i;
      max = ai[i];
    }
  }
  return index;
}

function areArraysEqual(a1, a2)
{
  if(a1.length != a2.length)
  {
    return false;
  }
  var l = a1.length;
  for(var i = 0; i < l; i++)
  {
    if(a1[i] != a2[i])
    {
      return false;
    }
  }
  return true;
}

// 5042 for given input
function solve061()
{
  return countRedistributionCycles(input.split(" ").map(e => parseInt(e)));
}

// 1086 for the given input
function solve062()
{
  return getLoopSizeOfRedCycles(input.split(" ").map(e => parseInt(e)));
}

input = "5 1 10 0 1 7 13 14 3 12 8 10 7 12 0 6";
