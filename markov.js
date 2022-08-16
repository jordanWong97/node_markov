'use strict';
/** Textual markov chain generator. */

const fsP = require('fs/promises');
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
    let chains = {};
    //let words = this.words;
    for (let i = 0; i < words.length; i++) {
      //obj
      if (i === words.length - 1) {
        chains[words[i]] ? chains[words[i]].push(null) : chains[words[i]] = [null];
        //chains[words[i]]
      }
      else if (chains[words[i]]) {
        chains[words[i]].push(words[i + 1]);
      }
      else {
        chains[words[i]] = [words[i + 1]];
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
    let nextWord = random(this.chains[start]);
    let output = start;
    // nextword init second word, call random and pass in aray with start word
    // set this.chain
    while (nextWord) {
      output += (' ' + nextWord);
      nextWord = random(this.chains[nextWord]);
    }
    return output;
  }
}

let contents;

function random(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

/** Accepts a file path and prints the contents. */
async function reader(path) {
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const argv = process.argv;
reader(argv[2]);


//test getchains
//return an obj toequal:
// {
//   *   "The": ["cat"],
//   *   "cat": ["in"],
//   *   "in": ["the"],
//   *   "the": ["hat."],
//   *   "hat.": [null],
//   *  }

//test gettext


//test


