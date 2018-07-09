
let view = {};


view.init = function() {


  view.legacyBreakupArray = new Array (4);
  view.DVXBreakupArray = new Array (4);

  view.threeYearLegacyTotalTCO = document.getElementById('tco_result_legacy_total');
  view.threeYearDVXTotalTCO = document.getElementById('tco_result_dvx_total');

  view.threeYearVsLegacyYear1 = document.getElementById("tco_result_legacy_dvx_year1");
  view.threeYearVsDVXYear1 = document.getElementById("tco_result_dvx_year1");
  view.threeYearVsLegacyYear2  = document.getElementById("tco_result_legacy_dvx_year2");
  view.threeYearVsDVXYear2  = document.getElementById("tco_result_dvx_year2");
  view.threeYearVsLegacyYear3  = document.getElementById("tco_result_legacy_dvx_year3");
  view.threeYearVsDVXYear3  = document.getElementById("tco_result_dvx_year3");

  view.threeYearLegacyBreakupCost = document.getElementsByClassName("legacy_cost_breakup");
  view.threeYearDVXBreakupCost = document.getElementsByClassName("DVX_cost_breakup");












  //  EXAMPLE TABLE:
  //   view.getTableRow04S1 = helpers.getTableRow04S1();
  //   view.getTableRow05S1 = helpers.getTableRow05S1();
  //   view.getTableRow06S1 = helpers.getTableRow06S1();
  //   view.getTableRow07S1 = helpers.getTableRow07S1();

};


// view.threeYearLegacyBreakup = function (){
//
//   let costsS1 = costs.costsS1,
//     costsS2 = costs.costsS2;
//
//   let cols = 4,
//     rows = 8;
//
//   for (let x = 0;x<cols;x++){
//     view.legacyBreakupArray[x] = new Array(rows);
//   }
//
//   for (let i = 0;i<cols;i++){
//     if(3 === i){
//       for (let j = 0; j < rows; j++){
//         view.legacyBreakupArray[i][j] = view.legacyBreakupArray[i-3][j] + view.legacyBreakupArray[i-2][j] + view.legacyBreakupArray[i-1][j];
//       }
//     } else {
//       view.legacyBreakupArray[i][0] = costsS1.compute[`year0${i+1}`] + costsS2.compute[`year0${i+1}`];
//       view.legacyBreakupArray[i][1] = costsS1.array[`year0${i+1}`] + costsS2.array[`year0${i+1}`];
//       view.legacyBreakupArray[i][2] = costsS1.backup[`year0${i+1}`] + costsS2.backup[`year0${i+1}`];
//       view.legacyBreakupArray[i][3] = costsS1.tape[`year0${i+1}`] + costsS2.tape[`year0${i+1}`];
//       view.legacyBreakupArray[i][4] = costsS1.networkTotal[`year0${i+1}`] + costsS2.networkTotal[`year0${i+1}`];
//       view.legacyBreakupArray[i][5] = costsS1.adminTotal[`year0${i+1}`] + costsS2.adminTotal[`year0${i+1}`];
//       view.legacyBreakupArray[i][6] = costsS1.spaceTotal[`year0${i+1}`] + costsS2.spaceTotal[`year0${i+1}`];
//       view.legacyBreakupArray[i][7] = costsS1.powerCoolingTotal[`year0${i+1}`] + costsS2.powerCoolingTotal[`year0${i+1}`];
//     }
//   }
//
//   console.log(`VIEW:  Legacy 3YR Cost Breackup:`);
//   console.log(view.legacyBreakupArray);
// };
//
//
// view.threeYearDVXBreakup = function () {
//
//   let costsS1 = costs.costsS1,
//     costsS2 = costs.costsS2;
//
//   let cols = 4,
//     rows = 8;
//
//   for (let x = 0;x<cols;x++){
//     view.DVXBreakupArray[x] = new Array(rows);
//   }
//
//   for (let i = 0;i<cols;i++){
//     if(3 === i){
//       for (let j = 0; j < rows; j++){
//         view.DVXBreakupArray[i][j] = view.DVXBreakupArray[i-3][j] + view.DVXBreakupArray[i-2][j] + view.DVXBreakupArray[i-1][j];
//       }
//     } else {
//       view.DVXBreakupArray[i][0] = costsS1.computeHostFlash[`year0${i+1}`] + costsS2.computeHostFlash[`year0${i+1}`];             //  <<<<<<   ALL THESE MUST BE ADJUSTED FOR DVX
//       view.DVXBreakupArray[i][1] = costsS1.swDVX[`year0${i+1}`] + costsS2.swDVX[`year0${i+1}`];
//       view.DVXBreakupArray[i][2] = costsS1.hwDVX[`year0${i+1}`] + costsS2.hwDVX[`year0${i+1}`];
//       view.DVXBreakupArray[i][3] = costsS1.cloudDVXInclOpex[`year0${i+1}`];
//       view.DVXBreakupArray[i][4] = costsS1.networkDVXCompute[`year0${i+1}`] + costsS2.networkDVXCompute[`year0${i+1}`];
//       view.DVXBreakupArray[i][5] = costsS1.adminDVXCompute[`year0${i+1}`] + costsS2.adminDVXCompute[`year0${i+1}`];
//       view.DVXBreakupArray[i][6] = costsS1.spaceDVXCompute[`year0${i+1}`] + costsS2.spaceDVXCompute[`year0${i+1}`];
//       view.DVXBreakupArray[i][7] = costsS1.powerCoolingDVXCompute[`year0${i+1}`] + costsS2.powerCoolingDVXCompute[`year0${i+1}`];
//     }
//   }
//
//   console.log('TEST XXX:');
//   console.log(costsS1.networkDVXCompute[`year01`]);
//   console.log(costsS2.networkDVXCompute[`year01`]);
//
//
//   console.log(`VIEW:  DVX 3YR Cost Breackup:`);
//   console.log(view.DVXBreakupArray);
//
// };


