function getChains() {
  // TODO: implement this!
  //loop over words
  //create obj, assign words as keys and set value equal to word after
  const words = ['The', 'cat', 'in', 'cat', 'the', 'hat.'];
  let chains = {};
  //let words = this.words;
  for (let i = 0; i < words.length; i++) {
    //obj
    if (i === words.length - 1) {
      chains[words[i]] ? chains[words[i]].push(null) : chains[words[i]] = [null];
    }
    else if (chains[words[i]]) {
      chains[words[i]].push(words[i + 1]);
    }
    else {
      chains[words[i]] = [words[i + 1]];
    }
  }
  console.log(chains);
  return chains;
}


getChains();