
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
  view.init();

  helpers.addFormListeners();

};


datriumTCO.functionManager = function (){

  assumptions.collectData();

  model.updateUserInputs('userInputBasic', 'S1');         //  1. input type (basic or advanced)  2. Primary or Secondary Site
  model.updateUserInputs('userInputAdvanced', 'S1');      //  1. input type (basic or advanced)  2. Primary or Secondary Site
  model.updateUserInputs('userInputBasic', 'S2');         //  1. input type (basic or advanced)  2. Primary or Secondary Site
  model.updateUserInputs('userInputAdvanced', 'S2');      //  1. input type (basic or advanced)  2. Primary or Secondary Site

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

  site.resourcesRequired();




};


datriumTCO.init();


// End..