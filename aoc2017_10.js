function getKnotHash(list_ArrInt, sublistlengths_ArrInt)
{
  var position_Int = 0;
  var skipDistance_Int = 0;
  var listLength_Int = list_ArrInt.length;
  var sllLength_ArrInt = sublistlengths_ArrInt.length;
  
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
  return list_ArrInt[0] * list_ArrInt[1];
}

function getSparseHash(list_ArrInt, sublistlengths_ArrInt)
{
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

function getDenseHash(list_ArrInt, sublistlengths_ArrInt)
{
  list_ArrInt = getSparseHash(list_ArrInt, sublistlengths_ArrInt);
  var result_Str = "";
  for(let i = 0; i < 16; i++)
  {
    result_Str += getHexStringFromInt(getBitwiseXOR(list_ArrInt.slice(i*16, (i+1)*16)));
  }
  return result_Str;
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

// for array of int values from 0 to 255
function getHexStringFromArrInt(input_ArrInt)
{
  return input_ArrInt.map(intValue => { return intValue < 16 ? "0" + intValue.toString(16) : intValue.toString(16); }).reduce((acc, item) => { return acc + item; }, "");
}

function getHexStringFromInt(input_Int)
{
  return input_Int < 16 ? "0" + input_Int.toString(16) : input_Int.toString(16);
}

function test101()
{
  var resultKnotHash_Int = getKnotHash([0,1,2,3,4], [3,4,1,5]);
  console.log(resultKnotHash_Int);
  return resultKnotHash_Int == 12;
}

// 826 for given input
function solve101()
{
  var list_ArrInt = [];
  for(let i = 0; i < 256; i++)
  {
    list_ArrInt.push(i);
  }
  return getKnotHash(list_ArrInt, input.split(",").map(item => {return parseInt(item)}));
}

// "d067d3f14d07e09c2e7308c3926605c4" for given input
function solve102()
{
  var list_ArrInt = [];
  for(let i = 0; i < 256; i++)
  {
    list_ArrInt.push(i);
  }
  return getDenseHash(list_ArrInt, getAsciiCode(input).concat(suffix_ArrInt));
}

var input = "120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113";

var suffix_ArrInt = [17, 31, 73, 47, 23];
