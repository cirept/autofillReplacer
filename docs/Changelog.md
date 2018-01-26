# Change Log

## v2.0 - **(01/07/2018)**

### Added Modes

#### Replace Mode
* The mode that everyone is already used to...
* Words specified in autofill list area will get replaced with the autofill tags

#### Highlight Mode
* The tool will highlight all the text on the page that CAN BE CONVERTED TO AUTOFILL TAGS.
* **In other words, a beefed up version of CTRL+F functionality.**
* See documentation for details.

### Other Changes
* Removed 'reorder' anchor from autofill options list
    * Researching if feature needs to be fixed.


<br><br>

---

## v1.1.0 - **(12/22/2017)**

### Additional support
* Tool now works with the content editor pop up that appears when editing content in the Editor tab

### Added additional default values
* Added more phone numbers autofill tags.
* Values are grabbed from the SETTINGS tab in WSM.
        * %USED_PHONE%
        * %SERVICE_PHONE%
        * %PARTS_PHONE%

<br><br>

---

<br><br>

## v1.0.2 - **(12/21/2017)**

### Fixed word seperator functionality
* Bob's Motors``Bob Motors => %DEALER_NAME%
    * The tool will replace both "Bob's Motors" and "Bob Motors" with %DEALER_NAME% as originally mentioned in this document.

<br><br>

---

<br><br>

## v0.7

### Added reset button
* Reset the tool, only showing the most commonly used autofill tags with the values grabbed from the SETTINGS tab in WSM
    * %DEALER_NAME%
    * %FRANCHISES%
    * %STREET%
    * %CITY%
    * %STATE%
    * %ZIP%
    * %PHONE%
    * %NEW_PHONE%
