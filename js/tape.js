

let tape = {};

tape.init = function() {

  tape.custTapeInputsS1 = {};           //  tape - Customer Tape Inputs Site 1  {BLUE BOX}
  tape.custTapeInputsS2 = {};           //  tape - Customer Tape Inputs Site 2  {BLUE BOX}
  
  tape.outputObject = {               //  tape Backup Output {GREEN BOX}
    bcEOY_S1: {},
    tcEOY_S1: {},
    bcEOY_S2: {},
    tcEOY_S2: {}
  };

  tape.growthArrayMonths = 60;

  tape.backupCapacityArrayS1 = new Array(tape.growthArrayMonths);   //  Backup Monthly Capacity Growth Breakdown Site 1 [RED BOX]
  tape.tapeCapacityArrayS1 = new Array(tape.growthArrayMonths);     //  Tape Backup Monthly Capacity Growth Breakdown Site 1 [RED BOX]
  tape.backupCapacityArrayS2 = new Array(tape.growthArrayMonths);   //  Backup Monthly Capacity Growth Breakdown Site 2 [RED BOX]
  tape.tapeCapacityArrayS2 = new Array(tape.growthArrayMonths);     //  Tape Backup Monthly Capacity Growth Breakdown Site 2 [RED BOX]

  tape.B27 = 0;
  tape.B28 = 0;
  tape.B39 = 0;
  tape.B40 = 0;
  tape.B51 = 0;
  tape.B52 = 0;
  tape.B63 = 0;
  tape.B64 = 0;

};


/**
 * Updates local storage with tape Customer Inputs (Blue Box):
 *
 */
tape.tape_Customer_Inputs = function (){       //  Customer Backup Inputs Site 1 and Site 2  (BLUE BOX)

  let basicDataS1 = model.getLocalStore ('userInputBasicS1'),               //  Get Basic User Inputs S1
    basicDataS2 = model.getLocalStore ('userInputBasicS2');               //  Get Basic User Inputs S2

  // 'Customer Tape Inputs' Site 1 Data:

  tape.custTapeInputsS1.tapeDataReduction =basicDataS1.tape_data_reduction;
  tape.custTapeInputsS1.tapeExpFrequency = 365;

  console.log('TAPE Customer Tape Inputs:  (BLUE BOX) Site 1:');
  console.log(tape.custTapeInputsS1);                                     //  {Tape - Customer Inputs Site 1}
  model.updateLocalStore(tape.custTapeInputsS1,'custTapeInputsS1');        //  {Tape - Customer Inputs Site 1} to LOCAL STORAGE

  // 'Customer Tape Inputs' Site 2 Data:
  tape.custTapeInputsS2.tapeDataReduction = basicDataS2.tape_data_reduction;
  tape.custTapeInputsS2.tapeExpFrequency = basicDataS2.tape_exp_sched;

  console.log('TAPE Customer Tape Inputs:  (BLUE BOX) Site 2:');
  console.log(tape.custTapeInputsS2);                                     //  {Tape - Customer Inputs Site 2}
  model.updateLocalStore(tape.custTapeInputsS2,'custTapeInputsS2');       //  {Tape - Customer Inputs Site 2} to LOCAL STORAGE

};



/**
 * tape (Red Box):
 *
 */
