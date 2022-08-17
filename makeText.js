/** Command-line tool to generate Markov text. */

'use strict';

const axios = require('axios');

const fsP = require('fs/promises');

const { MarkovMachine } = require('./markov');

/** Accepts a file path and prints the contents. */
async function cat(path) {
  try {
    return await fsP.readFile(path, "utf8");
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

/** Accepts a URL and prints the URL contents. */
async function webCat(url) {
  try {
    return await axios.get(url);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

// call the functions
const argv = process.argv;
const path = argv[2];


async function start() {
  let content;

  if (path.startsWith('http')) {
    content = await webCat(path);
  } else {
    content = await cat(path);
  }

  const newMarkov = new MarkovMachine(content);
  console.log(newMarkov.getText());
}


start();
