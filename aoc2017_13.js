function isScannerAtTop(time_Int, scannerRange_Int)
{
  return ( (time_Int % (scannerRange_Int * 2 - 2)) == 0 );
}

function getFirewall_Arr_IntInt(input_Str)
{
  return input_Str.split("\n").map(item => {
    var values = item.split(": ");
    values[0] = parseInt(values[0]);
    values[1] = parseInt(values[1]);
    return values;
  });
}

// 632 for given input
function solve131()
{
  var firewall_Arr_IntInt = getFirewall_Arr_IntInt(input);
  var severity_Int = 0;
  var firewallLength_Int = firewall_Arr_IntInt.length;
  for(let i = 0; i < firewallLength_Int; i++)
  {
    if(isScannerAtTop(firewall_Arr_IntInt[i][0], firewall_Arr_IntInt[i][1]))
    {
      severity_Int += firewall_Arr_IntInt[i][0] * firewall_Arr_IntInt[i][1];
    }
  }
  return severity_Int;
}

// 3849742 for given input
function solve132()
{
  var firewall_Arr_IntInt = getFirewall_Arr_IntInt(input);
  var firewallLength_Int = firewall_Arr_IntInt.length;
  var delay_Int = 0;
  while(true)
  {
    let caught_bool = false;
    for(let i = 0; i < firewallLength_Int; i++)
    {
      if( isScannerAtTop((firewall_Arr_IntInt[i][0] + delay_Int), firewall_Arr_IntInt[i][1]) )
      {
        caught_bool = true;
        break;
      }
    }
    if(!caught_bool)
    {
      return delay_Int;
    }
    delay_Int++;
  }
  return -1;
}

var input = "0: 3\n1: 2\n2: 6\n4: 4\n6: 4\n8: 8\n10: 9\n12: 8\n14: 5\n16: 6\n18: 8\n20: 6\n22: 12\n24: 6\n26: 12\n28: 8\n30: 8\n32: 10\n34: 12\n36: 12\n38: 8\n40: 12\n42: 12\n44: 14\n46: 12\n48: 14\n50: 12\n52: 12\n54: 12\n56: 10\n58: 14\n60: 14\n62: 14\n64: 14\n66: 17\n68: 14\n72: 14\n76: 14\n80: 14\n82: 14\n88: 18\n92: 14\n98: 18";

