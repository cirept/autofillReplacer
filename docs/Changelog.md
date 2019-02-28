# Change Log

## v1.1.10

### Functionality

* Updated tool to work with latest WSM update.

``Released (07/17/2018)``

<br>
<br>

---

<br>
<br>

## v1.1.8

### Functionality

* Improved Tool Load Times.

``Released (07/17/2018)``

<br>
<br>

---

<br>
<br>

## v1.1.6

### Updated UI

* Removed the ability to reorder autofill entries.
* Updated *Hover Text* for each autofill Input Area
    * Hover text updates after each keystroke
* "Add Autofill" interface updated
    * A modal pop up will appear listing all the possible autofills
* Added buttons to for "**Bug Reporting**", "**Enhancement Request**", and "**Change Log**"

### Functionality

* Tool automatically resets back to default values of current website if it detects a new site.
    * The reset happens when the tool initially loads.
* ``%STATE_FULL_NAME%`` now displays the full state name when reset.
    * This value is based on the ``%STATE%`` value.
    * This functionality is only supported on ``en_CA``, ``fr_CA``, ``en_US``, and ``en_AU`` Locales.  **If other locales need support, please submit an enhancement request.**

``Released (07/13/2018)``

<br>
<br>

---

<br>
<br>

## v1.1.2 - **(04/26/2018)**

### Added additional default values

* %STATE_FULL_NAME%

<br>
<br>

---

<br>
<br>

## v1.1.0 - **(12/22/2017)**

### Additional support

* Tool now works with the content editor pop up that appears when editing content in the Editor tab

### Added additional default values

* Added more phone numbers autofill tags.

  * %USED_PHONE%
  * %SERVICE_PHONE%
  * %PARTS_PHONE%

* Values are grabbed from the SETTINGS tab in WSM.

<br>
<br>

---

<br>
<br>

## v1.0.2 - **(12/21/2017)**

### Fixed word seperator functionality

* Bob's Motors``Bob Motors => %DEALER_NAME%

  * The tool will replace both "Bob's Motors" and "Bob Motors" with %DEALER_NAME% as originally mentioned in this document.

<br>
<br>

---

<br>
<br>

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
