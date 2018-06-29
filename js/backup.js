

let backup = {};

backup.init = function() {

  backup.backupCustInputsS1 = {};                      //  Backup - Customer Inputs Site 1  {BLUE BOX}
  backup.backupCustInputsS2 = {};                      //  Backup - Customer Inputs Site 2  {BLUE BOX}

  backup.growthArrayMonths = 36;
  backup.growthArray01 = new Array(backup.growthArrayMonths);   //  Backup - [RED BOX] #1
  backup.growthArray02 = new Array(backup.growthArrayMonths);   //  Backup - [RED BOX] #2

  backup.outputObject = {site01:{},site02:{}};         //  Backup Output {GREEN BOX}


  backup.numberFullBackupsPerMonth = 0;
  backup.numberIncrementalBackupsPerMonth = 30;

  backup.B21 = 0;
  backup.B22 = 0;
  backup.B33 = 0;
  backup.B34 = 0;

};


/**
 * Updates local storage with Backup Customer Inputs (Blue Box):
 *
 */
backup.DVX_Backup_Calculations_Customer_Inputs = function (){       //  Customer Inputs Site 1  (Blue Box  S1 and S2)

  let basicDataS1 = model.getLocalStore ('userInputBasicS1'),              //  Get Basic User Inputs S1
      basicDataS2 = model.getLocalStore ('userInputBasicS2');

  //  Site 01
  backup.backupCustInputsS1.totalLogicalCapacityPerSource = Number(basicDataS1.num_vms) * Number(basicDataS1.disk_vm);
  backup.backupCustInputsS1.annualDataGrowthRate = basicDataS1.proj_vm_growth;
  backup.backupCustInputsS1.backupDataReductionRatio = Number(basicDataS1.backup_data_reduction);
  backup.backupCustInputsS1.logicalChangeRate = basicDataS1.daily_change_rate;
  backup.backupCustInputsS1.retentionPeriodBackup = Number(basicDataS1.backup_exp_sched);

  console.log('BACKUP Customer Inputs Site 1:');
  console.log(backup.backupCustInputsS1);                                     //  {Backup - Customer Inputs Site 1}  (BLUE BOX)
  model.updateLocalStore(backup.backupCustInputsS1,'backupCustInputsS1');     //  {Backup - Customer Inputs Site 1} to LOCAL STORAGE

  //  Site 02
  backup.backupCustInputsS2.totalLogicalCapacityPerSource = Number(basicDataS2.num_vms) * Number(basicDataS1.disk_vm);
  backup.backupCustInputsS2.annualDataGrowthRate = basicDataS2.proj_vm_growth;
  backup.backupCustInputsS2.backupDataReductionRatio = Number(basicDataS2.backup_data_reduction);
  backup.backupCustInputsS2.logicalChangeRate = basicDataS2.daily_change_rate;
  backup.backupCustInputsS2.retentionPeriodBackup = Number(basicDataS2.backup_exp_sched);

  console.log('BACKUP Customer Inputs Site 2:');
  console.log(backup.backupCustInputsS2);                                     //  {Backup - Customer Inputs Site 2}  (BLUE BOX)
  model.updateLocalStore(backup.backupCustInputsS2,'backupCustInputsS2');     //  {Backup - Customer Inputs Site 2} to LOCAL STORAGE

};



/**
 * Updates local storage with Backup Monthly Capacity Growth Breakdown Site 1 (Red Box):
 *
 */
backup.backupMonthlyCapacityGrowthBreakdownSite01 = function() {       //  <<  Generate RED BOX #1

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow19 = [],
    dataS1 = model.getLocalStore ('backupCustInputsS1');  //  Get Blue Box

  for (;x<backup.growthArrayMonths;x++){
    backup.growthArray01[x] = new Array(10)
  }

  for (;i<backup.growthArrayMonths;i++){

    backup.growthArray01[i][0] = month++;
    backup.growthArray01[i][1] = backup.numberFullBackupsPerMonth;
    backup.growthArray01[i][2] = backup.numberIncrementalBackupsPerMonth;
    backup.growthArray01[i][3] =  Number(parseInt((dataS1.totalLogicalCapacityPerSource/dataS1.backupDataReductionRatio)*(helpers.percentToNumber(dataS1.annualDataGrowthRate)/12)));
    if(0 === i){backup.growthArray01[i][4] = (dataS1.totalLogicalCapacityPerSource/dataS1.backupDataReductionRatio)+backup.growthArray01[i][3];
      } else {backup.growthArray01[i][4] = backup.growthArray01[i-1][4] + backup.growthArray01[i][3]}
    if(!isFinite(backup.growthArray01[i][3]/backup.growthArray01[i][1])) {
      backup.growthArray01[i][5] = 0
      } else {backup.growthArray01[i][5] = backup.growthArray01[i][3]/backup.growthArray01[i][1]}
    backup.growthArray01[i][6] = Math.round(backup.growthArray01[i][4]*(helpers.percentToNumber(dataS1.logicalChangeRate))*backup.growthArray01[i][2]);
    backup.growthArray01[i][7] = backup.growthArray01[i][6] + backup.growthArray01[i][5];

  }

  backup.growthArray01.forEach((element, index, array) => {     //  Build Table Row 19 Array
      tableRow19.push(element[6])
    });

  for (;j<backup.growthArrayMonths;j++){

    if(0 === j){
      if(0 === backup.B21){
        backup.growthArray01[j][8] = ((dataS1.retentionPeriodBackup/30)-backup.growthArray01[j][0] <= 0) ? backup.growthArray01[0][6]:0;
      } else {
        backup.growthArray01[j][8] = tableRow19[(tableRow19.findIndex(value => value === backup.B21) + 1)];
      }
    } else if (j > 0){
      if(0 === backup.growthArray01[j-1][8]){
        backup.growthArray01[j][8] = ((dataS1.retentionPeriodBackup/30)-backup.growthArray01[j][0] <= 0) ? backup.growthArray01[0][6]:0;
      } else {
        backup.growthArray01[j][8] = tableRow19[(tableRow19.findIndex(value => value === backup.growthArray01[j-1][8]) + 1)];
      }
    }
    if (0 === j){
      backup.growthArray01[j][9] = backup.growthArray01[j][7]-backup.growthArray01[j][8]+backup.B22;
    } else {
      backup.growthArray01[j][9] = backup.growthArray01[j][7]-backup.growthArray01[j][8]+backup.growthArray01[j-1][9];
    }

  }
  console.log('BACKUP Growth Array (RED BOX #1) S1:');
  console.log(backup.growthArray01);                                    //  Backup Monthly Capacity Growth Breakdown Site 1 (RED BOX #1)
  model.updateLocalStore(backup.growthArray01,'backupGrowthArray01');

};

