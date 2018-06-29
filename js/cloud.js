

let cloud = {};

cloud.init = function() {

  cloud.cloudCustInputsS1 = {};         //  Cloud - Customer Inputs Site 1  {BLUE BOX}
  cloud.cloudCustInputsS2 = {};         //  Cloud - Customer Inputs Site 2  {BLUE BOX}
  cloud.outputObject = {                //  Cloud Cost Output {GREEN BOX}
    tpcsAWS: {},
    tlcsAWS: {},
    tsC: {},
    tAWSoC: {},
    tcDVXoC: {},
    ltS: {},
    lAWS: {}
  };

  cloud.growthArrayMonths = 60;
  cloud.costArrayMonths = 60;

  cloud.growthArray = new Array(cloud.growthArrayMonths);   //  Cloud Data [RED BOX]
  cloud.costArray = new Array(cloud.costArrayMonths);       //  Cloud Data [ORANGE BOX]

  cloud.B57 = 0;
  cloud.B58 = 0;

};


/**
 * Updates local storage with cloud Customer Inputs (Blue Box):
 *
 */
cloud.DVX_cloud_Calculations_Customer_Inputs = function (){       //  Customer Inputs Site 1 and Site 2  (BLUE BOX)

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');               //  Get Basic User Inputs S1
  let advancedDataS1 = model.getLocalStore ('userInputAdvancedS1');         //  Get Advanced User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');               //  Get Basic User Inputs S2
  let advancedDataS2 = model.getLocalStore('userInputAdvancedS2');          //  Get Advanced User Inputs S2

  // 'Customer Inputs' Site 1 Data:

  cloud.cloudCustInputsS1.numberOfSources = 1;
  cloud.cloudCustInputsS1.totalLogicalCapacityPerSource = Number(basicDataS1.num_vms) * Number(basicDataS1.disk_vm);
  cloud.cloudCustInputsS1.annualDataGrowthRate = basicDataS1.proj_vm_growth;
  cloud.cloudCustInputsS1.localDataReductionRatio = Number(advancedDataS1.exp_data_reduction_DVX);
  cloud.cloudCustInputsS1.logicalChangeRate = basicDataS1.daily_change_rate;
  cloud.cloudCustInputsS1.cloudDataReductionRatio = Number(advancedDataS1.cloud_data_reduction_ratio);

  if (0 === basicDataS2.primary_stor && 0 === basicDataS2.secondary_stor) {
    cloud.cloudCustInputsS1.retentionPeriodCLoudData = basicDataS1.backup_exp_sched
  } else {
    cloud.cloudCustInputsS1.retentionPeriodCLoudData = basicDataS1.tape_exp_sched
  }

  cloud.cloudCustInputsS1.restoreDataSizePerYear = helpers.percentToNumber(basicDataS1.data_restored_tape) * Number(basicDataS1.num_vms) * Number(basicDataS1.disk_vm);
  cloud.cloudCustInputsS1.EC2type = 3;  //  (1-On-demand, 2-Reserved 1YR, 3-Reserved 3YR)

  console.log(`CLOUD Customer Inputs Site 1 (BLUE BOX):`);
  console.log(cloud.cloudCustInputsS1);                                   //  {Cloud - Customer Inputs Site 1}
  model.updateLocalStore(cloud.cloudCustInputsS1,'cloudCustInputsS1');    //  {Cloud - Customer Inputs Site 1} to LOCAL STORAGE

  // 'Customer Inputs' Site 2 Data:

  cloud.cloudCustInputsS2.numberOfSources = 1;
  cloud.cloudCustInputsS2.totalLogicalCapacityPerSource = Number(basicDataS2.num_vms) * Number(basicDataS2.disk_vm);
  cloud.cloudCustInputsS2.annualDataGrowthRate = basicDataS2.proj_vm_growth;
  cloud.cloudCustInputsS2.localDataReductionRatio = Number(advancedDataS2.exp_data_reduction_DVX);
  cloud.cloudCustInputsS2.logicalChangeRate = basicDataS2.daily_change_rate;
  cloud.cloudCustInputsS2.cloudDataReductionRatio = Number(advancedDataS2.cloud_data_reduction_ratio);

  if (0 === basicDataS2.primary_stor && 0 === basicDataS2.secondary_stor) {
    cloud.cloudCustInputsS2.retentionPeriodCLoudData = basicDataS2.backup_exp_sched
  } else {
    cloud.cloudCustInputsS2.retentionPeriodCLoudData = basicDataS2.tape_exp_sched
  }

  cloud.cloudCustInputsS2.restoreDataSizePerYear = helpers.percentToNumber(basicDataS2.data_restored_tape) * Number(basicDataS2.num_vms) * Number(basicDataS2.disk_vm);
  cloud.cloudCustInputsS2.EC2type = 3;  //  (1-On-demand, 2-Reserved 1YR, 3-Reserved 3YR)

  console.log(`CLOUD Customer Inputs Site 2 (BLUE BOX):`);
  console.log(cloud.cloudCustInputsS2);                                   //  {Cloud - Customer Inputs Site 2}
  model.updateLocalStore(cloud.cloudCustInputsS2,'cloudCustInputsS2');    //  {Cloud - Customer Inputs Site 2} to LOCAL STORAGE

};



