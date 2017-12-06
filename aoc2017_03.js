function calcManhattenDistance(position)
{
  if(position < 1)
  {
    return -1;
  }
  if(position == 1)
  {
    return 0;
  }
  // kantenlaenge des rings
  var k = Math.ceil(Math.sqrt(position));
  k % 2 == 0 ? k++ : k;
  // x-ter ring
  var xR = (k-1)/2;
  // elementcount des x-ten rings
  var xRC = k*k - (k-2)*(k-2);
  // position im x-ten Ring
  var pR = position - (k-2)*(k-2);
  
  return xR + Math.abs((xRC / 8) - pR % (xRC / 4));
}
