// 5305 for given input
function solve221()
{
  var grid_ArrArr = input22.split("\n").map(element => {return element.split("").map(element => {return element == "#";}); });
  var gridSize_Int = grid_ArrArr.length;
  var virusX_Int = Math.floor(gridSize_Int/2);
  var virusY_Int = virusX_Int;
  var virusMovingDirection_Int = 0;
  
  var infectionCount = 0;
  for(let i = 0; i < 10000; i++)
  {
    if(virusX_Int < 0 || virusX_Int >= gridSize_Int || virusY_Int < 0 || virusY_Int >= gridSize_Int)
    {
      grid_ArrArr = getExpandedGrid(grid_ArrArr, false);
      let newGridSize_Int = grid_ArrArr.length;
      virusX_Int += (newGridSize_Int - gridSize_Int) / 2;
      virusY_Int += (newGridSize_Int - gridSize_Int) / 2;
      gridSize_Int = newGridSize_Int;
    }
    virusMovingDirection_Int = grid_ArrArr[virusY_Int][virusX_Int] ? ((virusMovingDirection_Int + 1) % 4) : ((virusMovingDirection_Int + 3) % 4);
    if(!grid_ArrArr[virusY_Int][virusX_Int])
    {
      infectionCount++;
    }
    grid_ArrArr[virusY_Int][virusX_Int] = !grid_ArrArr[virusY_Int][virusX_Int];
    switch (virusMovingDirection_Int)
    {
      case 0:
        virusY_Int--;
        break;
      case 1:
        virusX_Int++;
        break;
      case 2:
        virusY_Int++;
        break;
      case 3:
        virusX_Int--;
        break;
    }
  }
  return infectionCount;
}

// 2511424 for given input
function solve222()
{
  var grid_ArrArr = input22.split("\n").map(element => {return element.split(""); });
  var gridSize_Int = grid_ArrArr.length;
  var virusX_Int = Math.floor(gridSize_Int/2);
  var virusY_Int = virusX_Int;
  var virusMovingDirection_Int = 0;
  
  var infectionCount = 0;
  for(let i = 0; i < 10000000; i++)
  {
    if(virusX_Int < 0 || virusX_Int >= gridSize_Int || virusY_Int < 0 || virusY_Int >= gridSize_Int)
    {
      grid_ArrArr = getExpandedGrid(grid_ArrArr, ".");
      let newGridSize_Int = grid_ArrArr.length;
      virusX_Int += (newGridSize_Int - gridSize_Int) / 2;
      virusY_Int += (newGridSize_Int - gridSize_Int) / 2;
      gridSize_Int = newGridSize_Int;
    }
    switch(grid_ArrArr[virusY_Int][virusX_Int])
    {
      case ".":
        virusMovingDirection_Int = ((virusMovingDirection_Int + 3) % 4);
        grid_ArrArr[virusY_Int][virusX_Int] = "W";
        break;
      case "W":
        infectionCount++;
        grid_ArrArr[virusY_Int][virusX_Int] = "#";
        break;
      case "#":
        virusMovingDirection_Int = ((virusMovingDirection_Int + 1) % 4);
        grid_ArrArr[virusY_Int][virusX_Int] = "F";
        break;
      case "F":
        virusMovingDirection_Int = ((virusMovingDirection_Int + 2) % 4);
        grid_ArrArr[virusY_Int][virusX_Int] = ".";
        break;
    }
    switch (virusMovingDirection_Int)
    {
      case 0:
        virusY_Int--;
        break;
      case 1:
        virusX_Int++;
        break;
      case 2:
        virusY_Int++;
        break;
      case 3:
        virusX_Int--;
        break;
    }
  }
  return infectionCount;
}

function getExpandedGrid(grid_ArrArr, newElement)
{
  var dSize_Int = 10;
  var newSize_Int = grid_ArrArr.length + 2 * dSize_Int;
  var expandedGrid_ArrArr = Array.from({length: newSize_Int}, e => Array.from({length: newSize_Int}, e => newElement));
  for(let i1 = 0, iLimit = grid_ArrArr.length; i1 < iLimit; i1++)
  {
    for(let i2 = 0; i2 < iLimit; i2++)
    {
      expandedGrid_ArrArr[dSize_Int+i1][dSize_Int+i2] = grid_ArrArr[i1][i2];
    }
  }
  return expandedGrid_ArrArr
}

var input22 = `...###.#.#.##...##.#..##.
.#...#..##.#.#..##.#.####
#..#.#...######.....#####
.###.#####.#...#.##.##...
.#.#.##......#....#.#.#..
....##.##.#..##.#...#....
#...###...#.###.#.#......
..#..#.....##..####..##.#
#...#..####.#####...#.##.
###.#.#..#..#...##.#..#..
.....##..###.##.#.....#..
#.....#...#.###.##.##...#
.#.##.##.##.#.#####.##...
##.#.###..#.####....#.#..
#.##.#...#.###.#.####..##
#.##..#..##..#.##.####.##
#.##.#....###.#.#......#.
.##..#.##..###.#..#...###
#..#.#.#####.....#.#.#...
.#####..###.#.#.##..#....
###..#..#..##...#.#.##...
..##....##.####.....#.#.#
..###.##...#..#.#####.###
####.########.#.#..##.#.#
#####.#..##...####.#..#..`;
