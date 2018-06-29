
let site = {};

site.init = function () {

  site.siteCalcsS1 = {
    vMs : {},
    totalvCPUsRequired : {},
    totalRAMRequired : {},
    primaryEffectiveCapacityRequired : {},
    physicalCores : {},
    cPUOversubscribeFactor : {},
    logicalCores : {},
    physicalRAM : {},
    physicalFlash : {},
    computeRemainingPostDVX : {},
    computeRemainingPostBackup : {},
    dVXPrimaryUsableCapacityRequired : {},
    computeNodesRequired : {},
    flashDevicesRequiredPerComputeNode: {},
    backupUsableCapacityRequired : {},
    dataNodesRequiredPrimary : {},
    dataNodesRequiredBackup : {},
    computeNodeHWPriceDVX : {},
    computeNodeFlashPrice : {},
    computeNodeSWPrice : {},
    dataNodePricePrimary : {},
    dataNodePriceBackup : {},
    dVXRackCostsPrimary : {},
    dVXNetworkCostsPrimary : {},
    dVXAdminCostsPrimary : {},
    dVXPowerCoolingCostsPrimary : {},
    dVXRackCostsBackup : {},
    dVXNetworkCostsBackup : {},
    dVXAdminCostsBackup : {},
    dVXPowerCoolingCostsBackup : {},
    cloudDVXPrice : {},
    arrayPrimaryUsableCapacityRequiredDedup : {},
    computeNodesRequiredArrays: {},
    arraysRequiredForPrimaryStorage : {},
    backupUsableCapacityRequiredDedup : {},
    backupSystemsRequired : {},
    tapeUsableCapacityRequired : {},
    tapeSystemsRequired : {},
    arrayPrice : {},
    computeNodeHWPriceArray : {},
    backupPrice : {},
    tapePrice : {},
    offsiteTapeRestorePrice : {},
    computeRackCosts : {},
    computeNetworkCosts : {},
    computePowerCoolingCosts : {},
    arrayRackCosts : {},
    arrayNetworkCosts : {},
    arrayAdminCosts : {},
    arrayPowerCoolingCosts : {},
    backupRackCosts : {},
    backupNetworkCosts : {},
    backupAdminCosts : {},
    backupPowerCoolingCosts : {},
    tapeRackCosts : {},
    tapeNetworkCosts : {},
    tapeAdminCosts : {},
    tapePowerCoolingCosts : {},
    dollarPerComputeNode : {},
    vmPerComputeNode : {},
    ramPerComputeNode : {},
    flashPerComputeNode : {}
  };

  site.siteCalcsS2 = {
    vMs : {},
    totalvCPUsRequired : {},
    totalRAMRequired : {},
    primaryEffectiveCapacityRequired : {},
    physicalCores : {},
    cPUOversubscribeFactor : {},
    logicalCores : {},
    physicalRAM : {},
    physicalFlash : {},
    computeRemainingPostDVX : {},
    computeRemainingPostBackup : {},
    dVXPrimaryUsableCapacityRequired : {},
    computeNodesRequired : {},
    flashDevicesRequiredPerComputeNode: {},
    backupUsableCapacityRequired : {},
    dataNodesRequiredPrimary : {},
    dataNodesRequiredBackup : {},
    computeNodeHWPriceDVX : {},
    computeNodeFlashPrice : {},
    computeNodeSWPrice : {},
    dataNodePricePrimary : {},
    dataNodePriceBackup : {},
    dVXRackCostsPrimary : {},
    dVXNetworkCostsPrimary : {},
    dVXAdminCostsPrimary : {},
    dVXPowerCoolingCostsPrimary : {},
    dVXRackCostsBackup : {},
    dVXNetworkCostsBackup : {},
    dVXAdminCostsBackup : {},
    dVXPowerCoolingCostsBackup : {},
    cloudDVXPrice : {},
    arrayPrimaryUsableCapacityRequiredDedup : {},
    computeNodesRequiredArrays: {},
    arraysRequiredForPrimaryStorage : {},
    backupUsableCapacityRequiredDedup : {},
    backupSystemsRequired : {},
    tapeUsableCapacityRequired : {},
    tapeSystemsRequired : {},
    arrayPrice : {},
    computeNodeHWPriceArray : {},
    backupPrice : {},
    tapePrice : {},
    offsiteTapeRestorePrice : {},
    computeRackCosts : {},
    computeNetworkCosts : {},
    computePowerCoolingCosts : {},
    arrayRackCosts : {},
    arrayNetworkCosts : {},
    arrayAdminCosts : {},
    arrayPowerCoolingCosts : {},
    backupRackCosts : {},
    backupNetworkCosts : {},
    backupAdminCosts : {},
    backupPowerCoolingCosts : {},
    tapeRackCosts : {},
    tapeNetworkCosts : {},
    tapeAdminCosts : {},
    tapePowerCoolingCosts : {},
    dollarPerComputeNode : {},
    vmPerComputeNode : {},
    ramPerComputeNode : {},
    flashPerComputeNode : {}
  }
};