tape.tapeMonthlyCapacityGrowthBreakdownSite01 = function() {       //  <<  Generate RED BOX #1

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow25 = [],
    dataS1 = model.getLocalStore ('backupCustInputsS1');  //  Get Blue Box  S1


  for (;x < tape.growthArrayMonths;x++){
    tape.backupCapacityArrayS1[x] = new Array(10)
  }

  for (;i < tape.growthArrayMonths;i++){

    tape.backupCapacityArrayS1[i][0] = month++;
    if(0 === i){
      tape.backupCapacityArrayS1[i][1] = 1
    } else if (i > 0){
      tape.backupCapacityArrayS1[i][1] = 0
    }
    if(0 === i){
      tape.backupCapacityArrayS1[i][2] = 29
    } else if (i > 0){
      tape.backupCapacityArrayS1[i][2] = 30
    }
    tape.backupCapacityArrayS1[i][3] = (dataS1.totalLogicalCapacityPerSource / dataS1.backupDataReductionRatio) * (helpers.percentToNumber(dataS1.annualDataGrowthRate)/12);

    if(0 === i){tape.backupCapacityArrayS1[i][4] = (dataS1.totalLogicalCapacityPerSource/dataS1.backupDataReductionRatio)+tape.backupCapacityArrayS1[i][3];
    } else {tape.backupCapacityArrayS1[i][4] = tape.backupCapacityArrayS1[i-1][4] + tape.backupCapacityArrayS1[i][3]}

    tape.backupCapacityArrayS1[i][5] = tape.backupCapacityArrayS1[i][4] * tape.backupCapacityArrayS1[i][1];


    tape.backupCapacityArrayS1[i][6] = tape.backupCapacityArrayS1[i][4]*(helpers.percentToNumber(dataS1.logicalChangeRate))*tape.backupCapacityArrayS1[i][2];
    tape.backupCapacityArrayS1[i][7] = tape.backupCapacityArrayS1[i][6] + tape.backupCapacityArrayS1[i][5];

  }

  tape.backupCapacityArrayS1.forEach((element, index, array) => {     //  Build Table Row 25 Array
    tableRow25.push(element[6])
  });

  for (;j < tape.growthArrayMonths;j++){

    if(0 === j){
      if(0 === tape.B27){
        tape.backupCapacityArrayS1[j][8] = ((dataS1.retentionPeriodBackup/30)-tape.backupCapacityArrayS1[j][0] <= 0) ? tape.backupCapacityArrayS1[0][6]:0;
      } else {
        tape.backupCapacityArrayS1[j][8] = tableRow25[(tableRow25.findIndex(value => value === tape.B27) + 1)];
      }
    } else if (j > 0){
      if(0 === tape.backupCapacityArrayS1[j-1][8]){
        tape.backupCapacityArrayS1[j][8] = ((dataS1.retentionPeriodBackup/30)-tape.backupCapacityArrayS1[j][0] <= 0) ? tape.backupCapacityArrayS1[0][6]:0;
      } else {
        tape.backupCapacityArrayS1[j][8] = tableRow25[(tableRow25.findIndex(value => value === tape.backupCapacityArrayS1[j-1][8]) + 1)];
      }
    }
    if (0 === j){
      tape.backupCapacityArrayS1[j][9] = tape.backupCapacityArrayS1[j][7]-tape.backupCapacityArrayS1[j][8]+tape.B28;
    } else {
      tape.backupCapacityArrayS1[j][9] = tape.backupCapacityArrayS1[j][7]-tape.backupCapacityArrayS1[j][8]+tape.backupCapacityArrayS1[j-1][9];
    }

  }
  console.log('BACKUP Monthly Capacity Growth Breakdown (RED BOX #1)  S1:');
  console.log(tape.backupCapacityArrayS1);              //  Backup Monthly Capacity Growth Breakdown Site 1 (RED BOX #1)
  model.updateLocalStore(tape.backupCapacityArrayS1,'backupCapacityArrayS1');

};

