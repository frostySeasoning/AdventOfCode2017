function stringToArrayOfArrayOfInts(string)
{
  return string.split("n").map(str => (str.split(" ").map(num => parseInt(num))));
}

function checksumMinMax(arrayOfArrayOfInts)
{
  var sum = 0;
  for(var i1 = 0; i1 < arrayOfArrayOfInts.length; i1++)
  {
    var min = null;
    var max = null;
    for(var i2 = 0; i2 < arrayOfArrayOfInts[i1].length; i2++)
    {
      var val = arrayOfArrayOfInts[i1][i2];
      if(min == null || min > val)
      {
        min = val;
      }
      if(max == null || max < val)
      {
        max = val;
      }
    }
    if(min != null && max != null)
    {
      sum += max - min;
    }
  }
  return sum;
}

function checksumEvenDiv(arrayOfArrayOfInts)
{
  var sum = 0;
  for(var i1 = 0; i1 < arrayOfArrayOfInts.length; i1++)
  {
    for(var i2 = 0; i2 < arrayOfArrayOfInts[i1].length - 1; i2++)
    {
      var done = false;
      for(var i3 = i2 + 1; i3 < arrayOfArrayOfInts[i1].length; i3++)
      {
        if(arrayOfArrayOfInts[i1][i2] % arrayOfArrayOfInts[i1][i3] == 0)
        {
          sum += arrayOfArrayOfInts[i1][i2] / arrayOfArrayOfInts[i1][i3];
          done = true;
          break;
        }
        if(arrayOfArrayOfInts[i1][i3] % arrayOfArrayOfInts[i1][i2] == 0)
        {
          sum += arrayOfArrayOfInts[i1][i3] / arrayOfArrayOfInts[i1][i2];
          done = true;
          break;
        }
      }
      if(done)
      {
        break;
      }
    }
  }
  return sum;
}

const input = "4347 3350 196 162 233 4932 4419 3485 4509 4287 4433 4033 207 3682 2193 4223n648 94 778 957 1634 2885 1964 2929 2754 89 972 112 80 2819 543 2820n400 133 1010 918 1154 1008 126 150 1118 117 148 463 141 940 1101 89n596 527 224 382 511 565 284 121 643 139 625 335 657 134 125 152n2069 1183 233 213 2192 193 2222 2130 2073 2262 1969 2159 2149 410 181 1924n1610 128 1021 511 740 1384 459 224 183 266 152 1845 1423 230 1500 1381n5454 3936 250 5125 244 720 5059 202 4877 5186 313 6125 172 727 1982 748n3390 3440 220 228 195 4525 1759 1865 1483 5174 4897 4511 5663 4976 3850 199n130 1733 238 1123 231 1347 241 291 1389 1392 269 1687 1359 1694 1629 1750n1590 1394 101 434 1196 623 1033 78 890 1413 74 1274 1512 1043 1103 84n203 236 3001 1664 195 4616 2466 4875 986 1681 152 3788 541 4447 4063 5366n216 4134 255 235 1894 5454 1529 4735 4962 220 2011 2475 185 5060 4676 4089n224 253 19 546 1134 3666 3532 207 210 3947 2290 3573 3808 1494 4308 4372n134 130 2236 118 142 2350 3007 2495 2813 2833 2576 2704 169 2666 2267 850n401 151 309 961 124 1027 1084 389 1150 166 1057 137 932 669 590 188n784 232 363 316 336 666 711 430 192 867 628 57 222 575 622 234"

function solve021(input)
{
  return checksumMinMax(stringToArrayOfArrayOfInts(input));
}

function solve022(input)
{
  return checksumEvenDiv(stringToArrayOfArrayOfInts(input));
}