site.resourcesRequired = function () {

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');               //  Get Basic User Inputs S1
  let advancedDataS1 = model.getLocalStore ('userInputAdvancedS1');         //  Get Advanced User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');               //  Get Basic User Inputs S2
  let advancedDataS2 = model.getLocalStore('userInputAdvancedS2');          //  Get Advanced User Inputs S2

  console.log('Inputs Basic S1:');
  console.log(basicDataS1);
  console.log('Inputs Advanced S1:');
  console.log(advancedDataS1);

  // Site 01
  site.siteCalcsS1.vMs.year01 = Number(basicDataS1.num_vms);
  site.siteCalcsS1.vMs.year02 = site.siteCalcsS1.vMs.year01 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));
  site.siteCalcsS1.vMs.year03 = site.siteCalcsS1.vMs.year02 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));

  site.siteCalcsS1.totalvCPUsRequired.year01 = Number(basicDataS1.num_vms) * Number(basicDataS1.vcpu_vm);
  site.siteCalcsS1.totalvCPUsRequired.year02 = site.siteCalcsS1.totalvCPUsRequired.year01 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));
  site.siteCalcsS1.totalvCPUsRequired.year03 = site.siteCalcsS1.totalvCPUsRequired.year02 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));

  site.siteCalcsS1.totalRAMRequired.year01 = Number(basicDataS1.num_vms) * Number(basicDataS1.ram_vm);
  site.siteCalcsS1.totalRAMRequired.year02 = site.siteCalcsS1.totalRAMRequired.year01 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));
  site.siteCalcsS1.totalRAMRequired.year03 = site.siteCalcsS1.totalRAMRequired.year02 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));

  site.siteCalcsS1.primaryEffectiveCapacityRequired.year01 = Number(basicDataS1.num_vms) * Number(basicDataS1.disk_vm);
  site.siteCalcsS1.primaryEffectiveCapacityRequired.year02 = site.siteCalcsS1.primaryEffectiveCapacityRequired.year01 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));
  site.siteCalcsS1.primaryEffectiveCapacityRequired.year03 = site.siteCalcsS1.primaryEffectiveCapacityRequired.year02 * (1 + helpers.percentToNumber(basicDataS1.proj_vm_growth));

  site.siteCalcsS1.physicalCores.year01 = Number(advancedDataS1.server_cores);
  site.siteCalcsS1.physicalCores.year02 = Number(advancedDataS1.server_cores);
  site.siteCalcsS1.physicalCores.year03 = Number(advancedDataS1.server_cores);







  console.log('SITE CALCULATIONS (YELLOW) S1');
  console.log(site.siteCalcsS1);
  model.updateLocalStore(site.siteCalcsS1,'siteCalcsS1');




  //  Site 02
  site.siteCalcsS2.vMs.year01 = Number(basicDataS2.num_vms);
  site.siteCalcsS2.vMs.year02 = site.siteCalcsS2.vMs.year01 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));
  site.siteCalcsS2.vMs.year03 = site.siteCalcsS2.vMs.year02 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));

  site.siteCalcsS2.totalvCPUsRequired.year01 = Number(basicDataS2.num_vms) * Number(basicDataS2.vcpu_vm);
  site.siteCalcsS2.totalvCPUsRequired.year02 = site.siteCalcsS2.totalvCPUsRequired.year01 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));
  site.siteCalcsS2.totalvCPUsRequired.year03 = site.siteCalcsS2.totalvCPUsRequired.year02 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));

  site.siteCalcsS2.totalRAMRequired.year01 = Number(basicDataS2.num_vms) * Number(basicDataS2.ram_vm);
  site.siteCalcsS2.totalRAMRequired.year02 = site.siteCalcsS2.totalRAMRequired.year01 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));
  site.siteCalcsS2.totalRAMRequired.year03 = site.siteCalcsS2.totalRAMRequired.year02 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));

  site.siteCalcsS2.primaryEffectiveCapacityRequired.year01 = Number(basicDataS2.num_vms) * Number(basicDataS2.disk_vm);
  site.siteCalcsS2.primaryEffectiveCapacityRequired.year02 = site.siteCalcsS2.primaryEffectiveCapacityRequired.year01 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));
  site.siteCalcsS2.primaryEffectiveCapacityRequired.year03 = site.siteCalcsS2.primaryEffectiveCapacityRequired.year02 * (1 + helpers.percentToNumber(basicDataS2.proj_vm_growth));

  site.siteCalcsS2.physicalCores.year01 = Number(advancedDataS2.server_cores);
  site.siteCalcsS2.physicalCores.year02 = Number(advancedDataS2.server_cores);
  site.siteCalcsS2.physicalCores.year03 = Number(advancedDataS2.server_cores);

  console.log('SITE CALCULATIONS (YELLOW) S2');
  console.log(site.siteCalcsS2);
  model.updateLocalStore(site.siteCalcsS2,'siteCalcsS2');


};