tape.tapeBackupMonthlyCapacityGrowthBreakdownSite01 = function() {       //  <<  Generate RED BOX #2

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow38 = [],
    dataS1 = model.getLocalStore ('backupCustInputsS1'),  //  Get Blue Box  S1
    dataTapeS1 = model.getLocalStore ('custTapeInputsS1');  //  Get Blue Box  S1


  for (;x < tape.growthArrayMonths;x++){
    tape.tapeCapacityArrayS1[x] = new Array(10)
  }

  for (;i < tape.growthArrayMonths;i++){

    tape.tapeCapacityArrayS1[i][0] = month++;
    tape.tapeCapacityArrayS1[i][1] = 1;
    tape.tapeCapacityArrayS1[i][2] = 0;
    tape.tapeCapacityArrayS1[i][3] = (dataS1.totalLogicalCapacityPerSource / dataTapeS1.tapeDataReduction) * (helpers.percentToNumber(dataS1.annualDataGrowthRate)/12);

    if(0 === i){tape.tapeCapacityArrayS1[i][4] = (dataS1.totalLogicalCapacityPerSource/dataTapeS1.tapeDataReduction)+tape.tapeCapacityArrayS1[i][3];
    } else {tape.tapeCapacityArrayS1[i][4] = tape.tapeCapacityArrayS1[i-1][4] + tape.tapeCapacityArrayS1[i][3]}

    tape.tapeCapacityArrayS1[i][5] = tape.tapeCapacityArrayS1[i][4] * tape.tapeCapacityArrayS1[i][1];

    tape.tapeCapacityArrayS1[i][6] = tape.tapeCapacityArrayS1[i][4]*(helpers.percentToNumber(dataS1.logicalChangeRate))*tape.tapeCapacityArrayS1[i][2];

    tape.tapeCapacityArrayS1[i][7] = tape.tapeCapacityArrayS1[i][6] + tape.tapeCapacityArrayS1[i][5];

  }

  tape.tapeCapacityArrayS1.forEach((element, index, array) => {     //  Build Table Row 38 Array
    tableRow38.push(element[7])
  });

  for (;j < tape.growthArrayMonths;j++){

    if(0 === j){
      if(0 === tape.B39){
        tape.tapeCapacityArrayS1[j][8] = ((dataTapeS1.tapeExpFrequency/30)-tape.tapeCapacityArrayS1[j][0] <= 0) ? tape.tapeCapacityArrayS1[0][7]:0;
      } else {
        tape.tapeCapacityArrayS1[j][8] = tableRow38[(tableRow38.findIndex(value => value === tape.B39) + 1)];
      }
    } else if (j > 0){
      if(0 === tape.tapeCapacityArrayS1[j-1][8]){
        tape.tapeCapacityArrayS1[j][8] = ((dataTapeS1.tapeExpFrequency/30)-tape.tapeCapacityArrayS1[j][0] <= 0) ? tape.tapeCapacityArrayS1[0][7]:0;
      } else {
        tape.tapeCapacityArrayS1[j][8] = tableRow38[(tableRow38.findIndex(value => value === tape.tapeCapacityArrayS1[j-1][8]) + 1)];
      }
    }

    if (0 === j){
      tape.tapeCapacityArrayS1[j][9] = tape.tapeCapacityArrayS1[j][7]-tape.tapeCapacityArrayS1[j][8]+tape.B40;
    } else {
      tape.tapeCapacityArrayS1[j][9] = tape.tapeCapacityArrayS1[j][7]-tape.tapeCapacityArrayS1[j][8]+tape.tapeCapacityArrayS1[j-1][9];
    }

  }
  console.log('BACKUP TAPE Monthly Capacity Growth Breakdown (RED BOX #2)  S1:');
  console.log(tape.tapeCapacityArrayS1);      //  Backup Monthly Capacity Growth Breakdown Site 1 (RED BOX #2)
  model.updateLocalStore(tape.tapeCapacityArrayS1,'tapeCapacityArrayS1');

};


