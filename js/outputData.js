
let outputData = {};

outputData.init = function () {

  outputData.legacyBreakupArray = new Array (4);
  outputData.DVXBreakupArray = new Array (4);

  outputData.cols = 4;
  outputData.rows = 8;

  for (let x = 0;x<outputData.cols;x++){
    outputData.legacyBreakupArray[x] = new Array(outputData.rows);
  }

  for (let x = 0;x<outputData.cols;x++){
    outputData.DVXBreakupArray[x] = new Array(outputData.rows);
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

  console.log('Output Level Data');
};

outputData.getData = function () {

  outputData.costsS1 = costs.costsS1;
  outputData.costsS2 = costs.costsS2;

};

outputData.populateObjects = function (){


  outputData.threeYearCapexOpexTCO.legacy_capex.year01 = outputData.costsS1.totalCapexLegacy.year01 + outputData.costsS2.totalCapexLegacy.year01;
  outputData.threeYearCapexOpexTCO.legacy_capex.year02 = outputData.costsS1.totalCapexLegacy.year02 + outputData.costsS2.totalCapexLegacy.year02;
  outputData.threeYearCapexOpexTCO.legacy_capex.year03 = outputData.costsS1.totalCapexLegacy.year03 + outputData.costsS2.totalCapexLegacy.year03;

  outputData.threeYearCapexOpexTCO.legacy_opex.year01 = outputData.costsS1.totalOpexLegacy.year01 + outputData.costsS2.totalOpexLegacy.year01;
  outputData.threeYearCapexOpexTCO.legacy_opex.year02 = outputData.costsS1.totalOpexLegacy.year02 + outputData.costsS2.totalOpexLegacy.year02;
  outputData.threeYearCapexOpexTCO.legacy_opex.year03 = outputData.costsS1.totalOpexLegacy.year03 + outputData.costsS2.totalOpexLegacy.year03;

  outputData.threeYearCapexOpexTCO.DVX_capex.year01 = outputData.costsS1.totalCapexDVX.year01 + outputData.costsS2.totalCapexDVX.year01;
  outputData.threeYearCapexOpexTCO.DVX_capex.year02 = outputData.costsS1.totalCapexDVX.year02 + outputData.costsS2.totalCapexDVX.year02;
  outputData.threeYearCapexOpexTCO.DVX_capex.year03 = outputData.costsS1.totalCapexDVX.year03 + outputData.costsS2.totalCapexDVX.year03;

  outputData.threeYearCapexOpexTCO.DVX_opex.year01 = outputData.costsS1.totalOpexDVX.year01 + outputData.costsS2.totalOpexDVX.year01;
  outputData.threeYearCapexOpexTCO.DVX_opex.year02 = outputData.costsS1.totalOpexDVX.year02 + outputData.costsS2.totalOpexDVX.year02;
  outputData.threeYearCapexOpexTCO.DVX_opex.year03 = outputData.costsS1.totalOpexDVX.year03 + outputData.costsS2.totalOpexDVX.year03;

  outputData.threeYearLegacyDVX.legacy_total.year01 = outputData.threeYearCapexOpexTCO.legacy_capex.year01 + outputData.threeYearCapexOpexTCO.legacy_opex.year01;
  outputData.threeYearLegacyDVX.legacy_total.year02 = outputData.threeYearCapexOpexTCO.legacy_capex.year02 + outputData.threeYearCapexOpexTCO.legacy_opex.year02;
  outputData.threeYearLegacyDVX.legacy_total.year03 = outputData.threeYearCapexOpexTCO.legacy_capex.year03 + outputData.threeYearCapexOpexTCO.legacy_opex.year03;

  outputData.threeYearLegacyDVX.DVX_total.year01 = outputData.threeYearCapexOpexTCO.DVX_capex.year01 + outputData.threeYearCapexOpexTCO.DVX_opex.year01;
  outputData.threeYearLegacyDVX.DVX_total.year02 = outputData.threeYearCapexOpexTCO.DVX_capex.year02 + outputData.threeYearCapexOpexTCO.DVX_opex.year02;
  outputData.threeYearLegacyDVX.DVX_total.year03 = outputData.threeYearCapexOpexTCO.DVX_capex.year03 + outputData.threeYearCapexOpexTCO.DVX_opex.year03;

  outputData.threeYearTCO.legacy_total = outputData.threeYearLegacyDVX.legacy_total.year01 + outputData.threeYearLegacyDVX.legacy_total.year02 + outputData.threeYearLegacyDVX.legacy_total.year03;
  outputData.threeYearTCO.DVX_total = outputData.threeYearLegacyDVX.DVX_total.year01 + outputData.threeYearLegacyDVX.DVX_total.year02 + outputData.threeYearLegacyDVX.DVX_total.year03;

  // console.log('TEST');
  // console.log(outputData.totalOpexDVX.year01);


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

  for (let i = 0;i<outputData.cols;i++){
    if(3 === i){
      for (let j = 0; j < outputData.rows; j++){
        outputData.legacyBreakupArray[i][j] = outputData.legacyBreakupArray[i-3][j] + outputData.legacyBreakupArray[i-2][j] + outputData.legacyBreakupArray[i-1][j];
      }
    } else {
      outputData.legacyBreakupArray[i][0] = outputData.costsS1.compute[`year0${i+1}`] + outputData.costsS2.compute[`year0${i+1}`];
      outputData.legacyBreakupArray[i][1] = outputData.costsS1.array[`year0${i+1}`] + outputData.costsS2.array[`year0${i+1}`];
      outputData.legacyBreakupArray[i][2] = outputData.costsS1.backup[`year0${i+1}`] + outputData.costsS2.backup[`year0${i+1}`];
      outputData.legacyBreakupArray[i][3] = outputData.costsS1.tape[`year0${i+1}`] + outputData.costsS2.tape[`year0${i+1}`];
      outputData.legacyBreakupArray[i][4] = outputData.costsS1.networkTotal[`year0${i+1}`] + outputData.costsS2.networkTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][5] = outputData.costsS1.adminTotal[`year0${i+1}`] + outputData.costsS2.adminTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][6] = outputData.costsS1.spaceTotal[`year0${i+1}`] + outputData.costsS2.spaceTotal[`year0${i+1}`];
      outputData.legacyBreakupArray[i][7] = outputData.costsS1.powerCoolingTotal[`year0${i+1}`] + outputData.costsS2.powerCoolingTotal[`year0${i+1}`];
    }
  }

  console.log(`OUTPUT DATA - Legacy 3YR Cost Breackup:`);
  console.log(outputData.legacyBreakupArray);
};

