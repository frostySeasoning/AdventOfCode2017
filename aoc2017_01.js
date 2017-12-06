function stringToIntArray(string)
{
  var array = [];
  for(var i = 0; i < string.length; i++)
  {
    array.push(parseInt(string.charAt(i)));
  }
  return array;
}

function matchingSum(array){
  var sum = 0;
  for(var i = 0; i < array.length-1; i++)
  {
    if(array[i] == array[i+1])
    {
      sum += array[i];
    }
  }
  if(array[array.length-1] == array[0])
  {
    sum += array[0];
  }
  return sum;
}

function solve011(input){
  return matchingSum(stringToIntArray(input));
}