tape.tapeMonthlyCapacityGrowthBreakdownSite02 = function() {       //  <<  Generate RED BOX #3

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow49 = [],
    dataS2 = model.getLocalStore ('backupCustInputsS2');  //  Get Blue Box  S2

  console.log('BLUE BOX S1');
  console.log(dataS2);

  for (;x < tape.growthArrayMonths;x++){
    tape.backupCapacityArrayS2[x] = new Array(10)
  }

  for (;i < tape.growthArrayMonths;i++){

    tape.backupCapacityArrayS2[i][0] = month++;
    if(0 === i){
      tape.backupCapacityArrayS2[i][1] = 1
    } else if (i > 0){
      tape.backupCapacityArrayS2[i][1] = 0
    }
    if(0 === i){
      tape.backupCapacityArrayS2[i][2] = 29
    } else if (i > 0){
      tape.backupCapacityArrayS2[i][2] = 30
    }
    tape.backupCapacityArrayS2[i][3] = (dataS2.totalLogicalCapacityPerSource / dataS2.backupDataReductionRatio) * (helpers.percentToNumber(dataS2.annualDataGrowthRate)/12);

    if(0 === i){tape.backupCapacityArrayS2[i][4] = (dataS2.totalLogicalCapacityPerSource/dataS2.backupDataReductionRatio)+tape.backupCapacityArrayS2[i][3];
    } else {tape.backupCapacityArrayS2[i][4] = tape.backupCapacityArrayS2[i-1][4] + tape.backupCapacityArrayS2[i][3]}

    tape.backupCapacityArrayS2[i][5] = tape.backupCapacityArrayS2[i][4] * tape.backupCapacityArrayS2[i][1];


    tape.backupCapacityArrayS2[i][6] = tape.backupCapacityArrayS2[i][4]*(helpers.percentToNumber(dataS2.logicalChangeRate))*tape.backupCapacityArrayS2[i][2];
    tape.backupCapacityArrayS2[i][7] = tape.backupCapacityArrayS2[i][6] + tape.backupCapacityArrayS2[i][5];

  }

  tape.backupCapacityArrayS2.forEach((element, index, array) => {     //  Build Table Row 49 Array
    tableRow49.push(element[6])
  });

  for (;j < tape.growthArrayMonths;j++){

    if(0 === j){
      if(0 === tape.B51){
        tape.backupCapacityArrayS2[j][8] = ((dataS2.retentionPeriodBackup/30)-tape.backupCapacityArrayS2[j][0] <= 0) ? tape.backupCapacityArrayS2[0][6]:0;
      } else {
        tape.backupCapacityArrayS2[j][8] = tableRow49[(tableRow49.findIndex(value => value === tape.B51) + 1)];
      }
    } else if (j > 0){
      if(0 === tape.backupCapacityArrayS2[j-1][8]){
        tape.backupCapacityArrayS2[j][8] = ((dataS2.retentionPeriodBackup/30)-tape.backupCapacityArrayS2[j][0] <= 0) ? tape.backupCapacityArrayS2[0][6]:0;
      } else {
        tape.backupCapacityArrayS2[j][8] = tableRow49[(tableRow49.findIndex(value => value === tape.backupCapacityArrayS2[j-1][8]) + 1)];
      }
    }
    if (0 === j){
      tape.backupCapacityArrayS2[j][9] = tape.backupCapacityArrayS2[j][7]-tape.backupCapacityArrayS2[j][8]+tape.B52;
    } else {
      tape.backupCapacityArrayS2[j][9] = tape.backupCapacityArrayS2[j][7]-tape.backupCapacityArrayS2[j][8]+tape.backupCapacityArrayS2[j-1][9];
    }

  }
  console.log('BACKUP Monthly Capacity Growth Breakdown (RED BOX #3)  S2:');
  console.log(tape.backupCapacityArrayS2);              //  Backup Monthly Capacity Growth Breakdown Site 2 (RED BOX #3)
  model.updateLocalStore(tape.backupCapacityArrayS2,'backupCapacityArrayS2');

};


