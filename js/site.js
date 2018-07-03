
let site = {};

site.init = function () {

  let siteCalcProperties = [
    'vMs',
    'totalvCPUsRequired',
    'totalRAMRequired',
    'primaryEffectiveCapacityRequired',
    'physicalCores',
    'cpuOversubscribeFactor',
    'logicalCores',
    'physicalRAM',
    'physicalFlash',
    'computeRemainingPostDVX',
    'computeRemainingPostBackup',
    'dVXPrimaryUsableCapacityRequired',
    'computeNodesRequired',
    'flashDevicesRequiredPerComputeNode',
    'backupUsableCapacityRequiredDVX',
    'dataNodesRequiredPrimary',
    'dataNodesRequiredBackup',
    'computeNodeHWPriceDVX',      // < 6-29-18
    'computeNodeFlashPrice',
    'computeNodeSWPrice',
    'dataNodePricePrimary',
    'dataNodePriceBackup',
    'dVXRackCostsPrimary',
    'dVXNetworkCostsPrimary',
    'dVXAdminCostsPrimary',
    'dVXPowerCoolingCostsPrimary',
    'dVXRackCostsBackup',
    'dVXNetworkCostsBackup',
    'dVXAdminCostsBackup',
    'dVXPowerCoolingCostsBackup',
    'cloudDVXPrice',
    'arrayPrimaryUsableCapacityRequiredDedup',
    'computeNodesRequiredArrays',
    'arraysRequiredForPrimaryStorage',
    'backupUsableCapacityRequireARRAY',
    'backupSystemsRequired',
    'tapeUsableCapacityRequired',
    'tapeSystemsRequired',
    'arrayPrice',
    'computeNodeHWPriceArray',
    'backupPrice',
    'tapePrice',
    'offsiteTapeRestorePrice',
    'computeRackCosts',
    'computeNetworkCosts',
    'computePowerCoolingCosts',
    'arrayRackCosts',
    'arrayNetworkCosts',
    'arrayAdminCosts',
    'arrayPowerCoolingCosts',
    'backupRackCosts',
    'backupNetworkCosts',
    'backupAdminCosts',
    'backupPowerCoolingCosts',
    'tapeRackCosts',
    'tapeNetworkCosts',
    'tapeAdminCosts',
    'tapePowerCoolingCosts',
    'dollarPerComputeNode',
    'vmPerComputeNode',
    'ramPerComputeNode',
    'flashPerComputeNode'
  ];

  site.siteCalcsS1 = {};
  site.siteCalcsS2 = {};

  let i = 0;
  for (;i<siteCalcProperties.length;i++){
    site.siteCalcsS1[siteCalcProperties[i]] = {};
    site.siteCalcsS2[siteCalcProperties[i]] = {};
  }

  console.log('SiteCalc Init | Objects:');
  console.log(site.siteCalcsS1);
  console.log(site.siteCalcsS2);

};

