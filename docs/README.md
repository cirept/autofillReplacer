[![codebeat badge](https://codebeat.co/badges/7c527dd3-7844-4173-960c-a231b1898a9a)](https://codebeat.co/projects/github-com-cirept-autofillreplacer-master)

# autofillReplacer
Tool has been recently updated and some elements have been removed or modified.

----------------------------------------

## Description
* This tool will crawl the editor window and replace all matching text with the designated autofill tag.
* **Primarily meant for use WITH the migration tool.**

----------------------------------------

## Additional Details
* Tool will auto save after every change to the input areas.
    * Adding text
    * Deleteing autofill entries
    * Adding autofill entries

* Tool now resets to defaults if you switch from web-id to web-id.
    * **The tool does this upon loading.**
    * The message display you see when you show the autofill list is in place just to remind you that the tool was   reset.

----------------------------------------

## How to Use the Tool
### During Migration:
1. Begin the migration process of an internal or external page.
2. On a blank landing page, choose external page to migrate.
3. 'Gett' the URL of the external page
4. Choose the bucket the page will go into
5. **THE AUTOFILL TAG REPLACER TOOL**
6. tinue with the normal steps to migrate over the content

### During Page Editing:
1. Choose a card to edit
2. Choose to edit 'Content'
3. A pop up will appear.
4. **RUN THE AUTOFILL TAG REPLACER TOOL**
5. Save changes via 'save' button.

----------------------------------------

## Working Environment(s)
* Only works in **NextGen Mode (Next Gen toggle = ON)**
* Only works in **WSM (Editor) and CMS (Content Library)**
    * **Changes made in Editor**, changes are not permanent and will revert to original text upon page reload. Main purpose of the tool would is to make migrating copy text from external sites easier.
    * **Changes made in CMS (Content Library)**, are not permanent UNTIL you save the changes via one of the save button located at the top right area of the page.

----------------------------------------

## What the tool looks like
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/WhatToolLooksLike.jpg)

----------------------------------------

## Magic Wand Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/Apply_autofills.jpg)
* This will trigger the tool's functionality

### Editor
* Any text that has been designated inside the input areas will be found and replaced with it's corresponding Autofill tag
* **Changes will not be permanent.**

### CMS
* Any text that has been designated inside the input areas will be found and replaced with it's corresponding Autofill tag
* **Save edits in order to keep the changes.**

----------------------------------------

## Magic Eye Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/Hide_panel.png)
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/Unhide_panel.png)
* This will hide / show main panel for the tool.

----------------------------------------

## Autofill Options
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/autofillEntry.jpg)
|-----------------------1---------------------|   |--------------2------------|  |--3--|

This is comprised of three (3) parts.
1. Autofill **text input area**. (purple background)
2. **Autofill tag** that will replace text.
3. **Delete autofill** entry.

----------------------------------------

## Text Input Area

The text that should get replaced by the related autofill tag.

***Special Interactions***

Because some dealer's like to use different text for things.
* e.g. INFINITI of Tampa, could also be
    * Tampa INFINITI
    * INFINITI Tampa
* So to account for this, you can adjust the 'text to be replaced' and add all possible variations to the area.
* You can separate the variations by using " ; " (semi-colon)

### Lets do a quick demo shall we?
Using the text mentioned above.  I want to replace anything related to the dealer's name with the autofill tag %DEALER_NAME%.  So I write this text into the autofill text area.
```
Tanaka Motors;Tanaka of Tokyo
```
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/autofillEntry.jpg)

When you click the 'Magic' button the tool will break down the text if it sees ; and start its search.
* round 1 = Tanaka Motors
* round 2 = Tanaka of Tokyo

----------------------------------------

## Autofill Tag

The autofill tag that will replace all instances of the text that is located in the **Text Input Area**.

----------------------------------------

## Delete autofill
Removes the autofill tag entry from the search list.

----------------------------------------

## Add autofill Button

![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/Add_autofill.jpg)

Clicking this will display a drop down of currently available autofill tags that looks like this.

### Why are the options grey'd out?
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/AutofillDropdown.jpg)

Autofill tags that have already been configured will be disabled. (Depicted in grey in the screenshot)

## Reset Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/Reset.jpg)

Resets the tool to the most commonly used autofill tags.
* %DEALER_NAME%
* %FRANCHISES%
* %STREET%
* %CITY%
* %STATE%
* %STATE_FULL_NAME%
* %ZIP%
* %PHONE%
* %NEW_PHONE%
* %USED_PHONE%
* %SERVICE_PHONE%
* %PARTS_PHONE%

----------------------------------------

## Report Bug Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/bug.jpg)

Will open a new tab to submit a bug for this tool on Github.com.

----------------------------------------

## Latest Changes Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/latestChanges.jpg)

View the lastest changes that was made to the tool.

----------------------------------------

## Request Enhancement Button
![Autofill Tool](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/enhancement.jpg)

Will open a new tab leading to the Github.com at the starting page for requesting a new enhancement for this tool.
