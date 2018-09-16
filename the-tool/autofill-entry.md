# Autofill Entry

### 

![Example of Autofill Entry](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/autofillEntry.jpg)

This is comprised of three \(3\) parts:

* Text Input Area
  * The purple text input area.
  * This is where you would input the text that the tool will scan the web page for.
* Autofill Tag
  * The text starting with %
  * This is the autofill tag that will replace the text inside the text input area.
* The X
  * Deletes the autofill entry.

## Text Input Area

* Text on the web page that should be replaced by the related autofill tag.
* If you need more than one \(1\) word or phrase to replace, words can be separated with the ";" \(semi-colon\)

### Separating Words?  How Come?

Let's say a dealership has an Internet Sales Department with a manager who maintains all of the SEO on a page.  Then for the manager just picks up and moves to Spain.  A new manager is hired who has to now take care of the SEO on the dealer's page.  While the new manager is updating/creating SEO he uses a slightly different variant of the dealership's name.  I know what your thinking, that would be very unlikely, but you would be surprised.  =\]

A very common dealership name consists of the Dealership Owner's last name and the primary make of cars that the dealership sells.  \(Chevrolet, INFINITI, etc.\)

* e.g. INFINITI of Tampa, could also be
  * Tampa INFINITI
  * INFINITI Tampa
* So to account for this, you can adjust the **text to be replaced** and add all possible variations to the area to then standardize the dealership name.
* You can separate the variations by using " ; " \(semi-colon\)

Using the text mentioned above. I want to replace anything related to the dealer's name with the autofill tag %DEALER\_NAME%. So I write this text into the autofill text area.

```text
Tanaka Motors;Tanaka of Tokyo
```

![Example of Autofill Entry](https://raw.githubusercontent.com/cirept/autofillReplacer/gh-pages/assets/images/autofillEntry.jpg)

When you click the 'Magic' button the tool will break down the text if it sees ; and start its search.

* **Round 1:** Tanaka Motors
* **Round 2:** Tanaka of Tokyo

Bingo! Now all the dealership names will follow the name set in the **Site Settings.**

## Autofill Tag

The autofill tag that will replace all instances of the text that is located in the **Text Input Area**.

## Delete autofill

Removes the autofill tag entry from the search list.

