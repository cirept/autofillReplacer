import defaultList from "../json/default_list.json";
import autofillTagList from "../json/autofillTagList.json";
import request from 'request';
import en_AU from "../json/locale_en_AU.json";
import en_CA from "../json/locale_en_CA.json";
import en_US from "../json/locale_en_US.json";
import fr_CA from "../json/locale_fr_CA.json";
import '../css/styles.css';

const AutofillReplacerTool = (function AutofillReplacerTool() {
	let toolState = {
		defaultList: defaultList,
		// defaultList: [{
		//     "autofillTag": "***How to Separate Words***",
		//     "searchTerms": "Separate words with --> ;"
		//   },
		//   {
		//     "autofillTag": "***Example***",
		//     "searchTerms": "*`*like*`*;*`*this*`*;*`*you*`*;*`*see*`*"
		//   },
		//   {
		//     "autofillTag": "%DEALER_NAME%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%FRANCHISES%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%STREET%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%CITY%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%STATE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%STATE_FULL_NAME%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%ZIP%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%PHONE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%NEW_PHONE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%USED_PHONE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%SERVICE_PHONE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   },
		//   {
		//     "autofillTag": "%PARTS_PHONE%",
		//     "searchTerms": "SEARCH_FOR_ME"
		//   }
		// ],
		activeList: [ {} ],
		autoToolReset: false,
		webID: "none",
		locale: "none",
	};
	const autofillTagListURL =
		"https://raw.githubusercontent.com/cirept/autofillReplacer/master/assets/json/autofill_list.json";
	/* eslint-disable */
	// const myStyles = GM_getResourceURL("toolStyles");
	const lastestChanges = GM_getResourceURL("changeLog");
	const toolInstructions = GM_getResourceURL("toolInstructions");
	/* eslint-enable */

	//
	// Tool Elements
	//

	const wsmEditorTools = document.createElement("div");
	const autofillOptionsContainer = document.createElement("div");
	const messageDisplay = document.createElement("div");
	const buttonOptions_row1 = document.createElement("div");
	const buttonOptions_row2 = document.createElement("div");
	const actionContainer = document.createElement("div");
	const listContainer = document.createElement("div");
	const autofillOptionsList = document.createElement("ul");
	const allAutofillsList = document.createElement("ul");
	const minimizeList_button = document.createElement("button");
	const defaultReset_button = document.createElement("button");
	const applyAutofills_button = document.createElement("button");
	const addAutofill_button = document.createElement("button");
	const changeLog_button = document.createElement("button");
	const instructions_button = document.createElement("button");
	const reportBug = document.createElement("a");
	const requestEnhancement = document.createElement("a");

	// wsm editor tools props
	wsmEditorTools.classList.add("customEditorTools");

	// autofill options container props
	autofillOptionsContainer.classList.add("autofillOptionsContainer");
	autofillOptionsContainer.classList.add("hide");

	// minimize list element props
	minimizeList_button.classList.add("minimizeList");
	minimizeList_button.classList.add("btn");
	minimizeList_button.classList.add("btn-sm");
	minimizeList_button.classList.add("btn-wd");
	minimizeList_button.classList.add("btn-autofill-tool");
	minimizeList_button.title = "show list";
	minimizeList_button.type = "button";
	minimizeList_button.innerHTML = "<i class='fas fa-eye fa-lg'></i>";

	// autofill options list props
	autofillOptionsList.id = "autofillOptions";
	autofillOptionsList.classList.add("autofillOptions");

	// message display props
	messageDisplay.id = "toolMessageDisplay";
	messageDisplay.classList.add("container-fluid");
	messageDisplay.textContent = `Autofill tag text replacer tool - version ${GM_info.script.version}`;

	// default reset button props
	defaultReset_button.id = "defaultReset";
	defaultReset_button.classList.add("btn");
	defaultReset_button.classList.add("btn-sm");
	defaultReset_button.classList.add("btn-danger");
	defaultReset_button.classList.add("m-1");
	defaultReset_button.classList.add("col");
	defaultReset_button.title = "Reset Values";
	defaultReset_button.innerHTML = "<i class='fas fa-redo fa-lg'></i>";

	// apply autofill button props
	applyAutofills_button.id = "applyAutofills";
	applyAutofills_button.classList.add("btn");
	applyAutofills_button.classList.add("btn-sm");
	applyAutofills_button.classList.add("btn-wd");
	applyAutofills_button.classList.add("btn-success");
	applyAutofills_button.type = "button";
	applyAutofills_button.title = "apply autofills";
	applyAutofills_button.innerHTML = "<i class='fas fa-magic fa-lg'></i>";

	// add button props
	addAutofill_button.id = "addAutofill";
	addAutofill_button.classList.add("btn");
	addAutofill_button.classList.add("btn-sm");
	addAutofill_button.classList.add("btn-autofill-tool");
	addAutofill_button.classList.add("m-1");
	addAutofill_button.classList.add("col");
	addAutofill_button.dataset.toggle = "modal";
	addAutofill_button.dataset.target = "#autofillListModal";
	addAutofill_button.value = "addAutofill";
	addAutofill_button.title = "Add Autofill";
	addAutofill_button.innerHTML = "<i class='fas fa-plus fa-lg'></i>";

	// change log button props
	changeLog_button.id = "viewLatestChanges";
	changeLog_button.classList.add("btn");
	changeLog_button.classList.add("btn-sm");
	changeLog_button.classList.add("btn-info");
	changeLog_button.classList.add("col");
	changeLog_button.classList.add("m-1");
	changeLog_button.dataset.toggle = "modal";
	changeLog_button.dataset.target = "#lastestChangesModal";
	changeLog_button.innerHTML = "<i class='fas fa-file-alt'></i>";
	changeLog_button.title = "Latest Changes";

	// report bug link props
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

	// request enhancement link props
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

	// view instructions button props
	instructions_button.id = "toolInstructions";
	instructions_button.classList.add("btn");
	instructions_button.classList.add("btn-sm");
	instructions_button.classList.add("btn-info");
	instructions_button.classList.add("col");
	instructions_button.classList.add("m-1");
	instructions_button.dataset.toggle = "modal";
	instructions_button.dataset.target = "#toolInstructionsModal";
	instructions_button.innerHTML = "<i class='fas fa-info'></i>";
	instructions_button.title = "Instructions";

	// button options container row 1 props
	buttonOptions_row1.classList.add("row");

	// button options container row 2 props
	buttonOptions_row2.classList.add("row");

	// tool button actions container props
	actionContainer.classList.add("list-action-container");
	actionContainer.classList.add("container-fluid");

	// autofill list props
	allAutofillsList.tabIndex = "4";
	allAutofillsList.id = "allAutofillsList";

	// list container props
	listContainer.classList.add("list-container");
	listContainer.classList.add("container-fluid");

	// attach bottom buttons
	buttonOptions_row1.appendChild(addAutofill_button);
	buttonOptions_row1.appendChild(defaultReset_button);
	buttonOptions_row2.appendChild(reportBug);
	buttonOptions_row2.appendChild(requestEnhancement);
	buttonOptions_row2.appendChild(changeLog_button);
	buttonOptions_row2.appendChild(instructions_button);

	// attach button container to container wrapper
	actionContainer.appendChild(buttonOptions_row1);
	actionContainer.appendChild(buttonOptions_row2);

	// attach autofill list to list container
	listContainer.appendChild(autofillOptionsList);

	// attach all elements to "toggable" container
	autofillOptionsContainer.appendChild(messageDisplay);
	autofillOptionsContainer.appendChild(listContainer);
	autofillOptionsContainer.appendChild(actionContainer);

	// attach tool container to main tool container
	wsmEditorTools.appendChild(applyAutofills_button);
	wsmEditorTools.appendChild(minimizeList_button);
	wsmEditorTools.appendChild(autofillOptionsContainer);

	//
	// Functions
	//

	/**
   * Custom Tool Console Logging for debugging purposes
   * @param {string} message - Message to write to the console.
   * @param {Object} [obj] - OPTIONAL : the object to display in the console message
   */
	function log(message, obj) {
		/* eslint-disable */
		if (obj) {
			// remove comment to enable console logs
			console.log(`Autofill Tool : ${message}`, obj);
		} else {
			// remove comment to enable console logs
			console.log(`Autofill Tool : ${message}`);
		}
		/* eslint-enable */
	}

	/**
   * Custom Tool Console Logging for debugging purposes
   * @param {string} message - Message to write to the console.
   * @param {boolean} returnResolve - returns resolved
   * @return {Object} if resolve is true, returns empty resolve
   */
	function logReturn(message, returnResolve = false) {
		/* eslint-disable */
		if (returnResolve) {
			// remove comment to enable console logs
			// console.log(`Autofill Tool : ${message}`);
			return Promise.resolve();
		} else {
			// remove comment to enable console logs
			// console.log(`Autofill Tool : ${message}`);
		}
		/* eslint-enable */
	}

	/**
   * Loop through an array and perform a function
   * @param {Object[]} array - the array to loop through
   * @param {Object} functionToRun - the function to run through each element in the array
   * @param {Object} thisArg - the object to reference as "this" keyword
   */
	function loopThroughArray(array, functionToRun, thisArg = this) {
		log("looping through array");
		array.forEach(functionToRun, thisArg);
	}

	/**
   *  Generic function to perform ajax requests.  I wanted to make my own.  =]
   * @param {Object} options - the ajax request options
   * @param {string} options.url - the url to mkae the ajax request to
   * @param {string} options.dataType - the data type to expect
   * @returns {Promise} the data that is recieved from the ajax request
   */
	function fetch(options) {
		return new Promise((resolve, reject) => {
			log("fetching URL");
			jQuery
				.ajax(options)
				.done((data) => {
					resolve(data);
				})
				.fail((error) => {
					reject(error);
				})
				.always();
		});
	}

	/**
   * retrieve object from local storage
   * @param {Object} obj - object to be saved into local storage
   * @return {Object} the ACTIVE Autofill list retrieved from localStorage
   */
	function getToolState() {
		log("get from local storage");

		const localData = localStorage.getItem("AutofillReplacerTool");

		if (localData) {
			log("Saved State Found");
			toolState = JSON.parse(localData);
		} else {
			log("Local State Not Found, leaving default");
		}

		log("state retrieved from local storage");
	}

	/**
   * Gets the value of a query variable in the URL
   * @param {string} name - name of the parameter to return the value for
   */
	function getUrlParameter(name) {
		log("get url parameter", name);
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		/* eslint-disable */
		const regex = new RegExp("[\\?&]" + escape(name) + "=([^&#]*)");
		/* eslint-enable */
		const results = regex.exec(location.search);

		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	/**
   * Loads all the tool styles
   */
	function loadAutofillStyles() {
		log("load autofill styles");
		// default styles
		const autofillStyles = document.createElement("link");

		// default style link props
		autofillStyles.id = "autofill-styles";
		autofillStyles.rel = "stylesheet";
		autofillStyles.href = myStyles;
		document.head.appendChild(autofillStyles);
	}

	/**
   * Gets the state JSON information
   * Resolves an array of state objects with the name and abbreviations
   */
	function getLocaleAbbreviationInformation() {
		return new Promise((resolve, reject) => {
			log("get locale abb information");
			const { locale } = toolState;
			const options = {
				// url: `https://raw.githubusercontent.com/cirept/autofillReplacer/develop/assets/json/locale_${locale}.json`,
				url: `https://raw.githubusercontent.com/cirept/autofillReplacer/master/assets/json/locale_${locale}.json`,
				dataType: "json",
			};

			// get file data
			jQuery
				.ajax(options)
				.done((data) => {
					// return the STATE json object
					resolve(data);
				})
				.fail((error) => {
					reject(error.responseText);
				})
				.always();
		});
	}

	/**
   * Returns the autofill tag entry from the active list
   * @param {string} autofillTag - the autofill tag to return from default list
   */
	function getActiveAutofillEntryByTag(autofillTag) {
		// log("get active autofill entry", autofillTag);
		log(`get active autofill entry ${autofillTag}`);
		const { activeList } = toolState;

		return activeList.find((autofill) => autofill.autofillTag === autofillTag);
	}

	/**
   * save object to local storage
   * @param {string} name - object to be saved into local storage
   * @param {(string|Object)} value - the value to save
   */
	function saveToLocalStorage(name, value) {
		log("save to local storage", name);
		localStorage.setItem(name, value);
	}

	/**
   * save autofill parameter list to local storage
   */
	function saveStateToLocalStorage() {
		log("save tool state to local storage", toolState);
		const saveMe = JSON.stringify(toolState);

		saveToLocalStorage("AutofillReplacerTool", saveMe);
	}

	/**
   * Traverse state list to find the abbreviation match
   * and set the full state name
   * @param {Object[]} stateList - the full state object array
   * @param {Promise} a promise message that shows if the State Full Name was filled in or not
   */
	function setFullStateName(stateList) {
		log("set full state name", stateList);
		const currentStateAbbreviation = getActiveAutofillEntryByTag("%STATE%").searchTerms;

		// filter the array of states down to the matching state.
		const filteredStates = stateList.filter((state) => {
			// destructuring
			const { abbreviation } = state;

			// return value if it matches the current state.
			return currentStateAbbreviation === abbreviation;
		});

		// display console message that no match was found
		if (filteredStates.length > 1 || filteredStates.length < 1) {
			// set value to the default value
			log("Region not supported by the tool");
		} else {
			// set STATE FULL NAME to matched state
			getActiveAutofillEntryByTag("%STATE_FULL_NAME%").searchTerms = filteredStates[0].name;
			// save changes
			saveStateToLocalStorage();
			// display confirmation message
			log("State Full Name Added", toolState.activeList["%STATE_FULL_NAME%"]);
		}

		return new Promise((resolve) => {
			if (
				getActiveAutofillEntryByTag("%STATE_FULL_NAME%") !== "" ||
				getActiveAutofillEntryByTag("%STATE_FULL_NAME%") !== "SEARCH_FOR_ME"
			) {
				resolve("Full State Name Set");
			} else {
				resolve("Full State Name Not Set");
			}
		});
	}

	/**
   * Returns the autofill tag entry from the active list
   * @param {string} autofillTag - the autofill tag to return from default list
   * @param {string} searchTerm - the string to set the searchTerm too
   */
	function setDefaultAutofillEntry(autofillTag, searchTerm) {
		log(`set active autofill entry ${autofillTag} ${searchTerm}`);
		const { defaultList } = toolState;
		const match = defaultList.find((autofill) => autofill.autofillTag === autofillTag);

		// if match is found, set the searchTerms to the parameter value
		if (match) {
			match.searchTerms = searchTerm;
		}
	}

	/**
   * Populate the values for the default autofill tags
   * @param {Object} data - the html data that was recieved from the Website Settings of DCC
   * @returns {Promise} a promise message representing if the website settings gathered
   */
	function populateActiveAutofillList(data) {
		return new Promise((resolve, reject) => {
			log("populate active autofill list");
			const myDiv = document.createElement("div");

			// myDiv props
			// attach data to div element in order to query elements within
			myDiv.innerHTML = data;

			// Get Franchises related to web id
			const franchises = myDiv.querySelector("select#associatedFranchises").options;
			const myLength = franchises.length;
			const myFranchises = [];

			// create franchises string
			for (let x = 0; x < myLength; x += 1) {
				myFranchises.push(franchises[x].textContent);
			}

			// fill out autofill list with website settings information
			setDefaultAutofillEntry("%DEALER_NAME%", myDiv.querySelector("input[name='name']").value);
			setDefaultAutofillEntry("%STREET%", myDiv.querySelector("input#contact_address_street1").value);
			setDefaultAutofillEntry("%CITY%", myDiv.querySelector("input#contact_address_city").value);
			setDefaultAutofillEntry("%ZIP%", myDiv.querySelector("input#contact_address_postalCode").value);
			setDefaultAutofillEntry("%STATE%", myDiv.querySelector("select#contact_address_state").value);
			setDefaultAutofillEntry("%PHONE%", myDiv.querySelector("input[name='contact_phone_number']").value);
			setDefaultAutofillEntry("%FRANCHISES%", myFranchises.join(", "));

			if (data) {
				// display confirmation message
				log("Website Settings Information Loaded");
				// save changes
				saveStateToLocalStorage();
				resolve("Website Settings Set");
			} else {
				reject("populateActiveAutofillList failed : Website Settings Not Received");
			}
		});
	}

	/**
   * Fill in the default autofill list with a default value
   */
	function verifyActiveAutofillListValues() {
		log("verify active autofill list values");
		const { activeList } = toolState;

		// set the default value to SEARCH_FOR_ME if values are blank
		activeList.forEach((autofill) => {
			if (autofill.searchTerms === "") {
				autofill.searchTerms = "SEARCH_FOR_ME";
				saveStateToLocalStorage();
			}
		});
	}

	/**
   * Log error for troubleshooting purposes and
   * return a reject promise
   *
   * @param {string} error - error message to log in the console
   * @returns {Promise} Promise.reject()
   */
	function rejectError(error) {
		log("ERROR", error);
		return Promise.reject(error);
	}

	/**
   * Get data from "Settings" to autofill into the defaults list
   * @returns {Promise} Complete process to gather general information from the Settings tab in WSM
   */
	function setGeneralInfo() {
		return new Promise((resolve) => {
			log("set general info");
			const { webID, locale } = toolState;
			// path to open the website settings tab
			const siteSettingsURL = `editSiteSettings.do?webId=${webID}&locale=${locale}&pathName=editSettings`;
			const options = {
				url: siteSettingsURL,
				dataType: "html",
			};

			// getLocaleAbbreviationInformation
			// Get Website Information
			fetch(options)
				.then(
					(websiteSettingsData) => populateActiveAutofillList(websiteSettingsData),
					(error) => rejectError(error)
				)
				.then(() => getLocaleAbbreviationInformation(), (error) => rejectError(error))
				.then((stateListObject) => setFullStateName(stateListObject), (error) => rejectError(error))
				.then(() => resolve("Default Website Settings Set"), (error) => rejectError(error))
				.catch((error) => {
					log("Issue with Website Information Encountered", error);

					// Display message that local is not supported by tool
					if (error && error.includes("404")) {
						log("Locale Not Supported");
					}

					log("Return Promise");
					resolve("Default Settings Loaded without Full State Name");
				});
		});
	}

	/**
   * Fill in the values for the default phone number autofill tags
   * @param {Object} data - the HTML code for the Phone numbers section of the settings in WSM
   * @returns {Promise} Promise object that represents a completion or failure message
   */
	function populateDefaultPhoneNumbers(data) {
		log("populate default phone numbers");
		const myDiv = document.createElement("div");

		// attach data to div in order to query elements
		myDiv.innerHTML = data;

		// save query information to tool variable
		setDefaultAutofillEntry("%PHONE%", myDiv.querySelector("input[name*='(__primary_).ctn']").value);
		setDefaultAutofillEntry("%NEW_PHONE%", myDiv.querySelector("input[name*='(__new_).ctn']").value);
		setDefaultAutofillEntry("%USED_PHONE%", myDiv.querySelector("input[name*='(__used_).ctn']").value);
		setDefaultAutofillEntry("%SERVICE_PHONE%", myDiv.querySelector("input[name*='(__service_).ctn']").value);
		setDefaultAutofillEntry("%PARTS_PHONE%", myDiv.querySelector("input[name*='(__parts_).ctn']").value);

		if (data) {
			// display confirmation message
			log("Phone Numbers Set");
			// save changes
			saveStateToLocalStorage();
			return Promise.resolve("Phone Numbers Set");
		}
		return Promise.resolve("Phone Numbers Not Set");
	}

	/**
   * Get Phone Numbers from website settings
   * @returns {Promise} Complete process to get phone number from the Settings tab in WSM
   */
	function setPhoneNumbers() {
		return new Promise((resolve) => {
			log("set phone numbers");
			const { webID, locale } = toolState;
			// build website settings URL path
			const siteSettingsURL = `editDealerPhoneNumbers.do?webId=${webID}&locale=${locale}&pathName=editSettings`;
			const options = {
				url: siteSettingsURL,
				dataType: "html",
			};

			fetch(options).then((phoneNumberInfo) => populateDefaultPhoneNumbers(phoneNumberInfo)).then(() => {
				log("Phone Numbers Added");
				resolve("Phone Numbers Added");
			});
		});
	}

	/**
   * jQuery function to apply animate.css effects to an element
   * @returns {Object} the element that now has an animation effect attached to it
   */
	jQuery.fn.extend({
		animateCss(animationName) {
			const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
			this.addClass(`animated ${animationName}`).one(animationEnd, () => {
				jQuery(this).removeClass(`animated ${animationName}`);
			});
			return this;
		},
	});

	/**
   * Will show or hide the tool"s panel
   * will also update the button"s icon and hover text
   */
	function toggleToolPanel() {
		log("toggle tool panel");
		// toggle panel
		autofillOptionsContainer.classList.toggle("hide");

		if (autofillOptionsContainer.classList.contains("hide")) {
			minimizeList_button.innerHTML = "<i class='fas fa-eye fa-lg'></i>";
			minimizeList_button.title = "show list";
		} else {
			minimizeList_button.innerHTML = "<i class='fas fa-eye-slash fa-lg'></i>";
			minimizeList_button.title = "hide list";
		}
	}

	/**
   * Updates the tool display message
   * @param {string} message - the message to display
   * @param {string} [animationType=tada] - the type of animation to use
   */
	function updateDisplayMessage(message, animationType = "tada") {
		log("perform animation", animationType);
		// update display message
		messageDisplay.innerText = message;
		jQuery("#toolMessageDisplay").animateCss(animationType);
	}

	/**
   * Creates an array of the configured autofill tags and
   * Also performs simple validation to prevent empty values being saved
   */
	function convertActiveListToObject() {
		log("====== convert active list to object");
		const myArrayObj = [];

		// loop through configured autofills
		Array.from(autofillOptionsList.children).forEach((element) => {
			let regexInput = element.querySelector(".regEx").value.trim();
			const autofillTag = element.querySelector(".autofillTag").innerText; // trim it just in case the manual autofill input is triggerd
			const saveAutofill = {};

			// validate input
			// use default phrase if autofill is empty
			if (regexInput === "") {
				regexInput = "SEARCH_FOR_ME";
			}

			// add data to autofill object to save
			saveAutofill["autofillTag"] = autofillTag;
			saveAutofill["searchTerms"] = regexInput;

			// add autofill entry to the save array
			myArrayObj.push(saveAutofill);
		});

		log("=====active tool list converted to object", myArrayObj);

		// set UI input to active list
		toolState.activeList = myArrayObj;
	}

	/**
   * Scan autofill drop down list and remove disable class
   * @param {Object} elem - element being removed from the configured list
   */
	function removeDisable(elem) {
		log("remove disable calsses");
		const autofillTag = elem.dataset.autofillTag;
		const disabledAutofills = document
			.getElementById("allAutofillsList")
			.querySelectorAll(".autofill-list-item.disabled"); // query page for all disabled autofill elements
		const match = Array.from(disabledAutofills).find((autofill) => autofillTag === autofill.dataset.autofillTag); // search disabled autofills for match

		// remove disabled class if there is a match
		if (match) {
			document
				.querySelector(`.autofill-list-item.disabled[data-autofill-tag="${match.dataset.autofillTag}"]`)
				.classList.remove("disabled");
		}
	}

	/**
   * Build a generic list item to use through out the tool
   * @param {string} autofill - the text that will be used to fill in the autofillTag div
   * @param {string} text - the text that will be used as the input value
   * @default text = "SEARCH_FOR_ME"
   */
	function listItem(autofill, text = "SEARCH_FOR_ME") {
		log(`list item ${autofill} ${text}`);
		const textInput = text || "SEARCH_FOR_ME"; // set default text if saved search terms are empty
		const listElement = document.createElement("li");
		const label = document.createElement("div");
		const myInput = document.createElement("input");
		const myPointer = document.createElement("i");
		const removeMeContainer = document.createElement("div");
		const removeMe = document.createElement("i");

		// main list element props
		listElement.classList.add("autofillEntry");
		listElement.classList.add("row");
		listElement.dataset.autofillTag = autofill;

		// label element props
		label.classList.add("autofillTag");
		label.textContent = autofill;

		// input area props
		myInput.type = "text";
		myInput.classList.add("regEx");
		myInput.title = textInput;
		myInput.value = textInput;

		// arrow icon props
		myPointer.classList.add("fas");
		myPointer.classList.add("fa-long-arrow-alt-right");
		myPointer.classList.add("fa-lg");
		myPointer.classList.add("arrow");

		// remove element props
		removeMeContainer.classList.add("js-remove");
		removeMeContainer.title = "click to remove";
		removeMeContainer.onclick = (event) => {
			// removes list item from tool
			event.currentTarget.parentElement.remove();
			// save UI data to current state.
			convertActiveListToObject();
			// saves state
			saveStateToLocalStorage();
			// display message to user that item was removed
			updateDisplayMessage("Item Removed");
			// remove disabled from the autofill options list
			removeDisable(event.currentTarget.parentElement);
		};

		// remove me font icon
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
   * disabled "magic" button if an entry is blank
   */
	function toggleMagicButton() {
		log("toggle magic button");
		if (autofillOptionsList.getElementsByClassName("myError").length >= 1) {
			applyAutofills_button.classList.add("disabled");
		} else {
			applyAutofills_button.classList.remove("disabled");
		}
	}

	/**
   * Show error if input search field is empty
   */
	function validateList() {
		log("validate list");
		if (autofillOptionsList.getElementsByClassName("myError").length > 0) {
			updateDisplayMessage("Please enter a word to search for.", "flash");
		} else {
			if (applyAutofills_button.classList.contains("disabled")) {
				applyAutofills_button.classList.remove("disabled");
			}

			if (messageDisplay.textContent !== "") {
				messageDisplay.textContent = "";
			}
		}
	}

	/**
   * Updates the inputs hover text
   * @param {Object} e - the event object
   *
   */
	function updateInputTitle(e) {
		log("update input title");
		e.target.title = e.target.value;
	}

	/**
   * will bind all new option list with a on text change listener
   * @param {element} elem - new autofill list option
   */
	function bindTextChangeListener(elem) {
		log("bind text change listener");
		jQuery(elem).find("input").on("keyup", convertActiveListToObject);
		jQuery(elem).find("input").on("keyup", saveStateToLocalStorage);
		jQuery(elem).find("input").on("paste", convertActiveListToObject);
		jQuery(elem).find("input").on("paste", saveStateToLocalStorage);
		jQuery(elem).find("input").on("keyup", updateInputTitle);
		jQuery(elem).find("input").on("keyup", toggleMagicButton);
		jQuery(elem).find("input").on("keyup", validateList);
		jQuery(elem).find("input").on("keyup", () => {
			updateDisplayMessage("Changes Saved", "flash");
		});
	}

	/**
   * will construct the autofill display area.
   * Will use data in local storage, if it exists
   * Otherwise defaults to Website information
   * @return {Promise} Promise that represents the completion message
   */
	function buildActiveAutofillList() {
		const { activeList } = toolState;

		log("build active autofill list :: ", toolState.activeList);

		// build autofill list options
		activeList.forEach((autofill) => {
			const { autofillTag, searchTerms } = autofill;

			// create list element
			const listElement = listItem(autofillTag, searchTerms);

			// bind list item elements
			bindTextChangeListener(listElement);

			// attach to legend list
			autofillOptionsList.append(listElement);
		});

		// return promise resolve
		return Promise.resolve("Active Autofill List Built");
	}

	/**
   * Sets the Default Autofill List as the Active List
   */
	function setDefaultListAsActive() {
		toolState.activeList = toolState.defaultList;
	}

	/**
   * resets all the autofill parameters to the default list
   */
	function resetAutofills() {
		log("reset autofills");
		// erase current list
		autofillOptionsList.innerHTML = "";
		// remove stored variables from memory
		localStorage.removeItem("AutofillReplacerTool");
		// reset active autofill list
		setDefaultListAsActive();
	}

	/**
   * Reset all disabled autofills in the Autofills List Modal
   */
	function resetAllDisabledAutofills() {
		log("reset all disabled autofills");
		const disabledElements = document
			.getElementById("autofillListModal")
			.querySelectorAll(".autofill-list-item.disabled");

		// remove all disabled classes from the autofills list
		if (disabledElements.length > 0) {
			// loop through HTML collection of query results
			for (let z = 0; z < disabledElements.length; z += 1) {
				/* eslint-disable */
				disabledElements[z].classList.remove("disabled");
				/* eslint-enable */
			}
		}
	}

	/**
   * Scans the autofill options list and disables items in the
   * ALL Autofill Tag Modal Pop up already
   * added to the active list
   */
	function disableActiveAutofillOptions() {
		log("disabled active autofills");
		// query DOM for elements
		const autofillListItems = document.getElementById("allAutofillsList").querySelectorAll("li.autofill-list-item");
		const { activeList } = toolState;

		// loop through the HTML collection query search results
		for (let z = 0; z < autofillListItems.length; z += 1) {
			// loop through active autofill list and disable it on the Modal Pop Up
			activeList.forEach((autofill) => {
				const { autofillTag } = autofill;

				// apply disabled class to element
				/* eslint-disable */
				if (autofillListItems[z].innerText === autofillTag) {
					autofillListItems[z].classList.add("disabled");
				}
				/* eslint-enable */
			});
		}

		// return resolve
		return Promise.resolve("Autofills Disabled");
	}

	/**
   * Reset configured autofill tags to the default list
   * @param {boolean} confirm - should the user be prompted before reset?
   * @param {string} message - the message to show when the tool resets
   */
	function resetValues(confirm, message) {
		log("reset values");
		if (confirm && window.confirm("Reset Values?")) {
			resetAutofills();
			buildActiveAutofillList();
			// reset apply button if it is disabled
			toggleMagicButton();
			// update display message
			updateDisplayMessage(message);
			// save new values
			saveStateToLocalStorage();
			resetAllDisabledAutofills();
			disableActiveAutofillOptions();
		}
	}

	/**
   * Actions to be performed after the user selects an Autofill Options from the Auotfill Modal
   * Creates an active menu item that the tool will use to replace text with autofill tags
   * @param {Object} liElement - liElement that will get it"s onclick event binded
   * @param {string} tag - the autofill tag for the ACTIVE list element
   */
	function addSelectedAutofillToList(liElement, tag) {
		log("add selected autofill to list");
		const listElement = listItem(tag); // create the LI element in memory

		// disabled the li element in the options modal
		liElement.classList.add("disabled");
		// add the newly created ACTIVE li element to the ACTIVE list
		autofillOptionsList.appendChild(listElement);
		// bind list item elements
		bindTextChangeListener(listElement);
		// save state of new list
		saveStateToLocalStorage();
		// confirmation message
		updateDisplayMessage("Autofill Added to List");
	}

	/**
   * Scans the autofill options list and disables items already
   * added to the active list
   */
	function attachAddToActiveEvent() {
		log("attach click event listeners");
		const allAutofillsList = document.querySelectorAll("li.autofill-list-item");

		// loop through HTML collection and attach onclick event listener
		for (const option of allAutofillsList) {
			option.onclick = () => {
				return addSelectedAutofillToList(option, option.dataset.autofillTag);
			};
		}

		// resolve promise
		return new Promise((resolve) => {
			resolve("Autofills Click Events Attached");
		});
	}

	/**
   * Creates a LI element and adds it to the active autofill list
   * on the tool UI.
   * @param {Object} autofill - the autofill listing object to create an LI element for
   * @param {string} autofill.autofilltag - the autofill tag
   * @param {string} autofill.description - the text to use as the elements "hover" text
   */
	function addItemtoList(autofill) {
		const { autofill: tag, description } = autofill;

		// create "li" for each autofill tag in the list
		const myListItem = document.createElement("li");
		// attach new "li" to main list
		const tooltipText = description ? description : "**No tooltip information available**";

		// list item props
		myListItem.textContent = tag;
		myListItem.classList.add("btn");
		myListItem.classList.add("btn-light");
		myListItem.classList.add("autofill-list-item");
		myListItem.dataset.autofillTag = tag;
		myListItem.title = tooltipText;

		// add the list element to the "drop down" list
		allAutofillsList.appendChild(myListItem);
	}

	/**
   * Create the list elements for the autofill options list modal
   * @param {Object[]} autofillListData - the autofill array containing all the autofill object options
   * @param {Object} autofillListData[].autofill - the autofill array containing all the autofill object options
   * @returns {Promise} promise message representing if the autofill UL element was created
   */
	function createAutofillListOptions(autofillListData) {
		return new Promise((resolve, reject) => {
			log("create autofill list options");
			// loop through each autofill object and add it to the list.
			loopThroughArray(autofillListData, addItemtoList);

			// resolve or reject
			if (allAutofillsList.childElementCount > 0) {
				resolve("Autofill Selection List Created");
			} else {
				reject("Autofill List Selection was not create");
			}
		});
	}

	/**
   * create treewalker to navigate DOM and return all TEXT nodes
   * @param {Object} base - base element to crawl for text nodes
   * @returns {Object[]} an array containing all visible text on the webpage
   */
	function treeWalk(base) {
		log("tree walk");
		const treeWalker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, null, false);
		const wordArray = [];

		// loop through node elements read by tree walker object
		while (treeWalker.nextNode()) {
			// save jquery element, parent node name of current node
			const $pElementName = jQuery(treeWalker.currentNode)[0].parentNode.nodeName;

			// check to see if the parent node is a SCRIPT, NOSCRIPT, or SYLE element
			if ($pElementName !== "NOSCRIPT" && $pElementName !== "SCRIPT" && $pElementName !== "STYLE") {
				if (treeWalker.currentNode.textContent.trim() !== "") {
					// remember text node
					wordArray.push(treeWalker.currentNode);
				}
			}
		}

		return wordArray;
	}

	/**
   * Escape characters to prevent malicious input from user
   * @param {string} s - the string to properly escape special characters
   * @returns {string} a string with all the characters properly escaped
   */
	RegExp.escape = (s) => {
		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	};

	/**
   * Test if phone number
   * Checked format = 000-0000
   * @param {string} text - the text to verify
   * @returns {string} the text with all special characters properly escaped
   */
	function phoneNumberText(text) {
		log("verify phone number", text);
		return RegExp.escape(text);
	}

	/**
   * replace text within the text nodes scraped from the webpage
   * @param {Object} autofillTag - Autofill object containing the autofill tag and search terms
   * @param {string} autofillTag.autofilltag - the autofill tag
   * @param {string} autofillTag.searchTerms - the search words or phrases to replace with the autofill tag
   * @returns {Object} will return nothing if it detects a blank search term skipping checking
   */
	function replaceTextNode(autofillTag) {
		const self = this; // this = text NODE
		const phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g;
		const { autofillTag: tag, searchTerms } = autofillTag;
		let text = self.nodeValue;

		// skip iteration if Search Terms is blank
		if (searchTerms === "") {
			return;
		}

		// if split phrases are needed
		if (searchTerms.indexOf(";") > -1) {
			const wordsToSearchFor = searchTerms.split(";");

			wordsToSearchFor.forEach((searchText) => {
				searchText = searchText.trim(); // trim text

				if (searchText === "") {
					log("search term is blank :: skip");
					return;
				} else {
					const findThis = phoneRegex.test(searchText)
						? phoneNumberText(searchText)
						: `\\b${RegExp.escape(searchText)}\\b`;
					const myRegex = new RegExp(findThis, "gi");

					// replace matching words or phrases with Autofill
					text = text.replace(myRegex, tag);
				}
			});
		} else {
			// If phrases are do not need spliting
			const findThis = phoneRegex.test(searchTerms)
				? phoneNumberText(searchTerms)
				: `\\b${RegExp.escape(searchTerms)}\\b`;
			const myRegex = new RegExp(findThis, "gi");

			// replace matching words or phrases with Autofill
			text = text.replace(myRegex, tag);
		}

		// save text replacements to text node
		this.nodeValue = text;
	}

	/**
   * Replace input text with Autofill Tags
   * @param {Object} node - the current text node to replace text
   */
	function replaceSearchTerms(node) {
		const { activeList } = toolState;

		// iterate through autofill array and replace matches in text
		// replace all instances of "searchTerms" with "autofillTag"
		loopThroughArray(activeList, replaceTextNode, node);
	}

	/**
   * Replaced matching words/phrases with the corresponding autofill tags
   * @param {Object[]} wordList - array containing all the visible text in the edit area
   */
	function replaceText(wordList) {
		log("replace text");
		loopThroughArray(wordList, replaceSearchTerms);
	}

	/**
   * loop through word list array and replace text with autofill tags
   * @param {Object} baseElem - base element to find and replace text with autofill tags
   */
	function useAutofillTags(baseElem) {
		log("use autofill tags");
		let wordList;
		const baseLength = baseElem.length;

		for (let z = 0; z < baseLength; z += 1) {
			// get all visible text on page
			wordList = treeWalk(baseElem[z]);
			replaceText(wordList);
		}
	}

	/**
   * Replace text on a CMS style input window
   * @param {array} recordEditWindow - array of DOM input elements
   */
	function replaceTextCMS(recordEditWindow) {
		log("replace text CMS");
		// pass elements with children as base element for autofill replacing
		useAutofillTags(recordEditWindow);

		// change focus between text area to trigger text saving.
		const recordLength = recordEditWindow.length;

		// loop through records
		for (let z = 0; z < recordLength; z += 1) {
			jQuery(recordEditWindow[z]).focus();
		}
	}

	/**
   * Replace text with autofills while on the main WSM window
   * and with the content editor pop up open
   */
	function replaceTextInPopupCMS() {
		const contentFrame = jQuery("iframe#cblt_content").contents();
		const siteEditorIframe = contentFrame.find("iframe#siteEditorIframe").contents();

		// save contents of cms content edit frame
		const cmsIframe = siteEditorIframe.find("iframe#cmsContentEditorIframe").contents();

		// if quick CMS editor is open
		const recordEditWindow = cmsIframe
			.find("div.main-wrap")
			.find(".input-field")
			.find("div[data-which-field='copy']");

		// pass elements with children as base element for autofill replacing
		replaceTextCMS(recordEditWindow);
	}

	/**
   * Replace Text with Autofills while on the main WSM window
   */
	function replaceTextInMainWindow() {
		const contentFrame = jQuery("iframe#cblt_content").contents();
		const siteEditorIframe = contentFrame.find("iframe#siteEditorIframe").contents();
		const viewerIframe = siteEditorIframe.find("iframe#viewer").contents(); // get contents of iframe

		// return array of elements that have children
		const myChild = viewerIframe.find("body").children().filter((index, value) => {
			// only keep elements that are not empty
			if (value.children.length !== 0) {
				return value;
			}
		});

		// pass elements with children as base element for autofill replacing
		useAutofillTags(myChild);
	}

	/**
   * Replace Text with Autofills while on the CMS
   */
	function replaceTextInCMS() {
		const contentFrame = jQuery("iframe#cblt_content").contents();
		// get contents of iframe
		const recordEditWindow = contentFrame
			.find("div.main-wrap")
			.find(".input-field")
			.find("div[data-which-field='copy']");

		// pass elements with children as base element for autofill replacing
		replaceTextCMS(recordEditWindow);
	}

	/**
   * will walk through editable portion of WSM window and perform text
   * replacing with data contained in the list area of tool
   */
	function autofills() {
		log("main autofill function");
		// WSM MAIN WINDOW LOGIC
		const contentFrame = jQuery("iframe#cblt_content").contents();
		const siteEditorIframe = contentFrame.find("iframe#siteEditorIframe").contents();

		// run CMS Content Pop Up edit window IF WINDOW IS OPEN
		if (
			window.location.pathname.indexOf("editSite") >= 0 &&
			siteEditorIframe.find("div#hiddenContentPopUpOuter").hasClass("opened")
		) {
			// save contents of cms content edit frame
			replaceTextInPopupCMS();
		} else if (
			window.location.pathname.indexOf("editSite") >= 0 &&
			!siteEditorIframe.find("div#hiddenContentPopUpOuter").hasClass("opened")
		) {
			// run tool on regular WSM window
			replaceTextInMainWindow();
		} else if (window.location.pathname.indexOf("cms") >= 0) {
			// CMS LOGIC
			replaceTextInCMS();
		}
	}

	/**
   * Determine if the current website is different
   */
	function shouldToolAutoReset() {
		log("Check to see if tool should reset");
		const currentWebID = getUrlParameter("webId");
		const currentLocale = getUrlParameter("locale");
		const { webID: savedWebID } = toolState;

		// if current web id is different
		if (savedWebID !== currentWebID) {
			log("reset Values because web ids are different", currentWebID);
			log("saved web id", savedWebID);
			// save WebID
			toolState.webID = currentWebID;
			// save locale
			toolState.locale = currentLocale;
			// reset active autofill
			setDefaultListAsActive();
			// set boolean statement to true
			toolState.autoToolReset = true;
		} else {
			log("do not reset values");
			toolState.autoToolReset = false;
		}

		// save state
		saveStateToLocalStorage();
	}

	/**
   * Attach events to tool buttons
   */
	function attachButtonEvents() {
		log("attach button events");
		// minimize list button
		minimizeList_button.onclick = toggleToolPanel;
		// reset tool button
		defaultReset_button.onclick = () => {
			resetValues(true, "Values Reset");
		};
		// apply autofill button
		applyAutofills_button.onclick = autofills;
	}

	/**
   * Converts a markdown string (github flavored) into HTML
   * @param {string} data - the markdown string text to be converted into HTML
   */
	function convertMarkdownToHTML(data) {
		return new Promise((resolve) => {
			log("convert markdown to html");
			const conv = new showdown.Converter();

			showdown.setFlavor("github");

			const changeLogData = conv.makeHtml(data);

			// resolve converted data
			resolve(changeLogData);
		});
	}

	/**
   * Builds a modal and attaches it to the webpage.
   * @param {string} name - the name of the modal
   * @param {string} html - the content of the modal
   * @return {object} Promise.resolve or reject
   */
	function attachModal(name, html) {
		return new Promise((resolve, reject) => {
			// build latest changes modal
			const myModal = document.createElement("div");

			myModal.classList.add(`${name}ModalContainer`);

			myModal.innerHTML = `
      <div class='modal fade' id='${name}Modal' tabindex='-1' role='dialog' aria-labelledby='${name}Title' aria-hidden='true'>
        <div class='modal-dialog modal-dialog-centered modal-lg' role='document'>
          <div class='modal-content'>
            <div class='modal-body'>
              ${html}
            </div>
          </div>
        </div>
      </div>`;

			// attach modal to page
			document.body.appendChild(myModal);

			if (document.getElementById(`${name}Modal`)) {
				resolve(`${name} Modal Attached`);
			} else {
				reject(`${name} Modal Not Attached`);
			}
		});
	}

	/**
   * Start events to build the autofill "drop down menu"
   * @return {Promise} A promise message show if the autofill drop down menu was created or not
   */
	function buildAutofillListModal() {
		log("build autofill list modal");
		const options = {
			url: autofillTagListURL,
			dataType: "json",
		};

		return fetch(options)
			.then((data) => createAutofillListOptions(data))
			.then(() => attachModal("autofillList", allAutofillsList.outerHTML))
			.then(() => disableActiveAutofillOptions())
			.then(() => attachAddToActiveEvent())
			.then(() => logReturn("Autofill Modal Complete", true));
	}

	/**
   * builds and attaches the latest changes modal to the webpage.
   * @return {Promise} Promise message representing if the Latest Changes Modal was created and attached
   */
	function buildLatestChangesModal() {
		log("build latest changes modal");
		const options = {
			url: lastestChanges,
			dataType: "text",
		};

		// get latest changes data
		return fetch(options)
			.then((data) => convertMarkdownToHTML(data))
			.then((HTMLdata) => attachModal("lastestChanges", HTMLdata))
			.then(() => logReturn("Latest Changes Modal Complete", true));
	}

	/**
   * builds and attaches the latest changes modal to the webpage.
   * @return {Promise} Promise message representing if the instructions modal was created and attached
   */
	function buildInstructionsModal() {
		log("build instructions modal");
		const options = {
			url: toolInstructions,
			dataType: "text",
		};

		// get instructions data
		return fetch(options)
			.then((data) => convertMarkdownToHTML(data))
			.then((HTMLdata) => attachModal("toolInstructions", HTMLdata))
			.then(() => logReturn("Instructions Modal Complete", true));
	}

	/**
   * Attaches the main tool container to the webpage and adds event
   * listeners to buttons
   * @return {Promise} Promise message representing if the main tool was attached
   */
	function buildMainTool() {
		log("build main tool");
		// attach tool elements to page
		document.querySelector("header.wsmMainHeader").appendChild(wsmEditorTools);
		// attach button events
		attachButtonEvents();

		log("build main tool complete");

		// return resolve
		return Promise.resolve("Main Tool Complete");
	}

	/**
   * Sets up autofill tool
   */
	function setup() {
		log("set up tool");
		verifyActiveAutofillListValues();
		buildAutofillListModal();
		buildLatestChangesModal();
		buildInstructionsModal();
		buildActiveAutofillList();
		buildMainTool();
	}

	/**
   * Determine whether to reset the tool settings to the website's settings
   */
	function resetTool() {
		const { autoToolReset } = toolState;

		log("reset tool?");

		if (autoToolReset) {
			log("tool reset");
			updateDisplayMessage("Detected a New Web ID, Tool Reset");
			setDefaultListAsActive();
			saveStateToLocalStorage();
		} else {
			log("tool not reset");
		}
		setup();
	}

	/**
   * main function to start the program
   */
	function init() {
		log("Initialize Autofill Tool");
		// run tool
		loadAutofillStyles();
		getToolState();
		shouldToolAutoReset();

		setGeneralInfo()
			.then(() => setPhoneNumbers())
			.catch((error) => log("Skipped Getting Default Values", error))
			.finally(() => {
				log("Setup Autofill Tool UI");
				resetTool();
			});
	}

	//
	// Run Tool
	//

	window.onload = init;
})();
