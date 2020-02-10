let letters = "abcdefghijklmnopqrstuvwxyz".split("");

/*
 * try this out in the console! you can access any variable or function
 * defined globally in the console
 *
 * and, you can right-click output in the console to make it global too!
 */

/*
 * removes any character (including spaces) that is not a letter
 * and converts all remaining letters to lowercase
 */
let keepLetters = function(text) {
  // there are multiple ways to define a function in javascript!
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  let notLetter = /[^a-z]/g;
  return text.toLowerCase().replace(notLetter, "");
};

// in console try: keepLetters("Hello World!");

/*
 * counts the letters in the input text and stores the counts as a map object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
let countLetters = function(input) {
  let text = keepLetters(input);
  let count = new Map();

  /*
   * you can loop through strings as if they are arrays
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
   */
  for (let i = 0; i < text.length; i++) {
    let letter = text[i];

    // check if we have seen this letter before
    if (count.has(letter)) {
      count.set(letter, count.get(letter) + 1);
    }
    else {
      count.set(letter, 1);
    }
  }

  return count;
};

// in console try: countLetters("Hello World!");
// in console try: countLetters("Hello World!").keys();
// in console try: countLetters("Hello World!").entries();
