
let costs = {};

costs.init = function () {

  let costsProperties = [

                          // < Accessory Data (Bottom of spreadsheet)
    'costsA44',
    'costsB44',
    'costsC44',
    'costsD44',
    'DVXhwNums',

                          // < Legacy Solution
    'compute',
    'array',
    'backup',
    'tape',
    'networkArrayCompute',
    'networkBackup',
    'networkTape',
    'networkTotal',
    'totalCapexLegacy',
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
    'totalOpexLegacy',
    'totalSolutionLegacy',
                          // < DVX Solution
    'computeHostFlash',
    'swDVX',
    'hwDVX',
    'networkDVXCompute',
    'totalCapexDVX',
    'cloudDVXInclOpex',
    'adminDVXCompute',
    'spaceDVXCompute',
    'powerCoolingDVXCompute',
    'totalOpexDVX',
    'totalSolutionDVX'
  ];

  costs.costsS1 = {};
  costs.costsS2 = {};

  let i = 0;
  for (;i<costsProperties.length;i++){

    if (costsProperties[i] === 'costsA44' || costsProperties[i] === 'costsB44' || costsProperties[i] === 'costsC44' || costsProperties[i] === 'costsD44' ){
      costs.costsS1[costsProperties[i]] = null;
      costs.costsS2[costsProperties[i]] = null;
    } else {
      costs.costsS1[costsProperties[i]] = {};
      costs.costsS2[costsProperties[i]] = {};
    }
  }

  console.log('Costs Init | Objects:');
  console.log(costs.costsS1);
  console.log(costs.costsS2);
};