tape.tapeBackupMonthlyCapacityGrowthBreakdownSite02 = function() {       //  <<  Generate RED BOX #4

  let x = 0,
    i = 0,
    j = 0,
    month = 1,
    tableRow62 = [],
    dataS2 = model.getLocalStore ('backupCustInputsS2'),    //  Get Blue Box  S2
    dataTapeS2 = model.getLocalStore ('custTapeInputsS2');  //  Get Blue Box  S2


  for (;x < tape.growthArrayMonths;x++){
    tape.tapeCapacityArrayS2[x] = new Array(10)
  }

  for (;i < tape.growthArrayMonths;i++){

    tape.tapeCapacityArrayS2[i][0] = month++;
    tape.tapeCapacityArrayS2[i][1] = 1;
    tape.tapeCapacityArrayS2[i][2] = 0;
    tape.tapeCapacityArrayS2[i][3] = (dataS2.totalLogicalCapacityPerSource / dataTapeS2.tapeDataReduction) * (helpers.percentToNumber(dataS2.annualDataGrowthRate)/12);

    if(0 === i){tape.tapeCapacityArrayS2[i][4] = (dataS2.totalLogicalCapacityPerSource/dataTapeS2.tapeDataReduction)+tape.tapeCapacityArrayS2[i][3];
    } else {tape.tapeCapacityArrayS2[i][4] = tape.tapeCapacityArrayS2[i-1][4] + tape.tapeCapacityArrayS2[i][3]}

    tape.tapeCapacityArrayS2[i][5] = tape.tapeCapacityArrayS2[i][4] * tape.tapeCapacityArrayS2[i][1];

    tape.tapeCapacityArrayS2[i][6] = tape.tapeCapacityArrayS2[i][4]*(helpers.percentToNumber(dataS2.logicalChangeRate))*tape.tapeCapacityArrayS2[i][2];

    tape.tapeCapacityArrayS2[i][7] = tape.tapeCapacityArrayS2[i][6] + tape.tapeCapacityArrayS2[i][5];

  }

  tape.tapeCapacityArrayS2.forEach((element, index, array) => {     //  Build Table Row 62 Array
    tableRow62.push(element[7])
  });

  for (;j < tape.growthArrayMonths;j++){

    if(0 === j){
      if(0 === tape.B63){
        tape.tapeCapacityArrayS2[j][8] = ((dataTapeS2.tapeExpFrequency/30)-tape.tapeCapacityArrayS2[j][0] <= 0) ? tape.tapeCapacityArrayS2[0][7]:0;
      } else {
        tape.tapeCapacityArrayS2[j][8] = tableRow62[(tableRow62.findIndex(value => value === tape.B63) + 1)];
      }
    } else if (j > 0){
      if(0 === tape.tapeCapacityArrayS2[j-1][8]){
        tape.tapeCapacityArrayS2[j][8] = ((dataTapeS2.tapeExpFrequency/30)-tape.tapeCapacityArrayS2[j][0] <= 0) ? tape.tapeCapacityArrayS2[0][7]:0;
      } else {
        tape.tapeCapacityArrayS2[j][8] = tableRow62[(tableRow62.findIndex(value => value === tape.tapeCapacityArrayS2[j-1][8]) + 1)];
      }
    }

    if (0 === j){
      tape.tapeCapacityArrayS2[j][9] = tape.tapeCapacityArrayS2[j][7]-tape.tapeCapacityArrayS2[j][8]+tape.B64;
    } else {
      tape.tapeCapacityArrayS2[j][9] = tape.tapeCapacityArrayS2[j][7]-tape.tapeCapacityArrayS2[j][8]+tape.tapeCapacityArrayS2[j-1][9];
    }

  }
  console.log('BACKUP TAPE Monthly Capacity Growth Breakdown (RED BOX #4)  S2:');
  console.log(tape.tapeCapacityArrayS2);      //  Backup Monthly Capacity Growth Breakdown Site 1 (RED BOX #4)
  model.updateLocalStore(tape.tapeCapacityArrayS2,'tapeCapacityArrayS2');

};

/**
 * Tape Output (Green Box):
 *
 */
