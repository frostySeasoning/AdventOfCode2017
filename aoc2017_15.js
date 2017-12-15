function getNextValueGeneratorA(lastValue_Int)
{
  while(true)
  {
    lastValue_Int = (lastValue_Int * 16807) % 2147483647;
    if(lastValue_Int % 4 == 0)
    {
      return lastValue_Int;
    }
  }
}

function getNextValueGeneratorB(lastValue_Int)
{
  while(true)
  {
    lastValue_Int = (lastValue_Int * 48271) % 2147483647;
    if(lastValue_Int % 8 == 0)
    {
      return lastValue_Int;
    }
  }
}

// 612 for the given input
function solve151()
{
  var count_Int = 0;
  var valueGeneratorA_Int = 722;
  var factorGeneratorA_Int = 16807;
  var valueGeneratorB_Int = 354;
  var factorGeneratorB_Int = 48271;
  for(let i = 0; i < 40000000; i++)
  {
    valueGeneratorA_Int = (valueGeneratorA_Int * factorGeneratorA_Int) % 2147483647;
    valueGeneratorB_Int = (valueGeneratorB_Int * factorGeneratorB_Int) % 2147483647;
    if(valueGeneratorA_Int.toString(2).slice(-16).padStart(16, "0") == valueGeneratorB_Int.toString(2).slice(-16).padStart(16, "0"))
    {
      count_Int++;
    }
  }
  return count_Int;
}

// 285 for given input
function solve152()
{
  var count_Int = 0;
  var valueGeneratorA_Int = 722;
  var valueGeneratorB_Int = 354;
  for(let i = 0; i < 5000000; i++)
  {
    valueGeneratorA_Int = getNextValueGeneratorA(valueGeneratorA_Int);
    valueGeneratorB_Int = getNextValueGeneratorB(valueGeneratorB_Int);
    if(valueGeneratorA_Int.toString(2).slice(-16).padStart(16, "0") == valueGeneratorB_Int.toString(2).slice(-16).padStart(16, "0"))
    {
      count_Int++;
    }
  }
  return count_Int;
}
