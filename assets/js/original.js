/**
 * jQuery functions for animate css
 */
$.fn.extend({
    'animateCss': function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    },
});

/**
 * Escape characters to prevent malacious input from user
 */
RegExp.escape = function (s) {

    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

let autofillReplacer = {
    'init': function () {

        // initialize module
        this.createElements();
        this.buildElements();
        this.buildPanel();
        //            this.cacheDOM();
        this.addTool();

        this.bindEvents();
        this.styleTool();
        //        this.createSortableObj();
        this.runTool();
        //            shared.displayPanel(pageInformation.config.$pageInfo);
    },
    // ----------------------------------------
    // tier 1 functions
    // ----------------------------------------
    'createElements': function () {

        console.log('createElements');
        // main panel container
        autofillReplacer.config = {
            'myURL': 'https://raw.githubusercontent.com/cirept/WSMupgrades/master/json/autofillTags2.json',
            'defaultList': {
                '%DEALER_NAME%': 'SEARCH_FOR_ME',
                '%FRANCHISES%': 'SEARCH_FOR_ME',
                '%STREET%': 'SEARCH_FOR_ME',
                '%CITY%': 'SEARCH_FOR_ME',
                '%STATE%': 'SEARCH_FOR_ME',
                '%ZIP%': 'SEARCH_FOR_ME',
                '%PHONE%': 'SEARCH_FOR_ME',
                '%NEW_PHONE%': 'SEARCH_FOR_ME',
                '%USED_PHONE%': 'SEARCH_FOR_ME',
                '%SERVICE_PHONE%': 'SEARCH_FOR_ME',
                '%PARTS_PHONE%': 'SEARCH_FOR_ME',
            },
            'wsmEditerTools': document.createElement('div'),
            'optionsContainer': document.createElement('div'),
            'minimizeList': document.createElement('button'),
            'autofillOptionsList': document.createElement('ul'),
            'messageDisplay': document.createElement('span'),
            'defaultReset': document.createElement('button'),
            'applyAutofills': document.createElement('button'),
            'addButton': document.createElement('button'),
            'autofillDropdown': document.createElement('ul'),
        };
        //        console.log(autofillReplacer.config.optionsContainer);
    },
    'buildElements': function () {

        console.log('buildElements');

        autofillReplacer.config.wsmEditerTools.classList.add('customEditorTools');
        //        autofillReplacer.config.wsmEditerTools.classList.add('customEditorTools');

        //    let optionsContainer = document.createElement('div');
        autofillReplacer.config.optionsContainer.classList.add('autofillOptionsContainer');
        autofillReplacer.config.optionsContainer.classList.add('hide');

        // minimize list element
        //    let minimizeList = document.createElement('button');
        autofillReplacer.config.minimizeList.classList.add('minimizeList');
        autofillReplacer.config.minimizeList.classList.add('myButts');
        autofillReplacer.config.minimizeList.title = 'show list';
        autofillReplacer.config.minimizeList.type = 'button';
        autofillReplacer.config.minimizeList.innerHTML = '<i class="fas fa-eye fa-lg"></i>';


        //    let autofillOptionsList = document.createElement('ul');
        autofillReplacer.config.autofillOptionsList.id = 'autofillOptions';
        autofillReplacer.config.autofillOptionsList.classList.add('autofillOptions');

        //    let messageDisplay = document.createElement('span');
        autofillReplacer.config.messageDisplay.id = 'toolMessageDisplay';
        autofillReplacer.config.messageDisplay.textContent = `Autofill tag text replacer tool v${GM_info.script.version}`;

        //    let defaultReset = document.createElement('button');
        autofillReplacer.config.defaultReset.id = 'defaultReset';
        autofillReplacer.config.defaultReset.classList.add('myButts');
        autofillReplacer.config.defaultReset.title = 'Reset Values';
        autofillReplacer.config.defaultReset.innerHTML = '<i class="fas fa-redo fa-lg"></i>';

        //    let applyAutofills = document.createElement('button');
        autofillReplacer.config.applyAutofills.id = 'applyAutofills';
        autofillReplacer.config.applyAutofills.classList.add('myButts');
        autofillReplacer.config.applyAutofills.type = 'button';
        autofillReplacer.config.applyAutofills.title = 'apply autofills';
        autofillReplacer.config.applyAutofills.innerHTML = '<i class="fas fa-magic fa-lg"></i>';

        //    let addButton = document.createElement('button');
        autofillReplacer.config.addButton.id = 'addAutofill';
        autofillReplacer.config.addButton.classList.add('myButts');
        autofillReplacer.config.addButton.value = 'addAutofill';
        autofillReplacer.config.addButton.title = 'Add Autofill';
        autofillReplacer.config.addButton.innerHTML = '<i class="fas fa-plus fa-lg"></i>';

        //    let autofillDropdown = document.createElement('ul');
        autofillReplacer.config.autofillDropdown.tabIndex = '4';
        autofillReplacer.config.autofillDropdown.classList.add('autofill-dropdown');
        autofillReplacer.config.autofillDropdown.classList.add('hide');


    },
    'buildPanel': function () {

        console.log('buildPanel');
        console.log(autofillReplacer.config.optionsContainer);

        autofillReplacer.config.optionsContainer.appendChild(autofillReplacer.config.messageDisplay);
        autofillReplacer.config.optionsContainer.appendChild(autofillReplacer.config.autofillOptionsList);
        autofillReplacer.config.optionsContainer.appendChild(autofillReplacer.config.defaultReset);
        autofillReplacer.config.optionsContainer.appendChild(autofillReplacer.config.addButton);
        autofillReplacer.config.optionsContainer.appendChild(autofillReplacer.config.autofillDropdown);

        autofillReplacer.config.wsmEditerTools.appendChild(autofillReplacer.config.minimizeList);
        autofillReplacer.config.wsmEditerTools.appendChild(autofillReplacer.config.applyAutofills);
        autofillReplacer.config.wsmEditerTools.appendChild(autofillReplacer.config.optionsContainer);
        // attach panel elements to container

        //            pageInformation.config.$pageInfo
        //                .append(dealerName.init())
        //                .append(webID.init())
        //                .append(pageName.init())
        //                .append(hTags.init());
        // attach to continer
        //            pageInformation.config.$pageInfoContainer
        //                .append(pageInformation.config.$pageInfoTitle)
        //                .append(pageInformation.config.$pageInfo);
    },
    //        'cacheDOM': function () {
    //            // DOM elements
    //            this.$toolBoxContainer = jQuery('.toolboxContainer');
    //            this.variableList = shared.programData();
    //        },
    'addTool': function () {

        console.log('addTool');

        document.body.append(autofillReplacer.config.wsmEditerTools);
        //            // add to main toolbox
        //            this.$toolBoxContainer
        //                .prepend(pageInformation.config.$pageInfoContainer);
    },
    'bindEvents': function () {

        console.log('bindEvents');

        autofillReplacer.config.minimizeList.onclick = this.toggleToolPanel.bind(this);
        autofillReplacer.config.defaultReset.onclick = this.resetValues.bind(this);
        autofillReplacer.config.applyAutofills.onclick = this.autofills.bind(this);
        autofillReplacer.config.autofillDropdown.onblur = this.hideMe.bind(this);
        //            // minimize
        //            pageInformation.config.$pageInfoTitle
        //                .on('click', shared.toggleFeature)
        //                .on('click', shared.saveState);
        //            // hover effect & click
        //            pageInformation.config.$pageInfo
        //                .on('mouseover mouseleave', '.tbInfo', this.hoverEffect)
        //                .on('click', '.tbInfo', this.copyToClipboard);
        //            minimizeList.onclick = toggleToolPanel;
        //    defaultReset.onclick = resetValues;
        //    applyAutofills.onclick = autofills;
        //    autofillDropdown.onblur = hideMe;
    },
    'styleTool': function () {

        console.log('injecting css');

        let animate = document.createElement('link');
        animate.rel = 'stylesheet';
        animate.type = 'text/css';
        animate.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';

        let toolStyles = `
.customEditorTools {
    position: absolute;
    width: auto;
    top: 0;
    left: 0;
    color: white;
    background: #EAE8E8;
}

#toolMessageDisplay {
    position: absolute;
    top: 10px;
    left: 120px;
    color: red;
}

#addAutofill {
    width: 90%;
    padding: 5px 30px;
}

.myButts {
    background: #824FD6;
    border-radius: 5px;
    color: #fff;
    border: 1px solid rgb(147, 143, 143);
}

.myButts:hover {
    background: #793CC4;
    cursor: pointer;
    cursor: hand;
}

#applyAutofills {
    width: auto;
    position: relative;
    padding: 5px 30px;
    background: rgb(130, 198, 0);
}

#applyAutofills.disabled {
    background: #333;
}

.minimizeList {
    position: relative;
    float: right;
    padding: 5px 13px;
}

#defaultReset {
    position: relative;
    float: right;
    width: 10%;
    padding: 5px;
    background: rgb(255, 255, 255);
    color: rgb(130, 79, 214);
}

#defaultReset:hover {
    background: rgb(130, 79, 214);
    color: #fff;
}

.my-handle {
    border: 1px dotted #793CC4;
    padding: 2px 6px 2px 5px;
    cursor: move;
    cursor: -webkit-grabbing;
}

.autofillTag {
    width: 120px;
    display: inline-block;
    text-align: center;
    color: black;
    word-wrap: break-word;
}

.regEx {
    background: #793CC4;
    color: #fff;
    border: 1px solid rgb(255, 255, 255);
    line-height: 1.25rem;
    text-indent: 10px;
    margin: 0 0 0 15px;
    width: 200px !important;
}

.autofillEntry {
    width: auto;
    padding: 5px 10px;
    border: 1px solid #793CC4;
    margin: 3px 10px;
    color: #793CC4;
}

.js-remove {
    cursor: pointer;
    cursor: hand;
    padding: 0 0 0 10px;
    display: inline-block;
}

.leftMarg {
    margin: 0 0 0 15px;
}

.autofill-dropdown {
    height: 500px;
    width: 100%;
    overflow: auto;
    position: absolute;
    background: #0A0808;
}

.autofill-dropdown:focus {
    outline: 0;
}

.autofill-dropdown li {
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
}

.autofill-dropdown li:hover {
    /*background: rgba(10, 8, 8, .5);*/
    background: rgba(121, 60, 196, .5);
    cursor: pointer;
    cursor: hand;
}

.autofillOptionsContainer {
    width: 450px;
}

.hide {
    display: none;
}

.disabled {
    pointer-events: none;
    background: rgba(0,0,0,.75);
    cursor: no-drop;
}

.myError {
    border: 1px solid red;
}

.chosen {
  color: #fff;
  background-color: rgb(130, 198, 0);
}
`;
        const myStyles = document.createElement('style');
        myStyles.type = 'text/css';
        myStyles.innerHTML = toolStyles;

        // attach styles to page
        document.head.append(myStyles);
        document.head.append(animate);
    },
    //    'createSortableObj': function () {
    //        'use strict';
    //
    //        // Build Sortable object for use in tool
    //        //        let sortable = Sortable.create(autofillOptions, {
    //        //        let sortable = Sortable.create(autofillOptionsList, {
    //        //            'animation': 150,
    //        //        });
    //
    //        //        var el = document.getElementById('autofillOptions');
    //        //        var sortable = Sortable.create(el);
    //
    //
    //        let sortable = Sortable.create(autofillReplacer.config.autofillOptionsList, {
    //            'group': 'autofillOptions',
    //            'delay': 0,
    //            'sort': true,
    //            'handle': '.my-handle',
    //            'chosenClass': 'chosen',
    //            'animation': 150,
    //            // Element dragging started
    //            //        'onStart': function () {
    //            //        'onStart': function (evt) {
    //            //            console.log('onstart');
    //            //            console.log(evt);
    //            //            console.log(evt.oldIndex); // element index within parent
    //            //        },
    //            //        // Changed sorting within list
    //            //        'onUpdate': function (evt) {
    //            //            console.log('onUpdate');
    //            //            console.log(evt);
    //            //            // same properties as onEnd
    //            //        },
    //            //        // Element dragging ended
    //            //        'onEnd': function (evt) {
    //            //            console.log('onEnd');
    //            //            let itemEl = evt.item; // dragged HTMLElement
    //            //            console.log(itemEl); // target list
    //            //            console.log(evt.to); // target list
    //            //            console.log(evt.from); // previous list
    //            //            console.log(evt.oldIndex); // element's old index within old parent
    //            //            console.log(evt.newIndex); // element's new index within new parent
    //            //        },
    //            'store': {
    //                /**
    //                 * Get the order of elements. Called once during initialization.
    //                 * @param   {Sortable}  sortable
    //                 * @returns {Array}
    //                 */
    //                'get': function (sortable) {
    //                    console.log(Sortable);
    //                    //                        console.log(this);
    //                    //            'get': function (sortable) {
    //
    //                    //                let order = localStorage.getItem(this.options.group.name);
    //                    let order = localStorage.getItem(sortable.options.group.name);
    //                    return order ? order.split('|') : [];
    //                },
    //
    //                /**
    //                 * Save the order of elements. Called onEnd (when the item is dropped).
    //                 * @param {Sortable}  sortable
    //                 */
    //                'set': function (sortable) {
    //                    //            'set': function (sortable) {
    //                    console.log(sortable);
    //
    //                    let order;
    //                    if (typeof Storage !== 'undefined') {
    //                        //                    order = this.toArray();
    //                        order = sortable.toArray();
    //                        //                    localStorage.setItem(this.options.group.name, order.join('|'));
    //                        localStorage.setItem(sortable.options.group.name, order.join('|'));
    //                    } else {
    //                        // Sorry! No Web Storage support..
    //                    }
    //                },
    //            },
    //            'filter': '.js-remove',
    //            /**
    //             * event, if list item is removed
    //             */
    //            'onFilter': function (evt) {
    //
    //                let item = evt.item;
    //                let ctrl = evt.target;
    //
    //                if (Sortable.utils.is(ctrl, '.js-remove')) { // Click on remove button
    //                    item.parentNode.removeChild(item); // remove sortable item
    //
    //                    // run validate check
    //                    this.validateList();
    //
    //                    // display red message at top of tool
    //                    autofillReplacer.config.messageDisplay.textContent = 'Item Removed';
    //                    jQuery(autofillReplacer.config.messageDisplay).animateCss('tada');
    //
    //                    // Save state
    //                    //                sortable.save();
    //                    //                this.save();
    //                    this.saveToLocalStorage(this.createArray());
    //                    this.removeDisable(item);
    //                }
    //            },
    //            // Called by any change to the list (add / update / remove)
    //            'onSort': function (evt) {
    //
    //                console.log(evt);
    //                console.log('changing values');
    //
    //                // update display message
    //                autofillReplacer.config.messageDisplay.textContent = 'Values Saved';
    //                jQuery('#toolMessageDisplay').animateCss('tada');
    //
    //                // Save state
    //                this.save();
    //                this.saveToLocalStorage(this.createArray());
    //            },
    //        });
    //    },
    'runTool': function () {

        this.defaultValues();
        this.defaultPhoneNumber();
        this.buildAutofillOptions();
        this.getAutofillList();
        //    styleTools();
    },
    //        // ----------------------------------------
    //        // tier 2 functions
    //        // ----------------------------------------
    /**
     * Build a generic list item to use through out the tool
     * @param {string} autofill - the text that will be used to fill in the autofillTag div
     * @param {string} text - the text that will be used as the input value
     */
    'listItem': function (autofill, text) {

        if (!text) {
            text = 'SEARCH_FOR_ME';
        }

        let listElement = document.createElement('li');
        listElement.classList.add('autofillEntry');

        let grabHandle = document.createElement('span');
        grabHandle.classList.add('my-handle');
        grabHandle.title = 'drag to re-order';
        grabHandle.innerHTML = '<i class="fas fa-sort"></i>';

        let label = document.createElement('div');
        label.classList.add('autofillTag');
        label.textContent = autofill;

        let myInput = document.createElement('input');
        myInput.type = 'text';
        myInput.classList.add('regEx');
        myInput.title = 'enter search string';
        myInput.value = text;
        myInput.onkeypress = function () {
            this.style.width = (this.value.length + 1) * 8 + 'px';
        };

        let myPointer = document.createElement('i');
        myPointer.classList.add('fas');
        myPointer.classList.add('fa-long-arrow-alt-right');
        myPointer.classList.add('leftMarg');
        myPointer.classList.add('fa-lg');

        let removeMeContainer = document.createElement('div');
        removeMeContainer.classList.add('js-remove');
        removeMeContainer.title = 'click to remove';

        let removeMe = document.createElement('i');
        removeMe.classList.add('fas');
        removeMe.classList.add('fa-times');
        removeMe.classList.add('fa-lg');

        removeMeContainer.appendChild(removeMe);

        // build list item
        listElement.appendChild(grabHandle);
        listElement.appendChild(myInput);
        listElement.appendChild(myPointer);
        listElement.appendChild(label);
        listElement.appendChild(removeMeContainer);

        return listElement;
    },
    /**
     * save object to local storage
     * @param {object} myObj - object to be saved into local storage
     */
    'saveToLocalStorage': function (myObj) {

        console.log('autofill : saving');
        let saveMe = JSON.stringify(myObj);
        localStorage.setItem('autofillVariables', saveMe);
    },
    /**
     * creating an array of the configured autofill tags
     * Also performs simple validation to prevent empty values being saved
     * return {object} myObj - returns object array of autofill entries in list
     */
    'createArray': function () {

        let myObj = [];
        let saveAutofill = {};
        let autofillTag = '';
        let myRegex = '';
        let regexInput;
        let $myThis;

        // loop through configured autofills
        for (let z = 0; z < autofillReplacer.config.autofillOptionsList.children.length; z += 1) {

            $myThis = jQuery(autofillReplacer.config.autofillOptionsList.children[z]);
            autofillTag = jQuery.trim($myThis.find('.autofillTag').text()); // trim it just in case the manual autofill input is triggerd
            regexInput = $myThis.find('.regEx');
            myRegex = regexInput.val().trim();

            // validate input
            // do not save until input  empty
            if (myRegex === '') {
                autofillReplacer.config.autofillOptionsList.children[z].classList.add('myError');
                autofillReplacer.config.applyAutofills.classList.add('disabled');
                autofillReplacer.config.messageDisplay.textContent = 'Please enter a word to search for.';
                continue;
            } else {
                if (autofillReplacer.config.autofillOptionsList.children[z].classList.contains('myError')) {
                    autofillReplacer.config.autofillOptionsList.children[z].classList.remove('myError');
                }
            }

            saveAutofill[autofillTag] = myRegex;
        }

        myObj.push(saveAutofill);

        return myObj;
    },
    /**
     * save current state of the list, only if the configured list
     * has no errors
     */
    'saveState': function () {

        sortable.save();
        this.saveToLocalStorage(this.createArray());
    },
    /**
     * disabled 'magic' button if an entry is blank
     */
    'toggleMagicButton': function () {

        if (autofillReplacer.config.autofillOptionsList.getElementsByClassName('myError').length >= 1) {
            autofillReplacer.config.applyAutofills.classList.add('disabled');
        } else {
            autofillReplacer.config.applyAutofills.classList.remove('disabled');
        }
        //        autofillReplacer.config.autofillOptionsList.getElementsByClassName('myError').length >= 1 ? autofillReplacer.config.applyAutofills.classList.add('disabled') : autofillReplacer.config.applyAutofills.classList.remove('disabled');
    },
    /**
     * Show error if input search field is empty
     */
    'validateList': function () {

        if (autofillReplacer.config.autofillOptionsList.getElementsByClassName('myError').length > 0) {
            autofillReplacer.config.messageDisplay.textContent = 'Please enter a word to search for.';
            $('#toolMessageDisplay').animateCss('flash');
        } else {
            if (autofillReplacer.config.applyAutofills.classList.contains('disabled')) {
                autofillReplacer.config.applyAutofills.classList.remove('disabled');
            }

            if (autofillReplacer.config.messageDisplay.textContent !== '') {
                autofillReplacer.config.messageDisplay.textContent = '';
            }
        }
    },
    /**
     * Scan autofill drop down list and remove disable class
     * @param {object} elem - element that being removed from the configured list
     */
    'removeDisable': function (elem) {

        let autofillTag = elem.querySelector('.autofillTag').textContent;
        let dropDown = autofillReplacer.config.autofillDropdown.querySelectorAll('.disabled');
        let dropDownLength = dropDown.length;

        for (let z = 0; z < dropDownLength; z += 1) {
            if (autofillTag === dropDown[z].textContent) {
                dropDown[z].classList.remove('disabled');
            }
        }
    },
    /**
     * will bind all new option list with a on text change listener
     * @param {element} elem - new autofill list option
     */
    'bindTextChangeListener': function (elem) {

        jQuery(elem).find('input').on('change', this.saveState.bind(this));
        jQuery(elem).find('input').on('change', this.toggleMagicButton.bind(this));
        jQuery(elem).find('input').on('change', this.validateList.bind(this));
        jQuery(elem).find('input').on('keyup', this.saveState.bind(this));
        jQuery(elem).find('input').on('keyup', this.toggleMagicButton.bind(this));
        jQuery(elem).find('input').on('keyup', this.validateList.bind(this));
    },
    /**
     * retrive object from local storage
     * retrive object from local storage
     * @param {object} obj - object to be saved into local storage
     */
    'getFromLocalStorage': function () {

        // declare local variables
        let returnMe;

        if (localStorage.getItem('autofillVariables') === null) {

            returnMe = autofillReplacer.config.defaultList;
        } else {

            returnMe = JSON.parse(localStorage.getItem('autofillVariables'));
            returnMe = returnMe[0];
        }

        return returnMe;
    },
    /**
     * will construct the autofill display area.
     * Will use data in local storage, if it exists
     */
    'buildAutofillOptions': function () {

        // declare local variables
        let regReplace = this.getFromLocalStorage();
        let listElement;

        // build autofill list options IF there is a list that already exists
        if (regReplace) {
            // loop through Legend Content list
            for (let key in regReplace) {
                if (regReplace.hasOwnProperty(key)) {

                    if (key === '') {
                        continue;
                    }

                    listElement = this.listItem(key, regReplace[key]);

                    // attach to legend list
                    autofillReplacer.config.autofillOptionsList.append(listElement);

                    // bind list item elements
                    this.bindTextChangeListener(listElement);
                }
            }
        }
    },
    // ----------------------------------------
    // tier 3
    // ----------------------------------------
    /**
     * Will show or hide the tool's panel
     * will also update the button's icon and hover text
     */
    'toggleToolPanel': function () {

        autofillReplacer.config.optionsContainer.classList.toggle('hide');

        if (autofillReplacer.config.optionsContainer.classList.contains('hide')) {
            autofillReplacer.config.minimizeList.innerHTML = '<i class="fas fa-eye fa-lg"></i>';
            autofillReplacer.config.minimizeList.title = 'show list';
        } else {
            autofillReplacer.config.minimizeList.innerHTML = '<i class="fas fa-eye-slash fa-lg"></i>';
            autofillReplacer.config.minimizeList.title = 'hide list';
        }
    },
    /**
     * Reset configured autofill tags to the default list
     */
    'resetValues': function () {

        if (window.confirm('Reset Values?')) {
            // erase current list
            autofillReplacer.config.autofillOptionsList.innerHTML = '';
            // remove stored variables from memory
            localStorage.removeItem('autofillVariables');
            // build default list
            this.buildAutofillOptions();
            // reset apply button if it is disabled
            this.toggleMagicButton();
            // update display message
            autofillReplacer.config.messageDisplay.textContent = 'Values Reset';
            jQuery('#toolMessageDisplay').animateCss('tada');
            // save new values
            this.saveState();
        }
    },
    /**
     * create treewalker to navigate DOM and return all TEXT nodes
     * @param {object} base - base element to crawl for text nodes
     * @return {array} wordArray - array containing all text nodes on the page
     */
    'treeWalk': function (base) {

        let treeWalker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, null, false);
        let wordArray = [];

        while (treeWalker.nextNode()) {
            if (treeWalker.currentNode.nodeType === 3 && treeWalker.currentNode.textContent.trim() !== '') {
                wordArray.push(treeWalker.currentNode);
            }
        }
        return wordArray;
    },
    /**
     * Test if phone number
     * Checked format = 000-0000
     */
    'phoneNumberText': function (text) {

        let phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g;

        if (phoneRegex.test(text)) {
            return RegExp.escape(text);
        }
        return '\\b' + RegExp.escape(text) + '\\b';
    },
    /**
     * Replaced matching words/phrases with the corresponding autofill tags
     * @param {array} wordList - array containing all the visible text in the edit area
     * @param {string} regReplace - text string to search for
     */
    'replaceText': function (wordList, regReplace) {

        wordList.forEach(function (n) {

            let text = n.nodeValue;

            // iterate through autofill array and replace matches in text
            // replace all instances of 'findMe' with 'autofillTag'
            for (let autofillTag in regReplace) {
                let findMe = regReplace[autofillTag];

                // if split phrases are needed
                if (findMe.indexOf('``') > -1) {
                    let findArray = findMe.split('``');
                    let arrayLength = findArray.length;
                    for (let a = 0; a < arrayLength; a += 1) {
                        let searchText = findArray[a].trim();
                        let findThis = this.phoneNumberText(searchText);
                        let myRegex = new RegExp(findThis, 'gi');

                        if (searchText === '') {
                            continue;
                        }

                        text = text.replace(myRegex, autofillTag);
                    }
                } else {
                    let findThis = this.phoneNumberText(findMe);
                    let myRegex = new RegExp(findThis, 'gi');
                    text = text.replace(myRegex, autofillTag);
                }
            }

            n.nodeValue = text;
        });
    },
    /**
     * loop through word list array and replace text with autofill tags
     * @param {object} baseElem - base element to find and replace text with autofill tags
     * @param {array} regReplace - object array that contains the regExpressions and corresponding autofill tags
     */
    'useAutofillTags': function (baseElem, regReplace) {

        let wordList;
        let baseLength = baseElem.length;

        for (let z = 0; z < baseLength; z += 1) {
            // get all visible text on page
            wordList = this.treeWalk(baseElem[z]);
            this.replaceText(wordList, regReplace);
        }
    },
    /**
     * Replace text on a CMS style input window
     * @param {array} recordEditWindow - array of DOM input elements
     * @param {regex} regReplace - list of regex values
     */
    'replaceTextCMS': function (recordEditWindow, regReplace) {

        // pass elements with children as base element for autofill replacing
        this.useAutofillTags(recordEditWindow, regReplace);

        // change focus between text area to trigger text saving.
        let recordLendth = recordEditWindow.length;
        for (let z = 0; z < recordLendth; z += 1) {
            jQuery(recordEditWindow[z]).focus();
        }
    },
    /**
     * will walk through edittable portion of WSM window and perform text
     * replacing with data contained in the list area of tool
     */
    'autofills': function () {

        //        console.log('autofills');
        // WSM MAIN WINDOW LOGIC

        const contentFrame = jQuery('iframe#cblt_content').contents();
        let siteEditorIframe = contentFrame.find('iframe#siteEditorIframe').contents();
        let viewerIframe;
        let cmsIframe;
        let myChild;
        let recordEditWindow;
        let regReplace = this.getFromLocalStorage(); // get stored autofill tags from local storage

        // run CMS Content Pop Up edit window IF WINDOW IS OPEN
        if (location.pathname.indexOf('editSite') >= 0 && siteEditorIframe.find('div#hiddenContentPopUpOuter').hasClass('opened')) {

            // save contents of cms content edit frame
            cmsIframe = siteEditorIframe.find('iframe#cmsContentEditorIframe').contents();

            // if quick CMS editor is open
            recordEditWindow = cmsIframe.find('div.main-wrap').find('.input-field').find('div[data-which-field="copy"]');

            // pass elements with children as base element for autofill replacing
            this.replaceTextCMS(recordEditWindow, regReplace);

        } else if (location.pathname.indexOf('editSite') >= 0 && !siteEditorIframe.find('div#hiddenContentPopUpOuter').hasClass('opened')) {

            // get contens of iframe
            viewerIframe = siteEditorIframe.find('iframe#viewer').contents();

            // return array of elements that have children
            myChild = viewerIframe.find('body').children().filter(function (index, value) {
                if (value.children.length !== 0) {
                    return this;
                }
            });

            // pass elements with children as base element for autofill replacing
            this.useAutofillTags(myChild, regReplace);

        } else if (location.pathname.indexOf('cms') >= 0) {
            // CMS LOGIC

            // get contens of iframe
            recordEditWindow = contentFrame.find('div.main-wrap').find('.input-field').find('div[data-which-field="copy"]');

            // pass elements with children as base element for autofill replacing
            this.replaceTextCMS(recordEditWindow, regReplace);
        }
    },
    /**
     * apply 'hide' class to element
     * @param {object} event - element that will get the 'hide' class added to it class list
     */
    'hideMe': function (event) {

        if (!event.target.classList.contains('hide')) {
            event.target.classList.add('hide');
        }
        if (autofillReplacer.config.addButton.classList.contains('disabled')) {
            autofillReplacer.config.addButton.classList.remove('disabled');
        }
    },
    // ----------------------------------------
    // INTERNAL FUNCTHIONS
    // ----------------------------------------
    /**
     * Get data from 'Settings' to autofill into the defaults list
     */
    'defaultValues': function () {

        let webID = document.getElementById('siWebId').querySelector('label.displayValue').textContent;
        let siteSettingsURL = `editSiteSettings.do?webId=${webID}&locale=en_US&pathName=editSettings`;

        jQuery.get(siteSettingsURL, function (data) {

            let myDiv = document.createElement('div');
            myDiv.innerHTML = data;
            let franchises = myDiv.querySelector('select#associatedFranchises').options;
            let myLength = franchises.length;
            let myFranchises = [];

            // create franchises string
            for (let x = 0; x < myLength; x += 1) {
                myFranchises.push(franchises[x].textContent);
            }

            autofillReplacer.config.defaultList['%DEALER_NAME%'] = myDiv.querySelector('input[name="name"]').value;
            autofillReplacer.config.defaultList['%STREET%'] = myDiv.querySelector('input#contact_address_street1').value;
            autofillReplacer.config.defaultList['%CITY%'] = myDiv.querySelector('input#contact_address_city').value;
            autofillReplacer.config.defaultList['%ZIP%'] = myDiv.querySelector('input#contact_address_postalCode').value;
            autofillReplacer.config.defaultList['%STATE%'] = myDiv.querySelector('select#contact_address_state').value;
            autofillReplacer.config.defaultList['%PHONE%'] = myDiv.querySelector('input[name="contact_phone_number"]').value;
            autofillReplacer.config.defaultList['%FRANCHISES%'] = myFranchises.join(', ');

        }, 'html');

    },
    /**
     *   Get Phone Numbers
     */
    'defaultPhoneNumber': function () {

        let webID = document.getElementById('siWebId').querySelector('label.displayValue').textContent;
        let siteSettingsURL = `editDealerPhoneNumbers.do?webId=${webID}&locale=en_US&pathName=editSettings`;

        jQuery.get(siteSettingsURL, function (data) {
            let myDiv = document.createElement('div');
            myDiv.innerHTML = data;

            autofillReplacer.config.defaultList['%PHONE%'] = myDiv.querySelector('input[name*="(__primary_).ctn"]').value;
            autofillReplacer.config.defaultList['%NEW_PHONE%'] = myDiv.querySelector('input[name*="(__new_).ctn"]').value;
            autofillReplacer.config.defaultList['%USED_PHONE%'] = myDiv.querySelector('input[name*="(__used_).ctn"]').value;
            autofillReplacer.config.defaultList['%SERVICE_PHONE%'] = myDiv.querySelector('input[name*="(__service_).ctn"]').value;
            autofillReplacer.config.defaultList['%PARTS_PHONE%'] = myDiv.querySelector('input[name*="(__parts_).ctn"]').value;

        }, 'html');
    },
    /**
     * Start events to build the autofill 'drop down menu'
     */
    'getAutofillList': function () {

        this.fetchJSON(autofillReplacer.configmyURL).then((data) => {
            console.log('autofill : autofill list loaded.');
            autofillReplacer.config.addButton.onclick = this.addButtonEventListener(true);
            // build out drop down menu
            this.buildAutofillList.bind(data);
        }).catch((error) => {
            console.log('autofill : autofill list failed to load, reverting to manual autofill entry method');
            console.log(error);
            autofillReplacer.config.addButton.onclick = this.addButtonEventListener(false);
        });
    },
    /**
     * read data from json file
     */
    'fetchJSON': function (url) {

        return new Promise(function (resolve, reject) {

            jQuery.getJSON(url)
                .done( /** resolve data */ function (json) {
                    resolve(json.autofill);
                })
                .fail( /** error */ function (xhr, status, err) {
                    reject(status + err.message);
                });
        });
    },
    /**
     * SUCCESS BINDING EVENT
     * Build out drop down list with data gathered from JSON file
     * @param {OBJECT} listContainer - the UL element that will contain autofill options
     * @param {object} data - the autofill data that will be used to populate the options
     */
    'buildAutofillList': function (data) {

        //        return function () {
        // debugger;
        let localData = this.localDataToString();
        // build out drop down menu
        for (let myKey in data[0]) {
            // create 'li' for each autofill tag in the list
            let myListItem = document.createElement('li');
            myListItem.textContent = myKey;
            // if autofill tag is present in the active list, disable it
            if (localData.includes(myKey)) {
                myListItem.classList.add('disabled');
            }
            // add the list element to the 'drop down' list
            autofillReplacer.config.autofillDropdown.appendChild(myListItem);
            // bind listener to 'li' item
            this.createAutofillDropdownMenu(myListItem);
            // attach new 'li' to main list
            let tooltipText = data[0][myKey] ? data[0][myKey] : '**No tooltip infor available**';
            myListItem.title = tooltipText;
        }
        //        };
    },
    //        // debugger;
    //        let localData = localDataToString();
    //        // build out drop down menu
    //        for (let myKey in data[0]) {
    //            // create 'li' for each autofill tag in the list
    //            let myListItem = document.createElement('li');
    //            myListItem.textContent = myKey;
    //            // if autofill tag is present in the active list, disable it
    //            if (localData.includes(myKey)) {
    //                myListItem.classList.add('disabled');
    //            }
    //            // add the list element to the 'drop down' list
    //            autofillDropdown.appendChild(myListItem);
    //            // bind listener to 'li' item
    //            this.createAutofillDropdownMenu(myListItem);
    //            // attach new 'li' to main list
    //            let tooltipText = data[0][myKey] ? data[0][myKey] : '**No tooltip infor available**';
    //            myListItem.title = tooltipText;
    //        }
    //    },
    /**
     * Creates an active menu item that the tool will use to replace text with autofill tags
     * @param {object} elem - element that will get it's onclick event binded
     */
    'createAutofillDropdownMenu': function (elem) {

        elem.onclick = function () {
            elem.classList.add('disabled');

            let listElement = this.listItem(elem.textContent);
            autofillReplacer.config.autofillOptionsList.appendChild(listElement);
            let listLength = listElement.children.length;

            for (let y = 0; y < listLength; y += 1) {
                if (listElement.children[y].tagName === 'INPUT') {
                    listElement.children[y].focus();
                }
            }

            // hide drop down menu
            document.querySelector('ul.autofill-dropdown').classList.add('hide');

            // bind list item elements
            this.bindTextChangeListener(listElement);

            // save state of new list
            this.saveState();

        };
    },
    /**
     * Bind onclick function dynamically depending on autofill JSON load
     * @param {bool} bool - boolean variable that will determine what method will be used
     */
    'addButtonEventListener': function (bool) {

        if (bool) {
            return function () {
                this.classList.add('disabled');
                autofillReplacer.config.autofillDropdown.classList.remove('hide');
                autofillReplacer.config.autofillDropdown.focus();
            };
        }
        return this.bindAddAutofill();
    },
    /**
     * FAILURE BINDING EVENT
     * Will display a prompt message that the user can manually input the autofill tag
     * @return {function} Prompts user for input, upon successfull input, will bind event listeners and save
     */
    'bindAddAutofill': function () {

        // debugger;
        return function () {
            let autofillTag = window.prompt('Enter autofill tag for the new feild.', '%AUTOFILL_TAG_HERE%');

            if (autofillTag === null || autofillTag === '') {
                window.alert('please try again, please enter an autofill tag');
            } else if (this.localDataToString().includes(autofillTag)) {
                window.alert('please try again, autofill tag already present on list');
            } else {

                let listElement = this.listItem(autofillTag);
                autofillReplacer.config.autofillOptionsList.appendChild(listElement);

                // bind list item elements
                this.bindTextChangeListener(listElement);

                // save state of new list
                this.saveState();
            }
        };
    },
    /**
     * Converts the autofill tags in local memory to simple array
     * @return {object} autofill - contains a simple array with AUTOFILL tags ONLY
     */
    'localDataToString': function () {

        // console.log('localDataToString');
        var localData = this.getFromLocalStorage();
        var autofill = [];

        for (let localKey in localData) {
            autofill.push(localKey);
        }

        return autofill;
    },
    //        'hoverEffect': function (event) {
    //            // apply hover effects
    //            var element = event.currentTarget;
    //            jQuery(element).toggleClass('highlight');
    //        },
    //        'copyToClipboard': function (event) {
    //            // copy page info
    //            var copyThisText = event.currentTarget.innerHTML;
    //            shared.clipboardCopy(copyThisText);
    //        },
};