view.render = function() {

  // let siteCalcsS1 = model.getLocalStore('siteCalcsS1');

  let threeYearOverallTCO = outputData.threeYearTCO,
    threeYearVS = outputData.threeYearLegacyDVX,
    dataLegacyBreakupEls = view.threeYearLegacyBreakupCost,
    dataDVXBreakupEls = view.threeYearDVXBreakupCost;

  // 3 Year Overall TCO:
  view.threeYearLegacyTotalTCO.innerHTML = helpers.commaFormat(threeYearOverallTCO.legacy_total);
  view.threeYearDVXTotalTCO.innerHTML = helpers.commaFormat(threeYearOverallTCO.DVX_total);

  //  3 Year TCO Legacy vs DVX (Annual)
  view.threeYearVsLegacyYear1.innerHTML = helpers.commaFormat(threeYearVS.legacy_total.year01);
  view.threeYearVsDVXYear1.innerHTML = helpers.commaFormat(threeYearVS.DVX_total.year01);
  view.threeYearVsLegacyYear2.innerHTML = helpers.commaFormat(threeYearVS.legacy_total.year02);
  view.threeYearVsDVXYear2.innerHTML = helpers.commaFormat(threeYearVS.DVX_total.year02);
  view.threeYearVsLegacyYear3.innerHTML = helpers.commaFormat(threeYearVS.legacy_total.year03);
  view.threeYearVsDVXYear3.innerHTML = helpers.commaFormat(threeYearVS.DVX_total.year03);

  //  Legacy 3YR Cost Breakup:
  let z = 0;
  for (let i = 0; i < outputData.legacyBreakupArray.length; i++){
    let dataLegacy = outputData.legacyBreakupArray[i];
    for (let j = 0; j < dataLegacy.length; j++){
      dataLegacyBreakupEls[z].innerHTML = helpers.commaFormat(outputData.legacyBreakupArray[i][j]);
      z++;
    }
  }
  //  DVX 3YR Cost Breakup:
  let y = 0;
  for (let i = 0; i < outputData.DVXBreakupArray.length; i++){
    let dataDVX = outputData.DVXBreakupArray[i];
    for (let j = 0; j < dataDVX.length; j++){
      dataDVXBreakupEls[y].innerHTML = helpers.commaFormat(outputData.DVXBreakupArray[i][j]);
      y++;
    }
  }



  // helpers.siteCalcDataEntry(view.getTableRow04S1, siteCalcsS1.vMs);
  // helpers.siteCalcDataEntry(view.getTableRow05S1, siteCalcsS1.totalvCPUsRequired);
  // helpers.siteCalcDataEntry(view.getTableRow06S1, siteCalcsS1.totalRAMRequired);
  // helpers.siteCalcDataEntry(view.getTableRow07S1, siteCalcsS1.primaryEffectiveCapacityRequired);


};
