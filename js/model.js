/**
 * Model file for working with data
 */


let model = {};

model.init = function() {

  if( false === model.checkLocalStore() ) {
      model.updateLocalStore( data, 'vanillaData' );
  }

  model.updateLocalStore( data, 'vanillaData' );


  model.userInputBasic = [        //  Properties for 'Basic Customer Input' Object S1/S2
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
  //  That is it!  The rest is automatic

  model.userInputAdvanced = [     //  Properties for 'Advanced Customer Input' Object S1/S2
    'server_cores',
    'exp_data_reduction_DVX',
    'cloud_data_reduction_ratio',
    'cloud_DVX_net_price'
  ];


  model.userInputBasicS1 = {};      //  Start - Basic Customer Input Site 1
  model.userInputAdvancedS1 = {};   //  Start - Advanced Customer Input Site 1
  model.userInputBasicS2 = {};      //  Start - Basic Customer Input Site 2
  model.userInputAdvancedS2 = {};   //  Start - Advanced Customer Input Site 2

};

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

  let store = JSON.parse( localStorage.getItem( storeName ) );

  return store;

};
//
// /**
//  * Saves temporary store to local storage.
//  *
//  * @param {Object} store Native JavaScript object with site data
//  */


model.updateLocalStore = function( store, storeName ) {

  // localStorage.setItem( 'vanillaPress', JSON.stringify( store ) );
  localStorage.setItem( storeName, JSON.stringify( store ) );

};



/**
 * Deletes data from local storage
 *
 */
model.removeLocalStore = function() {

  localStorage.removeItem( 'vanillaPress' );

};


/**
 * Updates post or page in local store
 *
 * @param {Object} contentObj Content object to update
 */
model.updateContent = function( contentObj ) {

  var store = model.getLocalStore(),
    date = new Date();

  if( 'post' === contentObj.type ) {
    store.posts.forEach( function( post ) {
      if( contentObj.id === post.id ) {
        post.title = contentObj.title;
        post.content = contentObj.content;
        post.modified = date.toISOString();
      }
    });
  }

  if ( 'page' === contentObj.type ) {
    store.pages.forEach( function( page ) {
      if( contentObj.id === page.id ) {
        page.title = contentObj.title;
        page.content = contentObj.content;
        page.modified = date.toISOString();
      }
    });
  }


  model.updateLocalStore( store );

};





// /**
//  * Get a single post or page based on the url slug
//  *
//  * @param {string} slug The slug for the post
//  * @return {Object} contentObj Single post or page
//  *
//  */
// model.getContent = function( slug ) {
//
//   var contentObj = model.getPost( slug );
//
//
//   // If post is not found, search pages
//   if( null === contentObj ) {
//     contentObj = model.getPage( slug );
//   }
//
//   // If page not found, assign 404 error
//   if( null === contentObj ) {
//     contentObj = {
//         title: '404 Error',
//         content: 'Content not found'
//     }
//   }
//
//   return contentObj;
//
// };
//
//
// /**
//  * Get a single post or page based on the current url
//  *
//  * @return {Object} contentObj Single post or page
//  *
//  */
// model.getCurrentContent = function() {
//
//   var slug = router.getSlug(),
//       contentObj = model.getContent( slug );
//
//   return contentObj;
//
// };
//
//
// /**
//  * Gets posts from local store
//  *
//  * @return {Object[]} posts Array of posts
//  */
// model.getPosts = function() {
//
//   var posts = model.getLocalStore().posts;
//   return posts;
//
// }
//
// /**
//  * Get a single post based on url slug
//  *
//  * @param {string} slug The slug for the post
//  * @return {Object} post Single post
//  *
//  */
// model.getPost = function( slug ) {
//
//   var posts = model.getLocalStore().posts;
//
//   // Get the post from store based on the slug
//   for( i = 0, max = posts.length; i < max; i++  ) {
//
//     if( slug === posts[i].slug ) {
//       return posts[i];
//     }
//
//   }
//
//   return null;
//
// }
//
// /**
//  * Gets pages from local store
//  *
//  * @return {Object[]} pages Array of page objects
//  */
// model.getPages = function() {
//
//   var pages = model.getLocalStore().pages;
//   return pages;
//
// }
//
// /**
//  * Get a single page based on url slug
//  *
//  * @param {string} slug The slug for the page
//  * @return {Object} page  Single page object
//  *
//  */
// model.getPage = function( slug ) {
//
//   var pages = model.getLocalStore().pages;
//
//   if( null === slug ) slug = 'home';
//
//   // Get the post from store based on the slug
//   for( i = 0, max = pages.length; i < max; i++  ) {
//
//    if( slug === pages[i].slug ) {
//      return pages[i];
//    }
//
//   }
//
//   return null;
//
// }
//
//

//
//
// /**
//  * Updates if editor is hidden
//  *
//  * @param {Boolean} hidden If editor is hidden or not
//  */
// model.updateEditorHidden = function( isHidden ) {
//
//   var store = model.getLocalStore();
//
//   store.settings.editorHidden = isHidden;
//   model.updateLocalStore( store );
//
// };
//
// /**
//  * Gets local store setting for if editor is hidden
//  *
//  * @return {Boolean} hidden A boolean for if editor is hidden
//  */
// model.getEditorHidden = function() {
//
//   var store = model.getLocalStore();
//
//   return store.settings.editorHidden;
//
// };
//



