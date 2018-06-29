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

helpers.addFormListeners = function (){                    //  Update Button Event Listeners
  let updateBtn = helpers.getUpdateBtnEl();
  updateBtn.addEventListener('click', datriumTCO.functionManager, false);
};

