
/**
 * The main app object.
 *
 */
let datriumTCO = {};


/**
 * Initializes the datriumTCO app > manages data flow
 *
 */
datriumTCO.init = function() {

  assumptions.init();
  model.init();
  backup.init();
  cloud.init();
  tape.init();
  site.init();
  costs.init();
  outputData.init();
  view.init();

  assert.init();

  helpers.addFormListeners();

  console.log('>> App Initialized');

};


datriumTCO.functionManager = function (){

  console.time('FunctionManager');

  assumptions.collectData();

  model.updateUserInputs('userInputBasic', 'S1');         //  1. Input type (basic or advanced)  2. S1 or S2
  model.updateUserInputs('userInputAdvanced', 'S1');      //  1. Input type (basic or advanced)  2. S1 or S2
  model.updateUserInputs('userInputBasic', 'S2');         //  1. Input type (basic or advanced)  2. S1 or S2
  model.updateUserInputs('userInputAdvanced', 'S2');      //  1. Input type (basic or advanced)  2. S1 or S2

  backup.DVX_Backup_Calculations_Customer_Inputs();
  backup.backupMonthlyCapacityGrowthBreakdownSite01();
  backup.backupMonthlyCapacityGrowthBreakdownSite02();
  backup.backupOutput();

  cloud.DVX_cloud_Calculations_Customer_Inputs();
  cloud.cloudDVXMonthlyCapacityGrowthBreakdown();
  cloud.cloudDVXMonthlyCostBreakdown();
  cloud.cloudCostOutput();

  tape.tape_Customer_Inputs();
  tape.tapeMonthlyCapacityGrowthBreakdownSite01();
  tape.tapeBackupMonthlyCapacityGrowthBreakdownSite01();
  tape.tapeMonthlyCapacityGrowthBreakdownSite02();
  tape.tapeBackupMonthlyCapacityGrowthBreakdownSite02();
  tape.tapeBackupOutput();

  site.siteResourcesAll();

  costs.outputLevel_02_CostsAll();

  outputData.populateObjects();
  outputData.threeYearLegacyBreakup();
  outputData.threeYearDVXBreakup();

  view.render();

  console.timeEnd('FunctionManager');
};


datriumTCO.assertionTests = function(){

  let siteCalcsChecksActual = {dollarPerComputeNode: {}, vmPerComputeNode: {}, ramPerComputeNode: {}, flashPerComputeNode: {}};


  let backupOutput = model.getLocalStore('backupOutputObject');       //  Backup Output - GREEN BOX
  assert.objectsEqual(backupOutput, assert.backupGreenBoxObject, 'BACKUP - Backup Output > GREEN BOX');  //  (1.  actual  2.  expected)

  let cloudOutput = model.getLocalStore('cloudOutputObject');   //  Cloud Output - GREEN BOX
  assert.objectsEqual(cloudOutput, assert.cloudGreenBoxObject, 'CLOUD - Cloud Output > GREEN BOX');

  let tapeOutput = model.getLocalStore('tapeOutputObject');   //    Tape Output - GREEN BOX
  assert.objectsEqual(tapeOutput, assert.tapeGreenBoxObject, 'TAPE - Tape Output > GREEN BOX');

  let siteCalcsS1 = model.getLocalStore('siteCalcsS1');   //    Site Calcs Output - Bottom of SpreadSheet
  siteCalcsChecksActual.dollarPerComputeNode.year01 = siteCalcsS1.dollarPerComputeNode.year01;
  siteCalcsChecksActual.dollarPerComputeNode.year02 = siteCalcsS1.dollarPerComputeNode.year02;
  siteCalcsChecksActual.dollarPerComputeNode.year03 = siteCalcsS1.dollarPerComputeNode.year03;

  siteCalcsChecksActual.vmPerComputeNode.year01 = siteCalcsS1.vmPerComputeNode.year01;
  siteCalcsChecksActual.vmPerComputeNode.year02 = siteCalcsS1.vmPerComputeNode.year02;
  siteCalcsChecksActual.vmPerComputeNode.year03 = siteCalcsS1.vmPerComputeNode.year03;

  siteCalcsChecksActual.ramPerComputeNode.year01 = siteCalcsS1.ramPerComputeNode.year01;
  siteCalcsChecksActual.ramPerComputeNode.year02 = siteCalcsS1.ramPerComputeNode.year02;
  siteCalcsChecksActual.ramPerComputeNode.year03 = siteCalcsS1.ramPerComputeNode.year03;

  siteCalcsChecksActual.flashPerComputeNode.year01 = siteCalcsS1.flashPerComputeNode.year01;
  siteCalcsChecksActual.flashPerComputeNode.year02 = siteCalcsS1.flashPerComputeNode.year02;
  siteCalcsChecksActual.flashPerComputeNode.year03 = siteCalcsS1.flashPerComputeNode.year03;
  assert.objectsEqual(siteCalcsChecksActual, assert.siteCalcChecksObject, 'SITE CALCS - Calculations > CHECKS'); //  (1.  actual  2.  expected)


};


datriumTCO.init();


// End.