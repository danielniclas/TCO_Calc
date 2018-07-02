
let assumptions = {};

assumptions.init = function() {

  assumptions.awsCostInputs = {};
  assumptions.cloudDVXInputs = {};

};

assumptions.collectData = function(){

  assumptions.awsCostInputs.getsPerContainer = 0.004/10000;
  assumptions.awsCostInputs.putsPerContainer = 0.005/1000;
  assumptions.awsCostInputs.storageCostGbMonth = 0.026;
  assumptions.awsCostInputs.egressNetworkCostGb = 0.15;
  assumptions.awsCostInputs.i3xlarge3yr = 0.337;
  assumptions.awsCostInputs.i3xlarge1yr = 0.468;
  assumptions.awsCostInputs.i3xlargeOnDemand = 0.688;

  assumptions.cloudDVXInputs.cloudDVXContainerSizeS3 = 0.008;
  assumptions.cloudDVXInputs.cloudDVXWriteAmpl = 2;
  assumptions.cloudDVXInputs.cloudDVXStoreMerges = 0.1;
  assumptions.cloudDVXInputs.cloudDVXGetMultFactor = 5;
  assumptions.cloudDVXInputs.cloudDVXSpaceOverprovisioning = '10%';

  // console.log('Assumptions AWS Const Inputs:');
  // console.log(assumptions.awsCostInputs);
  model.updateLocalStore(assumptions.awsCostInputs,'assumptionsAWS');

  // console.log('Assumptions Cloud DVX Inputs (ASSUMPTIONS):');
  // console.log(assumptions.cloudDVXInputs);
  model.updateLocalStore(assumptions.cloudDVXInputs,'assumptionsCloud');

};

