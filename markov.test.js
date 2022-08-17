'use strict';

const { MarkovMachine } = require("./markov");

/** Tests for Markov Machine class */
describe("Markov Machine", function () {
  // initialize variable so we only have to create one test MarkovMachine instance
  let testCase;

  beforeAll(function() {
    const testText = 'The cat in the hat.';
    testCase = new MarkovMachine(testText);

  })

  // test getChain method
  test("get chains", function () {
    expect(testCase.getChains().get("The")).toEqual(["cat"]);
    expect(testCase.getChains().get("hat.")).toEqual([null]);
  })

  // test getText method
  test("get text", function () {
    expect(testCase.getText()).toEqual('The cat in the hat.');
  })

})
