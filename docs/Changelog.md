# Change Log

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