/**
 * Cloud DVX Monthly Capacity Growth Breakdown (Red Box):
 *
 */
cloud.cloudDVXMonthlyCapacityGrowthBreakdown = function() {       //  <<  Generate RED BOX

  let x = 0,
    i = 0,
    j = 0,
    numTableRows = 21,
    month = 1,
    tableRow54 = [],
    tableRow55 = [],
    dataS1 = model.getLocalStore('cloudCustInputsS1'),         //  Get Blue Box
    dataS2 = model.getLocalStore('cloudCustInputsS2'),         //  Get Blue Box
    assumptionsCloud = model.getLocalStore('assumptionsCloud');  //  Get Assumption Cloud

  for (; x < cloud.growthArrayMonths; x++) {   //  loop array, replace each element with array of set size
    cloud.growthArray[x] = new Array(numTableRows)
  }

  for (; i < cloud.growthArrayMonths; i++) {

    cloud.growthArray[i][0] = month++;
    if (0 === i) {
      cloud.growthArray[i][1] = 1
    } else {
      cloud.growthArray[i][1] = 0;
    }
    if (0 === i) {
      cloud.growthArray[i][2] = 29
    } else {
      cloud.growthArray[i][2] = 30;
    }
    cloud.growthArray[i][3] = ((dataS1.totalLogicalCapacityPerSource / dataS1.localDataReductionRatio) * (helpers.percentToNumber(dataS1.annualDataGrowthRate))) / 12;
    cloud.growthArray[i][4] = ((dataS2.totalLogicalCapacityPerSource / dataS2.localDataReductionRatio) * (helpers.percentToNumber(dataS2.annualDataGrowthRate))) / 12;
    if (0 === i) {
      cloud.growthArray[i][5] = ((dataS1.totalLogicalCapacityPerSource / dataS1.localDataReductionRatio) + cloud.growthArray[i][3]);
    } else {
      cloud.growthArray[i][5] = (cloud.growthArray[i - 1][5] + cloud.growthArray[i][3]);
    }
    if (0 === i) {
      cloud.growthArray[i][6] = ((dataS2.totalLogicalCapacityPerSource / dataS2.localDataReductionRatio) + cloud.growthArray[i][4]);
    } else {
      cloud.growthArray[i][6] = (cloud.growthArray[i - 1][6] + cloud.growthArray[i][4]);
    }
    cloud.growthArray[i][7] = cloud.growthArray[i][5] * cloud.growthArray[i][1] * dataS1.numberOfSources;
    cloud.growthArray[i][8] = cloud.growthArray[i][6] * cloud.growthArray[i][1] * dataS2.numberOfSources;
    cloud.growthArray[i][9] = (cloud.growthArray[i][5] * helpers.percentToNumber(dataS1.logicalChangeRate) * cloud.growthArray[i][2]) * dataS1.numberOfSources;
    cloud.growthArray[i][10] = (cloud.growthArray[i][6] * helpers.percentToNumber(dataS2.logicalChangeRate) * cloud.growthArray[i][2]) * dataS2.numberOfSources;
    cloud.growthArray[i][11] = cloud.growthArray[i][9] + cloud.growthArray[i][7] + cloud.growthArray[i][9] + cloud.growthArray[i][8];
    cloud.growthArray[i][12] = cloud.growthArray[i][7] / dataS1.cloudDataReductionRatio;
    cloud.growthArray[i][13] = cloud.growthArray[i][9] / dataS1.cloudDataReductionRatio;
    cloud.growthArray[i][14] = cloud.growthArray[i][10] / dataS2.cloudDataReductionRatio;
    cloud.growthArray[i][15] = cloud.growthArray[i][12] + cloud.growthArray[i][13] + cloud.growthArray[i][14];
  }

  cloud.growthArray.forEach((element, index, array) => {     //  Build Table Row 54 Array
    tableRow54.push(element[13])
  });
  cloud.growthArray.forEach((element, index, array) => {     //  Build Table Row 55 Array
    tableRow55.push(element[14])
  });


  for (; j < cloud.growthArrayMonths; j++) {
    if (0 === j) {
      if (0 === cloud.B57) {
        cloud.growthArray[j][16] = ((dataS1.retentionPeriodCLoudData / 30) - cloud.growthArray[j][0] <= 0) ? cloud.growthArray[0][13] : 0;
      } else {
        cloud.growthArray[j][16] = tableRow54[(tableRow54.findIndex(value => value === cloud.B57) + 1)];
      }
    } else if (j > 0) {
      if (0 === cloud.growthArray[j - 1][16]) {
        cloud.growthArray[j][16] = ((dataS1.retentionPeriodCLoudData / 30) - cloud.growthArray[j][0] <= 0) ? cloud.growthArray[0][13] : 0;
      } else {
        cloud.growthArray[j][16] = tableRow54[(tableRow54.findIndex(value => value === cloud.growthArray[j - 1][16]) + 1)];
      }
    }

    if (0 === j) {
      if (0 === cloud.B58) {
        cloud.growthArray[j][17] = ((dataS2.retentionPeriodCLoudData / 30) - cloud.growthArray[j][0] <= 0) ? cloud.growthArray[0][14] : 0;
      } else {
        cloud.growthArray[j][17] = tableRow55[(tableRow55.findIndex(value => value === cloud.B58) + 1)];
      }
    } else if (j > 0) {
      if (0 === cloud.growthArray[j - 1][16]) {
        cloud.growthArray[j][17] = ((dataS2.retentionPeriodCLoudData / 30) - cloud.growthArray[j][0] <= 0) ? cloud.growthArray[0][14] : 0;
      } else {
        cloud.growthArray[j][17] = tableRow55[(tableRow55.findIndex(value => value === cloud.growthArray[j - 1][17]) + 1)];
      }
    }

    if (0 === j) {
      cloud.growthArray[j][18] = cloud.growthArray[j][15] - cloud.growthArray[j][16] - cloud.growthArray[j][17];
    } else {
      cloud.growthArray[j][18] = cloud.growthArray[j - 1][18] + cloud.growthArray[j][15] - cloud.growthArray[j][16] - cloud.growthArray[j][17];
    }

    cloud.growthArray[j][19] = (dataS1.restoreDataSizePerYear + dataS2.restoreDataSizePerYear) / 12;
    cloud.growthArray[j][20] = (cloud.growthArray[j][18] * (1 + helpers.percentToNumber(assumptionsCloud.cloudDVXSpaceOverprovisioning)));
  }

  console.log('CLOUD Growth Array (RED BOX):');
  console.log(cloud.growthArray);
  model.updateLocalStore(cloud.growthArray, 'cloudGrowthArray');    //  [ Cloud - Growth Array] to LOCAL STORAGE

};

  /**
   * Cloud DVX Monthly Cost Breakdown (Orange Box):
   *
   */
  cloud.cloudDVXMonthlyCostBreakdown = function() {       //  <<  Generate ORANGE BOX

    let x = 0,
      i = 0,
      j = 0,
      numTableRows = 16,
      month = 1,
      cloudGrowthArray = model.getLocalStore ('cloudGrowthArray'),    //  Get Red Box     - Any data that is not ORANGE BOX - comes from Local Storage
      dataS1 = model.getLocalStore ('cloudCustInputsS1'),             //  Get Blue Box S1
      advancedDataS1 = model.getLocalStore ('userInputAdvancedS1'),   //  Get Advanced User Inputs S1
      assumptionsAWS = model.getLocalStore ('assumptionsAWS'),        //  Get Assumptions  AWS
      assumptionsCloud = model.getLocalStore('assumptionsCloud');     //  Get Assumptions Cloud

    for (;x<cloud.costArrayMonths;x++){   //  loop array, replace each element with array of set size
      cloud.costArray[x] = new Array(numTableRows)
    }

    for (;i<cloud.costArrayMonths;i++){

      cloud.costArray[i][0] = month++;
      if(3 === dataS1.EC2type){cloud.costArray[i][1] = assumptionsAWS.i3xlarge3yr * 24 * 30
      } else if(2 === dataS1.EC2type){cloud.costArray[i][1] = assumptionsAWS.i3xlarge1yr * 24 * 30
      } else if(1 === dataS1.EC2type){cloud.costArray[i][1] = assumptionsAWS.i3xlargeOnDemand * 24 * 30}
      cloud.costArray[i][2] = assumptionsAWS.storageCostGbMonth * cloudGrowthArray[i][20];
      if (0 === i){
        cloud.costArray[i][3] = (cloudGrowthArray[i][11]/assumptionsCloud.cloudDVXContainerSizeS3) * assumptionsAWS.putsPerContainer * (1 + assumptionsCloud.cloudDVXWriteAmpl + assumptionsCloud.cloudDVXStoreMerges);
      } else if (i >=0){
        cloud.costArray[i][3] = (cloudGrowthArray[i][9]/assumptionsCloud.cloudDVXContainerSizeS3) * assumptionsAWS.putsPerContainer * (1 + assumptionsCloud.cloudDVXWriteAmpl + assumptionsCloud.cloudDVXStoreMerges);
      }
      if (0 === i){
        cloud.costArray[i][4] = (cloudGrowthArray[i][11]/assumptionsCloud.cloudDVXContainerSizeS3) * assumptionsAWS.getsPerContainer * (assumptionsCloud.cloudDVXWriteAmpl * assumptionsCloud.cloudDVXGetMultFactor + assumptionsCloud.cloudDVXStoreMerges);
      } else if (i >=0){
        cloud.costArray[i][4] = (cloudGrowthArray[i][9]/assumptionsCloud.cloudDVXContainerSizeS3) * assumptionsAWS.getsPerContainer * (assumptionsCloud.cloudDVXWriteAmpl * assumptionsCloud.cloudDVXGetMultFactor + assumptionsCloud.cloudDVXStoreMerges);
      }
      cloud.costArray[i][5] = cloudGrowthArray[i][19] * assumptionsAWS.egressNetworkCostGb;
      cloud.costArray[i][6] = 1000/12;
      let  totalAWSCost = 0;
      for(let y = 1; y<=6; y++){
        totalAWSCost+= cloud.costArray[i][y]
      }
      cloud.costArray[i][7] = totalAWSCost;
      cloud.costArray[i][8] = Math.max(100, ((totalAWSCost-10000)*0.07+100));
      cloud.costArray[i][9] = cloud.costArray[i][7] + cloud.costArray[i][8];

      (function() {
        let yearAWScost = 0,
          yearStartIndex = 0,
          yearEndIndex = 0;
        if (cloud.costArray[i][0] > 0 && cloud.costArray[i][0] % 12 === 0) {
          yearStartIndex = i - 11;
          yearEndIndex = i;
          // console.log(`cloud.costArray[i][0]: ${cloud.costArray[i][0]}`);
          // console.log(`yearStartIndex: ${yearStartIndex}`);
          // console.log(`yearEndIndex: ${yearEndIndex}`);
          for (let z = yearStartIndex; z <= yearEndIndex; z++) {
            yearAWScost += cloud.costArray[z][9];
          }
          cloud.costArray[yearEndIndex][10] = yearAWScost;
        } else {
          cloud.costArray[i][10] = null;
        }
      })();

      cloud.costArray[i][11] = helpers.currencyToNumber(advancedDataS1.cloud_DVX_net_price) * Math.ceil(cloudGrowthArray[i][20]/5000);
      cloud.costArray[i][12] = cloud.costArray[i][11];

      (function() {
        let yearDVXcost = 0,
          yearStartIndex = 0,
          yearEndIndex = 0;
        if (cloud.costArray[i][0] > 0 && cloud.costArray[i][0] % 12 === 0) {
          yearStartIndex = i - 11;
          yearEndIndex = i;
          for (let z = yearStartIndex; z <= yearEndIndex; z++) {
            yearDVXcost += cloud.costArray[z][12];
          }
          cloud.costArray[yearEndIndex][13] = yearDVXcost;
        } else {
          cloud.costArray[i][13] = null;
        }
      })();

      cloud.costArray[i][14] = cloud.costArray[i][9] + cloud.costArray[i][12];

      (function() {
        let totalDVXcost = 0,
          yearStartIndex = 0,
          yearEndIndex = 0;
        if (cloud.costArray[i][0] > 0 && cloud.costArray[i][0] % 12 === 0) {
          yearStartIndex = i - 11;
          yearEndIndex = i;
          for (let z = yearStartIndex; z <= yearEndIndex; z++) {
            totalDVXcost += cloud.costArray[z][14];
          }
          cloud.costArray[yearEndIndex][15] = totalDVXcost;
        } else {
          cloud.costArray[i][15] = null;
        }
      })();

    }

    console.log('CLOUD Growth Array (ORANGE BOX):');
    console.log(cloud.costArray);
    model.updateLocalStore(cloud.costArray,'cloudCostArray');

  };



