const path = require("path");
const fs = require("fs");
const solc = require('solc');

let source = fs.readFileSync(path.join(__dirname + "/contracts/Lottery.sol"), "utf-8"); 

// console.log(source);
var input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
};
  
var output = JSON.parse(solc.compile(JSON.stringify(input)));



// console.log(output.contracts['Lottery.sol'].Lottery);

// let output = solc.compile(source, 1).contracts["Lottery"];
// console.log(output);

module.exports = output.contracts['Lottery.sol'].Lottery;
