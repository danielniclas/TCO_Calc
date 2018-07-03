/**
 * Helper file for extra helper functions
 */

/**
 * Main helper object
 */
let helpers = {};



/**
 * Gets editor form update button
 * @return {Object} Content form element
 */
helpers.getUpdateBtnEl = function() {
  return document.getElementById( 'updateBtn' );
};

helpers.getInputForm = function(){
  return document.getElementById('userDataForm')
};

helpers.getFormInputEls = function(className){
  return document.getElementsByClassName(className);
};

helpers.getAdvancedFormInputEls = function(className){
  return document.getElementsByClassName(className);
};

helpers.percentToNumber = function(string){
  return parseFloat(string)/100;
};

helpers.currencyToNumber = function(currencyString){
  return Number(currencyString.replace(/[^0-9\.-]+/g,""));
};

helpers.addFormListeners = function (){                    //  Update Button Event Listeners - EVENT HANDLERS
  let updateBtn = helpers.getUpdateBtnEl();
  updateBtn.addEventListener('click', datriumTCO.functionManager, false);
  updateBtn.addEventListener('click', datriumTCO.assertionTests, false);
};

//  Site Calculations - 3 Year Range - Add Data to Elements:

helpers.siteCalcDataEntry = function (elementList, content){
  for (let i = 0; i < elementList.length; i++) {
    elementList[i].innerHTML = content['year0' + (i+1)];
  }
};



//  Gather Site Calc Table Rows Site 1 - DOM Elements:

helpers.getTableRow04S1 = function (){
  return document.getElementsByClassName('scVMs')
};
helpers.getTableRow05S1 = function (){
  return document.getElementsByClassName('totalVCPUs')
};
helpers.getTableRow06S1 = function (){
  return document.getElementsByClassName('totalRAM')
};
helpers.getTableRow07S1 = function (){
  return document.getElementsByClassName('primaryCapacity')
};


