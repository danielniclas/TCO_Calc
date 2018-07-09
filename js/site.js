
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
    'dataNodesRequiredPrimary',             //  24
    'dataNodesRequiredBackup',              //  25
    'computeNodeHWPriceDVX',                //  26
    'computeNodeFlashPrice',                //  27
    'computeNodeSWPrice',                   //  28
    'dataNodePricePrimary',                 //  29
    'dataNodePriceBackup',                  //  30
    'dVXRackCostsPrimary',                  //  31
    'dVXNetworkCostsPrimary',               //  32
    'dVXAdminCostsPrimary',                 //  33
    'dVXPowerCoolingCostsPrimary',          //  34
    'dVXRackCostsBackup',                   //  35
    'dVXNetworkCostsBackup',                //  36
    'dVXAdminCostsBackup',                  //  37
    'dVXPowerCoolingCostsBackup',           //  38
    'cloudDVXPrice',                        //  39
    'arrayPrimaryUsableCapacityRequiredDedup',
    'computeNodesRequiredArrays',
    'arraysRequiredForPrimaryStorage',
    'backupUsableCapacityRequiredARRAY',
    'backupSystemsRequired',
    'tapeUsableCapacityRequired',
    'tapeSystemsRequired',
    'arrayPrice',                           //  49
    'computeNodeHWPriceArray',              //  50
    'backupPrice',                          //  51
    'tapePrice',                            //  52
    'offsiteTapeRestorePrice',              //  53
    'computeRackCosts',                     //  54
    'computeNetworkCosts',                  //  55
    'computePowerCoolingCosts',             //  56
    'arrayRackCosts',                       //  57
    'arrayNetworkCosts',                    //  58
    'arrayAdminCosts',                      //  59
    'arrayPowerCoolingCosts',               //  60
    'backupRackCosts',                      //  61
    'backupNetworkCosts',                   //  62
    'backupAdminCosts',                     //  63
    'backupPowerCoolingCosts',              //  64
    'tapeRackCosts',                        //  65
    'tapeNetworkCosts',                     //  66
    'tapeAdminCosts',                       //  67
    'tapePowerCoolingCosts',                //  68
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

