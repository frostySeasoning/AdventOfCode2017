function getBinaryRepresentationOfHexDigits(hexDigits_Str)
{
  return hexDigits_Str.replace(/./g, match => { return parseInt(match, 16).toString(2).padStart(4, "0") })
}

// 8148 for given input
function solve141()
{
  var count_Int = 0;
  for(let i = 0; i < 128; i++)
  {
    let knotHash_Str = getAdvancedKnotHash(input.concat("-", i));
    count_Int += getBinaryRepresentationOfHexDigits(knotHash_Str).split("").map(item => { return parseInt(item, 10); }).reduce((sum, value) => { return sum + value}, 0);
  }
  
  return count_Int;
}

function test141()
{
  var testInput = "flqrgnkx";
  var testSolution = 8108;
  var count_Int = 0;
  for(let i = 0; i < 128; i++)
  {
    let knotHash_Str = getAdvancedKnotHash(testInput.concat("-", i));
    count_Int += getBinaryRepresentationOfHexDigits(knotHash_Str).split("").map(item => { return parseInt(item, 10); }).reduce((sum, value) => { return sum + value}, 0);
  }
  console.log(count_Int);
  return count_Int == testSolution;
}

var input = "vbqugkhl";

// Knot Hash -> see Day 10; the code below is slightly improved
function getSparseHash(sublistlengths_ArrInt)
{
  var list_ArrInt = [];
  for(let i = 0; i < 256; i++)
  {
    list_ArrInt.push(i);
  }
  var position_Int = 0;
  var skipDistance_Int = 0;
  var listLength_Int = list_ArrInt.length;
  var sllLength_ArrInt = sublistlengths_ArrInt.length;
  
  for(let round = 0; round < 64; round++)
  {
    for(let i = 0; i < sllLength_ArrInt; i++)
    {
      var sublistlength_Int = sublistlengths_ArrInt[i] > listLength_Int ? 0 : sublistlengths_ArrInt[i];
      if(sublistlength_Int > 1)
      { // if(sublistlength_Int <= 1) {updatePosition_Int; updateSkipDisatance_Int; continue;}
        var sublist_ArrInt = [];
        if(position_Int + sublistlength_Int <= listLength_Int)
        {
          sublist_ArrInt = list_ArrInt.slice(position_Int, position_Int + sublistlength_Int);
        }
        else
        {
          sublist_ArrInt = list_ArrInt.slice(position_Int).concat(list_ArrInt.slice(0, (position_Int + sublistlength_Int) % listLength_Int));
        }
        sublist_ArrInt.reverse();
        if(position_Int + sublistlength_Int <= listLength_Int)
        {
          list_ArrInt = list_ArrInt.slice(0, position_Int).concat(sublist_ArrInt).concat(list_ArrInt.slice(position_Int + sublistlength_Int));
        }
        else
        {
          var sublistEndindex_Int = (position_Int + sublistlength_Int) % listLength_Int;
          list_ArrInt = sublist_ArrInt.slice(-sublistEndindex_Int).concat(list_ArrInt.slice(sublistEndindex_Int, position_Int)).concat(sublist_ArrInt.slice(0, -sublistEndindex_Int));
        }
      }
      position_Int = (position_Int + sublistlength_Int + skipDistance_Int) % listLength_Int;
      skipDistance_Int++;
    }
  }
  return list_ArrInt;
}

function getDenseHash(sublistlengths_ArrInt)
{
  var sparseHash_ArrInt = getSparseHash(sublistlengths_ArrInt);
  var denseHash_ArrInt = [];
  for(let i = 0; i < 16; i++)
  {
    denseHash_ArrInt.push(getBitwiseXOR(sparseHash_ArrInt.slice(i*16, (i+1)*16)));
  }
  return denseHash_ArrInt;
  var result_Str = "";
  for(let i = 0; i < 16; i++)
  {
    result_Str += getHexStringFromInt(getBitwiseXOR(sparseHash_ArrInt.slice(i*16, (i+1)*16)));
  }
  return result_Str;
}

function getAdvancedKnotHash(input_Str)
{
  var sublistlengths_ArrInt = getAsciiCode(input_Str).concat([17, 31, 73, 47, 23]);
  var denseHash_ArrInt = getDenseHash(sublistlengths_ArrInt);
  var advKnotHash_Str = denseHash_ArrInt.map(item => { return item.toString(16).padStart(2, "0"); }).reduce((acc, item) => { return acc + item; }, "");
  return advKnotHash_Str;
}

function getBitwiseXOR(input_ArrInt)
{
  return input_ArrInt.reduce((acc, item) => { return acc ^ item; });
}

// charCodeAt gibt UTF-16 Codierung zurueck; diese ist bis 128 mit ASCII deckungsgleich
function getAsciiCode(input_Str)
{
  var output_ArrInt = [];
  for(let i = 0; i < input_Str.length; i++)
  {
    output_ArrInt.push(input_Str.charCodeAt(i));
  }
  return output_ArrInt;
}

