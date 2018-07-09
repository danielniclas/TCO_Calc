
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


};




view.render = function() {

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

};
