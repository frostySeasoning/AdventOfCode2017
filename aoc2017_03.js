// position/value = 277678

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

function stresstest(value)
{
  return stresstestRek(2, 5, [1, 2, 4, 5, 10, 11, 23, 25], value)
}

function stresstestRek(x, xA, ringPreX, value)
{
  // x: x-ter Ring
  // xA: Kantenlaenge des Rings
  // Anzahl der Elemente im x-ten Ring
  var xC = (xA * xA) - ((xA-2) * (xA-2));
  var xC4 = xC/4;
  var preXC = ringPreX.length;
  // x-ten Ring mit 0 initialisieren
  var ringX = Array.apply(null, Array(xC)).map(e => 0);
  
  // x-ten Ring berechnen
  // Laufvar: Position auf dem x-ten Ring
  for(var pX = 0; pX < xC; pX++)
  {
    // Positions-Korrektur (adjustment) bzgl des (x-1)-ten Rings
    pAdj = -2 * Math.floor(pX/xC4);
    if(pX % xC4 == 0)
    {
      ringX[pX] = ringPreX[pX+pAdj] + ringPreX[getPositionInCircularArray(pX+pAdj-1, preXC)] + ringX[getPositionInCircularArray(pX-1, xC)] + ringX[getPositionInCircularArray(pX-2, xC)];
    }
    else if(pX % xC4 == xC4-2)
    {
      ringX[pX] = ringX[getPositionInCircularArray(pX+2, xC)] + ringPreX[pX+pAdj-1] + ringPreX[pX+pAdj-2] + ringX[pX-1];
    }
    else if(pX % xC4 == xC4-1)
    {
      ringX[pX] = ringX[getPositionInCircularArray(pX+1, xC)] + ringPreX[pX+pAdj-2] + ringX[pX-1];
    }
    else
    {
      ringX[pX] = ringPreX[pX+pAdj] + ringPreX[pX+pAdj-1] + ringPreX[getPositionInCircularArray(pX+pAdj-2, preXC)] + ringX[pX-1];
    }
    console.log(ringX[pX]);
    // Austrittsbedingung
    if(ringX[pX] > value)
    {
      return ringX[pX];
    }
  }
  return stresstestRek(x+1, xA+2, ringX, value);
}

function getPositionInCircularArray(p,l)
{
  // p: position
  // l: array length
  while(p < 0 || p >= l)
  {
    if(p < 0)
    {
      p += l;
    }
    if(p >= l)
    {
      p -= l;
    }
  }
  return p;
}
