
let costs = {};

costs.init = function () {


  let costsProperties = [
                            // < Legacy Solution
    'compute',
    'array',
    'backup',
    'tape',
    'networkArrayCompute',
    'networkBackup',
    'networkTape',
    'networkTotal',
    'totalCapex',
    'adminArray',
    'adminBackup',
    'adminTape',
    'adminTotal',
    'spaceArrayCompute',
    'spaceBackup',
    'spaceTape',
    'spaceTotal',
    'powerCoolingArrayCompute',
    'powerCoolingBackup',
    'powerCoolingTape',
    'powerCoolingTotal',
    'totalOpex',
    'totalSolution',
                          // < DVX
    'computeHostFlash',
    'dVXsW',
    'sVXhW',
    'networkDVXCompute',
    'adminDVXCompute',
    'spaceDVXCompute',
    'powerCoolingDVXCompute',
    'totalOpex',
    'totalDVX'
  ];

  costs.costsS1 = {};
  costs.costsS2 = {};

  let i = 0;
  for (;i<costsProperties.length;i++){
    costs.costsS1[costsProperties[i]] = {};
    costs.costsS2[costsProperties[i]] = {};
  }

  console.log('Costs Init | Objects:');
  console.log(costs.costsS1);
  console.log(costs.costsS2);

};

costs.outputLevel_02_costsAll = function () {

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');         //  Get Basic User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');         //  Get Basic User Inputs S2

  let siteCalcsS1 = model.getLocalStore ('siteCalcsS1');               //  Get Basic User Inputs S1
  let siteCalcsS2 = model.getLocalStore ('siteCalcsS2');               //  Get Basic User Inputs S1


  costs.costsS1.compute.year01 = 0 === basicDataS1.existing_nodes ? siteCalcsS1.computeNodeHWPriceArray.year01 : 0;
  costs.costsS1.compute.year02 = 0 === basicDataS1.existing_nodes ? siteCalcsS1.computeNodeHWPriceArray.year02 - costs.costsS1.compute.year01: 0 - costs.costsS1.compute.year01;
  costs.costsS1.compute.year03 = 0 === basicDataS1.existing_nodes ? siteCalcsS1.computeNodeHWPriceArray.year03 - costs.costsS1.compute.year01 - costs.costsS1.compute.year02 : 0 - costs.costsS1.compute.year01 - costs.costsS1.compute.year02;





  console.log('TEST');
  console.log(siteCalcsS1.computeNodeHWPriceArray.year02  - costs.costsS1.compute.year01);




  console.log('COSTS S1');
  console.log(costs.costsS1);
  model.updateLocalStore(costs.costsS1,'costsS1');


  costs.costsS2.compute.year01 = 0 === basicDataS2.existing_nodes ? siteCalcsS2.computeNodeHWPriceArray.year01 : 0;
  costs.costsS2.compute.year02 = 0 === basicDataS2.existing_nodes ? siteCalcsS2.computeNodeHWPriceArray.year02 - costs.costsS2.compute.year01 : 0 - costs.costsS2.compute.year01;
  costs.costsS2.compute.year03 = 0 === basicDataS2.existing_nodes ? siteCalcsS2.computeNodeHWPriceArray.year03 - costs.costsS2.compute.year01 - costs.costsS2.compute.year02 : 0 - costs.costsS2.compute.year01 - costs.costsS2.compute.year02;;


  console.log('COSTS S2');
  console.log(costs.costsS2);
  model.updateLocalStore(costs.costsS2,'costsS2');

};