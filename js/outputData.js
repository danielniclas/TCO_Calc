
let outputData = {};

outputData.init = function () {

  outputData.legacyBreakupArray = new Array (4);
  outputData.DVXBreakupArray = new Array (4);

  let cols = 4, rows = 8;
  for (let x = 0;x<cols;x++){
    outputData.legacyBreakupArray[x] = new Array(rows);
  }

  for (let x = 0;x<cols;x++){
    outputData.DVXBreakupArray[x] = new Array(rows);
  }

  outputData.threeYearTCO = {
    legacy_total:0,
    DVX_total:0
  };

  outputData.threeYearLegacyDVX = {
    legacy_total:{},
    DVX_total: {}
  };

  outputData.threeYearCapexOpexTCO = {
    legacy_capex: {},
    legacy_opex: {},
    DVX_capex: {},
    DVX_opex: {}
  };







  // outputData.threeYearCostBreakupLegacy = {
  //   compute: {},
  //   array: {},
  //   backup: {},
  //   tape: {},
  //   network: {},
  //   administration: {},
  //   space: {},
  //   powerCooling: {}
  // };
  //
  // outputData.threeYearCostBreakupDVX = {
  //   computeFlash: {},
  //   hostSoftware: {},
  //   dataNode: {},
  //   cloudBackupDVX: {},
  //   network: {},
  //   administration: {},
  //   space: {},
  //   powerCooling: {}
  // };

  console.log('Output Level Data');
};

outputData.populateObjects = function (){

  let costsS1 = model.getLocalStore ('costsS1');
  let costsS2 = model.getLocalStore ('costsS2');

  outputData.threeYearCapexOpexTCO.legacy_capex.year01 = costsS1.totalCapexLegacy.year01 + costsS2.totalCapexLegacy.year01;
  outputData.threeYearCapexOpexTCO.legacy_capex.year02 = costsS1.totalCapexLegacy.year02 + costsS2.totalCapexLegacy.year02;
  outputData.threeYearCapexOpexTCO.legacy_capex.year03 = costsS1.totalCapexLegacy.year03 + costsS2.totalCapexLegacy.year03;

  outputData.threeYearCapexOpexTCO.legacy_opex.year01 = costsS1.totalOpexLegacy.year01 + costsS2.totalOpexLegacy.year01;
  outputData.threeYearCapexOpexTCO.legacy_opex.year02 = costsS1.totalOpexLegacy.year02 + costsS2.totalOpexLegacy.year02;
  outputData.threeYearCapexOpexTCO.legacy_opex.year03 = costsS1.totalOpexLegacy.year03 + costsS2.totalOpexLegacy.year03;

  outputData.threeYearCapexOpexTCO.DVX_capex.year01 = costsS1.totalCapexDVX.year01 + costsS2.totalCapexDVX.year01;
  outputData.threeYearCapexOpexTCO.DVX_capex.year02 = costsS1.totalCapexDVX.year02 + costsS2.totalCapexDVX.year02;
  outputData.threeYearCapexOpexTCO.DVX_capex.year03 = costsS1.totalCapexDVX.year03 + costsS2.totalCapexDVX.year03;

  outputData.threeYearCapexOpexTCO.DVX_opex.year01 = costsS1.totalOpexDVX.year01 + costsS2.totalOpexDVX.year01;
  outputData.threeYearCapexOpexTCO.DVX_opex.year02 = costsS1.totalOpexDVX.year02 + costsS2.totalOpexDVX.year02;
  outputData.threeYearCapexOpexTCO.DVX_opex.year03 = costsS1.totalOpexDVX.year03 + costsS2.totalOpexDVX.year03;

  outputData.threeYearLegacyDVX.legacy_total.year01 = outputData.threeYearCapexOpexTCO.legacy_capex.year01 + outputData.threeYearCapexOpexTCO.legacy_opex.year01;
  outputData.threeYearLegacyDVX.legacy_total.year02 = outputData.threeYearCapexOpexTCO.legacy_capex.year02 + outputData.threeYearCapexOpexTCO.legacy_opex.year02;
  outputData.threeYearLegacyDVX.legacy_total.year03 = outputData.threeYearCapexOpexTCO.legacy_capex.year03 + outputData.threeYearCapexOpexTCO.legacy_opex.year03;

  outputData.threeYearLegacyDVX.DVX_total.year01 = outputData.threeYearCapexOpexTCO.DVX_capex.year01 + outputData.threeYearCapexOpexTCO.DVX_opex.year01;
  outputData.threeYearLegacyDVX.DVX_total.year02 = outputData.threeYearCapexOpexTCO.DVX_capex.year02 + outputData.threeYearCapexOpexTCO.DVX_opex.year02;
  outputData.threeYearLegacyDVX.DVX_total.year03 = outputData.threeYearCapexOpexTCO.DVX_capex.year03 + outputData.threeYearCapexOpexTCO.DVX_opex.year03;

  outputData.threeYearTCO.legacy_total = outputData.threeYearLegacyDVX.legacy_total.year01 + outputData.threeYearLegacyDVX.legacy_total.year02 + outputData.threeYearLegacyDVX.legacy_total.year03;
  outputData.threeYearTCO.DVX_total = outputData.threeYearLegacyDVX.DVX_total.year01 + outputData.threeYearLegacyDVX.DVX_total.year02 + outputData.threeYearLegacyDVX.DVX_total.year03;

  // console.log('TEST');
  // console.log(costsS1.totalOpexDVX.year01);


  console.log('OUTPUT DATA - Three Year Capex Opex TCO:');
  console.log(outputData.threeYearCapexOpexTCO);
  model.updateLocalStore(outputData.threeYearCapexOpexTCO,'threeYearCapexOpexTCO');

  console.log('OUTPUT DATA - Three Year Legacy vs DVX:');
  console.log(outputData.threeYearLegacyDVX);
  model.updateLocalStore(outputData.threeYearLegacyDVX,'outputData.threeYearLegacyDVX');

  console.log('OUTPUT DATA - Three Year Overall TCO:');
  console.log(outputData.threeYearTCO);

};


