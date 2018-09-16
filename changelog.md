# Change Log

## v. 1.1.5

### Updated UI

* Removed unused tool elements.
* Updated Hover Text for each Input Area
  * Hover text updates after each keystroke
* Add Autofill interface updated
  * A modal pop up will appear listing all the possible autofills

### Functionality

* Tool will now automatically reset itself if on a new site.
* `%STATE_FULL_NAME%` will now display the full state name when reset based on the `%STATE%` value.
* Added **Latest Changes** change log pop up

_Released \(07/10/2018\)_

## v. 1.1.2 - **\(04/26/2018\)**

### Added additional default values

* %STATE\_FULL\_NAME%

## v. 1.1.0 - **\(12/22/2017\)**

### Additional support

* Tool now works with the content editor pop up that appears when editing content in the Editor tab

### Added additional default values

* Added more phone numbers autofill tags.
  * %USED\_PHONE%
  * %SERVICE\_PHONE%
  * %PARTS\_PHONE%
* Values are grabbed from the SETTINGS tab in WSM.

## v. 1.0.2 - **\(12/21/2017\)**

### Fixed word separator functionality

* Bob's Motors\`\`Bob Motors =&gt; %DEALER\_NAME%
  * The tool will replace both "Bob's Motors" and "Bob Motors" with %DEALER\_NAME% as originally mentioned in this document.

## v. 0.7

### Added reset button

* Reset the tool, only showing the most commonly used autofill tags with the values grabbed from the SETTINGS tab in WSM
  * %DEALER\_NAME%
  * %FRANCHISES%
  * %STREET%
  * %CITY%
  * %STATE%
  * %ZIP%
  * %PHONE%
  * %NEW\_PHONE%