site.resourcesRequired = function () {

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');               //  Get Basic User Inputs S1
  let advancedDataS1 = model.getLocalStore ('userInputAdvancedS1');         //  Get Advanced User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');               //  Get Basic User Inputs S2
  let advancedDataS2 = model.getLocalStore('userInputAdvancedS2');          //  Get Advanced User Inputs S2
  let backupOutput = model.getLocalStore('backup_output');                  //  Get Backup Output - GREEN BOX

  console.log('Inputs Basic S1:');
  console.log(basicDataS1);
  console.log('Inputs Advanced S1:');
  console.log(advancedDataS1);

  // Site 01

  //  Resources Required:
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


  //  Server Configuration:
  site.siteCalcsS1.physicalCores.year01 = Number(advancedDataS1.server_cores);
  site.siteCalcsS1.physicalCores.year02 = Number(advancedDataS1.server_cores);
  site.siteCalcsS1.physicalCores.year03 = Number(advancedDataS1.server_cores);

  site.siteCalcsS1.cpuOversubscribeFactor.year01 = Number(advancedDataS1.vCPU_core_oversubscription);
  site.siteCalcsS1.cpuOversubscribeFactor.year02 = site.siteCalcsS1.cpuOversubscribeFactor.year01;
  site.siteCalcsS1.cpuOversubscribeFactor.year03 = site.siteCalcsS1.cpuOversubscribeFactor.year02;

  site.siteCalcsS1.logicalCores.year01 = site.siteCalcsS1.physicalCores.year01 * site.siteCalcsS1.cpuOversubscribeFactor.year01;
  site.siteCalcsS1.logicalCores.year02 = site.siteCalcsS1.logicalCores.year01;
  site.siteCalcsS1.logicalCores.year03 = site.siteCalcsS1.logicalCores.year02;

  site.siteCalcsS1.physicalRAM.year01 = Number(advancedDataS1.server_RAM);
  site.siteCalcsS1.physicalRAM.year02 = Number(advancedDataS1.server_RAM);
  site.siteCalcsS1.physicalRAM.year03 = Number(advancedDataS1.server_RAM);

  site.siteCalcsS1.physicalFlash.year01 = Number(advancedDataS1.DVX_max_cache_per_host);
  site.siteCalcsS1.physicalFlash.year02 = Number(advancedDataS1.DVX_max_cache_per_host);
  site.siteCalcsS1.physicalFlash.year03 = Number(advancedDataS1.DVX_max_cache_per_host);

  site.siteCalcsS1.computeRemainingPostDVX.year01 = (100 - parseFloat(advancedDataS1.DVX_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS1.computeRemainingPostDVX.year02 = (100 - parseFloat(advancedDataS1.DVX_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS1.computeRemainingPostDVX.year03 = (100 - parseFloat(advancedDataS1.DVX_host_cpu_consumption)).toString() + '%';

  site.siteCalcsS1.computeRemainingPostBackup.year01 = (100 - parseFloat(advancedDataS1.backup_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS1.computeRemainingPostBackup.year02 = (100 - parseFloat(advancedDataS1.backup_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS1.computeRemainingPostBackup.year03 = (100 - parseFloat(advancedDataS1.backup_host_cpu_consumption)).toString() + '%';

  //  DVX Requirements:
  site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year01 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year01/advancedDataS1.exp_data_reduction_DVX);
  site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year02 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year02/advancedDataS1.exp_data_reduction_DVX);
  site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year03 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year03/advancedDataS1.exp_data_reduction_DVX);

  site.siteCalcsS1.computeNodesRequired.year01 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year01/(site.siteCalcsS1.logicalCores.year01*site.siteCalcsS1.physicalFlash.year01),site.siteCalcsS1.totalRAMRequired.year01/site.siteCalcsS1.physicalRAM.year01,site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year01/site.siteCalcsS1.physicalFlash.year01));
  site.siteCalcsS1.computeNodesRequired.year02 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year02/(site.siteCalcsS1.logicalCores.year01*site.siteCalcsS1.physicalFlash.year02),site.siteCalcsS1.totalRAMRequired.year02/site.siteCalcsS1.physicalRAM.year02,site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year02/site.siteCalcsS1.physicalFlash.year02));
  site.siteCalcsS1.computeNodesRequired.year03 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year03/(site.siteCalcsS1.logicalCores.year01*site.siteCalcsS1.physicalFlash.year03),site.siteCalcsS1.totalRAMRequired.year03/site.siteCalcsS1.physicalRAM.year03,site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year03/site.siteCalcsS1.physicalFlash.year03));

  site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year01 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year01/site.siteCalcsS1.computeNodesRequired.year01/advancedDataS1.server_cache_size);
  site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year02 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year02/site.siteCalcsS1.computeNodesRequired.year02/advancedDataS1.server_cache_size);
  site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year03 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year03/site.siteCalcsS1.computeNodesRequired.year03/advancedDataS1.server_cache_size);

  site.siteCalcsS1.backupUsableCapacityRequiredDVX.year01 = backupOutput.site01.year01;
  site.siteCalcsS1.backupUsableCapacityRequiredDVX.year02 = backupOutput.site01.year02;
  site.siteCalcsS1.backupUsableCapacityRequiredDVX.year03 = backupOutput.site01.year03;

  site.siteCalcsS1.dataNodesRequiredPrimary.year01 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year01/advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dataNodesRequiredPrimary.year02 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year02/advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dataNodesRequiredPrimary.year03 = Math.ceil(site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year03/advancedDataS1.data_node_usable_capacity);

  site.siteCalcsS1.dataNodesRequiredBackup.year01 = Math.ceil((site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year01+site.siteCalcsS1.backupUsableCapacityRequiredDVX.year01)/advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dataNodesRequiredBackup.year02 = Math.ceil((site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year02+site.siteCalcsS1.backupUsableCapacityRequiredDVX.year02)/advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dataNodesRequiredBackup.year03 = Math.ceil((site.siteCalcsS1.dVXPrimaryUsableCapacityRequired.year03+site.siteCalcsS1.backupUsableCapacityRequiredDVX.year03)/advancedDataS1.data_node_usable_capacity);

  site.siteCalcsS1.computeNodeHWPriceDVX.year01 = ((Number(advancedDataS1.server_base_cost) + (advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar) + (advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar) + (site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year01 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size))) * site.siteCalcsS1.computeNodesRequired.year01;
  site.siteCalcsS1.computeNodeHWPriceDVX.year02 = ((Number(advancedDataS1.server_base_cost) + (advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar) + (advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar) + (site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year02 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size))) * site.siteCalcsS1.computeNodesRequired.year02;
  site.siteCalcsS1.computeNodeHWPriceDVX.year03 = ((Number(advancedDataS1.server_base_cost) + (advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar) + (advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar) + (site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year03 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size))) * site.siteCalcsS1.computeNodesRequired.year03;

  site.siteCalcsS1.computeNodeFlashPrice.year01 = site.siteCalcsS1.computeNodesRequired.year01 * site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year01 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size;
  site.siteCalcsS1.computeNodeFlashPrice.year02 = site.siteCalcsS1.computeNodesRequired.year02 * site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year02 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size;
  site.siteCalcsS1.computeNodeFlashPrice.year03 = site.siteCalcsS1.computeNodesRequired.year03 * site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year03 * advancedDataS1.server_cache_dollar * advancedDataS1.server_cache_size;

  site.siteCalcsS1.computeNodeSWPrice.year01 = advancedDataS1.DVX_host_license_cost * site.siteCalcsS1.computeNodesRequired.year01;
  site.siteCalcsS1.computeNodeSWPrice.year02 = advancedDataS1.DVX_host_license_cost * site.siteCalcsS1.computeNodesRequired.year02;
  site.siteCalcsS1.computeNodeSWPrice.year03 = advancedDataS1.DVX_host_license_cost * site.siteCalcsS1.computeNodesRequired.year03;

  site.siteCalcsS1.dataNodePricePrimary.year01 = site.siteCalcsS1.dataNodesRequiredPrimary.year01 * advancedDataS1.data_node_cost;
  site.siteCalcsS1.dataNodePricePrimary.year02 = site.siteCalcsS1.dataNodesRequiredPrimary.year02 *advancedDataS1.data_node_cost;
  site.siteCalcsS1.dataNodePricePrimary.year03 = site.siteCalcsS1.dataNodesRequiredPrimary.year03 * advancedDataS1.data_node_cost;

  site.siteCalcsS1.dataNodePriceBackup.year01 = site.siteCalcsS1.dataNodesRequiredBackup.year01 * advancedDataS1.data_node_cost;
  site.siteCalcsS1.dataNodePriceBackup.year02 = site.siteCalcsS1.dataNodesRequiredBackup.year02 * advancedDataS1.data_node_cost;
  site.siteCalcsS1.dataNodePriceBackup.year03 = site.siteCalcsS1.dataNodesRequiredBackup.year03 * advancedDataS1.data_node_cost;

  site.siteCalcsS1.dVXRackCostsPrimary.year01 = (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredPrimary.year01 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.dVXRackCostsPrimary.year02 = (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredPrimary.year02 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.dVXRackCostsPrimary.year03 = (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredPrimary.year03 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;

  site.siteCalcsS1.dVXNetworkCostsPrimary.year01 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredPrimary.year01 * advancedDataS1.DVX_data_node_ports);
  site.siteCalcsS1.dVXNetworkCostsPrimary.year02 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredPrimary.year02 * advancedDataS1.DVX_data_node_ports);
  site.siteCalcsS1.dVXNetworkCostsPrimary.year03 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredPrimary.year03 * advancedDataS1.DVX_data_node_ports);



  console.log('SITE CALCULATIONS (YELLOW) S1');
  console.log(site.siteCalcsS1);
  model.updateLocalStore(site.siteCalcsS1,'siteCalcsS1');




  //  Site 02

  //  Resources Required:
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


  //  Server Configuration:
  site.siteCalcsS2.physicalCores.year01 = Number(advancedDataS2.server_cores);
  site.siteCalcsS2.physicalCores.year02 = Number(advancedDataS2.server_cores);
  site.siteCalcsS2.physicalCores.year03 = Number(advancedDataS2.server_cores);

  site.siteCalcsS2.cpuOversubscribeFactor.year01 = Number(advancedDataS2.vCPU_core_oversubscription);
  site.siteCalcsS2.cpuOversubscribeFactor.year02 = site.siteCalcsS2.cpuOversubscribeFactor.year01;
  site.siteCalcsS2.cpuOversubscribeFactor.year03 = site.siteCalcsS2.cpuOversubscribeFactor.year02;

  site.siteCalcsS2.logicalCores.year01 = site.siteCalcsS2.physicalCores.year01 * site.siteCalcsS2.cpuOversubscribeFactor.year01;
  site.siteCalcsS2.logicalCores.year02 = site.siteCalcsS2.logicalCores.year01;
  site.siteCalcsS2.logicalCores.year03 = site.siteCalcsS2.logicalCores.year02;

  site.siteCalcsS2.physicalRAM.year01 = Number(advancedDataS2.server_RAM);
  site.siteCalcsS2.physicalRAM.year02 = Number(advancedDataS2.server_RAM);
  site.siteCalcsS2.physicalRAM.year03 = Number(advancedDataS2.server_RAM);

  site.siteCalcsS2.physicalFlash.year01 = Number(advancedDataS2.DVX_max_cache_per_host);
  site.siteCalcsS2.physicalFlash.year02 = Number(advancedDataS2.DVX_max_cache_per_host);
  site.siteCalcsS2.physicalFlash.year03 = Number(advancedDataS2.DVX_max_cache_per_host);

  site.siteCalcsS2.computeRemainingPostDVX.year01 = (100 - parseFloat(advancedDataS2.DVX_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS2.computeRemainingPostDVX.year02 = (100 - parseFloat(advancedDataS2.DVX_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS2.computeRemainingPostDVX.year03 = (100 - parseFloat(advancedDataS2.DVX_host_cpu_consumption)).toString() + '%';

  site.siteCalcsS2.computeRemainingPostBackup.year01 = (100 - parseFloat(advancedDataS2.backup_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS2.computeRemainingPostBackup.year02 = (100 - parseFloat(advancedDataS2.backup_host_cpu_consumption)).toString() + '%';
  site.siteCalcsS2.computeRemainingPostBackup.year03 = (100 - parseFloat(advancedDataS2.backup_host_cpu_consumption)).toString() + '%';

  //  DVX Requirements:
  site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year01 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year01/advancedDataS2.exp_data_reduction_DVX);
  site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year02 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year02/advancedDataS2.exp_data_reduction_DVX);
  site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year03 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year03/advancedDataS2.exp_data_reduction_DVX);

  site.siteCalcsS2.computeNodesRequired.year01 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year01/(site.siteCalcsS2.logicalCores.year01*site.siteCalcsS2.physicalFlash.year01),site.siteCalcsS2.totalRAMRequired.year01/site.siteCalcsS2.physicalRAM.year01,site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year01/site.siteCalcsS2.physicalFlash.year01));
  site.siteCalcsS2.computeNodesRequired.year02 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year02/(site.siteCalcsS2.logicalCores.year01*site.siteCalcsS2.physicalFlash.year02),site.siteCalcsS2.totalRAMRequired.year02/site.siteCalcsS2.physicalRAM.year02,site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year02/site.siteCalcsS2.physicalFlash.year02));
  site.siteCalcsS2.computeNodesRequired.year03 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year03/(site.siteCalcsS2.logicalCores.year01*site.siteCalcsS2.physicalFlash.year03),site.siteCalcsS2.totalRAMRequired.year03/site.siteCalcsS2.physicalRAM.year03,site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year03/site.siteCalcsS2.physicalFlash.year03));

  site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year01 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year01/site.siteCalcsS2.computeNodesRequired.year01/advancedDataS2.server_cache_size);
  site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year02 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year02/site.siteCalcsS2.computeNodesRequired.year02/advancedDataS2.server_cache_size);
  site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year03 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year03/site.siteCalcsS2.computeNodesRequired.year03/advancedDataS2.server_cache_size);

  site.siteCalcsS2.backupUsableCapacityRequiredDVX.year01 = backupOutput.site02.year01;
  site.siteCalcsS2.backupUsableCapacityRequiredDVX.year02 = backupOutput.site02.year02;
  site.siteCalcsS2.backupUsableCapacityRequiredDVX.year03 = backupOutput.site02.year03;

  site.siteCalcsS2.dataNodesRequiredPrimary.year01 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year01/advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dataNodesRequiredPrimary.year02 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year02/advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dataNodesRequiredPrimary.year03 = Math.ceil(site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year03/advancedDataS2.data_node_usable_capacity);

  site.siteCalcsS2.dataNodesRequiredBackup.year01 = Math.ceil((site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year01+site.siteCalcsS2.backupUsableCapacityRequiredDVX.year01)/advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dataNodesRequiredBackup.year02 = Math.ceil((site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year02+site.siteCalcsS2.backupUsableCapacityRequiredDVX.year02)/advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dataNodesRequiredBackup.year03 = Math.ceil((site.siteCalcsS2.dVXPrimaryUsableCapacityRequired.year03+site.siteCalcsS2.backupUsableCapacityRequiredDVX.year03)/advancedDataS2.data_node_usable_capacity);

  site.siteCalcsS2.computeNodeHWPriceDVX.year01 = ((Number(advancedDataS2.server_base_cost) + (advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar) + (advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar) + (site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year01 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size))) * site.siteCalcsS2.computeNodesRequired.year01;
  site.siteCalcsS2.computeNodeHWPriceDVX.year02 = ((Number(advancedDataS2.server_base_cost) + (advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar) + (advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar) + (site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year02 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size))) * site.siteCalcsS2.computeNodesRequired.year02;
  site.siteCalcsS2.computeNodeHWPriceDVX.year03 = ((Number(advancedDataS2.server_base_cost) + (advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar) + (advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar) + (site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year03 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size))) * site.siteCalcsS2.computeNodesRequired.year03;

  site.siteCalcsS2.computeNodeFlashPrice.year01 = site.siteCalcsS2.computeNodesRequired.year01 * site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year01 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size;
  site.siteCalcsS2.computeNodeFlashPrice.year02 = site.siteCalcsS2.computeNodesRequired.year02 * site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year02 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size;
  site.siteCalcsS2.computeNodeFlashPrice.year03 = site.siteCalcsS2.computeNodesRequired.year03 * site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year03 * advancedDataS2.server_cache_dollar * advancedDataS2.server_cache_size;

  site.siteCalcsS2.computeNodeSWPrice.year01 = advancedDataS2.DVX_host_license_cost * site.siteCalcsS2.computeNodesRequired.year01;
  site.siteCalcsS2.computeNodeSWPrice.year02 = advancedDataS2.DVX_host_license_cost * site.siteCalcsS2.computeNodesRequired.year02;
  site.siteCalcsS2.computeNodeSWPrice.year03 = advancedDataS2.DVX_host_license_cost * site.siteCalcsS2.computeNodesRequired.year03;

  site.siteCalcsS2.dataNodePricePrimary.year01 = site.siteCalcsS2.dataNodesRequiredPrimary.year01 * advancedDataS2.data_node_cost;
  site.siteCalcsS2.dataNodePricePrimary.year02 = site.siteCalcsS2.dataNodesRequiredPrimary.year02 *advancedDataS2.data_node_cost;
  site.siteCalcsS2.dataNodePricePrimary.year03 = site.siteCalcsS2.dataNodesRequiredPrimary.year03 * advancedDataS2.data_node_cost;

  site.siteCalcsS2.dataNodePriceBackup.year01 = site.siteCalcsS2.dataNodesRequiredBackup.year01 * advancedDataS2.data_node_cost;
  site.siteCalcsS2.dataNodePriceBackup.year02 = site.siteCalcsS2.dataNodesRequiredBackup.year02 *advancedDataS2.data_node_cost;
  site.siteCalcsS2.dataNodePriceBackup.year03 = site.siteCalcsS2.dataNodesRequiredBackup.year03 * advancedDataS2.data_node_cost;

  site.siteCalcsS2.dVXRackCostsPrimary.year01 = (site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredPrimary.year01 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.dVXRackCostsPrimary.year02 = (site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredPrimary.year02 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.dVXRackCostsPrimary.year03 = (site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredPrimary.year03 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;




  console.log('SITE CALCULATIONS (YELLOW) S2');
  console.log(site.siteCalcsS2);
  model.updateLocalStore(site.siteCalcsS2,'siteCalcsS2');


};