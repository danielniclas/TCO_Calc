
let assert = {};

assert.init = function (){

  assert.backupGreenBoxObject = {
    site01:{year01: 178746, year02: 208740, year03: 238736},
    site02:{year01: 0, year02: 0, year03: 0}
  };

  assert.cloudGreenBoxObject = {
    tpcsAWS: {year01:1234245.8333333335, year02: 1435041.666666667, year03:1633041.666666669, year04:1831041.666666669, year05:2029041.6666666693},
    tlcsAWS: {year01:4936983.333333334, year02: 5740166.666666668, year03:6532166.666666676, year04:7324166.666666676, year05:8116166.666666677},
    tsC: {year01:670919.6650312501, year02: 1257893.6944125, year03:1443214.4399125006, year04:1628535.1854125005, year05:1813855.9309125005},
    tAWSoC: {year01:239919.66503125, year02: 449643.69441250013, year03:516214.43991250056, year04:582785.1854125008, year05:649355.9309125008},
    tcDVXoC: {year01:431000, year02: 808250, year03:927000, year04:1045750, year05:1164500},
    ltS: {year01:0.13589668421632306, year02: 0.21913888001146883, year03:0.22093962287844746, year04:0.2223509184770734, year05:0.22348677712128034},
    lAWS: {year01:0.048596409757223534, year02: 0.07833286392598938, year03:0.07902652615199139, year04:0.07957016981397201, year05:0.08000771270252788}
  };

  assert.tapeGreenBoxObject = {
    bcEOY_S1: {year01: 305833.3333333334, year02: 335833.3333333334, year03:365833.3333333334},
    tcEOY_S1: {year01: 3325000.0000000005, year02: 3925000.000000001, year03: 4525000.000000001},
    bcEOY_S2: {year01: 0, year02: 0, year03: 0},
    tcEOY_S2: {year01: 0, year02: 0, year03: 0}
  };

  assert.siteCalcChecksObject = {
    dollarPerComputeNode:{year01:32532,year02:32052,year03:32052},
    vmPerComputeNode:{year01:125,year02:120,year03:120},
    ramPerComputeNode:{year01:500,year02:480,year03:480},
    flashPerComputeNode:{year01:16320,year02:15360,year03:15360}
  }
};


assert.objectsEqual = function(actual, expected, testName){
  actual = JSON.stringify(actual);
  expected = JSON.stringify(expected);
  if(actual === expected) {
    console.log(`PASSED [${testName}]`);
  } else {
    console.log(`FAILED [${testName}] expected '${expected}', but got '${actual}'`)
  }
};