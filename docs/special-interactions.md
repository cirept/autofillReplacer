# Special Interactions

## **Order Bug**

The order of the autofill entries in the tool list will determine the how the autofill tool will replace text on the web page.

## Description

* The tool scans the page once for each autofill entry in the list.
* The tool will traverse the autofill entry list from the top to the bottom of the list.

With knowing how the tool works, if there are matching text inside two \(2\) separate autofill entries, you might get some unwanted results if the entries aren't in the correct.

### Example: Order Bug

* There will be instances where text can be found in multiple autofill tags.
  * For example if you had these autofill set up in the tool:
    * INFINITI = %FRANCHISES%
    * INFINITI of Tampa = %DEALER\_NAME%
  * Example Text:
    * Welcome to INFINITI of Tampa! See yourself in a INFINITI today! Using the example mentioned above:

1. The tool would perform a search and replace for **INFINITI** resulting in:
   * Welcome to **%FRANCHISES%** of Tampa! See yourself in a **%FRANCHISES%** today!
2. the tool will now perform a search and replace for **INFINITI of Tampa** resulting in:
   * Welcome to **%FRANCHISES%** of Tampa! See yourself in a **%FRANCHISES%** today!
   * As you can see nothing happened. Because it didn't find an exact match = INFINITI of Tampa

If we reversed the order and moved %DEALER\_NAME% before the %FRANCHISES% the tool will perform as expected.

* Tool Set up:
  * INFINITI of Tampa = %DEALER\_NAME%
  * INFINITI = %FRANCHISES%
* Run tool on example above

1. Search for **INFINITI of Tampa**
   * Welcome to **%DEALER\_NAME%**! See yourself in a INFINITI today!
2. Search for **INFINITI**
   * Welcome to **%DEALER\_NAME%**! See yourself in a **%FRANCHISES%** today!

{% hint style="info" %}
This bug shouldn't happen that often as the order of the default list in the tool should prevent this from occurring.  However, it is still worth mentioning in the event that you experience this bug, you will know how to fix it.
{% endhint %}