backup.backupMonthlyCapacityGrowthBreakdownSite02 = function() {       //  <<  Generate RED BOX #1

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow31 = [],
    dataS2 = model.getLocalStore ('backupCustInputsS2');  //  Get Blue Box

  for (;x<backup.growthArrayMonths;x++){
    backup.growthArray02[x] = new Array(10)
  }

  for (;i<backup.growthArrayMonths;i++){

    backup.growthArray02[i][0] = month++;
    backup.growthArray02[i][1] = backup.numberFullBackupsPerMonth;
    backup.growthArray02[i][2] = backup.numberIncrementalBackupsPerMonth;
    backup.growthArray02[i][3] =  Number(parseInt((dataS2.totalLogicalCapacityPerSource/dataS2.backupDataReductionRatio)*(helpers.percentToNumber(dataS2.annualDataGrowthRate)/12)));
    if(0 === i){backup.growthArray02[i][4] = (dataS2.totalLogicalCapacityPerSource/dataS2.backupDataReductionRatio)+backup.growthArray02[i][3];
    } else {backup.growthArray02[i][4] = backup.growthArray02[i-1][4] + backup.growthArray02[i][3]}
    if(!isFinite(backup.growthArray02[i][3]/backup.growthArray02[i][1])) {
      backup.growthArray02[i][5] = 0
    } else {backup.growthArray02[i][5] = backup.growthArray02[i][3]/backup.growthArray02[i][1]}
    backup.growthArray02[i][6] = Math.round(backup.growthArray02[i][4]*(helpers.percentToNumber(dataS2.logicalChangeRate))*backup.growthArray02[i][2]);
    backup.growthArray02[i][7] = backup.growthArray02[i][6] + backup.growthArray02[i][5];

  }

  backup.growthArray02.forEach((element, index, array) => {     //  Build Table Row 31 Array
    tableRow31.push(element[6])
  });

  for (;j<backup.growthArrayMonths;j++){

    if(0 === j){
      if(0 === backup.B33){
        backup.growthArray02[j][8] = ((dataS2.retentionPeriodBackup/30)-backup.growthArray02[j][0] <= 0) ? backup.growthArray02[0][6]:0;
      } else {
        backup.growthArray02[j][8] = tableRow31[(tableRow31.findIndex(value => value === backup.B33) + 1)];
      }
    } else if (j > 0){
      if(0 === backup.growthArray02[j-1][8]){
        backup.growthArray02[j][8] = ((dataS2.retentionPeriodBackup/30)-backup.growthArray02[j][0] <= 0) ? backup.growthArray02[0][6]:0;
      } else {
        backup.growthArray02[j][8] = tableRow31[(tableRow31.findIndex(value => value === backup.growthArray02[j-1][8]) + 1)];
      }
    }
    if (0 === j){
      backup.growthArray02[j][9] = backup.growthArray02[j][7]-backup.growthArray02[j][8]+backup.B34;
    } else {
      backup.growthArray02[j][9] = backup.growthArray02[j][7]-backup.growthArray02[j][8]+backup.growthArray02[j-1][9];
    }

  }
  console.log('BACKUP Growth Array (RED BOX #2) S2:');
  console.log(backup.growthArray02);                                      //  Backup Monthly Capacity Growth Breakdown Site 1 (RED BOX #2)
  model.updateLocalStore(backup.growthArray02,'backupGrowthArray02');

};



  backup.backupOutput = function () {

    let growthArray01 = model.getLocalStore ('backupGrowthArray01');

    backup.outputObject.site01['year01'] = growthArray01[11][9];
    backup.outputObject.site01['year02'] = growthArray01[23][9];
    backup.outputObject.site01['year03'] = growthArray01[35][9];

    console.log('BACKUP Output Object (GREEN BOX):');
    console.log(backup.outputObject);                                         //  Backup Output (GREEN BOX)
    model.updateLocalStore(backup.outputObject,'backup_output');

  };








