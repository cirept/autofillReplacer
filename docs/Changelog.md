# Change Log

## v1.1.5

### Updated UI

* Removed unused tool elements.
* Updated Hover Text for each Input Area
    * Hover text updates after each keystroke
* Add Autofill interface updated
    * A modal pop up will appear listing all the possible autofills

### Functionality

* Tool will now automatically reset itself if on a new site.
* ``%STATE_FULL_NAME%`` will now display the full state name when reset based on the ``%STATE%`` value.
* Added **Latest Changes** change log pop up

*Released (07/10/2018)*

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