outputData.threeYearDVXBreakup = function () {

  for (let i = 0;i<outputData.cols;i++){
    if(3 === i){
      for (let j = 0; j < outputData.rows; j++){
        outputData.DVXBreakupArray[i][j] = outputData.DVXBreakupArray[i-3][j] + outputData.DVXBreakupArray[i-2][j] + outputData.DVXBreakupArray[i-1][j];
      }
    } else {
      outputData.DVXBreakupArray[i][0] = outputData.costsS1.computeHostFlash[`year0${i+1}`] + outputData.costsS2.computeHostFlash[`year0${i+1}`];
      outputData.DVXBreakupArray[i][1] = outputData.costsS1.swDVX[`year0${i+1}`] + outputData.costsS2.swDVX[`year0${i+1}`];
      outputData.DVXBreakupArray[i][2] = outputData.costsS1.hwDVX[`year0${i+1}`] + outputData.costsS2.hwDVX[`year0${i+1}`];
      outputData.DVXBreakupArray[i][3] = outputData.costsS1.cloudDVXInclOpex[`year0${i+1}`];
      outputData.DVXBreakupArray[i][4] = outputData.costsS1.networkDVXCompute[`year0${i+1}`] + outputData.costsS2.networkDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][5] = outputData.costsS1.adminDVXCompute[`year0${i+1}`] + outputData.costsS2.adminDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][6] = outputData.costsS1.spaceDVXCompute[`year0${i+1}`] + outputData.costsS2.spaceDVXCompute[`year0${i+1}`];
      outputData.DVXBreakupArray[i][7] = outputData.costsS1.powerCoolingDVXCompute[`year0${i+1}`] + outputData.costsS2.powerCoolingDVXCompute[`year0${i+1}`];
    }
  }

  console.log(`OUTPUT DATA:  DVX 3YR Cost Breackup:`);
  console.log(outputData.DVXBreakupArray);

};