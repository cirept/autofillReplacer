let replaceAutofillsButt = 'me';
let applyAutofillsShort = 'you';
let applyAutofills = 'you';
let highlightAutofillsButt = 'you';

function checkModes() {
    'use strict'
    return;
}

/**
 *   Changes the modes button states
 *   Will turn ACTIVATE clicked button and DEACTIVATE all other buttons
 *   @param {string} mode = the mode that was selected (replace, highlight)
 */
function modeAction(mode) {

    // save MODE in local storage
    shared.saveValue('mode', mode);

    // reset all mode buttons
    deactivateModes();

    // activate clicked MODE button
    let activateButton = modeContainer.querySelector('.' + mode);
    activateButton.classList.add('active');
    activateButton.classList.remove('secondary');
    activateButton.title += ' *active*';

    // save title
    let title = applyAutofillsShort.title;
    // Switch START FUNCTION imagery
    if (title.indexOf('*Replace*') > -1) {
        let start = title.indexOf(' ');
        title = title.substring(start);
    }

    // create icon data text
    let iconClassText = iconClass();
    let start = iconClassText.indexOf('-') + 1;
    let dataText = iconClassText.substring(start);

    // update QUICK ACCESS button
    applyAutofillsShort.dataset.mode = mode;
    applyAutofillsShort.querySelector('svg[data-icon]').dataset.icon = dataText;
    applyAutofillsShort.querySelector('div.inline').innerHTML = shared.getValue('mode');

    // update MAIN TOOL button
    applyAutofills.dataset.mode = mode;
    applyAutofills.querySelector('svg[data-icon]').dataset.icon = dataText;
    //            applyAutofills.classList.toggle('replace');
    //        applyAutofills.classList.toggle('highlight');

    // update Autofill button onclick event
    checkModes();
}

/**
 *   Will turn deactivate other mode buttons
 *   @param {string} activeMode = mode that is currently active, SKIPS THIS BUTTON
 */
function deactivateModes() {
    // save buttons found in mode container
    let modeButtons = modeContainer.querySelectorAll('button.modes');

    // define array length
    let length = modeButtons.length;

    for (let y = 0; y < length; y += 1) {
        // toggle classes off
        modeButtons[y].classList.remove('active');
        modeButtons[y].classList.add('secondary');

        // remove *active* text from title
        // find *active* text
        let buttonTitle = modeButtons[y].title;
        let startHere = buttonTitle.indexOf('*active*');
        buttonTitle = buttonTitle.substring(0, startHere);
    }

}


// ----------------------------------------
// ----------------------------------------
// ----------------------------------------

/**
 *   Actions to perform when the REPLACE MODE button is pressed
 */
function replaceModeActions() {
    'use strict';

    //    // save MODE in local storage
    //    shared.saveValue('mode', 'replace');

    // if REPLACE MODE button element DOES NOT contain the active class add it
    if (!replaceAutofillsButt.classList.contains('active')) {
        //        replaceAutofillsButt.classList.add('active');
        //        replaceAutofillsButt.classList.remove('secondary');
        //        replaceAutofillsButt.title = 'replace *active*';
        // set descriptive title text
        //        applyAutofillsShort.title = '*Replace* Autofills';
        //        // apply class to "Magic" buttons
        //        applyAutofillsShort.classList.toggle('replace');
        //        applyAutofillsShort.classList.toggle('highlight');
        //        applyAutofills.classList.toggle('replace');
        //        applyAutofills.classList.toggle('highlight');
        //        //        // create icon data text
        //        //        let iconClassText = iconClass();
        //        //        let start = iconClassText.indexOf('-') + 1;
        //        //        let dataText = iconClassText.substring(start);
        //        // update APPLY BUTTONs
        //        applyAutofillsShort.querySelector('svg[data-icon]').dataset.icon = dataText;
        //        applyAutofills.querySelector('svg[data-icon]').dataset.icon = dataText;
        //        applyAutofillsShort.querySelector('div.inline').innerHTML = shared.getValue('mode');
    }

    //    // if HIGHLIGHT MODE button element DOES contain the active class add it
    //    if (highlightAutofillsButt.classList.contains('active')) {
    //        highlightAutofillsButt.classList.remove('active');
    //        highlightAutofillsButt.classList.add('secondary');
    //        highlightAutofillsButt.title = 'highlight';
    //    }

    //    // update Autofill button onclick event
    //    checkModes();
}

/**
 *   Actions to perform when the REPLACE MODE button is pressed
 */
function highlightModeActions() {
    'use strict';

    //    // save MODE in local storage
    //    shared.saveValue('mode', 'highlight');

    // if REPLACE MODE button element DOES NOT contain the active class add it
    if (!highlightAutofillsButt.classList.contains('active')) {
        //        highlightAutofillsButt.classList.add('active');
        //        highlightAutofillsButt.classList.remove('secondary');
        //        highlightAutofillsButt.title = 'highlight *active*';
        //        // set descriptive title text
        //        applyAutofillsShort.title = '*Highlight* Autofills';
        //        // apply class to "Magic" buttons
        //        applyAutofillsShort.classList.toggle('highlight');
        //        applyAutofillsShort.classList.toggle('replace');
        //        applyAutofills.classList.toggle('highlight');
        //        applyAutofills.classList.toggle('replace');
        //        //        // create icon data text
        //        //        let iconClassText = iconClass();
        //        //        let start = iconClassText.indexOf('-') + 1;
        //        //        let dataText = iconClassText.substring(start);
        //        // update APPLY BUTTONs
        //        applyAutofillsShort.querySelector('svg[data-icon]').dataset.icon = dataText;
        //        applyAutofills.querySelector('svg[data-icon]').dataset.icon = dataText;
        //        applyAutofillsShort.querySelector('div.inline').innerHTML = shared.getValue('mode');
    }

    //    // if HIGHLIGHT MODE button element DOES contain the active class add it
    //    if (replaceAutofillsButt.classList.contains('active')) {
    //        replaceAutofillsButt.classList.remove('active');
    //        replaceAutofillsButt.classList.add('secondary');
    //        replaceAutofillsButt.title = 'replace';
    //    }

    //    // update Autofill button onclick event
    //    checkModes();
}

// ----------------------------------------
highlightModeActions();
replaceModeActions();