costs.outputLevel_02_CostsAll = function () {

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');         //  Get Basic User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');         //  Get Basic User Inputs S2

  let siteCalcsS1 = model.getLocalStore ('siteCalcsS1');               //  Get Basic User Inputs S1
  let siteCalcsS2 = model.getLocalStore ('siteCalcsS2');               //  Get Basic User Inputs S1


  //  ACCESSORY Data:

  costs.costsS1.costsB44 = 1 === Number(basicDataS1.tape);
  costs.costsS1.costsC44 = 1 === Number(basicDataS2.tape);
  costs.costsS1.costsD44 = (0 === Number(basicDataS2.primary_stor) && 1 === Number(basicDataS2.secondary_stor));
  costs.costsS1.costsA44 = (true === costs.costsS1.costsB44 || true === costs.costsS1.costsC44 || true === costs.costsS1.costsD44);

  costs.costsS1.DVXhwNums.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodesRequiredBackup.year01: siteCalcsS1.dataNodesRequiredPrimary.year01;
  costs.costsS1.DVXhwNums.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodesRequiredBackup.year02: siteCalcsS1.dataNodesRequiredPrimary.year02;
  costs.costsS1.DVXhwNums.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodesRequiredBackup.year03: siteCalcsS1.dataNodesRequiredPrimary.year03;


  //  Legacy:

  costs.costsS1.compute.year01 = (0 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeHWPriceArray.year01 : 0);
  costs.costsS1.compute.year02 = (0 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeHWPriceArray.year02 - costs.costsS1.compute.year01: 0);
  costs.costsS1.compute.year03 = (0 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeHWPriceArray.year03 - costs.costsS1.compute.year01 - costs.costsS1.compute.year02 : 0);

  costs.costsS1.array.year01 = site.siteCalcsS1.arrayPrice.year01;
  costs.costsS1.array.year02 = site.siteCalcsS1.arrayPrice.year02 - costs.costsS1.array.year01;
  costs.costsS1.array.year03 = site.siteCalcsS1.arrayPrice.year03 - costs.costsS1.array.year01 - costs.costsS1.array.year02;

  costs.costsS1.backup.year01 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPrice.year01 : 0);
  costs.costsS1.backup.year02 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPrice.year02 - costs.costsS1.backup.year01 : 0);
  costs.costsS1.backup.year03 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPrice.year03 - costs.costsS1.backup.year01 - costs.costsS1.backup.year02 : 0);

  costs.costsS1.tape.year01 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePrice.year01 : 0;
  costs.costsS1.tape.year02 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePrice.year02 - costs.costsS1.tape.year01 : 0;
  costs.costsS1.tape.year03 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePrice.year03 - costs.costsS1.tape.year01 - costs.costsS1.tape.year02 : 0;

  costs.costsS1.networkArrayCompute.year01 = site.siteCalcsS1.computeNetworkCosts.year01 + site.siteCalcsS1.arrayNetworkCosts.year01;
  costs.costsS1.networkArrayCompute.year02 = site.siteCalcsS1.computeNetworkCosts.year02 + site.siteCalcsS1.arrayNetworkCosts.year02 - costs.costsS1.networkArrayCompute.year01;
  costs.costsS1.networkArrayCompute.year03 = site.siteCalcsS1.computeNetworkCosts.year03 + site.siteCalcsS1.arrayNetworkCosts.year03 - costs.costsS1.networkArrayCompute.year01 - costs.costsS1.networkArrayCompute.year02;

  costs.costsS1.networkBackup.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupNetworkCosts.year01 : 0;
  costs.costsS1.networkBackup.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupNetworkCosts.year02 : 0;
  costs.costsS1.networkBackup.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupNetworkCosts.year03 : 0;

  costs.costsS1.networkTape.year01 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeNetworkCosts.year01 : 0;
  costs.costsS1.networkTape.year02 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeNetworkCosts.year02 - costs.costsS1.networkTape.year01 : 0;
  costs.costsS1.networkTape.year03 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeNetworkCosts.year03 - costs.costsS1.networkTape.year01 - costs.costsS1.networkTape.year02 : 0;

  costs.costsS1.networkTotal.year01 = costs.costsS1.networkArrayCompute.year01 + costs.costsS1.networkBackup.year01 + costs.costsS1.networkTape.year01;
  costs.costsS1.networkTotal.year02 = costs.costsS1.networkArrayCompute.year02 + costs.costsS1.networkBackup.year02 + costs.costsS1.networkTape.year02;
  costs.costsS1.networkTotal.year03 = costs.costsS1.networkArrayCompute.year03 + costs.costsS1.networkBackup.year03 + costs.costsS1.networkTape.year03;

  costs.costsS1.totalCapexLegacy.year01 = costs.costsS1.compute.year01 + costs.costsS1.array.year01 + costs.costsS1.backup.year01 + costs.costsS1.tape.year01 + costs.costsS1.networkTotal.year01;
  costs.costsS1.totalCapexLegacy.year02 = costs.costsS1.compute.year02 + costs.costsS1.array.year02 + costs.costsS1.backup.year02 + costs.costsS1.tape.year02 + costs.costsS1.networkTotal.year02;
  costs.costsS1.totalCapexLegacy.year03 = costs.costsS1.compute.year03 + costs.costsS1.array.year03 + costs.costsS1.backup.year03 + costs.costsS1.tape.year03 + costs.costsS1.networkTotal.year03;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.adminArray.year01 = siteCalcsS1.arrayAdminCosts.year01;
  costs.costsS1.adminArray.year02 = siteCalcsS1.arrayAdminCosts.year02;
  costs.costsS1.adminArray.year03 = siteCalcsS1.arrayAdminCosts.year03;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.adminBackup.year01 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupAdminCosts.year01 : 0);
  costs.costsS1.adminBackup.year02 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupAdminCosts.year02 : 0);
  costs.costsS1.adminBackup.year03 = (1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupAdminCosts.year03 : 0);

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.adminTape.year01 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeAdminCosts.year01 : 0;
  costs.costsS1.adminTape.year02 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeAdminCosts.year02 : 0;
  costs.costsS1.adminTape.year03 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeAdminCosts.year03 : 0;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.adminTotal.year01 = costs.costsS1.adminArray.year01 + costs.costsS1.adminBackup.year01 + costs.costsS1.adminTape.year01;
  costs.costsS1.adminTotal.year02 = costs.costsS1.adminArray.year02 + costs.costsS1.adminBackup.year02 + costs.costsS1.adminTape.year02;
  costs.costsS1.adminTotal.year03 = costs.costsS1.adminArray.year03 + costs.costsS1.adminBackup.year03 + costs.costsS1.adminTape.year03;

  costs.costsS1.spaceArrayCompute.year01 = siteCalcsS1.computeRackCosts.year01 + siteCalcsS1.arrayRackCosts.year01;
  costs.costsS1.spaceArrayCompute.year02 = siteCalcsS1.computeRackCosts.year02 + siteCalcsS1.arrayRackCosts.year02;
  costs.costsS1.spaceArrayCompute.year03 = siteCalcsS1.computeRackCosts.year03 + siteCalcsS1.arrayRackCosts.year03;

  costs.costsS1.spaceBackup.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupRackCosts.year01 : 0;
  costs.costsS1.spaceBackup.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupRackCosts.year02 : 0;
  costs.costsS1.spaceBackup.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupRackCosts.year03 : 0;

  costs.costsS1.spaceTape.year01 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeRackCosts.year01 : 0;
  costs.costsS1.spaceTape.year02 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeRackCosts.year02 : 0;
  costs.costsS1.spaceTape.year03 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapeRackCosts.year03 : 0;

  costs.costsS1.spaceTotal.year01 = costs.costsS1.spaceArrayCompute.year01 + costs.costsS1.spaceBackup.year01 + costs.costsS1.spaceTape.year01;
  costs.costsS1.spaceTotal.year02 = costs.costsS1.spaceArrayCompute.year02 + costs.costsS1.spaceBackup.year02 + costs.costsS1.spaceTape.year02;
  costs.costsS1.spaceTotal.year03 = costs.costsS1.spaceArrayCompute.year03 + costs.costsS1.spaceBackup.year03 + costs.costsS1.spaceTape.year03;

  costs.costsS1.powerCoolingArrayCompute.year01 = siteCalcsS1.computePowerCoolingCosts.year01 + siteCalcsS1.arrayPowerCoolingCosts.year01;
  costs.costsS1.powerCoolingArrayCompute.year02 = siteCalcsS1.computePowerCoolingCosts.year02 + siteCalcsS1.arrayPowerCoolingCosts.year02;
  costs.costsS1.powerCoolingArrayCompute.year03 = siteCalcsS1.computePowerCoolingCosts.year03 + siteCalcsS1.arrayPowerCoolingCosts.year03;

  costs.costsS1.powerCoolingBackup.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPowerCoolingCosts.year01 : 0;
  costs.costsS1.powerCoolingBackup.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPowerCoolingCosts.year02 : 0;
  costs.costsS1.powerCoolingBackup.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.backupPowerCoolingCosts.year03 : 0;

  costs.costsS1.powerCoolingTape.year01 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePowerCoolingCosts.year01 : 0;
  costs.costsS1.powerCoolingTape.year02 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePowerCoolingCosts.year02 : 0;
  costs.costsS1.powerCoolingTape.year03 = 1 === Number(basicDataS1.tape) ? siteCalcsS1.tapePowerCoolingCosts.year03 : 0;

  costs.costsS1.powerCoolingTotal.year01 = costs.costsS1.powerCoolingArrayCompute.year01 + costs.costsS1.powerCoolingBackup.year01 + costs.costsS1.powerCoolingTape.year01;
  costs.costsS1.powerCoolingTotal.year02 = costs.costsS1.powerCoolingArrayCompute.year02 + costs.costsS1.powerCoolingBackup.year02 + costs.costsS1.powerCoolingTape.year02;
  costs.costsS1.powerCoolingTotal.year03 = costs.costsS1.powerCoolingArrayCompute.year03 + costs.costsS1.powerCoolingBackup.year03 + costs.costsS1.powerCoolingTape.year03;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.totalOpexLegacy.year01 = costs.costsS1.adminTotal.year01 + costs.costsS1.spaceTotal.year01 + costs.costsS1.powerCoolingTotal.year01 + costs.costsS1.networkTotal.year01;
  costs.costsS1.totalOpexLegacy.year02 = costs.costsS1.adminTotal.year02 + costs.costsS1.spaceTotal.year02 + costs.costsS1.powerCoolingTotal.year02 + costs.costsS1.networkTotal.year02;
  costs.costsS1.totalOpexLegacy.year03 = costs.costsS1.adminTotal.year03 + costs.costsS1.spaceTotal.year03 + costs.costsS1.powerCoolingTotal.year03 + costs.costsS1.networkTotal.year03;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.totalSolutionLegacy.year01 = costs.costsS1.totalOpexLegacy.year01 + costs.costsS1.totalCapexLegacy.year01;
  costs.costsS1.totalSolutionLegacy.year02 = costs.costsS1.totalOpexLegacy.year02 + costs.costsS1.totalCapexLegacy.year02;
  costs.costsS1.totalSolutionLegacy.year03 = costs.costsS1.totalOpexLegacy.year03 + costs.costsS1.totalCapexLegacy.year03;

  //  DVX:

  costs.costsS1.computeHostFlash.year01 = 1 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeFlashPrice.year01 : siteCalcsS1.computeNodeHWPriceDVX.year01;
  costs.costsS1.computeHostFlash.year02 = 1 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeFlashPrice.year02 - costs.costsS1.computeHostFlash.year01 : siteCalcsS1.computeNodeHWPriceDVX.year02 - costs.costsS1.computeHostFlash.year01;
  costs.costsS1.computeHostFlash.year03 = 1 === Number(basicDataS1.existing_nodes) ? siteCalcsS1.computeNodeFlashPrice.year03 - costs.costsS1.computeHostFlash.year01 - costs.costsS1.computeHostFlash.year02 : siteCalcsS1.computeNodeHWPriceDVX.year03 - costs.costsS1.computeHostFlash.year01 - costs.costsS1.computeHostFlash.year02;

  costs.costsS1.swDVX.year01 = siteCalcsS1.computeNodeSWPrice.year01;
  costs.costsS1.swDVX.year02 = siteCalcsS1.computeNodeSWPrice.year02 - costs.costsS1.swDVX.year01;
  costs.costsS1.swDVX.year03 = siteCalcsS1.computeNodeSWPrice.year03 - costs.costsS1.swDVX.year01 - costs.costsS1.swDVX.year02;

  costs.costsS1.hwDVX.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodePriceBackup.year01 : siteCalcsS1.dataNodePricePrimary.year01;
  costs.costsS1.hwDVX.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodePriceBackup.year02 - costs.costsS1.hwDVX.year01 : siteCalcsS1.dataNodePricePrimary.year02 - costs.costsS1.hwDVX.year01;
  costs.costsS1.hwDVX.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dataNodePriceBackup.year03 - costs.costsS1.hwDVX.year01 - costs.costsS1.hwDVX.year02 : siteCalcsS1.dataNodePricePrimary.year03 - costs.costsS1.hwDVX.year01 - costs.costsS1.hwDVX.year02;

  costs.costsS1.networkDVXCompute.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXNetworkCostsBackup.year01 : siteCalcsS1.dVXNetworkCostsPrimary.year01;
  costs.costsS1.networkDVXCompute.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXNetworkCostsBackup.year02 - costs.costsS1.networkDVXCompute.year01 : siteCalcsS1.dVXNetworkCostsPrimary.year02 - costs.costsS1.networkDVXCompute.year01;
  costs.costsS1.networkDVXCompute.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXNetworkCostsBackup.year03 - costs.costsS1.networkDVXCompute.year01 - costs.costsS1.networkDVXCompute.year02 : siteCalcsS1.dVXNetworkCostsPrimary.year03 - costs.costsS1.networkDVXCompute.year01 - costs.costsS1.networkDVXCompute.year02;


  //  MAY BE A MISTAKE IN THE SPREADSHEET:  (B28:B31 >>  C28:C30  -  No more 31?)
  costs.costsS1.totalCapexDVX.year01 = costs.costsS1.computeHostFlash.year01 + costs.costsS1.swDVX.year01 + costs.costsS1.hwDVX.year01 + costs.costsS1.networkDVXCompute.year01;
  costs.costsS1.totalCapexDVX.year02 = costs.costsS1.computeHostFlash.year02 + costs.costsS1.swDVX.year02 + costs.costsS1.hwDVX.year02;
  costs.costsS1.totalCapexDVX.year03 = costs.costsS1.computeHostFlash.year03 + costs.costsS1.swDVX.year03 + costs.costsS1.hwDVX.year03;

  costs.costsS1.cloudDVXInclOpex.year01 = true === costs.costsS1.costsA44 ? siteCalcsS1.cloudDVXPrice.year01 : 0;
  costs.costsS1.cloudDVXInclOpex.year02 = true === costs.costsS1.costsA44 ? siteCalcsS1.cloudDVXPrice.year02 : 0;
  costs.costsS1.cloudDVXInclOpex.year03 = true === costs.costsS1.costsA44 ? siteCalcsS1.cloudDVXPrice.year03 : 0;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  costs.costsS1.adminDVXCompute.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXAdminCostsBackup.year01 : siteCalcsS1.dVXAdminCostsPrimary.year01;
  costs.costsS1.adminDVXCompute.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXAdminCostsBackup.year02 : siteCalcsS1.dVXAdminCostsPrimary.year02;
  costs.costsS1.adminDVXCompute.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXAdminCostsBackup.year03 : siteCalcsS1.dVXAdminCostsPrimary.year03;

  costs.costsS1.spaceDVXCompute.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXRackCostsBackup.year01 : siteCalcsS1.dVXRackCostsPrimary.year01;
  costs.costsS1.spaceDVXCompute.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXRackCostsBackup.year02 : siteCalcsS1.dVXRackCostsPrimary.year02;
  costs.costsS1.spaceDVXCompute.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXRackCostsBackup.year03 : siteCalcsS1.dVXRackCostsPrimary.year03;

  costs.costsS1.powerCoolingDVXCompute.year01 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXPowerCoolingCostsBackup.year01 : siteCalcsS1.dVXPowerCoolingCostsPrimary.year01;
  costs.costsS1.powerCoolingDVXCompute.year02 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXPowerCoolingCostsBackup.year02 : siteCalcsS1.dVXPowerCoolingCostsPrimary.year02;
  costs.costsS1.powerCoolingDVXCompute.year03 = 1 === Number(basicDataS1.secondary_stor) ? siteCalcsS1.dVXPowerCoolingCostsBackup.year03 : siteCalcsS1.dVXPowerCoolingCostsPrimary.year03;

  costs.costsS1.totalOpexDVX.year01 = costs.costsS1.cloudDVXInclOpex.year01 + costs.costsS1.adminDVXCompute.year01 + costs.costsS1.spaceDVXCompute.year01 + costs.costsS1.powerCoolingDVXCompute.year01;
  costs.costsS1.totalOpexDVX.year02 = costs.costsS1.cloudDVXInclOpex.year02 + costs.costsS1.adminDVXCompute.year02 + costs.costsS1.spaceDVXCompute.year02 + costs.costsS1.powerCoolingDVXCompute.year02;
  costs.costsS1.totalOpexDVX.year03 = costs.costsS1.cloudDVXInclOpex.year03 + costs.costsS1.adminDVXCompute.year03 + costs.costsS1.spaceDVXCompute.year03 + costs.costsS1.powerCoolingDVXCompute.year03;

  costs.costsS1.totalSolutionDVX.year01 = costs.costsS1.totalCapexDVX.year01 + costs.costsS1.totalOpexDVX.year01;
  costs.costsS1.totalSolutionDVX.year02 = costs.costsS1.totalCapexDVX.year02 + costs.costsS1.totalOpexDVX.year02;
  costs.costsS1.totalSolutionDVX.year03 = costs.costsS1.totalCapexDVX.year03 + costs.costsS1.totalOpexDVX.year03;


  // console.log('TEST');
  // console.log(costs.costsS1.hwDVX.year02);
  // console.log(costs.costsS1.computeHostFlash.year02 + costs.costsS1.swDVX.year02 + costs.costsS1.hwDVX.year02);

  console.log('COSTS S1:');
  console.log(costs.costsS1);
  model.updateLocalStore(costs.costsS1,'costsS1');



  //  ACCESSORY Data:

  costs.costsS2.DVXhwNums.year01 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodesRequiredBackup.year01: siteCalcsS2.dataNodesRequiredPrimary.year01;
  costs.costsS2.DVXhwNums.year02 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodesRequiredBackup.year02: siteCalcsS2.dataNodesRequiredPrimary.year02;
  costs.costsS2.DVXhwNums.year03 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodesRequiredBackup.year03: siteCalcsS2.dataNodesRequiredPrimary.year03;



  //  Legacy:

  costs.costsS2.compute.year01 = 0 === Number(basicDataS2.primary_stor) ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeHWPriceArray.year01 : 0);
  costs.costsS2.compute.year02 = 0 === Number(basicDataS2.primary_stor) ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeHWPriceArray.year02 : 0);
  costs.costsS2.compute.year03 = 0 === Number(basicDataS2.primary_stor) ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeHWPriceArray.year03 : 0);

  costs.costsS2.array.year01 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayPrice.year01 : 0);
  costs.costsS2.array.year02 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayPrice.year02 : 0) - costs.costsS2.array.year01;
  costs.costsS2.array.year03 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayPrice.year03 : 0) - costs.costsS2.array.year01 - costs.costsS2.array.year02;

  costs.costsS2.backup.year01 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPrice.year01 : 0);
  costs.costsS2.backup.year02 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPrice.year02 : 0) - costs.costsS2.backup.year01;
  costs.costsS2.backup.year03 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPrice.year03 : 0) - costs.costsS2.backup.year01 - costs.costsS2.backup.year02;

  costs.costsS2.tape.year01 = (1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePrice.year01 : 0);
  costs.costsS2.tape.year02 = (1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePrice.year02 : 0) - costs.costsS2.tape.year01;
  costs.costsS2.tape.year03 = (1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePrice.year03 : 0) - costs.costsS2.tape.year01 - costs.costsS2.tape.year02;

  costs.costsS2.networkArrayCompute.year01 = (1 === Number(basicDataS2.primary_stor) ? site.siteCalcsS2.computeNetworkCosts.year01 + site.siteCalcsS2.arrayNetworkCosts.year01 : 0);
  costs.costsS2.networkArrayCompute.year02 = (1 === Number(basicDataS2.primary_stor) ? site.siteCalcsS2.computeNetworkCosts.year02 + site.siteCalcsS2.arrayNetworkCosts.year02 - costs.costsS2.networkArrayCompute.year01: 0);
  costs.costsS2.networkArrayCompute.year03 = (1 === Number(basicDataS2.primary_stor) ? site.siteCalcsS2.computeNetworkCosts.year03 + site.siteCalcsS2.arrayNetworkCosts.year03 - costs.costsS2.networkArrayCompute.year01 - costs.costsS2.networkArrayCompute.year02 : 0);

  costs.costsS2.networkBackup.year01 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupNetworkCosts.year01 : 0;
  costs.costsS2.networkBackup.year02 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupNetworkCosts.year02 - costs.costsS2.networkBackup.year01 : 0;
  costs.costsS2.networkBackup.year03 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupNetworkCosts.year03 - costs.costsS2.networkBackup.year01 - costs.costsS2.networkBackup.year02 : 0;

  costs.costsS2.networkTape.year01 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeNetworkCosts.year01 : 0;
  costs.costsS2.networkTape.year02 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeNetworkCosts.year02 - costs.costsS2.networkTape.year01 : 0;
  costs.costsS2.networkTape.year03 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeNetworkCosts.year03 - costs.costsS2.networkTape.year01 - costs.costsS2.networkTape.year02 : 0;

  costs.costsS2.networkTotal.year01 = costs.costsS2.networkArrayCompute.year01 + costs.costsS2.networkBackup.year01 + costs.costsS2.networkTape.year01;
  costs.costsS2.networkTotal.year02 = costs.costsS2.networkArrayCompute.year02 + costs.costsS2.networkBackup.year02 + costs.costsS2.networkTape.year02;
  costs.costsS2.networkTotal.year03 = costs.costsS2.networkArrayCompute.year03 + costs.costsS2.networkBackup.year03 + costs.costsS2.networkTape.year03;


  costs.costsS2.totalCapexLegacy.year01 = costs.costsS2.compute.year01 + costs.costsS2.array.year01 + costs.costsS2.backup.year01 + costs.costsS2.tape.year01 + costs.costsS2.networkTotal.year01;
  costs.costsS2.totalCapexLegacy.year02 = costs.costsS2.compute.year02 + costs.costsS2.array.year02 + costs.costsS2.backup.year02 + costs.costsS2.tape.year02 + costs.costsS2.networkTotal.year02;
  costs.costsS2.totalCapexLegacy.year03 = costs.costsS2.compute.year03 + costs.costsS2.array.year03 + costs.costsS2.backup.year03 + costs.costsS2.tape.year03 + costs.costsS2.networkTotal.year03;


  costs.costsS2.adminArray.year01 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayAdminCosts.year01 : 0;
  costs.costsS2.adminArray.year02 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayAdminCosts.year02 : 0;
  costs.costsS2.adminArray.year03 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.arrayAdminCosts.year03 : 0;

  costs.costsS2.adminBackup.year01 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupAdminCosts.year01 : 0);
  costs.costsS2.adminBackup.year02 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupAdminCosts.year02 : 0);
  costs.costsS2.adminBackup.year03 = (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupAdminCosts.year03 : 0);

  costs.costsS2.adminTape.year01 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeAdminCosts.year01 : 0;
  costs.costsS2.adminTape.year02 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeAdminCosts.year02 : 0;
  costs.costsS2.adminTape.year03 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeAdminCosts.year03 : 0;

  costs.costsS2.adminTotal.year01 = costs.costsS2.adminArray.year01 + costs.costsS2.adminBackup.year01 + costs.costsS2.adminTape.year01;
  costs.costsS2.adminTotal.year02 = costs.costsS2.adminArray.year02 + costs.costsS2.adminBackup.year02 + costs.costsS2.adminTape.year02;
  costs.costsS2.adminTotal.year03 = costs.costsS2.adminArray.year03 + costs.costsS2.adminBackup.year03 + costs.costsS2.adminTape.year03;




  costs.costsS2.spaceArrayCompute.year01 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeRackCosts.year01 + siteCalcsS2.arrayRackCosts.year01 : 0;
  costs.costsS2.spaceArrayCompute.year02 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeRackCosts.year02 + siteCalcsS2.arrayRackCosts.year02 : 0;
  costs.costsS2.spaceArrayCompute.year03 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeRackCosts.year03 + siteCalcsS2.arrayRackCosts.year03 : 0;

  costs.costsS2.spaceBackup.year01 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupRackCosts.year01 : 0;
  costs.costsS2.spaceBackup.year02 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupRackCosts.year02 : 0;
  costs.costsS2.spaceBackup.year03 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupRackCosts.year03 : 0;

  costs.costsS2.spaceTape.year01 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeRackCosts.year01 : 0;
  costs.costsS2.spaceTape.year02 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeRackCosts.year02 : 0;
  costs.costsS2.spaceTape.year03 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapeRackCosts.year03 : 0;

  costs.costsS2.spaceTotal.year01 = costs.costsS2.spaceArrayCompute.year01 + costs.costsS2.spaceBackup.year01 + costs.costsS2.spaceTape.year01;
  costs.costsS2.spaceTotal.year02 = costs.costsS2.spaceArrayCompute.year02 + costs.costsS2.spaceBackup.year02 + costs.costsS2.spaceTape.year02;
  costs.costsS2.spaceTotal.year03 = costs.costsS2.spaceArrayCompute.year03 + costs.costsS2.spaceBackup.year03 + costs.costsS2.spaceTape.year03;




  costs.costsS2.powerCoolingArrayCompute.year01 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computePowerCoolingCosts.year01 + siteCalcsS2.arrayPowerCoolingCosts.year01 : 0;
  costs.costsS2.powerCoolingArrayCompute.year02 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computePowerCoolingCosts.year02 + siteCalcsS2.arrayPowerCoolingCosts.year02 : 0;
  costs.costsS2.powerCoolingArrayCompute.year03 = 1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computePowerCoolingCosts.year03 + siteCalcsS2.arrayPowerCoolingCosts.year03 : 0;

  costs.costsS2.powerCoolingBackup.year01 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPowerCoolingCosts.year01 : 0;
  costs.costsS2.powerCoolingBackup.year02 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPowerCoolingCosts.year02 : 0;
  costs.costsS2.powerCoolingBackup.year03 = 1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.backupPowerCoolingCosts.year03 : 0;

  costs.costsS2.powerCoolingTape.year01 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePowerCoolingCosts.year01 : 0;
  costs.costsS2.powerCoolingTape.year02 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePowerCoolingCosts.year02 : 0;
  costs.costsS2.powerCoolingTape.year03 = 1 === Number(basicDataS2.tape) ? siteCalcsS2.tapePowerCoolingCosts.year03 : 0;

  costs.costsS2.powerCoolingTotal.year01 = costs.costsS2.powerCoolingArrayCompute.year01 + costs.costsS2.powerCoolingBackup.year01 + costs.costsS2.powerCoolingTape.year01;
  costs.costsS2.powerCoolingTotal.year02 = costs.costsS2.powerCoolingArrayCompute.year02 + costs.costsS2.powerCoolingBackup.year02 + costs.costsS2.powerCoolingTape.year02;
  costs.costsS2.powerCoolingTotal.year03 = costs.costsS2.powerCoolingArrayCompute.year03 + costs.costsS2.powerCoolingBackup.year03 + costs.costsS2.powerCoolingTape.year03;

  costs.costsS2.totalOpexLegacy.year01 = costs.costsS2.adminTotal.year01 + costs.costsS2.spaceTotal.year01 + costs.costsS2.powerCoolingTotal.year01 + costs.costsS2.networkTotal.year01;
  costs.costsS2.totalOpexLegacy.year02 = costs.costsS2.adminTotal.year02 + costs.costsS2.spaceTotal.year02 + costs.costsS2.powerCoolingTotal.year02 + costs.costsS2.networkTotal.year02;
  costs.costsS2.totalOpexLegacy.year03 = costs.costsS2.adminTotal.year03 + costs.costsS2.spaceTotal.year03 + costs.costsS2.powerCoolingTotal.year03 + costs.costsS2.networkTotal.year03;

  costs.costsS2.totalSolutionLegacy.year01 = costs.costsS2.totalOpexLegacy.year01 + costs.costsS2.totalCapexLegacy.year01;
  costs.costsS2.totalSolutionLegacy.year02 = costs.costsS2.totalOpexLegacy.year02 + costs.costsS2.totalCapexLegacy.year02;
  costs.costsS2.totalSolutionLegacy.year03 = costs.costsS2.totalOpexLegacy.year03 + costs.costsS2.totalCapexLegacy.year03;

  //  DVX:

  //  SiteCalcs B26 and B27 is an DIV/0 Error (NaN) so result can return: null
  //  siteCalcsS2.computeNodeFlashPrice  >>  NaN
  //  siteCalcsS2.computeNodeHWPriceDVX  >>  NaN


  costs.costsS2.computeHostFlash.year01 = 1 === Number(basicDataS2.primary_stor ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeFlashPrice.year01 : siteCalcsS2.computeNodeHWPriceDVX.year01 )) - 0;
  costs.costsS2.computeHostFlash.year02 = 1 === Number(basicDataS2.primary_stor ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeFlashPrice.year02 : siteCalcsS2.computeNodeHWPriceDVX.year02 )) - costs.costsS2.computeHostFlash.year01;
  costs.costsS2.computeHostFlash.year03 = 1 === Number(basicDataS2.primary_stor ? 0 : (1 === Number(basicDataS2.existing_nodes) ? siteCalcsS2.computeNodeFlashPrice.year03 : siteCalcsS2.computeNodeHWPriceDVX.year03 )) - costs.costsS2.computeHostFlash.year01 - costs.costsS2.computeHostFlash.year02;

  costs.costsS2.swDVX.year01 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeNodeSWPrice.year01 : 0);
  costs.costsS2.swDVX.year02 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeNodeSWPrice.year02 : 0) - costs.costsS2.swDVX.year01;
  costs.costsS2.swDVX.year03 = (1 === Number(basicDataS2.primary_stor) ? siteCalcsS2.computeNodeSWPrice.year03 : 0) - costs.costsS2.swDVX.year01 - costs.costsS2.swDVX.year02;

  costs.costsS2.hwDVX.year01 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodePriceBackup.year01 : siteCalcsS2.dataNodePricePrimary.year01 ) :0);
  costs.costsS2.hwDVX.year02 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodePriceBackup.year02 : siteCalcsS2.dataNodePricePrimary.year02 ) :0) - costs.costsS2.hwDVX.year01;
  costs.costsS2.hwDVX.year03 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dataNodePriceBackup.year03 : siteCalcsS2.dataNodePricePrimary.year03 ) :0) - costs.costsS2.hwDVX.year01 - costs.costsS2.hwDVX.year02;

  costs.costsS2.networkDVXCompute.year01 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dVXNetworkCostsBackup.year01 : siteCalcsS2.dVXNetworkCostsPrimary.year01 ) :0);
  costs.costsS2.networkDVXCompute.year02 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dVXNetworkCostsBackup.year02 : siteCalcsS2.dVXNetworkCostsPrimary.year02 ) :0) - costs.costsS2.networkDVXCompute.year01;
  costs.costsS2.networkDVXCompute.year03 = (1 === Number(basicDataS2.primary_stor) ? (1 === Number(basicDataS2.secondary_stor) ? siteCalcsS2.dVXNetworkCostsBackup.year03 : siteCalcsS2.dVXNetworkCostsPrimary.year03 ) :0) - costs.costsS2.networkDVXCompute.year01 - costs.costsS2.networkDVXCompute.year02;



  //  MAY BE A MISTAKE IN THE SPREADSHEET:  (B28:B31 >>  C28:C30  -  No more 31?)
  costs.costsS2.totalCapexDVX.year01 = costs.costsS2.computeHostFlash.year01 + costs.costsS2.swDVX.year01 + costs.costsS2.hwDVX.year01;
  costs.costsS2.totalCapexDVX.year02 = costs.costsS2.computeHostFlash.year02 + costs.costsS2.swDVX.year02 + costs.costsS2.hwDVX.year02;
  costs.costsS2.totalCapexDVX.year03 = costs.costsS2.computeHostFlash.year03 + costs.costsS2.swDVX.year03 + costs.costsS2.hwDVX.year03;

  costs.costsS2.cloudDVXInclOpex.year01 = 'N/A';
  costs.costsS2.cloudDVXInclOpex.year02 = 'N/A';
  costs.costsS2.cloudDVXInclOpex.year03 = 'N/A';

  costs.costsS2.adminDVXCompute.year01 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXAdminCostsBackup.year01 : siteCalcsS2.dVXAdminCostsPrimary.year01 ) : 0;
  costs.costsS2.adminDVXCompute.year02 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXAdminCostsBackup.year02 : siteCalcsS2.dVXAdminCostsPrimary.year02 ) : 0;
  costs.costsS2.adminDVXCompute.year03 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXAdminCostsBackup.year03 : siteCalcsS2.dVXAdminCostsPrimary.year03 ) : 0;

  costs.costsS2.spaceDVXCompute.year01 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXRackCostsBackup.year01 : siteCalcsS2.dVXRackCostsPrimary.year01 ) : 0;
  costs.costsS2.spaceDVXCompute.year02 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXRackCostsBackup.year02 : siteCalcsS2.dVXRackCostsPrimary.year02 ) : 0;
  costs.costsS2.spaceDVXCompute.year03 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXRackCostsBackup.year03 : siteCalcsS2.dVXRackCostsPrimary.year03 ) : 0;

  costs.costsS2.powerCoolingDVXCompute.year01 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXPowerCoolingCostsBackup.year01 : siteCalcsS2.dVXPowerCoolingCostsPrimary.year01 ) : 0;
  costs.costsS2.powerCoolingDVXCompute.year02 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXPowerCoolingCostsBackup.year02 : siteCalcsS2.dVXPowerCoolingCostsPrimary.year02 ) : 0;
  costs.costsS2.powerCoolingDVXCompute.year03 = 1 === Number(basicDataS2.primary_stor) ? (1 === basicDataS2.secondary_stor ? siteCalcsS2.dVXPowerCoolingCostsBackup.year03 : siteCalcsS2.dVXPowerCoolingCostsPrimary.year03 ) : 0;

  //  costs.costsS2.cloudDVXInclOpex.year01 : 'N/A'
  costs.costsS2.totalOpexDVX.year01 = ('N/A' === costs.costsS2.cloudDVXInclOpex.year01 ? 0 : costs.costsS2.cloudDVXInclOpex.year01) + costs.costsS2.adminDVXCompute.year01 + costs.costsS2.spaceDVXCompute.year01 + costs.costsS2.powerCoolingDVXCompute.year01;
  costs.costsS2.totalOpexDVX.year02 = ('N/A' === costs.costsS2.cloudDVXInclOpex.year02 ? 0 : costs.costsS2.cloudDVXInclOpex.year02) + costs.costsS2.adminDVXCompute.year02 + costs.costsS2.spaceDVXCompute.year02 + costs.costsS2.powerCoolingDVXCompute.year02;
  costs.costsS2.totalOpexDVX.year03 = ('N/A' === costs.costsS2.cloudDVXInclOpex.year03 ? 0 : costs.costsS2.cloudDVXInclOpex.year03) + costs.costsS2.adminDVXCompute.year03 + costs.costsS2.spaceDVXCompute.year03 + costs.costsS2.powerCoolingDVXCompute.year03;

  costs.costsS2.totalSolutionDVX.year01 = costs.costsS2.totalCapexDVX.year01 + costs.costsS2.totalOpexDVX.year01;
  costs.costsS2.totalSolutionDVX.year02 = costs.costsS2.totalCapexDVX.year02 + costs.costsS2.totalOpexDVX.year02;
  costs.costsS2.totalSolutionDVX.year03 = costs.costsS2.totalCapexDVX.year03 + costs.costsS2.totalOpexDVX.year03;


  // console.log('TEST 02');
  // console.log(costs.costsS2.cloudDVXInclOpex.year01);

  console.log('COSTS S2:');
  console.log(costs.costsS2);
  model.updateLocalStore(costs.costsS2,'costsS2');

};