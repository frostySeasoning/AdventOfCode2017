// 160 for given input and 5 iterations
// 2271537 for given input and 18 iterations
function solve21(iterations_int)
{
  var startingPattern_ArrArr = getArrArrRepresentation(".#./..#/###");
  var enhancementRules2_MapStrStr = getEnhancementRulesMap(input21.split("\n").filter(element => { return element.indexOf("/") == 2; }));
  var enhancementRules3_MapStrStr = getEnhancementRulesMap(input21.split("\n").filter(element => { return element.indexOf("/") == 3; }));
  var pattern_ArrArr = startingPattern_ArrArr.slice();
  
  for(let i = 0; i < iterations_int; i++)
  {
    if(pattern_ArrArr.length % 2 == 0)
    {
      pattern_ArrArr = getEnhancedPattern(pattern_ArrArr, enhancementRules2_MapStrStr, 2);
    }
    else if(pattern_ArrArr.length % 3 == 0)
    {
      pattern_ArrArr = getEnhancedPattern(pattern_ArrArr, enhancementRules3_MapStrStr, 3);
    }
    
    console.log(pattern_ArrArr);
  }
  var pattern_Str = getStringRepresentation(pattern_ArrArr);
  var count_Int = 0;
  for(let i = 0, iLimit = pattern_Str.length; i < iLimit; i++)
  {
    if(pattern_Str[i] == "#")
    {
      count_Int++;
    }
  }
  return count_Int;
}

function getEnhancedPattern(pattern_ArrArr, enhancementRules_MapStrStr, subSquareSize_Int)
{
  var enhancedPattern_ArrArr = [];
  for(let i = 0, iLimit = pattern_ArrArr.length / subSquareSize_Int * (subSquareSize_Int + 1); i < iLimit; i++)
  {
    enhancedPattern_ArrArr.push([]);
  }
  for(let i1 = 0, i1Limit = pattern_ArrArr.length / subSquareSize_Int; i1 < i1Limit; i1++)
  {
    for(let i2 = 0, i2Limit = pattern_ArrArr[0].length / subSquareSize_Int; i2 < i2Limit; i2++)
    {
      let subPattern_ArrArr = [];
      for(let dI = 0; dI < subSquareSize_Int; dI++)
      {
        subPattern_ArrArr.push(pattern_ArrArr[i1*subSquareSize_Int+dI].slice(i2*subSquareSize_Int, (i2+1)*subSquareSize_Int));
      }
      if(enhancementRules_MapStrStr.has(getStringRepresentation(subPattern_ArrArr)))
      {
        let enhancedSubPattern_ArrArr = getArrArrRepresentation(enhancementRules_MapStrStr.get(getStringRepresentation(subPattern_ArrArr)));
        for(let iS1 = 0, iS1Limit = enhancedSubPattern_ArrArr.length; iS1 < iS1Limit; iS1++)
        {
          for(let iS2 = 0, iS2Limit = enhancedSubPattern_ArrArr[0].length; iS2 < iS2Limit; iS2++)
          {
            enhancedPattern_ArrArr[i1*iS1Limit+iS1][i2*iS2Limit+iS2] = enhancedSubPattern_ArrArr[iS1][iS2];
          }
        }
      }
      else
      {
        // shouldnt happen ever
        console.log(subPattern_ArrArr);
      }
    }
  }
  return enhancedPattern_ArrArr;
}

function testGetEnhancedPattern()
{
  var startingPatter_ArrArr = getArrArrRepresentation("#..#/..../..../#..#");
  console.log(startingPatter_ArrArr);
  var enhancementRules_MapStrStr = getEnhancementRulesMap(["../.# => ##./#../..."]);
  console.log(enhancementRules_MapStrStr);
  var enhancedPattern_ArrArr = getEnhancedPattern(startingPatter_ArrArr, enhancementRules_MapStrStr, 2);
  console.log(enhancedPattern_ArrArr);
  return getStringRepresentation(enhancedPattern_ArrArr) == "##.##./#..#../....../##.##./#..#../......";
}

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
  return arrArr.slice().reverse();
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

