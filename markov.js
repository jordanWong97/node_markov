'use strict';
/** Textual markov chain generator. */

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
    //mayb pass this.words into chains
    //if end with period, can still have word after unless pass null
    //The cat in the hat.
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    //loop over words
    //create obj, assign words as keys and set value equal to word after
    const words = this.words;
    let chains = new Map();
    //let words = this.words;
    for (let i = 0; i < words.length; i++) {
      //obj
      // if (i === words.length - 1) {
      //   if (chains.has(words[i])) {
      //     chains.get(words[i]).push(null);
      //   } else {
      //     chains.set(words[i], [null]);
      //   }
      // }
      let word = words[i];
      let nextWord = words[i + 1] || null;
      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      }
      else {
        chains.set(word, [nextWord]);
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    let start = this.words[0];
    let nextWord = random(this.chains.get(start));
    let output = start;
    // nextword init second word, call random and pass in aray with start word
    // set this.chain
    while (nextWord) {
      output += (' ' + nextWord);
      nextWord = random(this.chains.get(nextWord));
    }
    return output;
  }
}

function random(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}


module.exports = {
  MarkovMachine
}