/**
 * Cloud Cost Output (Green Box):
 *
 */
  cloud.cloudCostOutput = function () {           //  Build Cost Output - GREEN BOX

    let dataS1 = model.getLocalStore ('cloudCustInputsS1'),             //  Get Blue Box S1
    cloudCostArray = model.getLocalStore ('cloudCostArray');            //  Get Orange Box

    //  Total Physical capacity stored in AWS (GB) (at the end of the year)
    cloud.outputObject.tpcsAWS.year01 = cloud.growthArray[11][20];
    cloud.outputObject.tpcsAWS.year02 = cloud.growthArray[23][20];
    cloud.outputObject.tpcsAWS.year03 = cloud.growthArray[35][20];
    cloud.outputObject.tpcsAWS.year04 = cloud.growthArray[47][20];
    cloud.outputObject.tpcsAWS.year05 = cloud.growthArray[59][20];

    //  Total Logical capacity stored in AWS (GB) (at the end of the year)
    cloud.outputObject.tlcsAWS.year01 = cloud.growthArray[11][20] * (dataS1.localDataReductionRatio * dataS1.cloudDataReductionRatio);
    cloud.outputObject.tlcsAWS.year02 = cloud.growthArray[23][20] * (dataS1.localDataReductionRatio * dataS1.cloudDataReductionRatio);
    cloud.outputObject.tlcsAWS.year03 = cloud.growthArray[35][20] * (dataS1.localDataReductionRatio * dataS1.cloudDataReductionRatio);
    cloud.outputObject.tlcsAWS.year04 = cloud.growthArray[47][20] * (dataS1.localDataReductionRatio * dataS1.cloudDataReductionRatio);
    cloud.outputObject.tlcsAWS.year05 = cloud.growthArray[59][20] * (dataS1.localDataReductionRatio * dataS1.cloudDataReductionRatio);

    //  Total Solution Cost (paid yearly)
    cloud.outputObject.tsC.year01 = cloudCostArray[11][15];
    cloud.outputObject.tsC.year02 = cloudCostArray[23][15];
    cloud.outputObject.tsC.year03 = cloudCostArray[35][15];
    cloud.outputObject.tsC.year04 = cloudCostArray[47][15];
    cloud.outputObject.tsC.year05 = cloudCostArray[59][15];

    //  Total AWS Only Costs (paid yearly)
    cloud.outputObject.tAWSoC.year01 = cloudCostArray[11][10];
    cloud.outputObject.tAWSoC.year02 = cloudCostArray[23][10];
    cloud.outputObject.tAWSoC.year03 = cloudCostArray[35][10];
    cloud.outputObject.tAWSoC.year04 = cloudCostArray[47][10];
    cloud.outputObject.tAWSoC.year05 = cloudCostArray[59][10];

    //  Total Cloud DVX SW Only Cost (paid yearly)
    cloud.outputObject.tcDVXoC.year01 = cloudCostArray[11][13];
    cloud.outputObject.tcDVXoC.year02 = cloudCostArray[23][13];
    cloud.outputObject.tcDVXoC.year03 = cloudCostArray[35][13];
    cloud.outputObject.tcDVXoC.year04 = cloudCostArray[47][13];
    cloud.outputObject.tcDVXoC.year05 = cloudCostArray[59][13];

    //  $/GB Logical for the total solution
    cloud.outputObject.ltS.year01 = cloud.outputObject.tsC.year01/cloud.outputObject.tlcsAWS.year01;
    cloud.outputObject.ltS.year02 = cloud.outputObject.tsC.year02/cloud.outputObject.tlcsAWS.year02;
    cloud.outputObject.ltS.year03 = cloud.outputObject.tsC.year03/cloud.outputObject.tlcsAWS.year03;
    cloud.outputObject.ltS.year04 = cloud.outputObject.tsC.year04/cloud.outputObject.tlcsAWS.year04;
    cloud.outputObject.ltS.year05 = cloud.outputObject.tsC.year05/cloud.outputObject.tlcsAWS.year05;

    //  $/GB Logical for AWS only
    cloud.outputObject.lAWS.year01 = cloud.outputObject.tAWSoC.year01/cloud.outputObject.tlcsAWS.year01;
    cloud.outputObject.lAWS.year02 = cloud.outputObject.tAWSoC.year02/cloud.outputObject.tlcsAWS.year02;
    cloud.outputObject.lAWS.year03 = cloud.outputObject.tAWSoC.year03/cloud.outputObject.tlcsAWS.year03;
    cloud.outputObject.lAWS.year04 = cloud.outputObject.tAWSoC.year04/cloud.outputObject.tlcsAWS.year04;
    cloud.outputObject.lAWS.year05 = cloud.outputObject.tAWSoC.year05/cloud.outputObject.tlcsAWS.year05;

    console.log('CLOUD Cost Output (GREEN BOX)');
    console.log(cloud.outputObject);
    model.updateLocalStore(cloud.outputObject,'cloudOutputObject');

  };