var input21 = `../.. => #.#/#../...
#./.. => #.#/#.#/.#.
##/.. => #../.##/##.
.#/#. => ..#/..#/..#
##/#. => ##./.#./#..
##/## => .../.#./.#.
.../.../... => ..#./##.#/#.##/##.#
#../.../... => #.##/..../##../###.
.#./.../... => ##.#/###./#.##/#.#.
##./.../... => ##.#/#.##/.#../##.#
#.#/.../... => ...#/..#./.#.#/.###
###/.../... => ..../#..#/#.##/##..
.#./#../... => .#../.#.#/..#./.###
##./#../... => ..##/#.##/#.../#.#.
..#/#../... => .##./#.##/.#../##..
#.#/#../... => #.../.##./...#/###.
.##/#../... => #.##/..##/.#.#/##..
###/#../... => #..#/...#/..#./...#
.../.#./... => .###/.#../..#./####
#../.#./... => ####/#.../.###/##..
.#./.#./... => ####/#..#/####/#..#
##./.#./... => .#../..##/..##/#..#
#.#/.#./... => .#.#/#.##/#.#./.#.#
###/.#./... => #.##/#.../###./#..#
.#./##./... => ###./#.../..../.###
##./##./... => #.##/###./...#/###.
..#/##./... => .#.#/###./..#./#...
#.#/##./... => #.#./##../##../..##
.##/##./... => ..../..#./.##./.#.#
###/##./... => #.../.#../#.#./#..#
.../#.#/... => ##../#.##/.##./.##.
#../#.#/... => #.#./##.#/.###/.###
.#./#.#/... => ..../####/####/.#.#
##./#.#/... => #.##/.###/##../#...
#.#/#.#/... => ###./..##/#.#./####
###/#.#/... => .##./..../###./....
.../###/... => ###./.##./##../.###
#../###/... => .#../#.../###./...#
.#./###/... => #.#./#.#./####/###.
##./###/... => ...#/##../###./#.#.
#.#/###/... => .#.#/#.#./..#./.##.
###/###/... => ..../#.##/...#/##..
..#/.../#.. => ...#/#.##/#..#/..##
#.#/.../#.. => ..#./##.#/.#.#/..##
.##/.../#.. => ..##/##../#.#./#.##
###/.../#.. => #.##/###./...#/.##.
.##/#../#.. => ##../#.##/##.#/##..
###/#../#.. => #.##/##../.##./.#.#
..#/.#./#.. => #..#/##../.###/#.#.
#.#/.#./#.. => .###/#.##/#.#./####
.##/.#./#.. => #.#./#.../#.##/...#
###/.#./#.. => .##./.#.#/#.#./.#.#
.##/##./#.. => .###/.#.#/...#/#.#.
###/##./#.. => .###/#.##/#.##/#.#.
#../..#/#.. => #.../##../.##./###.
.#./..#/#.. => #.../#.##/#.../###.
##./..#/#.. => ####/..../##.#/.###
#.#/..#/#.. => ..##/##.#/#.##/#..#
.##/..#/#.. => ..#./##.#/#.#./..##
###/..#/#.. => ..##/...#/#..#/#..#
#../#.#/#.. => #.../..../#.../#.##
.#./#.#/#.. => ##../####/.#.#/##..
##./#.#/#.. => .#../..../#.../.##.
..#/#.#/#.. => .#../.#.#/.#.#/..#.
#.#/#.#/#.. => ..#./#.##/#.#./..##
.##/#.#/#.. => #.##/..##/...#/####
###/#.#/#.. => .##./.#.#/###./#..#
#../.##/#.. => ..##/.###/.#../##.#
.#./.##/#.. => #.##/.##./.##./.###
##./.##/#.. => .##./.#../..../..##
#.#/.##/#.. => ..../#.#./##.#/###.
.##/.##/#.. => #..#/..../##.#/..#.
###/.##/#.. => ####/##.#/#..#/##..
#../###/#.. => #.#./###./.###/#...
.#./###/#.. => ##.#/#..#/#.##/..#.
##./###/#.. => ..#./...#/..##/...#
..#/###/#.. => .#.#/..../..##/..##
#.#/###/#.. => #..#/..#./.#../..#.
.##/###/#.. => .#.#/..../#..#/...#
###/###/#.. => #.##/##../.#../....
.#./#.#/.#. => ..../####/.###/.#.#
##./#.#/.#. => #.##/...#/####/####
#.#/#.#/.#. => ..#./##../..../#...
###/#.#/.#. => ####/#.##/###./...#
.#./###/.#. => ...#/..#./...#/..#.
##./###/.#. => .##./#.../.#.#/.###
#.#/###/.#. => ..../..../.#.#/#.##
###/###/.#. => ..#./###./##.#/....
#.#/..#/##. => .###/.#../..#./####
###/..#/##. => #.##/..#./#..#/....
.##/#.#/##. => #.../##../####/.##.
###/#.#/##. => ###./..#./..#./##..
#.#/.##/##. => #.../##../##.#/#.##
###/.##/##. => ..#./#..#/#.##/####
.##/###/##. => .#.#/.###/...#/.#..
###/###/##. => ####/..../.#.#/...#
#.#/.../#.# => ##.#/#..#/.##./...#
###/.../#.# => #.#./.#../...#/...#
###/#../#.# => .#.#/.#../##../##..
#.#/.#./#.# => ###./#.../####/.#.#
###/.#./#.# => ##../#.#./..##/##.#
###/##./#.# => ####/..../###./.##.
#.#/#.#/#.# => ...#/.##./##../.###
###/#.#/#.# => ..#./.##./##.#/.#..
#.#/###/#.# => ...#/..../..#./...#
###/###/#.# => #.#./#.#./##../....
###/#.#/### => #.../##.#/.#../..#.
###/###/### => ##../..#./##../..#.`;
