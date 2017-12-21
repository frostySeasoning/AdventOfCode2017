
// [1,2,3],    [7,4,1]
// [4,5,6], => [8,5,2]
// [7,8,9]     [9,6,3]
function getRotated90ArrArr(arrArr)
{
  var rotatedArrArr = new Array(arrArr.length);
  for(let i1 = 0, i1limit = arrArr.length; i1 < i1limit; i1++)
  {
    rotatedArrArr[i1] = new Array([arrArr[i1].length]);
    for(let i2 = 0, i2limit = arrArr[0].length; i2 < i2limit; i2++)
    {
      rotatedArrArr[i1][i2] = arrArr[i2limit - 1 - i2][i1];
    }
  }
  return rotatedArrArr;
}

// [1,2,3],    [7,8,9]
// [4,5,6], => [4,5,6]
// [7,8,9]     [1,2,3]
function getFlippedArrArr(arrArr)
{
  return arrArr.reverse();
}

// [[".", "."], [".", "#"]] -> "../.#"
function getStringRepresentation(arrArr)
{
  var stringRepresentation = "";
  for(let a of arrArr)
  {
    stringRepresentation += "/";
    for(let s of a)
    {
      stringRepresentation += s;
    }
  }
  return stringRepresentation.slice(1);
}

// "../.#" -> [[".", "."], [".", "#"]]
function getArrArrRepresentation(str)
{
  return str.split("/").map(element => {
    return element.split("");
  });
}

// input: ["../.# => ##./#../...", ... ]
// output: Map { "../.#" => "##./#../...", "../#." => "##./#../...", "#./.." => "##./#../...", ".#/.." => "##./#../...", ...}
function getEnhancementRulesMap(arrStr)
{
  var rules_MapStrStr = new Map();
  for(let s of arrStr)
  {
    let pattern_Str = s.split(" => ")[0];
    let pattern_ArrArr = getArrArrRepresentation(pattern_Str);
    let flippedPattern_ArrArr = getFlippedArrArr(pattern_ArrArr);
    let enhancedPattern_Str = s.split(" => ")[1];
    
    for(let i = 0; i < 4; i++)
    {
      pattern_Str = getStringRepresentation(pattern_ArrArr);
      if(!rules_MapStrStr.has(pattern_Str))
      {
        rules_MapStrStr.set(pattern_Str, enhancedPattern_Str);
      }
      pattern_Str = getStringRepresentation(flippedPattern_ArrArr);
      if(!rules_MapStrStr.has(pattern_Str))
      {
        rules_MapStrStr.set(pattern_Str, enhancedPattern_Str)
      }
      if(i == 3)
      {
        break;
      }
      pattern_ArrArr = getRotated90ArrArr(pattern_ArrArr);
      flippedPattern_ArrArr = getRotated90ArrArr(flippedPattern_ArrArr);
    }
  }
  return rules_MapStrStr;
}
