/**
 * Model file for working with data
 */


let model = {};

model.init = function() {

  // if( false === model.checkLocalStore() ) {
  //     model.updateLocalStore( data, 'myData' );
  // }
  // model.updateLocalStore( data, 'myData' );        //  Add 'data' object from data.js to Local Store


  model.userInputBasic_Records = [        //  PROPERTIES for 'Basic Customer INPUT' Object - model.userInputBasicS1 and S2  <<<  NO LONGER USED - RECORD KEEPING NOW
    'primary_stor',                 //  9
    'secondary_stor',               //  10
    'tape',                         //  11
    'existing_nodes',               //  12
    'num_vms',
    'vcpu_vm',
    'ram_vm',
    'disk_vm',
    'proj_vm_growth',
    'primary_data_reduction',       // 20
    'backup_data_reduction',
    'tape_data_reduction',
    'backup_exp_sched',
    'tape_exp_sched',
    'daily_change_rate',
    'data_restored_tape'
  ];


  //  IMPORTANT NOTICE:  To add additional Advanced Inputs:
  //  Add the name to the array below (Record Keeping)
  //  Add the element to the HTML with the appropriate CSS classes and name attribute (listed below)
  //  That is it!  The rest is automatic

  //  Only Properties included in the HTML form:
  model.userInputAdvanced_Records = [     //  PROPERTIES for 'Advanced Customer INPUT' Object -  model.userInputAdvancedS1 and S2 <<<  NO LONGER USED - RECORD KEEPING NOW

                                        //  < Operating Costs
    'FTE_admin_dollar',                 //  30
    'dollar_ru_year_data_center',       //  31
    'dollar_kWatt_data_center',         //  32
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
    'server_power_consumption',         //  44
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
    'DVX_DN_power_consumption',         //  62
                                        //  < Primary Storage Details
    'traditional_array_cost_primary',   //  66
    'array_unit_capacity',              //  67
    'array_ports',                      //  68
    'array_rus',                        //  69
    'array_power_consumption',          //  70
                                        //  < Backup Storage Details
    'traditional_backup_system_cost',   //  74
    'backup_unit_capacity',             //  75
    'backup_host_cpu_consumption',      //  76
    'backup_ports',                     //  77
    'backup_rus',                       //  78
    'backup_power_consumption',         //  79
                                        //  < Tape Storage Details
    'traditional_tape_system_cost',     //  83
    'tape_unit_capacity',               //  84
    'tape_ports',                       //  86
    'tape_rus',                         //  87
    'tape_power_consumption',           //  88
    'network_cost_port'                 //  89
  ];


  model.userInputBasicS1 = {};      //  Start - Basic Customer Input Site 1
  model.userInputAdvancedS1 = {};   //  Start - Advanced Customer Input Site 1
  model.userInputBasicS2 = {};      //  Start - Basic Customer Input Site 2
  model.userInputAdvancedS2 = {};   //  Start - Advanced Customer Input Site 2

  // let userInputBasicS1Els = helpers.getFormInputEls('userInputBasicS1'),        //  GET Input Elements from HTML - to add property names to Object
  //   userInputBasicS2Els = helpers.getFormInputEls('userInputBasicS2'),
  //   userInputAdvancedS1Els = helpers.getFormInputEls('userInputAdvancedS1'),
  //   userInputAdvancedS2Els = helpers.getFormInputEls('userInputAdvancedS2');

  //  First use HTML Inputs to build each object with properties derived from name attribute
  //  assign null to each property
  // on EVENT > loop through HTML again and assign value (property) to each Input object property

  // for(let i = 0; i < userInputBasicS1Els.length;i++){
  //   model.userInputBasicS1[userInputBasicS1Els[i].name] = null;                 //  Add properties to the Object from the HTML Elements (El.name) - assign null
  // }
  // for(let i = 0; i < userInputBasicS2Els.length;i++){
  //   model.userInputBasicS2[userInputBasicS2Els[i].name] = null;                 //  Add properties to the Object from the HTML Elements (El.name) - assign null
  // }
  // for(let i = 0; i < userInputAdvancedS1Els.length;i++){
  //   model.userInputAdvancedS1[userInputAdvancedS1Els[i].name] = null;           //  Add properties to the Object from the HTML Elements (El.name) - assign null
  // }
  // for(let i = 0; i < userInputAdvancedS2Els.length;i++){
  //   model.userInputAdvancedS2[userInputAdvancedS2Els[i].name] = null;           //  Add properties to the Object from the HTML Elements (El.name) - assign null
  // }

  // console.log(model.userInputBasicS1);
  // console.log(model.userInputBasicS2);
  // console.log(model.userInputAdvancedS1);
  // console.log(model.userInputAdvancedS2);

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

  let i = 0;
  for (; i < inputEls.length; i++) {                                //  Loop to create User Input Objects
      model[dataName][inputEls[i].name] = inputEls[i].value         //  model.userInputBasicS1.(name from HTML Input Element) = value from Input Element
  }









  // if(inputEls.length === Object.keys(model[dataName]).length) {     //  Compare Length of Array with number of properties in an Object
  //   let i = 0;
  //   for (; i < inputEls.length; i++) {
  //     if(model[dataName].hasOwnProperty([inputEls[i].name]) === true){
  //     model[dataName][inputEls[i].name] = inputEls[i].value         //  model.userInputBasicS1.(name from HTML Input Element) = value from Input Element
  //     } else {
  //     console.log(`ERROR - Mismatched Properties in Input Object: model.${dataName}`);
  //     }
  //   }
  // } else {
  //   console.log('Length ERROR')
  // }

  console.log(`INPUTS: ${dataName}`);
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





