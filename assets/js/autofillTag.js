/* global document, location, localStorage, Sortable, NodeFilter, window */

const Autofill = (function () {
  const myURL = "https://raw.githubusercontent.com/cirept/WSMupgrades/master/json/autofillTags2.json";
  const myStyles = GM_getResourceURL("toolStyles"); // Tampermonkey function
  const lastestChanges = GM_getResourceURL("changeLog"); // Tampermonkey function
  const webID = document.getElementById("_webId").value;
  const locale = document.getElementById("_locale").value;
  const toolInstructions = GM_getResourceURL("toolInstructions"); // Tampermonkey function
  const defaultList = {
    "***How to Seperate Words***": "Seperate words with --> ;",
    "***Example***": "*`*like*`*;*`*this*`*;*`*you*`*;*`*see*`*",
    "%DEALER_NAME%": "SEARCH_FOR_ME",
    "%FRANCHISES%": "SEARCH_FOR_ME",
    "%STREET%": "SEARCH_FOR_ME",
    "%CITY%": "SEARCH_FOR_ME",
    "%STATE%": "SEARCH_FOR_ME",
    "%STATE_FULL_NAME%": "SEARCH_FOR_ME",
    "%ZIP%": "SEARCH_FOR_ME",
    "%PHONE%": "SEARCH_FOR_ME",
    "%NEW_PHONE%": "SEARCH_FOR_ME",
    "%USED_PHONE%": "SEARCH_FOR_ME",
    "%SERVICE_PHONE%": "SEARCH_FOR_ME",
    "%PARTS_PHONE%": "SEARCH_FOR_ME"
  };

  // 
  // Tool Elements
  // 

  const wsmEditerTools = document.createElement("div");
  wsmEditerTools.classList.add("customEditorTools");

  const autofillOptionsContainer = document.createElement("div");
  autofillOptionsContainer.classList.add("autofillOptionsContainer");
  autofillOptionsContainer.classList.add("hide");

  // minimize list element
  const minimizeList = document.createElement("button");
  minimizeList.classList.add("minimizeList");
  minimizeList.classList.add("btn");
  minimizeList.classList.add("btn-sm");
  minimizeList.classList.add("btn-wd");
  minimizeList.classList.add("btn-autofill-tool");
  minimizeList.title = "show list";
  minimizeList.type = "button";
  minimizeList.innerHTML = "<i class='fas fa-eye fa-lg'></i>";
  minimizeList.onclick = toggleToolPanel;

  const autofillOptionsList = document.createElement("ul");
  autofillOptionsList.id = "autofillOptions";
  autofillOptionsList.classList.add("autofillOptions");

  const messageDisplay = document.createElement("div");
  messageDisplay.id = "toolMessageDisplay";
  messageDisplay.classList.add("container-fluid");
  messageDisplay.textContent = `Autofill tag text replacer tool - version ${GM_info.script.version}`;

  const defaultReset = document.createElement("button");
  defaultReset.id = "defaultReset";
  defaultReset.classList.add("btn");
  defaultReset.classList.add("btn-sm");
  defaultReset.classList.add("btn-danger");
  defaultReset.classList.add("m-1");
  defaultReset.classList.add("col");
  defaultReset.title = "Reset Values";
  defaultReset.innerHTML = "<i class='fas fa-redo fa-lg'></i>";
  defaultReset.onclick = () => {
    resetValues(true, "Values Reset");
  };

  const applyAutofills = document.createElement("button");
  applyAutofills.id = "applyAutofills";
  applyAutofills.classList.add("btn");
  applyAutofills.classList.add("btn-sm");
  applyAutofills.classList.add("btn-wd");
  applyAutofills.classList.add("btn-success");
  applyAutofills.type = "button";
  applyAutofills.title = "apply autofills";
  applyAutofills.innerHTML = "<i class='fas fa-magic fa-lg'></i>";
  applyAutofills.onclick = autofills;

  const addButton = document.createElement("button");
  addButton.id = "addAutofill";
  addButton.classList.add("btn");
  addButton.classList.add("btn-sm");
  addButton.classList.add("btn-autofill-tool");
  addButton.classList.add("m-1");
  addButton.classList.add("col");
  addButton.dataset.toggle = "modal";
  addButton.dataset.target = "#autofillModal";
  addButton.value = "addAutofill";
  addButton.title = "Add Autofill";
  addButton.innerHTML = "<i class='fas fa-plus fa-lg'></i>";

  const changeLogButton = document.createElement("button");
  changeLogButton.id = "addAutofill";
  changeLogButton.classList.add("btn");
  changeLogButton.classList.add("btn-sm");
  changeLogButton.classList.add("btn-info");
  changeLogButton.classList.add("col");
  changeLogButton.classList.add("m-1");
  changeLogButton.dataset.toggle = "modal";
  changeLogButton.dataset.target = "#lastestChangesModal";
  changeLogButton.innerHTML = "<i class='fas fa-file-alt'></i>";
  changeLogButton.title = "Latest Changes";

  const reportBug = document.createElement("a");
  reportBug.id = "reportBug";
  reportBug.classList.add("btn");
  reportBug.classList.add("btn-sm");
  reportBug.classList.add("btn-warning");
  reportBug.classList.add("col");
  reportBug.classList.add("m-1");
  reportBug.href = "https://github.com/cirept/autofillReplacer/issues/new?template=bug_report.md";
  reportBug.innerHTML = "<i class='fas fa-bug'></i>";
  reportBug.target = "_blank";
  reportBug.title = "Report Bug";

  const requestEnhancement = document.createElement("a");
  requestEnhancement.id = "requestEnhancement";
  requestEnhancement.classList.add("btn");
  requestEnhancement.classList.add("btn-sm");
  requestEnhancement.classList.add("btn-primary");
  requestEnhancement.classList.add("col");
  requestEnhancement.classList.add("m-1");
  requestEnhancement.href = "https://github.com/cirept/autofillReplacer/issues/new?template=feature_request.md";
  requestEnhancement.innerHTML = "<i class='fas fa-splotch'></i>";
  requestEnhancement.title = "Request Enhancement";
  requestEnhancement.target = "_blank";

  const instructions = document.createElement("button");
  instructions.id = "toolInstructions";
  instructions.classList.add("btn");
  instructions.classList.add("btn-sm");
  instructions.classList.add("btn-info");
  instructions.classList.add("col");
  instructions.classList.add("m-1");
  instructions.dataset.toggle = "modal";
  instructions.dataset.target = "#toolInstructionsModal";
  instructions.innerHTML = "<i class='fas fa-info'></i>";
  instructions.title = "Instructions";

  const row1 = document.createElement("div");
  row1.classList.add("row");

  const row2 = document.createElement("div");
  row2.classList.add("row");

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("list-action-container");
  actionContainer.classList.add("container-fluid");

  const autofillDropdown = document.createElement("ul");
  autofillDropdown.tabIndex = "4";

  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");
  listContainer.classList.add("container-fluid");

  // attach bottom buttons
  row1.appendChild(addButton);
  row1.appendChild(defaultReset);
  row2.appendChild(reportBug);
  row2.appendChild(requestEnhancement);
  row2.appendChild(changeLogButton);
  row2.appendChild(instructions);
  // attach button container to container wrapper
  actionContainer.appendChild(row1);
  actionContainer.appendChild(row2);
  // attach autofill list to list container 
  listContainer.appendChild(autofillOptionsList);
  // attach all elements to "toggable" container
  autofillOptionsContainer.appendChild(messageDisplay);
  autofillOptionsContainer.appendChild(listContainer);
  autofillOptionsContainer.appendChild(actionContainer);
  autofillOptionsContainer.appendChild(autofillDropdown);
  // attach tool container to main tool container
  wsmEditerTools.appendChild(applyAutofills);
  wsmEditerTools.appendChild(minimizeList);
  wsmEditerTools.appendChild(autofillOptionsContainer);

  // 
  // Promises
  // 

  /**
   * Loads all the tool styles
   */
  const loadAutofillStyles = new Promise((resolve, reject) => {
    try {
      // default styles
      let autofillStyles = document.createElement("link");
      autofillStyles.id = "autofill-styles";
      autofillStyles.rel = "stylesheet";
      autofillStyles.href = myStyles;
      document.head.appendChild(autofillStyles);
      // send resolve
      resolve("Sucess!");
    } catch (error) {
      reject(error);
    }
  });

  /**
   * Gets the state JSON information
   * Resolves an array of state objects with the name and abbreviations
   */
  const getLocalAbbreviationInformation = new Promise((resolve, reject) => {
    const options = {
      url: `https://raw.githubusercontent.com/cirept/autofillReplacer/master/assets/json/locale_${locale}.json`,
      dataType: "json"
    };

    // get file data
    jQuery.ajax(options)
      .done((data) => {
        // return the STATE json object
        resolve(data);
      }).fail((error) => {
        reject(error);
      }).always();
  });

  /**
   * Get data from "Settings" to autofill into the defaults list
   */
  const getWebsiteGeneralInfo = new Promise((resolve, reject) => {

    // path to open the website settings tab
    const siteSettingsURL = `editSiteSettings.do?webId=${webID}&locale=${locale}&pathName=editSettings`;

    // get website settings information
    jQuery.get(siteSettingsURL, (data) => {
        if (data) {
          const myDiv = document.createElement("div");
          myDiv.innerHTML = data;
          const franchises = myDiv.querySelector("select#associatedFranchises").options;
          const myLength = franchises.length;
          const myFranchises = [];

          // create franchises string
          for (let x = 0; x < myLength; x += 1) {
            myFranchises.push(franchises[x].textContent);
          }
          // fill out autofill list with website settings information
          defaultList["%DEALER_NAME%"] = myDiv.querySelector("input[name='name']").value || "SEARCH_FOR_ME";
          defaultList["%STREET%"] = myDiv.querySelector("input#contact_address_street1").value || "SEARCH_FOR_ME";
          defaultList["%CITY%"] = myDiv.querySelector("input#contact_address_city").value || "SEARCH_FOR_ME";
          defaultList["%ZIP%"] = myDiv.querySelector("input#contact_address_postalCode").value || "SEARCH_FOR_ME";
          defaultList["%STATE%"] = myDiv.querySelector("select#contact_address_state").value || "SEARCH_FOR_ME";
          defaultList["%PHONE%"] = myDiv.querySelector("input[name='contact_phone_number']").value || "SEARCH_FOR_ME";
          defaultList["%FRANCHISES%"] = myFranchises.join(", ") || "SEARCH_FOR_ME";

          // display confirmation message
          log("Website Settings Information Loaded");

          // resolve promise
          resolve("Site Settings Loaded");
        } else {
          reject("Unable to get site settings.");
        }
      }, "html")
      /**
       * Once the Website Settings have been loaded, Start the process of finding the FULL STATE NAME of the
       * STATE abbreviation
       */
      .done(() => {
        /**
         * Promise to get full state name from json files
         */
        const getFullState = new Promise((resolve, reject) => {
          // consume promise and get the local abbreviation data
          getLocalAbbreviationInformation.then((stateList) => {

            // filter the array of states down to the matching state.
            const filteredStates = stateList.filter((state) => {
              const {
                abbreviation
              } = state;
              return defaultList["%STATE%"] === abbreviation;
            });
            // display console message that no match was found
            if (filteredStates.length > 1 || filteredStates.length < 1) {
              // set value to the default value
              log("Region not supported by the tool");
            }
            // set STATE FULL NAME to matched state
            if (filteredStates.length === 1) {
              defaultList["%STATE_FULL_NAME%"] = filteredStates[0].name;

              // display confirmation message
              log("State Full Name Loaded");
            }
            // resolve with success
            resolve("Success!");
          }, (error) => {
            log("Get state full name failed", error.responseText);
          });
        });
      })
      .fail((error) => {
        // reject(`unable to get site settings, ${error}`);
        log("Failed to Load Website Settings", error);
      })
      .always(() => {
        resolve();
      });
  });

  /**
   *   Get Phone Numbers from website settings
   */
  const getWebsitePhoneNumbers = new Promise((resolve, reject) => {
    // build website settings URL path
    const webID = document.getElementById("siWebId").querySelector("label.displayValue").textContent;
    const siteSettingsURL = `editDealerPhoneNumbers.do?webId=${webID}&locale=${locale}&pathName=editSettings`;

    jQuery.get(siteSettingsURL, (data) => {
        const myDiv = document.createElement("div");
        myDiv.innerHTML = data;
        defaultList["%PHONE%"] = myDiv.querySelector("input[name*='(__primary_).ctn']").value || "SEARCH_FOR_ME";
        defaultList["%NEW_PHONE%"] = myDiv.querySelector("input[name*='(__new_).ctn']").value || "SEARCH_FOR_ME";
        defaultList["%USED_PHONE%"] = myDiv.querySelector("input[name*='(__used_).ctn']").value || "SEARCH_FOR_ME";
        defaultList["%SERVICE_PHONE%"] = myDiv.querySelector("input[name*='(__service_).ctn']").value || "SEARCH_FOR_ME";
        defaultList["%PARTS_PHONE%"] = myDiv.querySelector("input[name*='(__parts_).ctn']").value || "SEARCH_FOR_ME";
      }, "html")
      .done(() => {
        log("Phone Numbers Loaded");
      })
      .fail(() => {
        log("failed to get phone numbers");
      })
      .always(() => {
        resolve();
      });
  });

  // 
  // Functions
  // 

  /**
   * 
   * @param {string} message - Message to write to the console.
   * @param {object} obj - the object to display in the console message
   */
  function log(message, obj) {
    if (obj) {
      console.log(`Autofill Tool : ${message}`, obj);
    } else {
      console.log(`Autofill Tool : ${message}`);
    }
  }

  /**
   * jQuery functions for animate css
   */
  $.fn.extend({
    animateCss(animationName) {
      const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      this.addClass(`animated ${animationName}`).one(animationEnd, function () {
        $(this).removeClass(`animated ${animationName}`);
      });
      return this;
    },
  });

  /**
   * Will show or hide the tool"s panel
   * will also update the button"s icon and hover text
   */
  function toggleToolPanel() {
    autofillOptionsContainer.classList.toggle("hide");

    if (autofillOptionsContainer.classList.contains("hide")) {
      minimizeList.innerHTML = `<i class="fas fa-eye fa-lg"></i>`;
      minimizeList.title = "show list";
    } else {
      minimizeList.innerHTML = `<i class="fas fa-eye-slash fa-lg"></i>`;
      minimizeList.title = "hide list";
    }
  }

  /**
   * save current state of the list, only if the configured list
   * has no errors
   */
  function saveState() {
    saveAutofillParameters(createArray());
  }

  /**
   *Updates the tool display message
   *
   * @param {string} message - the message to display
   * @param {string} animationType - the type of animation to use
   */
  function updateDisplayMessage(message, animationType = "tada") {
    // update display message
    messageDisplay.innerText = message;
    jQuery("#toolMessageDisplay").animateCss(animationType);
  }

  /**
   * Build a generic list item to use through out the tool
   * @param {string} autofill - the text that will be used to fill in the autofillTag div
   * @param {string} text - the text that will be used as the input value
   */
  function listItem(autofill, text) {
    if (!text) {
      text = "SEARCH_FOR_ME";
    }

    const listElement = document.createElement("li");
    listElement.classList.add("autofillEntry");
    listElement.classList.add("row");

    const label = document.createElement("div");
    label.classList.add("autofillTag");
    label.textContent = autofill;

    const myInput = document.createElement("input");
    myInput.type = "text";
    myInput.classList.add("regEx");
    myInput.title = text;
    myInput.value = text;

    const myPointer = document.createElement("i");
    myPointer.classList.add("fas");
    myPointer.classList.add("fa-long-arrow-alt-right");
    myPointer.classList.add("fa-lg");
    myPointer.classList.add("arrow");

    const removeMeContainer = document.createElement("div");
    removeMeContainer.classList.add("js-remove");
    removeMeContainer.title = "click to remove";
    removeMeContainer.onclick = (e) => {
      // removes list item from tool
      e.currentTarget.parentElement.remove();
      // saves state
      saveState();
      // display message to user that item was removed
      updateDisplayMessage("Item Removed");
      // remove disabled from the autofill options list
      removeDisable(e.currentTarget.parentElement);
    };

    const removeMe = document.createElement("i");
    removeMe.classList.add("fas");
    removeMe.classList.add("fa-times");
    removeMe.classList.add("fa-lg");
    removeMeContainer.appendChild(removeMe);

    // build list item
    listElement.appendChild(myInput);
    listElement.appendChild(myPointer);
    listElement.appendChild(label);
    listElement.appendChild(removeMeContainer);

    return listElement;
  }

  /**
   * save autofill parameter list to local storage
   * @param {Object} obj - parameter list to save
   */
  function saveAutofillParameters(myObj) {
    const saveMe = JSON.stringify(myObj);
    saveToLocalStorage("autofillVariables", saveMe);
  }

  /**
   * save object to local storage
   * @param {string} name - object to be saved into local storage
   * @param value - the value to save
   */
  function saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
  }

  /**
   * creating an array of the configured autofill tags
   * Also performs simple validation to prevent empty values being saved
   * return {object} myObj - returns object array of autofill entries in list
   */
  function createArray() {
    const myObj = [];
    const saveAutofill = {};
    let autofillTag = "";
    let myRegex = "";
    let regexInput;
    let $myThis;

    // loop through configured autofills
    for (let z = 0; z < autofillOptionsList.children.length; z += 1) {
      $myThis = jQuery(autofillOptionsList.children[z]);
      autofillTag = jQuery.trim($myThis.find(".autofillTag").text()); // trim it just in case the manual autofill input is triggerd
      regexInput = $myThis.find(".regEx");
      myRegex = regexInput.val().trim();

      // validate input
      // do not save until input  empty
      if (myRegex === "") {
        autofillOptionsList.children[z].classList.add("myError");
        applyAutofills.classList.add("disabled");
        messageDisplay.textContent = "Please enter a word to search for.";
        continue;
      } else if (autofillOptionsList.children[z].classList.contains("myError")) {
        autofillOptionsList.children[z].classList.remove("myError");
      }

      saveAutofill[autofillTag] = myRegex;
    }

    myObj.push(saveAutofill);

    return myObj;
  }

  /**
   * Scan autofill drop down list and remove disable class
   * @param {object} elem - element being removed from the configured list
   */
  function removeDisable(elem) {
    const autofillTag = elem.querySelector(".autofillTag").innerText;
    const dropDown = autofillDropdown.querySelectorAll(".disabled");
    const dropDownLength = dropDown.length;

    for (let z = 0; z < dropDownLength; z += 1) {
      if (autofillTag === dropDown[z].textContent) {
        dropDown[z].classList.remove("disabled");
      }
    }
  }

  /**
   * disabled "magic" button if an entry is blank
   */
  function toggleMagicButton() {
    autofillOptionsList.getElementsByClassName("myError").length >= 1 ? applyAutofills.classList.add("disabled") : applyAutofills.classList.remove("disabled");
  }

  /**
   * Show error if input search field is empty
   */
  function validateList() {
    if (autofillOptionsList.getElementsByClassName("myError").length > 0) {
      updateDisplayMessage("Please enter a word to search for.", "flash");
    } else {
      if (applyAutofills.classList.contains("disabled")) {
        applyAutofills.classList.remove("disabled");
      }

      if (messageDisplay.textContent !== "") {
        messageDisplay.textContent = "";
      }
    }
  }

  /**
   * Updates the inputs hover text
   * @param {object} e - the event object
   *
   */
  function updateInputTitle(e) {
    e.target.title = e.target.value;
  }

  /**
   * will bind all new option list with a on text change listener
   * @param {element} elem - new autofill list option
   */
  function bindTextChangeListener(elem) {
    jQuery(elem).find("input").on("keyup", saveState);
    jQuery(elem).find("input").on("keyup", updateInputTitle);
    jQuery(elem).find("input").on("keyup", toggleMagicButton);
    jQuery(elem).find("input").on("keyup", validateList);
    jQuery(elem).find("input").on("keyup", () => {
      updateDisplayMessage("Changes Saved", "flash");
    });
  }

  /**
   * retrive object from local storage
   * retrive object from local storage
   * @param {object} obj - object to be saved into local storage
   */
  function getFromLocalStorage() {
    let returnMe;
    if (localStorage.getItem("autofillVariables") === null) {
      returnMe = defaultList;
    } else {
      returnMe = JSON.parse(localStorage.getItem("autofillVariables"));
      returnMe = returnMe[0];
    }
    return returnMe;
  }

  /**
   * will construct the autofill display area.
   * Will use data in local storage, if it exists
   * Otherwise defaults to Website information
   */
  function buildAutofillOptions() {
    const regReplace = getFromLocalStorage();
    let listElement;

    // build autofill list options IF there is a list that already exists
    if (regReplace) {
      // loop through Legend Content list
      for (const key in regReplace) {
        if (regReplace.hasOwnProperty(key)) {
          if (key === "") {
            continue;
          }
          listElement = listItem(key, regReplace[key]);
          // attach to legend list
          autofillOptionsList.append(listElement);
          // bind list item elements
          bindTextChangeListener(listElement);
        }
      }
    }
  }

  /**
   * resets all the autofill parameters to the default list
   * @param {string} message - the message to show when the tool resets
   */
  function resetAutofills(message) {
    // erase current list
    autofillOptionsList.innerHTML = "";
    // remove stored variables from memory
    localStorage.removeItem("autofillVariables");
    // build default list
    buildAutofillOptions();
    // reset apply button if it is disabled
    toggleMagicButton();
    // update display message
    updateDisplayMessage(message);
    // save new values
    saveState();
  }

  /**
   * Reset configured autofill tags to the default list
   * @param {boolean} confirm - should the user be prompted before reset?
   * @param {string} message - the message to show when the tool resets
   */
  function resetValues(confirm, message) {
    if (confirm && window.confirm("Reset Values?")) {
      resetAutofills(message);
    }

    if (!confirm) {
      resetAutofills(message);
    }

  }

  /**
   * Converts the autofill tags in local memory to simple array
   * @return {object} autofill - contains a simple array with AUTOFILL tags ONLY
   */
  function localDataToString() {
    const localData = getFromLocalStorage();
    const autofill = [];
    const keys = Object.keys(localData);

    keys.map((value) => {
      autofill.push(value);
    });

    return autofill;
  }

  /**
   * Creates an active menu item that the tool will use to replace text with autofill tags
   * @param {object} elem - element that will get it"s onclick event binded
   */
  function createAutofillDropdownMenu(elem) {
    elem.onclick = function () {
      const listElement = listItem(elem.textContent);
      const listLength = listElement.children.length;

      elem.classList.add("disabled");
      autofillOptionsList.appendChild(listElement);

      for (let y = 0; y < listLength; y += 1) {
        if (listElement.children[y].tagName === "INPUT") {
          listElement.children[y].focus();
        }
      }

      // bind list item elements
      bindTextChangeListener(listElement);

      // save state of new list
      saveState();

      // confirmation message
      updateDisplayMessage("Autofill Added to List");
    };
  }

  /**
   * SUCCESS BINDING EVENT
   * Build out drop down list with data gathered from JSON file
   * @param {object} data - the autofill data that will be used to populate the options
   */
  function buildAutofillList(data) {
    const localData = localDataToString();
    // build out drop down menu
    for (const myKey in data[0]) {
      if (data[0].hasOwnProperty(myKey)) {
        // create "li" for each autofill tag in the list
        const myListItem = document.createElement("li");
        myListItem.textContent = myKey;
        myListItem.classList.add("btn");
        myListItem.classList.add("btn-light");
        myListItem.classList.add("autofill-list-item");
        // if autofill tag is present in the active list, disable it
        if (localData.includes(myKey)) {
          myListItem.classList.add("disabled");
        }
        // add the list element to the "drop down" list
        autofillDropdown.appendChild(myListItem);
        // bind listener to "li" item
        createAutofillDropdownMenu(myListItem);
        // attach new "li" to main list
        const tooltipText = data[0][myKey] ? data[0][myKey] : "**No tooltip infor available**";
        myListItem.title = tooltipText;
      }
    }
  }

  /**
   * FAILURE BINDING EVENT
   * Will display a prompt message that the user can manually input the autofill tag
   * @return {function} Prompts user for input, upon successfull input, will bind event listeners and save
   */
  function bindAddAutofill() {
    return function () {
      const autofillTag = window.prompt("Enter autofill tag for the new feild.", "%AUTOFILL_TAG_HERE%");

      if (autofillTag === null || autofillTag === "") {
        window.alert("please try again, please enter an autofill tag");
      } else if (localDataToString().includes(autofillTag)) {
        window.alert("please try again, autofill tag already present on list");
      } else {
        const listElement = listItem(autofillTag);
        autofillOptionsList.appendChild(listElement);

        // bind list item elements
        bindTextChangeListener(listElement);

        // save state of new list
        saveState();
      }
    };
  }

  /**
   * Start events to build the autofill "drop down menu"
   */
  function getAutofillList() {
    const options = {
      url: myURL,
      dataType: "json"
    };
    jQuery.ajax(myURL).done((data) => {
      // log("data", data);
      buildAutofillList(data);
    }).fail((error) => {
      log("Autofill List Failed to Load, reverting to manual Autofill Entry Method", error);
    }).always();
  }

  /**
   * create treewalker to navigate DOM and return all TEXT nodes
   * @param {object} base - base element to crawl for text nodes
   * @return {array} wordArray - array containing all text nodes on the page
   */
  function treeWalk(base) {
    const treeWalker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, null, false);
    const wordArray = [];

    while (treeWalker.nextNode()) {
      if (treeWalker.currentNode.nodeType === 3 && treeWalker.currentNode.textContent.trim() !== "") {
        wordArray.push(treeWalker.currentNode);
      }
    }
    return wordArray;
  }

  /**
   * Escape characters to prevent malacious input from user
   */
  RegExp.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  /**
   * Test if phone number
   * Checked format = 000-0000
   * @param {string} text - the text to verify
   */
  function phoneNumberText(text) {
    const phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g;

    if (phoneRegex.test(text)) {
      return RegExp.escape(text);
    }
    return `\\b${RegExp.escape(text)}\\b`;
  }

  /**
   * Replaced matching words/phrases with the corresponding autofill tags
   * @param {array} wordList - array containing all the visible text in the edit area
   * @param {string} regReplace - text string to search for
   */
  function replaceText(wordList, regReplace) {
    wordList.forEach((n) => {
      let text = n.nodeValue;

      // iterate through autofill array and replace matches in text
      // replace all instances of "findMe" with "autofillTag"
      for (const autofillTag in regReplace) {
        const findMe = regReplace[autofillTag];

        // if split phrases are needed
        if (findMe.indexOf(";") > -1) {
          const findArray = findMe.split(";");
          const arrayLength = findArray.length;
          for (let a = 0; a < arrayLength; a += 1) {
            const searchText = findArray[a].trim();
            const findThis = phoneNumberText(searchText);
            const myRegex = new RegExp(findThis, "gi");

            if (searchText === "") {
              continue;
            }

            text = text.replace(myRegex, autofillTag);
          }
        } else {
          const findThis = phoneNumberText(findMe);
          const myRegex = new RegExp(findThis, "gi");
          text = text.replace(myRegex, autofillTag);
        }
      }

      n.nodeValue = text;
    });
  }

  /**
   * loop through word list array and replace text with autofill tags
   * @param {object} baseElem - base element to find and replace text with autofill tags
   * @param {array} regReplace - object array that contains the regExpressions and corresponding autofill tags
   */
  function useAutofillTags(baseElem, regReplace) {
    let wordList;
    const baseLength = baseElem.length;

    for (let z = 0; z < baseLength; z += 1) {
      // get all visible text on page
      wordList = treeWalk(baseElem[z]);
      replaceText(wordList, regReplace);
    }
  }

  /**
   * Replace text on a CMS style input window
   * @param {array} recordEditWindow - array of DOM input elements
   * @param {regex} regReplace - list of regex values
   */
  function replaceTextCMS(recordEditWindow, regReplace) {
    // pass elements with children as base element for autofill replacing
    useAutofillTags(recordEditWindow, regReplace);

    // change focus between text area to trigger text saving.
    const recordLendth = recordEditWindow.length;
    for (let z = 0; z < recordLendth; z += 1) {
      jQuery(recordEditWindow[z]).focus();
    }
  }

  /**
   * will walk through edittable portion of WSM window and perform text
   * replacing with data contained in the list area of tool
   */
  function autofills() {
    // WSM MAIN WINDOW LOGIC
    const contentFrame = jQuery("iframe#cblt_content").contents();
    const siteEditorIframe = contentFrame.find("iframe#siteEditorIframe").contents();
    let viewerIframe;
    let cmsIframe;
    let myChild;
    let recordEditWindow;
    const regReplace = getFromLocalStorage(); // get stored autofill tags from local storage

    // run CMS Content Pop Up edit window IF WINDOW IS OPEN
    if (window.location.pathname.indexOf("editSite") >= 0 && siteEditorIframe.find("div#hiddenContentPopUpOuter").hasClass("opened")) {
      // save contents of cms content edit frame
      cmsIframe = siteEditorIframe.find("iframe#cmsContentEditorIframe").contents();

      // if quick CMS editor is open
      recordEditWindow = cmsIframe.find("div.main-wrap").find(".input-field").find(`div[data-which-field="copy"]`);

      // pass elements with children as base element for autofill replacing
      replaceTextCMS(recordEditWindow, regReplace);
    } else if (window.location.pathname.indexOf("editSite") >= 0 && !siteEditorIframe.find("div#hiddenContentPopUpOuter").hasClass("opened")) {
      // get contens of iframe
      viewerIframe = siteEditorIframe.find("iframe#viewer").contents();

      // return array of elements that have children
      myChild = viewerIframe.find("body").children().filter(function (index, value) {
        if (value.children.length !== 0) {
          return this;
        }
      });

      // pass elements with children as base element for autofill replacing
      useAutofillTags(myChild, regReplace);
    } else if (window.location.pathname.indexOf("cms") >= 0) {
      // CMS LOGIC

      // get contens of iframe
      recordEditWindow = contentFrame.find("div.main-wrap").find(".input-field").find("div[data-which-field='copy']");

      // pass elements with children as base element for autofill replacing
      replaceTextCMS(recordEditWindow, regReplace);
    }
  }

  /**
   * Determine if the current website is different
   */
  function webIDToolReset() {
    const currentWebID = getWebID();
    if (getItemFromLocalStorage("webID") !== currentWebID) {
      resetValues(false, "New Web ID Detected, Values Reset");
      // save webid
      saveToLocalStorage("webID", currentWebID);
    }
  }

  /**
   * Grabs the web id from the input at the top right
   * of the WSM page.
   * @return {string} the web id for the current site.
   */
  function getWebID() {
    return document.querySelector("#siWebId .displayValue").innerText;
  }

  /**
   * Gets data item from local storage
   * @param {string} name - the name of the local storage item to return
   * @return the value for the data item or "No Data Found" message
   */
  function getItemFromLocalStorage(name) {
    return window.localStorage.getItem(name) === null ? "No Data Found in Local Storage" : window.localStorage.getItem(name);
  }

  /**
   * attaches the tool elements to the page
   */
  function attachToolToPage() {
    // attach tool elements to page
    document.querySelector("header.wsmMainHeader").appendChild(wsmEditerTools);
  }

  /**
   * main function to start the program
   */
  function main() {
    // run tool
    getToolData();
  }

  /**
   * Sets up autofill tool
   */
  function setup() {
    attachToolToPage();
    attachModals();
    buildAutofillOptions();
    getAutofillList();
    webIDToolReset(); // Added 7/8/2018
  }


  /**
   * loads tool styles and gets all the tool data from the website settings
   */
  function getToolData() {
    Promise.all([loadAutofillStyles, getWebsiteGeneralInfo, getWebsitePhoneNumbers]).then(() => {
      log("All Settings Loaded");
      window.onload = setup;
    }, (error) => {
      // tool failed to load
      log("Autofill Tool Failed to Load data, resorting to default values", error);
    });
  }

  // 
  // Modals
  // 

  /**
   * attach modals
   */
  function attachModals() {
    // 
    // Autofill Modal
    // 

    // build autofill modal
    const autofillModal = document.createElement("div");
    autofillModal.innerHTML = `
        <div class="modal fade" id="autofillModal" tabindex="-1" role="dialog" aria-labelledby="autofillModalTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
              </div>
            </div>
          </div>
        </div>
      `;
    // attach modal to page
    document.body.appendChild(autofillModal);
    // fill autofill modal with content
    document.querySelector("#autofillModal .modal-body").appendChild(autofillDropdown);

    // 
    // Latest Changes Modal
    //

    // get latest changes markdown doc.
    jQuery.get(lastestChanges, (data) => {
      const conv = new showdown.Converter();
      showdown.setFlavor("github");
      const changeLogData = conv.makeHtml(data);

      // build latest changes modal
      const lastestChangesModal = document.createElement("div");
      // add the modal content + the Latest Changes Markdown Doc Content
      lastestChangesModal.innerHTML = `
        <div class="modal fade" id="lastestChangesModal" tabindex="-1" role="dialog" aria-labelledby="lastestChangesModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                ${changeLogData}
              </div>
            </div>
          </div>
        </div>
      `;

      // attach modal to page
      document.body.appendChild(lastestChangesModal);
    }, "text");

    // 
    // Instructions Modal
    //

    // get latest changes markdown doc.
    jQuery.get(toolInstructions, (data) => {
      const conv = new showdown.Converter();
      showdown.setFlavor("github");
      const toolInstructionsData = conv.makeHtml(data);

      // build latest changes modal
      const toolInstructionsModal = document.createElement("div");
      // add the modal content + the Latest Changes Markdown Doc Content
      toolInstructionsModal.innerHTML = `
        <div class="modal fade" id="toolInstructionsModal" tabindex="-1" role="dialog" aria-labelledby="toolInstructionsModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Tool Instructions</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${toolInstructionsData}
              </div>
            </div>
          </div>
        </div>
      `;

      // attach modal to page
      document.body.appendChild(toolInstructionsModal);
    }, "text");
  }

  // 
  // Run Tool
  // 

  main();

})();