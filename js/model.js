/**
 * Model file for working with data
 */


let model = {};

model.init = function() {

  // if( false === model.checkLocalStore() ) {
  //     model.updateLocalStore( data, 'myData' );
  // }
  // model.updateLocalStore( data, 'myData' );        //  Add 'data' object from data.js to Local Store


  model.userInputBasic = [        //  PROPERTIES for 'Basic Customer INPUT' Object - model.userInputBasicS1 and S2
    'primary_stor',
    'secondary_stor',
    'tape',
    'existing_nodes',
    'num_vms',
    'vcpu_vm',
    'ram_vm',
    'disk_vm',
    'proj_vm_growth',
    'primary_data_reduction',
    'backup_data_reduction',
    'tape_data_reduction',
    'backup_exp_sched',
    'tape_exp_sched',
    'daily_change_rate',
    'data_restored_tape'
  ];


  //  IMPORTANT NOTICE:  To add additional Advanced Inputs:
  //  Add the name to the array below
  //  Add the element to the HTML with the appropriate CSS classes
  //  MUST BE IN CORRECT ORDER !!!        - Same order as html form inputs
  //  MUST BE SAME INPUTS AS ON HTML !!!  - Same order as html form inputs
  //  That is it!  The rest is automatic

  //  Only Properties included in the HTML form:
  model.userInputAdvanced = [     //  PROPERTIES for 'Advanced Customer INPUT' Object -  model.userInputAdvancedS1 and S2

                                        //  < Operating Costs
    'dollar_ru_year_data_center',       //  31
                                        //  < Compute Details
    'server_base_cost',                 //  34
    'server_cores',                     //  35
    'vCPU_core_oversubscription',       //  36
    'server_RAM',                       //  37
    'server_CPU_dollar',                //  38
    'server_RAM_dollar',                //  39
    'server_cache_dollar',              //  40
    'server_cache_size',                //  41
    'server_rus',                       //  42
    'server_network_ports',             //  43
                                        //  < DVX Details
    'exp_data_reduction_DVX',           //  46
    'cloud_data_reduction_ratio',       //  47
    'DVX_host_cpu_consumption',         //  48
    'data_node_usable_capacity',        //  49
    'DVX_host_license_cost',            //  52
    'data_node_cost',                   //  55
    'cloud_DVX_net_price',              //  58
    'DVX_data_node_rus',                //  59
    'DVX_data_node_ports',              //  60
    'DVX_max_cache_per_host',           //  61
                                        //  < Backup Storage Details
    'backup_host_cpu_consumption',      //  76
                                        //  < Tape Storage Details
    'network_cost_port'                //  89
  ];


  model.userInputBasicS1 = {};      //  Start - Basic Customer Input Site 1
  model.userInputAdvancedS1 = {};   //  Start - Advanced Customer Input Site 1
  model.userInputBasicS2 = {};      //  Start - Basic Customer Input Site 2
  model.userInputAdvancedS2 = {};   //  Start - Advanced Customer Input Site 2

};



//  Generate all available USER INPUT VALUE OBJECTS and add to LOCAL STORAGE:
//  model.userInputBasicS1 = {};
//  model.userInputAdvancedS1 = {};
//  model.userInputBasicS2 = {};
//  model.userInputAdvancedS2 = {};

model.updateUserInputs = function(inputType, site) {                  //  User Inputs > LOCAL STORAGE.

  event.preventDefault();
  let dataName = inputType + site;      //  Ex.  'userInputBasicS1'   inputType:  userInputBasic   Site:  S1

  // console.log(`inputType: | ${inputType}`);
  // console.log(`dataName: | ${dataName}`);

  let inputEls = helpers.getFormInputEls(dataName);

  if(inputEls.length === model[inputType].length) {
    let i = 0;
    for (; i < inputEls.length; i++) {

      // console.log(model[inputType][i]);
      // console.log(inputEls[i].value);

      model[dataName][model[inputType][i]] = inputEls[i].value;     //  Ex.  model.userInputBasicS1.primary_stor = 1
    }
  } else {
    console.log('THROW ERROR: model.js:67');
  }

  console.log(`Inputs: ${dataName}`);
  console.log(model[dataName]);                         //  Start - {Basic/Advanced Customer Input S1/S2}
  model.updateLocalStore(model[dataName], dataName);    //  Start - {Basic/Advanced Customer Input S1/S2} to LOCAL STORAGE

};





//  No Longer Used:   No Longer Used:   No Longer Used:   No Longer Used:   No Longer Used:


model.updateBasicUserInputs = function() {                  //  BASIC User Inputs > LOCAL STORAGE

  event.preventDefault();
  let inputEls = helpers.getFormInputEls('userInputS1');

  if(inputEls.length === model.basicCustomerInputs.length) {
    let i = 0;
    for (; i < inputEls.length; i++) {
      model.basicInputs[model.basicCustomerInputs[i]] = inputEls[i].value;
    }
  } else {
    console.log('THROW ERROR: model.js:67');
  }
  console.log('BASIC Inputs:');
  console.log(model.basicInputs);
  model.updateLocalStore(model.basicInputs,'basicUserInputs');

};

model.updateAdvancedUserInputs = function() {                 //  ADVANCED User Inputs > LOCAL STORAGE

  event.preventDefault();
  let inputEls = helpers.getAdvancedFormInputEls('userInputAdvancedS1');

  if(inputEls.length === model.advancedCustomerInputs.length) {
    let i = 0;
    for (; i < inputEls.length; i++) {
      model.advancedInputs[model.advancedCustomerInputs[i]] = inputEls[i].value;
    }
  } else {
    console.log('THROW ERROR: model.js:85');
  }
  console.log('ADVANCED Inputs:');
  console.log(model.advancedInputs);
  model.updateLocalStore(model.advancedInputs,'advancedUserInputs');

};

//  No Longer Used -- END:


//  ORIGINAL:


// /**
//  * Checks if local store already exists
//  *
//  * @return {Boolean} Boolean value for if local store already exists
//  */
model.checkLocalStore = function() {
  let store = model.getLocalStore('vanillaData');
  if ( null === store ) {
    return false;
  } else {
    return true;
  }
};
//
//
// /**
//  * Gets content from local store
//  *
//  * @return {Object} store Native JavaScript object from local store
//  */
model.getLocalStore = function(storeName) {
  return JSON.parse( localStorage.getItem( storeName ) );
};

// /**
//  * Saves temporary store to local storage.
//  *
//  * @param {Object} store Native JavaScript object with site data
//  */

model.updateLocalStore = function( store, storeName ) {
  localStorage.setItem( storeName, JSON.stringify( store ) );
};


/**
 * Deletes data from local storage
 *
 */
model.removeLocalStore = function() {
  localStorage.removeItem( 'vanillaPress' );
};