outputData.threeYearLegacyBreakup = function (){

  let costsS1 = costs.costsS1,
    costsS2 = costs.costsS2;

  let cols = 4,
    rows = 8;
  //
  // for (let x = 0;x<cols;x++){
  //   outputData.legacyBreakupArray[x] = new Array(rows);
  // }

  for (let i = 0;i<cols;i++){
    if(3 === i){
      for (let j = 0; j < rows; j++){
        outputData.legacyBreakupArray[i][j] = outputData.legacyBreakupArray[i-3][j] + outputData.legacyBreakupArray[i-2][j] + outputData.legacyBreakupArray[i-1][j];
      }
    } else {
      outputData.legacyBreakupArray[i][0] = costsS1.compute[`year0${i+1}`] + costsS2.compute[`year0${i+1}`];
      outputData.legacyBreakupArray[i][1] = costsS1.array[`year0${i+1}`] + costsS2.array[`year0${i+1}`];
      outputData.legacyBreakupArray[i][2] = costsS1.backup[`year0${i+1}`] + costsS2.backup[`year0${i+1}`];
      outputData.legacyBreakupArray[i][3] = costsS1.tape[`year0${i+1}`] + costsS2.tape[`year0${i+1}`];
      outputData.legacyBreakupArray[i][4] = costsS1.networkTotal[`year0${i+1}`] + costsS2.networkTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][5] = costsS1.adminTotal[`year0${i+1}`] + costsS2.adminTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][6] = costsS1.spaceTotal[`year0${i+1}`] + costsS2.spaceTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][7] = costsS1.powerCoolingTotal[`year0${i+1}`] + costsS2.powerCoolingTotal[`year0${i+1}`];
    }
  }

  console.log(`OUTPUT DATA - Legacy 3YR Cost Breackup:`);
  console.log(outputData.legacyBreakupArray);
};

outputData.threeYearDVXBreakup = function () {

  let costsS1 = costs.costsS1,
    costsS2 = costs.costsS2;

  let cols = 4,
    rows = 8;
  //
  // for (let x = 0;x<cols;x++){
  //   outputData.DVXBreakupArray[x] = new Array(rows);
  // }

  for (let i = 0;i<cols;i++){
    if(3 === i){
      for (let j = 0; j < rows; j++){
        outputData.DVXBreakupArray[i][j] = outputData.DVXBreakupArray[i-3][j] + outputData.DVXBreakupArray[i-2][j] + outputData.DVXBreakupArray[i-1][j];
      }
    } else {
      outputData.DVXBreakupArray[i][0] = costsS1.computeHostFlash[`year0${i+1}`] + costsS2.computeHostFlash[`year0${i+1}`];             //  <<<<<<   ALL THESE MUST BE ADJUSTED FOR DVX
      outputData.DVXBreakupArray[i][1] = costsS1.swDVX[`year0${i+1}`] + costsS2.swDVX[`year0${i+1}`];
      outputData.DVXBreakupArray[i][2] = costsS1.hwDVX[`year0${i+1}`] + costsS2.hwDVX[`year0${i+1}`];
      outputData.DVXBreakupArray[i][3] = costsS1.cloudDVXInclOpex[`year0${i+1}`];
      outputData.DVXBreakupArray[i][4] = costsS1.networkDVXCompute[`year0${i+1}`] + costsS2.networkDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][5] = costsS1.adminDVXCompute[`year0${i+1}`] + costsS2.adminDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][6] = costsS1.spaceDVXCompute[`year0${i+1}`] + costsS2.spaceDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][7] = costsS1.powerCoolingDVXCompute[`year0${i+1}`] + costsS2.powerCoolingDVXCompute[`year0${i+1}`];
    }
  }

  console.log(`OUTPUT DATA:  DVX 3YR Cost Breackup:`);
  console.log(outputData.DVXBreakupArray);

};