tape.tapeBackupOutput = function () {                     //  Build Tape Backup Output - GREEN BOX

  let backupCapacityS1 = model.getLocalStore ('backupCapacityArrayS1'),             //  Get Red Box #1
    tapeCapacityS1 = model.getLocalStore ('tapeCapacityArrayS1'),                   //  Get Red Box #3
    backupCapacityS2 = model.getLocalStore ('backupCapacityArrayS2'),               //  Get Red Box #2
    tapeCapacityS2 = model.getLocalStore ('tapeCapacityArrayS2');                   //  Get Red Box #4

  tape.outputObject.bcEOY_S1.year01 = backupCapacityS1[11][9];
  tape.outputObject.bcEOY_S1.year02 = backupCapacityS1[23][9];
  tape.outputObject.bcEOY_S1.year03 = backupCapacityS1[35][9];

  tape.outputObject.tcEOY_S1.year01 = tapeCapacityS1[11][9];
  tape.outputObject.tcEOY_S1.year02 = tapeCapacityS1[23][9];
  tape.outputObject.tcEOY_S1.year03 = tapeCapacityS1[35][9];

  tape.outputObject.bcEOY_S2.year01 = backupCapacityS2[11][9];
  tape.outputObject.bcEOY_S2.year02 = backupCapacityS2[23][9];
  tape.outputObject.bcEOY_S2.year03 = backupCapacityS2[35][9];

  tape.outputObject.tcEOY_S2.year01 = tapeCapacityS2[11][9];
  tape.outputObject.tcEOY_S2.year02 = tapeCapacityS2[23][9];
  tape.outputObject.tcEOY_S2.year03 = tapeCapacityS2[35][9];

  console.log('TAPE Backup Output (GREEN BOX)');
  console.log(tape.outputObject);
  model.updateLocalStore(tape.outputObject,'tapeOutputObject');

};

























/**
 * tape DVX Monthly Cost Breakdown (Orange Box):
 *
 */