site.siteResourcesAll = function () {

  let basicDataS1 = model.getLocalStore ('userInputBasicS1');               //  Get Basic User Inputs S1
  let advancedDataS1 = model.getLocalStore ('userInputAdvancedS1');         //  Get Advanced User Inputs S1
  let basicDataS2 = model.getLocalStore ('userInputBasicS2');               //  Get Basic User Inputs S2
  let advancedDataS2 = model.getLocalStore('userInputAdvancedS2');          //  Get Advanced User Inputs S2
  let backupOutput = model.getLocalStore('backupOutputObject');             //  Get Backup Output - GREEN BOX
  let cloudOutput = model.getLocalStore('cloudOutputObject');               //  Get Cloud Output - GREEN BOX
  let tapeOutput = model.getLocalStore('tapeOutputObject');                 //  Tape Output - GREEN BOX

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

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  site.siteCalcsS1.dVXAdminCostsPrimary.year01 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredPrimary.year01 * advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dVXAdminCostsPrimary.year02 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredPrimary.year02 * advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dVXAdminCostsPrimary.year03 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredPrimary.year03 * advancedDataS1.data_node_usable_capacity);

  site.siteCalcsS1.dVXPowerCoolingCostsPrimary.year01 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredPrimary.year01 * advancedDataS1.DVX_DN_power_consumption);
  site.siteCalcsS1.dVXPowerCoolingCostsPrimary.year02 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredPrimary.year02 * advancedDataS1.DVX_DN_power_consumption);
  site.siteCalcsS1.dVXPowerCoolingCostsPrimary.year03 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredPrimary.year03 * advancedDataS1.DVX_DN_power_consumption);

  site.siteCalcsS1.dVXRackCostsBackup.year01 = (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredBackup.year01 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.dVXRackCostsBackup.year02 = (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredBackup.year02 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.dVXRackCostsBackup.year03 = (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_rus + site.siteCalcsS1.dataNodesRequiredBackup.year03 * advancedDataS1.DVX_data_node_rus) * advancedDataS1.dollar_ru_year_data_center;

  site.siteCalcsS1.dVXNetworkCostsBackup.year01 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredBackup.year01 * advancedDataS1.DVX_data_node_ports);
  site.siteCalcsS1.dVXNetworkCostsBackup.year02 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredBackup.year02 * advancedDataS1.DVX_data_node_ports);
  site.siteCalcsS1.dVXNetworkCostsBackup.year03 = advancedDataS1.network_cost_port * (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_network_ports + site.siteCalcsS1.dataNodesRequiredBackup.year03 * advancedDataS1.DVX_data_node_ports);

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  site.siteCalcsS1.dVXAdminCostsBackup.year01 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredBackup.year01 * advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dVXAdminCostsBackup.year02 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredBackup.year02 * advancedDataS1.data_node_usable_capacity);
  site.siteCalcsS1.dVXAdminCostsBackup.year03 = advancedDataS1.FTE_admin_dollar * (site.siteCalcsS1.dataNodesRequiredBackup.year03 * advancedDataS1.data_node_usable_capacity);

  site.siteCalcsS1.dVXPowerCoolingCostsBackup.year01 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredBackup.year01 * advancedDataS1.DVX_DN_power_consumption);
  site.siteCalcsS1.dVXPowerCoolingCostsBackup.year02 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredBackup.year02 * advancedDataS1.DVX_DN_power_consumption);
  site.siteCalcsS1.dVXPowerCoolingCostsBackup.year03 = advancedDataS1.dollar_kWatt_data_center * (site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_power_consumption + site.siteCalcsS1.dataNodesRequiredBackup.year03 * advancedDataS1.DVX_DN_power_consumption);

  site.siteCalcsS1.cloudDVXPrice.year01 = cloudOutput.tsC.year01;
  site.siteCalcsS1.cloudDVXPrice.year02 = cloudOutput.tsC.year02;
  site.siteCalcsS1.cloudDVXPrice.year03 = cloudOutput.tsC.year03;

  //  Array Requirements:
  site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year01 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year01/basicDataS1.primary_data_reduction);
  site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year02 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year02/basicDataS1.primary_data_reduction);
  site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year03 = Math.ceil(site.siteCalcsS1.primaryEffectiveCapacityRequired.year03/basicDataS1.primary_data_reduction);

  site.siteCalcsS1.computeNodesRequiredArrays.year01 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year01/(site.siteCalcsS1.logicalCores.year01 * helpers.percentToNumber(site.siteCalcsS1.computeRemainingPostBackup.year01)),(site.siteCalcsS1.totalRAMRequired.year01/site.siteCalcsS1.physicalRAM.year01)));
  site.siteCalcsS1.computeNodesRequiredArrays.year02 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year02/(site.siteCalcsS1.logicalCores.year02 * helpers.percentToNumber(site.siteCalcsS1.computeRemainingPostBackup.year02)),(site.siteCalcsS1.totalRAMRequired.year02/site.siteCalcsS1.physicalRAM.year02)));
  site.siteCalcsS1.computeNodesRequiredArrays.year03 = Math.ceil(Math.max(site.siteCalcsS1.totalvCPUsRequired.year03/(site.siteCalcsS1.logicalCores.year03 * helpers.percentToNumber(site.siteCalcsS1.computeRemainingPostBackup.year03)),(site.siteCalcsS1.totalRAMRequired.year03/site.siteCalcsS1.physicalRAM.year03)));

  site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 = Math.ceil(site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year01/advancedDataS1.array_unit_capacity);
  site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 = Math.ceil(site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year02/advancedDataS1.array_unit_capacity);
  site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 = Math.ceil(site.siteCalcsS1.arrayPrimaryUsableCapacityRequiredDedup.year03/advancedDataS1.array_unit_capacity);

  site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year01 = tapeOutput.bcEOY_S1.year01;
  site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year02 = tapeOutput.bcEOY_S1.year02;
  site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year03 = tapeOutput.bcEOY_S1.year03;

  site.siteCalcsS1.backupSystemsRequired.year01 = Math.ceil(site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year01/advancedDataS1.backup_unit_capacity);
  site.siteCalcsS1.backupSystemsRequired.year02 = Math.ceil(site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year02/advancedDataS1.backup_unit_capacity);
  site.siteCalcsS1.backupSystemsRequired.year03 = Math.ceil(site.siteCalcsS1.backupUsableCapacityRequiredARRAY.year03/advancedDataS1.backup_unit_capacity);

  site.siteCalcsS1.tapeUsableCapacityRequired.year01 = tapeOutput.tcEOY_S1.year01;
  site.siteCalcsS1.tapeUsableCapacityRequired.year02 = tapeOutput.tcEOY_S1.year02;
  site.siteCalcsS1.tapeUsableCapacityRequired.year03 = tapeOutput.tcEOY_S1.year03;

  site.siteCalcsS1.tapeSystemsRequired.year01 = Math.ceil(site.siteCalcsS1.tapeUsableCapacityRequired.year01/advancedDataS1.tape_unit_capacity);
  site.siteCalcsS1.tapeSystemsRequired.year02 = Math.ceil(site.siteCalcsS1.tapeUsableCapacityRequired.year02/advancedDataS1.tape_unit_capacity);
  site.siteCalcsS1.tapeSystemsRequired.year03 = Math.ceil(site.siteCalcsS1.tapeUsableCapacityRequired.year03/advancedDataS1.tape_unit_capacity);

  site.siteCalcsS1.arrayPrice.year01 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 * advancedDataS1.array_unit_capacity * advancedDataS1.traditional_array_cost_primary;
  site.siteCalcsS1.arrayPrice.year02 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 * advancedDataS1.array_unit_capacity * advancedDataS1.traditional_array_cost_primary;
  site.siteCalcsS1.arrayPrice.year03 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 * advancedDataS1.array_unit_capacity * advancedDataS1.traditional_array_cost_primary;

  site.siteCalcsS1.computeNodeHWPriceArray.year01 = site.siteCalcsS1.computeNodesRequired.year01 * (Number(advancedDataS1.server_base_cost) + (advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar) + (advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar));
  site.siteCalcsS1.computeNodeHWPriceArray.year02 = site.siteCalcsS1.computeNodesRequired.year02 * (Number(advancedDataS1.server_base_cost) + advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar + advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar);
  site.siteCalcsS1.computeNodeHWPriceArray.year03 = site.siteCalcsS1.computeNodesRequired.year03 * (Number(advancedDataS1.server_base_cost) + advancedDataS1.server_cores * advancedDataS1.server_CPU_dollar + advancedDataS1.server_RAM * advancedDataS1.server_RAM_dollar);

  site.siteCalcsS1.backupPrice.year01 = site.siteCalcsS1.backupSystemsRequired.year01 * advancedDataS1.backup_unit_capacity * advancedDataS1.traditional_backup_system_cost;
  site.siteCalcsS1.backupPrice.year02 = site.siteCalcsS1.backupSystemsRequired.year02 * advancedDataS1.backup_unit_capacity * advancedDataS1.traditional_backup_system_cost;
  site.siteCalcsS1.backupPrice.year03 = site.siteCalcsS1.backupSystemsRequired.year03 * advancedDataS1.backup_unit_capacity * advancedDataS1.traditional_backup_system_cost;

  site.siteCalcsS1.tapePrice.year01 = site.siteCalcsS1.tapeSystemsRequired.year01 * advancedDataS1.tape_unit_capacity * advancedDataS1.traditional_tape_system_cost;
  site.siteCalcsS1.tapePrice.year02 = site.siteCalcsS1.tapeSystemsRequired.year02 * advancedDataS1.tape_unit_capacity * advancedDataS1.traditional_tape_system_cost;
  site.siteCalcsS1.tapePrice.year03 = site.siteCalcsS1.tapeSystemsRequired.year03 * advancedDataS1.tape_unit_capacity * advancedDataS1.traditional_tape_system_cost;

  site.siteCalcsS1.computeRackCosts.year01 = advancedDataS1.dollar_ru_year_data_center * site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_rus;
  site.siteCalcsS1.computeRackCosts.year02 = advancedDataS1.dollar_ru_year_data_center * site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_rus;
  site.siteCalcsS1.computeRackCosts.year03 = advancedDataS1.dollar_ru_year_data_center * site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_rus;

  site.siteCalcsS1.computeNetworkCosts.year01 = site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_network_ports * advancedDataS1.network_cost_port;
  site.siteCalcsS1.computeNetworkCosts.year02 = site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_network_ports * advancedDataS1.network_cost_port;
  site.siteCalcsS1.computeNetworkCosts.year03 = site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_network_ports * advancedDataS1.network_cost_port;

  site.siteCalcsS1.computePowerCoolingCosts.year01 = site.siteCalcsS1.computeNodesRequired.year01 * advancedDataS1.server_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.computePowerCoolingCosts.year02 = site.siteCalcsS1.computeNodesRequired.year02 * advancedDataS1.server_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.computePowerCoolingCosts.year03 = site.siteCalcsS1.computeNodesRequired.year03 * advancedDataS1.server_power_consumption * advancedDataS1.dollar_kWatt_data_center;

  site.siteCalcsS1.arrayRackCosts.year01 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 * advancedDataS1.dollar_ru_year_data_center * advancedDataS1.array_rus;
  site.siteCalcsS1.arrayRackCosts.year02 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 * advancedDataS1.dollar_ru_year_data_center * advancedDataS1.array_rus;
  site.siteCalcsS1.arrayRackCosts.year03 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 * advancedDataS1.dollar_ru_year_data_center * advancedDataS1.array_rus;

  site.siteCalcsS1.arrayNetworkCosts.year01 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 * advancedDataS1.network_cost_port * advancedDataS1.array_ports;
  site.siteCalcsS1.arrayNetworkCosts.year02 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 * advancedDataS1.network_cost_port * advancedDataS1.array_ports;
  site.siteCalcsS1.arrayNetworkCosts.year03 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 * advancedDataS1.network_cost_port * advancedDataS1.array_ports;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  site.siteCalcsS1.arrayAdminCosts.year01 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 * advancedDataS1.array_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.arrayAdminCosts.year02 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 * advancedDataS1.array_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.arrayAdminCosts.year03 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 * advancedDataS1.array_unit_capacity * advancedDataS1.FTE_admin_dollar;

  site.siteCalcsS1.arrayPowerCoolingCosts.year01 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year01 * advancedDataS1.array_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.arrayPowerCoolingCosts.year02 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year02 * advancedDataS1.array_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.arrayPowerCoolingCosts.year03 = site.siteCalcsS1.arraysRequiredForPrimaryStorage.year03 * advancedDataS1.array_power_consumption * advancedDataS1.dollar_kWatt_data_center;

  site.siteCalcsS1.backupRackCosts.year01 = site.siteCalcsS1.backupSystemsRequired.year01 * advancedDataS1.backup_rus * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.backupRackCosts.year02 = site.siteCalcsS1.backupSystemsRequired.year02 * advancedDataS1.backup_rus * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.backupRackCosts.year03 = site.siteCalcsS1.backupSystemsRequired.year03 * advancedDataS1.backup_rus * advancedDataS1.dollar_ru_year_data_center;

  site.siteCalcsS1.backupNetworkCosts.year01 = site.siteCalcsS1.backupSystemsRequired.year01 * advancedDataS1.network_cost_port * advancedDataS1.backup_ports;
  site.siteCalcsS1.backupNetworkCosts.year02 = site.siteCalcsS1.backupSystemsRequired.year02 * advancedDataS1.network_cost_port * advancedDataS1.backup_ports;
  site.siteCalcsS1.backupNetworkCosts.year03 = site.siteCalcsS1.backupSystemsRequired.year03 * advancedDataS1.network_cost_port * advancedDataS1.backup_ports;

  //  Minor Calc Discrepency with Spread Sheet - Checked.  May be due to rounding on the Excel
  site.siteCalcsS1.backupAdminCosts.year01 = site.siteCalcsS1.backupSystemsRequired.year01 * advancedDataS1.backup_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.backupAdminCosts.year02 = site.siteCalcsS1.backupSystemsRequired.year02 * advancedDataS1.backup_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.backupAdminCosts.year03 = site.siteCalcsS1.backupSystemsRequired.year03 * advancedDataS1.backup_unit_capacity * advancedDataS1.FTE_admin_dollar;

  site.siteCalcsS1.backupPowerCoolingCosts.year01 = site.siteCalcsS1.backupSystemsRequired.year01 * advancedDataS1.backup_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.backupPowerCoolingCosts.year02 = site.siteCalcsS1.backupSystemsRequired.year02 * advancedDataS1.backup_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.backupPowerCoolingCosts.year03 = site.siteCalcsS1.backupSystemsRequired.year03 * advancedDataS1.backup_power_consumption * advancedDataS1.dollar_kWatt_data_center;

  site.siteCalcsS1.tapeRackCosts.year01 = site.siteCalcsS1.tapeSystemsRequired.year01 * advancedDataS1.tape_rus * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.tapeRackCosts.year02 = site.siteCalcsS1.tapeSystemsRequired.year02 * advancedDataS1.tape_rus * advancedDataS1.dollar_ru_year_data_center;
  site.siteCalcsS1.tapeRackCosts.year03 = site.siteCalcsS1.tapeSystemsRequired.year03 * advancedDataS1.tape_rus * advancedDataS1.dollar_ru_year_data_center;

  site.siteCalcsS1.tapeNetworkCosts.year01 = site.siteCalcsS1.tapeSystemsRequired.year01 * advancedDataS1.network_cost_port * advancedDataS1.tape_ports;
  site.siteCalcsS1.tapeNetworkCosts.year02 = site.siteCalcsS1.tapeSystemsRequired.year02 * advancedDataS1.network_cost_port * advancedDataS1.tape_ports;
  site.siteCalcsS1.tapeNetworkCosts.year03 = site.siteCalcsS1.tapeSystemsRequired.year03 * advancedDataS1.network_cost_port * advancedDataS1.tape_ports;

  site.siteCalcsS1.tapeAdminCosts.year01 = site.siteCalcsS1.tapeSystemsRequired.year01 * advancedDataS1.tape_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.tapeAdminCosts.year02 = site.siteCalcsS1.tapeSystemsRequired.year02 * advancedDataS1.tape_unit_capacity * advancedDataS1.FTE_admin_dollar;
  site.siteCalcsS1.tapeAdminCosts.year03 = site.siteCalcsS1.tapeSystemsRequired.year03 * advancedDataS1.tape_unit_capacity * advancedDataS1.FTE_admin_dollar;

  site.siteCalcsS1.tapePowerCoolingCosts.year01 = site.siteCalcsS1.tapeSystemsRequired.year01 * advancedDataS1.tape_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.tapePowerCoolingCosts.year02 = site.siteCalcsS1.tapeSystemsRequired.year02 * advancedDataS1.tape_power_consumption * advancedDataS1.dollar_kWatt_data_center;
  site.siteCalcsS1.tapePowerCoolingCosts.year03 = site.siteCalcsS1.tapeSystemsRequired.year03 * advancedDataS1.tape_power_consumption * advancedDataS1.dollar_kWatt_data_center;

  site.siteCalcsS1.dollarPerComputeNode.year01 = site.siteCalcsS1.computeNodeHWPriceDVX.year01/site.siteCalcsS1.computeNodesRequired.year01;
  site.siteCalcsS1.dollarPerComputeNode.year02 = site.siteCalcsS1.computeNodeHWPriceDVX.year02/site.siteCalcsS1.computeNodesRequired.year02;
  site.siteCalcsS1.dollarPerComputeNode.year03 = site.siteCalcsS1.computeNodeHWPriceDVX.year03/site.siteCalcsS1.computeNodesRequired.year03;

  site.siteCalcsS1.vmPerComputeNode.year01 = site.siteCalcsS1.vMs.year01/site.siteCalcsS1.computeNodesRequired.year01;
  site.siteCalcsS1.vmPerComputeNode.year02 = site.siteCalcsS1.vMs.year02/site.siteCalcsS1.computeNodesRequired.year02;
  site.siteCalcsS1.vmPerComputeNode.year03 = site.siteCalcsS1.vMs.year03/site.siteCalcsS1.computeNodesRequired.year03;

  site.siteCalcsS1.ramPerComputeNode.year01 = site.siteCalcsS1.totalRAMRequired.year01/site.siteCalcsS1.computeNodesRequired.year01;
  site.siteCalcsS1.ramPerComputeNode.year02 = site.siteCalcsS1.totalRAMRequired.year02/site.siteCalcsS1.computeNodesRequired.year02;
  site.siteCalcsS1.ramPerComputeNode.year03 = site.siteCalcsS1.totalRAMRequired.year03/site.siteCalcsS1.computeNodesRequired.year03;

  site.siteCalcsS1.flashPerComputeNode.year01 = site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year01 * advancedDataS1.server_cache_size;
  site.siteCalcsS1.flashPerComputeNode.year02 = site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year02 * advancedDataS1.server_cache_size;
  site.siteCalcsS1.flashPerComputeNode.year03 = site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year03 * advancedDataS1.server_cache_size;


  // console.log('TEST');
  // console.log(site.siteCalcsS1.flashDevicesRequiredPerComputeNode.year01);

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

  site.siteCalcsS2.dVXAdminCostsPrimary.year01 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredPrimary.year01 * advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dVXAdminCostsPrimary.year02 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredPrimary.year02 * advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dVXAdminCostsPrimary.year03 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredPrimary.year03 * advancedDataS2.data_node_usable_capacity);

  site.siteCalcsS2.dVXPowerCoolingCostsPrimary.year01 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredPrimary.year01 * advancedDataS2.DVX_DN_power_consumption);
  site.siteCalcsS2.dVXPowerCoolingCostsPrimary.year02 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredPrimary.year02 * advancedDataS2.DVX_DN_power_consumption);
  site.siteCalcsS2.dVXPowerCoolingCostsPrimary.year03 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredPrimary.year03 * advancedDataS2.DVX_DN_power_consumption);

  site.siteCalcsS2.dVXRackCostsBackup.year01 = (site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredBackup.year01 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.dVXRackCostsBackup.year02 = (site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredBackup.year02 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.dVXRackCostsBackup.year03 = (site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_rus + site.siteCalcsS2.dataNodesRequiredBackup.year03 * advancedDataS2.DVX_data_node_rus) * advancedDataS2.dollar_ru_year_data_center;

  site.siteCalcsS2.dVXNetworkCostsBackup.year01 = advancedDataS2.network_cost_port * (site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_network_ports + site.siteCalcsS2.dataNodesRequiredBackup.year01 * advancedDataS2.DVX_data_node_ports);
  site.siteCalcsS2.dVXNetworkCostsBackup.year02 = advancedDataS2.network_cost_port * (site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_network_ports + site.siteCalcsS2.dataNodesRequiredBackup.year02 * advancedDataS2.DVX_data_node_ports);
  site.siteCalcsS2.dVXNetworkCostsBackup.year03 = advancedDataS2.network_cost_port * (site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_network_ports + site.siteCalcsS2.dataNodesRequiredBackup.year03 * advancedDataS2.DVX_data_node_ports);

  site.siteCalcsS2.dVXAdminCostsBackup.year01 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredBackup.year01 * advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dVXAdminCostsBackup.year02 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredBackup.year02 * advancedDataS2.data_node_usable_capacity);
  site.siteCalcsS2.dVXAdminCostsBackup.year03 = advancedDataS2.FTE_admin_dollar * (site.siteCalcsS2.dataNodesRequiredBackup.year03 * advancedDataS2.data_node_usable_capacity);

  site.siteCalcsS2.dVXPowerCoolingCostsBackup.year01 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredBackup.year01 * advancedDataS2.DVX_DN_power_consumption);
  site.siteCalcsS2.dVXPowerCoolingCostsBackup.year02 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredBackup.year02 * advancedDataS2.DVX_DN_power_consumption);
  site.siteCalcsS2.dVXPowerCoolingCostsBackup.year03 = advancedDataS2.dollar_kWatt_data_center * (site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_power_consumption + site.siteCalcsS2.dataNodesRequiredBackup.year03 * advancedDataS2.DVX_DN_power_consumption);

  site.siteCalcsS2.cloudDVXPrice.year01 = 'NA';
  site.siteCalcsS2.cloudDVXPrice.year02 = 'NA';
  site.siteCalcsS2.cloudDVXPrice.year03 = 'NA';

  //  Array Requirements:
  site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year01 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year01/basicDataS2.primary_data_reduction);
  site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year02 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year02/basicDataS2.primary_data_reduction);
  site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year03 = Math.ceil(site.siteCalcsS2.primaryEffectiveCapacityRequired.year03/basicDataS2.primary_data_reduction);

  site.siteCalcsS2.computeNodesRequiredArrays.year01 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year01/(site.siteCalcsS2.logicalCores.year01 * helpers.percentToNumber(site.siteCalcsS2.computeRemainingPostBackup.year01)),(site.siteCalcsS2.totalRAMRequired.year01/site.siteCalcsS2.physicalRAM.year01)));
  site.siteCalcsS2.computeNodesRequiredArrays.year02 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year02/(site.siteCalcsS2.logicalCores.year02 * helpers.percentToNumber(site.siteCalcsS2.computeRemainingPostBackup.year02)),(site.siteCalcsS2.totalRAMRequired.year02/site.siteCalcsS2.physicalRAM.year02)));
  site.siteCalcsS2.computeNodesRequiredArrays.year03 = Math.ceil(Math.max(site.siteCalcsS2.totalvCPUsRequired.year03/(site.siteCalcsS2.logicalCores.year03 * helpers.percentToNumber(site.siteCalcsS2.computeRemainingPostBackup.year03)),(site.siteCalcsS2.totalRAMRequired.year03/site.siteCalcsS2.physicalRAM.year03)));

  site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 = Math.ceil(site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year01/advancedDataS2.array_unit_capacity);
  site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 = Math.ceil(site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year02/advancedDataS2.array_unit_capacity);
  site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 = Math.ceil(site.siteCalcsS2.arrayPrimaryUsableCapacityRequiredDedup.year03/advancedDataS2.array_unit_capacity);

  site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year01 = tapeOutput.bcEOY_S2.year01;
  site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year02 = tapeOutput.bcEOY_S2.year02;
  site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year03 = tapeOutput.bcEOY_S2.year03;

  site.siteCalcsS2.backupSystemsRequired.year01 = Math.ceil(site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year01/advancedDataS2.backup_unit_capacity);
  site.siteCalcsS2.backupSystemsRequired.year02 = Math.ceil(site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year02/advancedDataS2.backup_unit_capacity);
  site.siteCalcsS2.backupSystemsRequired.year03 = Math.ceil(site.siteCalcsS2.backupUsableCapacityRequiredARRAY.year03/advancedDataS2.backup_unit_capacity);

  site.siteCalcsS2.tapeUsableCapacityRequired.year01 = tapeOutput.tcEOY_S2.year01;
  site.siteCalcsS2.tapeUsableCapacityRequired.year02 = tapeOutput.tcEOY_S2.year02;
  site.siteCalcsS2.tapeUsableCapacityRequired.year03 = tapeOutput.tcEOY_S2.year03;

  site.siteCalcsS2.tapeSystemsRequired.year01 = Math.ceil(site.siteCalcsS2.tapeUsableCapacityRequired.year01/advancedDataS2.tape_unit_capacity);
  site.siteCalcsS2.tapeSystemsRequired.year02 = Math.ceil(site.siteCalcsS2.tapeUsableCapacityRequired.year02/advancedDataS2.tape_unit_capacity);
  site.siteCalcsS2.tapeSystemsRequired.year03 = Math.ceil(site.siteCalcsS2.tapeUsableCapacityRequired.year03/advancedDataS2.tape_unit_capacity);

  site.siteCalcsS2.arrayPrice.year01 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 * advancedDataS2.array_unit_capacity * advancedDataS2.traditional_array_cost_primary;
  site.siteCalcsS2.arrayPrice.year02 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 * advancedDataS2.array_unit_capacity * advancedDataS2.traditional_array_cost_primary;
  site.siteCalcsS2.arrayPrice.year03 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 * advancedDataS2.array_unit_capacity * advancedDataS2.traditional_array_cost_primary;

  site.siteCalcsS2.computeNodeHWPriceArray.year01 = site.siteCalcsS2.computeNodesRequired.year01 * (Number(advancedDataS2.server_base_cost) + (advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar) + (advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar));
  site.siteCalcsS2.computeNodeHWPriceArray.year02 = site.siteCalcsS2.computeNodesRequired.year02 * (Number(advancedDataS2.server_base_cost) + advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar + advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar);
  site.siteCalcsS2.computeNodeHWPriceArray.year03 = site.siteCalcsS2.computeNodesRequired.year03 * (Number(advancedDataS2.server_base_cost) + advancedDataS2.server_cores * advancedDataS2.server_CPU_dollar + advancedDataS2.server_RAM * advancedDataS2.server_RAM_dollar);

  site.siteCalcsS2.backupPrice.year01 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_unit_capacity * advancedDataS2.traditional_backup_system_cost;
  site.siteCalcsS2.backupPrice.year02 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_unit_capacity * advancedDataS2.traditional_backup_system_cost;
  site.siteCalcsS2.backupPrice.year03 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_unit_capacity * advancedDataS2.traditional_backup_system_cost;

  site.siteCalcsS2.tapePrice.year01 = site.siteCalcsS2.tapeSystemsRequired.year01 * advancedDataS2.tape_unit_capacity * advancedDataS2.traditional_tape_system_cost;
  site.siteCalcsS2.tapePrice.year02 = site.siteCalcsS2.tapeSystemsRequired.year02 * advancedDataS2.tape_unit_capacity * advancedDataS2.traditional_tape_system_cost;
  site.siteCalcsS2.tapePrice.year03 = site.siteCalcsS2.tapeSystemsRequired.year03 * advancedDataS2.tape_unit_capacity * advancedDataS2.traditional_tape_system_cost;

  site.siteCalcsS2.computeRackCosts.year01 = advancedDataS2.dollar_ru_year_data_center * site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_rus;
  site.siteCalcsS2.computeRackCosts.year02 = advancedDataS2.dollar_ru_year_data_center * site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_rus;
  site.siteCalcsS2.computeRackCosts.year03 = advancedDataS2.dollar_ru_year_data_center * site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_rus;

  site.siteCalcsS2.computeNetworkCosts.year01 = site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_network_ports * advancedDataS2.network_cost_port;
  site.siteCalcsS2.computeNetworkCosts.year02 = site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_network_ports * advancedDataS2.network_cost_port;
  site.siteCalcsS2.computeNetworkCosts.year03 = site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_network_ports * advancedDataS2.network_cost_port;

  site.siteCalcsS2.computePowerCoolingCosts.year01 = site.siteCalcsS2.computeNodesRequired.year01 * advancedDataS2.server_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.computePowerCoolingCosts.year02 = site.siteCalcsS2.computeNodesRequired.year02 * advancedDataS2.server_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.computePowerCoolingCosts.year03 = site.siteCalcsS2.computeNodesRequired.year03 * advancedDataS2.server_power_consumption * advancedDataS2.dollar_kWatt_data_center;

  site.siteCalcsS2.arrayRackCosts.year01 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 * advancedDataS2.dollar_ru_year_data_center * advancedDataS2.array_rus;
  site.siteCalcsS2.arrayRackCosts.year02 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 * advancedDataS2.dollar_ru_year_data_center * advancedDataS2.array_rus;
  site.siteCalcsS2.arrayRackCosts.year03 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 * advancedDataS2.dollar_ru_year_data_center * advancedDataS2.array_rus;

  site.siteCalcsS2.arrayNetworkCosts.year01 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 * advancedDataS2.network_cost_port * advancedDataS2.array_ports;
  site.siteCalcsS2.arrayNetworkCosts.year02 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 * advancedDataS2.network_cost_port * advancedDataS2.array_ports;
  site.siteCalcsS2.arrayNetworkCosts.year03 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 * advancedDataS2.network_cost_port * advancedDataS2.array_ports;

  site.siteCalcsS2.arrayAdminCosts.year01 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 * advancedDataS2.array_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.arrayAdminCosts.year02 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 * advancedDataS2.array_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.arrayAdminCosts.year03 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 * advancedDataS2.array_unit_capacity * advancedDataS2.FTE_admin_dollar;

  site.siteCalcsS2.arrayPowerCoolingCosts.year01 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year01 * advancedDataS2.array_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.arrayPowerCoolingCosts.year02 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year02 * advancedDataS2.array_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.arrayPowerCoolingCosts.year03 = site.siteCalcsS2.arraysRequiredForPrimaryStorage.year03 * advancedDataS2.array_power_consumption * advancedDataS2.dollar_kWatt_data_center;

  site.siteCalcsS2.backupRackCosts.year01 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_rus * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.backupRackCosts.year02 = site.siteCalcsS2.backupSystemsRequired.year02 * advancedDataS2.backup_rus * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.backupRackCosts.year03 = site.siteCalcsS2.backupSystemsRequired.year03 * advancedDataS2.backup_rus * advancedDataS2.dollar_ru_year_data_center;

  site.siteCalcsS2.backupAdminCosts.year01 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.backupAdminCosts.year02 = site.siteCalcsS2.backupSystemsRequired.year02 * advancedDataS2.backup_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.backupAdminCosts.year03 = site.siteCalcsS2.backupSystemsRequired.year03 * advancedDataS2.backup_unit_capacity * advancedDataS2.FTE_admin_dollar;

  site.siteCalcsS2.backupPowerCoolingCosts.year01 = site.siteCalcsS2.backupSystemsRequired.year01 * advancedDataS2.backup_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.backupPowerCoolingCosts.year02 = site.siteCalcsS2.backupSystemsRequired.year02 * advancedDataS2.backup_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.backupPowerCoolingCosts.year03 = site.siteCalcsS2.backupSystemsRequired.year03 * advancedDataS2.backup_power_consumption * advancedDataS2.dollar_kWatt_data_center;

  site.siteCalcsS2.tapeRackCosts.year01 = site.siteCalcsS2.tapeSystemsRequired.year01 * advancedDataS2.tape_rus * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.tapeRackCosts.year02 = site.siteCalcsS2.tapeSystemsRequired.year02 * advancedDataS2.tape_rus * advancedDataS2.dollar_ru_year_data_center;
  site.siteCalcsS2.tapeRackCosts.year03 = site.siteCalcsS2.tapeSystemsRequired.year03 * advancedDataS2.tape_rus * advancedDataS2.dollar_ru_year_data_center;

  site.siteCalcsS2.tapeNetworkCosts.year01 = site.siteCalcsS2.tapeSystemsRequired.year01 * advancedDataS2.network_cost_port * advancedDataS2.tape_ports;
  site.siteCalcsS2.tapeNetworkCosts.year02 = site.siteCalcsS2.tapeSystemsRequired.year02 * advancedDataS2.network_cost_port * advancedDataS2.tape_ports;
  site.siteCalcsS2.tapeNetworkCosts.year03 = site.siteCalcsS2.tapeSystemsRequired.year03 * advancedDataS2.network_cost_port * advancedDataS2.tape_ports;

  site.siteCalcsS2.tapeAdminCosts.year01 = site.siteCalcsS2.tapeSystemsRequired.year01 * advancedDataS2.tape_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.tapeAdminCosts.year02 = site.siteCalcsS2.tapeSystemsRequired.year02 * advancedDataS2.tape_unit_capacity * advancedDataS2.FTE_admin_dollar;
  site.siteCalcsS2.tapeAdminCosts.year03 = site.siteCalcsS2.tapeSystemsRequired.year03 * advancedDataS2.tape_unit_capacity * advancedDataS2.FTE_admin_dollar;

  site.siteCalcsS2.tapePowerCoolingCosts.year01 = site.siteCalcsS2.tapeSystemsRequired.year01 * advancedDataS2.tape_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.tapePowerCoolingCosts.year02 = site.siteCalcsS2.tapeSystemsRequired.year02 * advancedDataS2.tape_power_consumption * advancedDataS2.dollar_kWatt_data_center;
  site.siteCalcsS2.tapePowerCoolingCosts.year03 = site.siteCalcsS2.tapeSystemsRequired.year03 * advancedDataS2.tape_power_consumption * advancedDataS2.dollar_kWatt_data_center;

  site.siteCalcsS2.dollarPerComputeNode.year01 = site.siteCalcsS2.computeNodeHWPriceDVX.year01/site.siteCalcsS2.computeNodesRequired.year01;
  site.siteCalcsS2.dollarPerComputeNode.year02 = site.siteCalcsS2.computeNodeHWPriceDVX.year02/site.siteCalcsS2.computeNodesRequired.year02;
  site.siteCalcsS2.dollarPerComputeNode.year03 = site.siteCalcsS2.computeNodeHWPriceDVX.year03/site.siteCalcsS2.computeNodesRequired.year03;

  site.siteCalcsS2.vmPerComputeNode.year01 = site.siteCalcsS2.vMs.year01/site.siteCalcsS2.computeNodesRequired.year01;
  site.siteCalcsS2.vmPerComputeNode.year02 = site.siteCalcsS2.vMs.year02/site.siteCalcsS2.computeNodesRequired.year02;
  site.siteCalcsS2.vmPerComputeNode.year03 = site.siteCalcsS2.vMs.year03/site.siteCalcsS2.computeNodesRequired.year03;

  site.siteCalcsS2.ramPerComputeNode.year01 = site.siteCalcsS2.totalRAMRequired.year01/site.siteCalcsS2.computeNodesRequired.year01;
  site.siteCalcsS2.ramPerComputeNode.year02 = site.siteCalcsS2.totalRAMRequired.year02/site.siteCalcsS2.computeNodesRequired.year02;
  site.siteCalcsS2.ramPerComputeNode.year03 = site.siteCalcsS2.totalRAMRequired.year03/site.siteCalcsS2.computeNodesRequired.year03;

  site.siteCalcsS2.flashPerComputeNode.year01 = site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year01/advancedDataS2.server_cache_size;
  site.siteCalcsS2.flashPerComputeNode.year02 = site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year02/advancedDataS2.server_cache_size;
  site.siteCalcsS2.flashPerComputeNode.year03 = site.siteCalcsS2.flashDevicesRequiredPerComputeNode.year03/advancedDataS2.server_cache_size;




  console.log('SITE CALCULATIONS (YELLOW) S2');
  console.log(site.siteCalcsS2);
  model.updateLocalStore(site.siteCalcsS2,'siteCalcsS2');


};