autofillReplacer.init();
//    console.log('autofill ran');

let sortable = Sortable.create(autofillReplacer.config.autofillOptionsList, {
    'group': 'autofillOptions',
    'delay': 0,
    'sort': true,
    'handle': '.my-handle',
    'chosenClass': 'chosen',
    'animation': 150,
    // Element dragging started
    //        'onStart': function () {
    //        'onStart': function (evt) {
    //            console.log('onstart');
    //            console.log(evt);
    //            console.log(evt.oldIndex); // element index within parent
    //        },
    //        // Changed sorting within list
    //        'onUpdate': function (evt) {
    //            console.log('onUpdate');
    //            console.log(evt);
    //            // same properties as onEnd
    //        },
    //        // Element dragging ended
    //        'onEnd': function (evt) {
    //            console.log('onEnd');
    //            let itemEl = evt.item; // dragged HTMLElement
    //            console.log(itemEl); // target list
    //            console.log(evt.to); // target list
    //            console.log(evt.from); // previous list
    //            console.log(evt.oldIndex); // element's old index within old parent
    //            console.log(evt.newIndex); // element's new index within new parent
    //        },
    'store': {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        'get': function (sortable) {

            console.log(Sortable);
            //                        console.log(this);
            //            'get': function (sortable) {

            //                let order = localStorage.getItem(this.options.group.name);
            let order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split('|') : [];
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        'set': function (sortable) {
            //            'set': function (sortable) {
            console.log(sortable);

            let order;
            if (typeof Storage !== 'undefined') {
                //                    order = this.toArray();
                order = sortable.toArray();
                //                    localStorage.setItem(this.options.group.name, order.join('|'));
                localStorage.setItem(sortable.options.group.name, order.join('|'));
            } else {
                // Sorry! No Web Storage support..
            }
        },
    },
    'filter': '.js-remove',
    /**
     * event, if list item is removed
     */
    'onFilter': function (evt) {

        let item = evt.item;
        let ctrl = evt.target;

        if (Sortable.utils.is(ctrl, '.js-remove')) { // Click on remove button
            item.parentNode.removeChild(item); // remove sortable item

            // run validate check
            autofillReplacer.validateList();
            //                this.validateList();

            // display red message at top of tool
            autofillReplacer.config.messageDisplay.textContent = 'Item Removed';
            jQuery(autofillReplacer.config.messageDisplay).animateCss('tada');

            // Save state
            //                sortable.save();
            //                this.save();
            autofillReplacer.saveToLocalStorage(autofillReplacer.createArray());
            //                this.saveToLocalStorage(this.createArray());
            autofillReplacer.removeDisable(item);
            //                this.removeDisable(item);
        }
    },
    // Called by any change to the list (add / update / remove)
    'onSort': function (evt) {

        console.log(evt);
        console.log('changing values');

        // update display message
        autofillReplacer.config.messageDisplay.textContent = 'Values Saved';
        jQuery('#toolMessageDisplay').animateCss('tada');

        // Save state
        this.save();
        this.saveToLocalStorage(this.createArray());
    },
});