tape.tapeDVXMonthlyCostBreakdown = function() {       //  <<  Generate ORANGE BOX

  let x = 0,
    i = 0,
    j = 0,
    numTableRows = 16,
    month = 1,
    tapeGrowthArray = model.getLocalStore ('tapeGrowthArray'),    //  Get Red Box     - Any data that is not ORANGE BOX - comes from Local Storage
    dataS1 = model.getLocalStore ('tapeCustInputsS1'),             //  Get Blue Box S1
    advancedDataS1 = model.getLocalStore ('userInputAdvancedS1'),   //  Get Advanced User Inputs S1
    assumptionsAWS = model.getLocalStore ('assumptionsAWS'),        //  Get Assumptions  AWS
    assumptionstape = model.getLocalStore('assumptionstape');     //  Get Assumptions tape

  for (;x<tape.costArrayMonths;x++){   //  loop array, replace each element with array of set size
    tape.costArray[x] = new Array(numTableRows)
  }

  for (;i<tape.costArrayMonths;i++){

    tape.costArray[i][0] = month++;
    if(3 === dataS1.EC2type){tape.costArray[i][1] = assumptionsAWS.i3xlarge3yr * 24 * 30
    } else if(2 === dataS1.EC2type){tape.costArray[i][1] = assumptionsAWS.i3xlarge1yr * 24 * 30
    } else if(1 === dataS1.EC2type){tape.costArray[i][1] = assumptionsAWS.i3xlargeOnDemand * 24 * 30}
    tape.costArray[i][2] = assumptionsAWS.storageCostGbMonth * tapeGrowthArray[i][20];
    if (0 === i){
      tape.costArray[i][3] = (tapeGrowthArray[i][11]/assumptionstape.tapeDVXContainerSizeS3) * assumptionsAWS.putsPerContainer * (1 + assumptionstape.tapeDVXWriteAmpl + assumptionstape.tapeDVXStoreMerges);
    } else if (i >=0){
      tape.costArray[i][3] = (tapeGrowthArray[i][9]/assumptionstape.tapeDVXContainerSizeS3) * assumptionsAWS.putsPerContainer * (1 + assumptionstape.tapeDVXWriteAmpl + assumptionstape.tapeDVXStoreMerges);
    }
    if (0 === i){
      tape.costArray[i][4] = (tapeGrowthArray[i][11]/assumptionstape.tapeDVXContainerSizeS3) * assumptionsAWS.getsPerContainer * (assumptionstape.tapeDVXWriteAmpl * assumptionstape.tapeDVXGetMultFactor + assumptionstape.tapeDVXStoreMerges);
    } else if (i >=0){
      tape.costArray[i][4] = (tapeGrowthArray[i][9]/assumptionstape.tapeDVXContainerSizeS3) * assumptionsAWS.getsPerContainer * (assumptionstape.tapeDVXWriteAmpl * assumptionstape.tapeDVXGetMultFactor + assumptionstape.tapeDVXStoreMerges);
    }
    tape.costArray[i][5] = tapeGrowthArray[i][19] * assumptionsAWS.egressNetworkCostGb;
    tape.costArray[i][6] = 1000/12;
    let  totalAWSCost = 0;
    for(let y = 1; y<=6; y++){
      totalAWSCost+= tape.costArray[i][y]
    }
    tape.costArray[i][7] = totalAWSCost;
    tape.costArray[i][8] = Math.max(100, ((totalAWSCost-10000)*0.07+100));
    tape.costArray[i][9] = tape.costArray[i][7] + tape.costArray[i][8];

    (function() {
      let yearAWScost = 0,
        yearStartIndex = 0,
        yearEndIndex = 0;
      if (tape.costArray[i][0] > 0 && tape.costArray[i][0] % 12 === 0) {
        yearStartIndex = i - 11;
        yearEndIndex = i;
        // console.log(`tape.costArray[i][0]: ${tape.costArray[i][0]}`);
        // console.log(`yearStartIndex: ${yearStartIndex}`);
        // console.log(`yearEndIndex: ${yearEndIndex}`);
        for (let z = yearStartIndex; z <= yearEndIndex; z++) {
          yearAWScost += tape.costArray[z][9];
        }
        tape.costArray[yearEndIndex][10] = yearAWScost;
      } else {
        tape.costArray[i][10] = null;
      }
    })();

    tape.costArray[i][11] = helpers.currencyToNumber(advancedDataS1.tape_DVX_net_price) * Math.ceil(tapeGrowthArray[i][20]/5000);
    tape.costArray[i][12] = tape.costArray[i][11];

    (function() {
      let yearDVXcost = 0,
        yearStartIndex = 0,
        yearEndIndex = 0;
      if (tape.costArray[i][0] > 0 && tape.costArray[i][0] % 12 === 0) {
        yearStartIndex = i - 11;
        yearEndIndex = i;
        for (let z = yearStartIndex; z <= yearEndIndex; z++) {
          yearDVXcost += tape.costArray[z][12];
        }
        tape.costArray[yearEndIndex][13] = yearDVXcost;
      } else {
        tape.costArray[i][13] = null;
      }
    })();

    tape.costArray[i][14] = tape.costArray[i][9] + tape.costArray[i][12];

    (function() {
      let totalDVXcost = 0,
        yearStartIndex = 0,
        yearEndIndex = 0;
      if (tape.costArray[i][0] > 0 && tape.costArray[i][0] % 12 === 0) {
        yearStartIndex = i - 11;
        yearEndIndex = i;
        for (let z = yearStartIndex; z <= yearEndIndex; z++) {
          totalDVXcost += tape.costArray[z][14];
        }
        tape.costArray[yearEndIndex][15] = totalDVXcost;
      } else {
        tape.costArray[i][15] = null;
      }
    })();

  }

  console.log('tape Growth Array (ORANGE BOX):');
  console.log(tape.costArray);
  model.updateLocalStore(tape.costArray,'tapeCostArray');

};



/**
 * tape Cost Output (Green Box):
 *
 */
