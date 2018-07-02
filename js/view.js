
let view = {};


view.init = function() {

    view.getTableRow04S1 = helpers.getTableRow04S1();
    view.getTableRow05S1 = helpers.getTableRow05S1();
    view.getTableRow06S1 = helpers.getTableRow06S1();
    view.getTableRow07S1 = helpers.getTableRow07S1();

};


view.render = function() {

  let siteCalcsS1 = model.getLocalStore('siteCalcsS1');


  helpers.siteCalcDataEntry(view.getTableRow04S1, siteCalcsS1.vMs);
  helpers.siteCalcDataEntry(view.getTableRow05S1, siteCalcsS1.totalvCPUsRequired);
  helpers.siteCalcDataEntry(view.getTableRow06S1, siteCalcsS1.totalRAMRequired);
  helpers.siteCalcDataEntry(view.getTableRow07S1, siteCalcsS1.primaryEffectiveCapacityRequired);


};
