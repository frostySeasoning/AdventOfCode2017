// 355 for given input
function solve171()
{
  var buffer = [0];
  var steps = 314;
  var position = 0;
  for(let i = 1; i < 2018; i++)
  {
    position = ((position + steps) % i)+1;
    buffer.splice(position, 0, i);
  }
  return buffer[(buffer.indexOf(2017) + 1) % buffer.length];
}

// 6154117 for given input
function solve172()
{
  var buffer = new Array(50000000);
  buffer[0] = 0;
  var steps = 314;
  var position = 0;
  for(let i = 1; i < 50000001; i++)
  {
    position = ((position + steps) % i)+1;
    buffer[position]= i;
  }
  return buffer[(buffer.indexOf(0) + 1) % buffer.length];
}