tape.tapeCostOutput = function () {           //  Build Cost Output - GREEN BOX

  let dataS1 = model.getLocalStore ('tapeCustInputsS1'),             //  Get Blue Box S1
    tapeCostArray = model.getLocalStore ('tapeCostArray');            //  Get Orange Box

  //  Total Physical capacity stored in AWS (GB) (at the end of the year)
  tape.outputObject.tpcsAWS.year01 = tape.growthArray[11][20];
  tape.outputObject.tpcsAWS.year02 = tape.growthArray[23][20];
  tape.outputObject.tpcsAWS.year03 = tape.growthArray[35][20];
  tape.outputObject.tpcsAWS.year04 = tape.growthArray[47][20];
  tape.outputObject.tpcsAWS.year05 = tape.growthArray[59][20];

  //  Total Logical capacity stored in AWS (GB) (at the end of the year)
  tape.outputObject.tlcsAWS.year01 = tape.growthArray[11][20] * (dataS1.localDataReductionRatio * dataS1.tapeDataReductionRatio);
  tape.outputObject.tlcsAWS.year02 = tape.growthArray[23][20] * (dataS1.localDataReductionRatio * dataS1.tapeDataReductionRatio);
  tape.outputObject.tlcsAWS.year03 = tape.growthArray[35][20] * (dataS1.localDataReductionRatio * dataS1.tapeDataReductionRatio);
  tape.outputObject.tlcsAWS.year04 = tape.growthArray[47][20] * (dataS1.localDataReductionRatio * dataS1.tapeDataReductionRatio);
  tape.outputObject.tlcsAWS.year05 = tape.growthArray[59][20] * (dataS1.localDataReductionRatio * dataS1.tapeDataReductionRatio);

  //  Total Solution Cost (paid yearly)
  tape.outputObject.tsC.year01 = tapeCostArray[11][15];
  tape.outputObject.tsC.year02 = tapeCostArray[23][15];
  tape.outputObject.tsC.year03 = tapeCostArray[35][15];
  tape.outputObject.tsC.year04 = tapeCostArray[47][15];
  tape.outputObject.tsC.year05 = tapeCostArray[59][15];

  //  Total AWS Only Costs (paid yearly)
  tape.outputObject.tAWSoC.year01 = tapeCostArray[11][10];
  tape.outputObject.tAWSoC.year02 = tapeCostArray[23][10];
  tape.outputObject.tAWSoC.year03 = tapeCostArray[35][10];
  tape.outputObject.tAWSoC.year04 = tapeCostArray[47][10];
  tape.outputObject.tAWSoC.year05 = tapeCostArray[59][10];

  //  Total tape DVX SW Only Cost (paid yearly)
  tape.outputObject.tcDVXoC.year01 = tapeCostArray[11][13];
  tape.outputObject.tcDVXoC.year02 = tapeCostArray[23][13];
  tape.outputObject.tcDVXoC.year03 = tapeCostArray[35][13];
  tape.outputObject.tcDVXoC.year04 = tapeCostArray[47][13];
  tape.outputObject.tcDVXoC.year05 = tapeCostArray[59][13];

  //  $/GB Logical for the total solution
  tape.outputObject.ltS.year01 = tape.outputObject.tsC.year01/tape.outputObject.tlcsAWS.year01;
  tape.outputObject.ltS.year02 = tape.outputObject.tsC.year02/tape.outputObject.tlcsAWS.year02;
  tape.outputObject.ltS.year03 = tape.outputObject.tsC.year03/tape.outputObject.tlcsAWS.year03;
  tape.outputObject.ltS.year04 = tape.outputObject.tsC.year04/tape.outputObject.tlcsAWS.year04;
  tape.outputObject.ltS.year05 = tape.outputObject.tsC.year05/tape.outputObject.tlcsAWS.year05;

  //  $/GB Logical for AWS only
  tape.outputObject.lAWS.year01 = tape.outputObject.tAWSoC.year01/tape.outputObject.tlcsAWS.year01;
  tape.outputObject.lAWS.year02 = tape.outputObject.tAWSoC.year02/tape.outputObject.tlcsAWS.year02;
  tape.outputObject.lAWS.year03 = tape.outputObject.tAWSoC.year03/tape.outputObject.tlcsAWS.year03;
  tape.outputObject.lAWS.year04 = tape.outputObject.tAWSoC.year04/tape.outputObject.tlcsAWS.year04;
  tape.outputObject.lAWS.year05 = tape.outputObject.tAWSoC.year05/tape.outputObject.tlcsAWS.year05;

  console.log('tape Cost Output (GREEN BOX)');
  console.log(tape.outputObject);
  model.updateLocalStore(tape.outputObject,'tapeOutputObject');

};





