const path = require("path");
const fs = require("fs-extra");
const solc = require('solc');

let buildPath = path.resolve(__dirname, 'build'); 
// console.log(buildPath)
if(fs.existsSync(buildPath)){
  fs.rmSync(buildPath, { recursive: true, force: true });
}

let campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol"); 

const contractFileName = "Campaign.sol"

let source = fs.readFileSync(campaignPath, "utf-8"); 
// console.log(source);

var input = {
    language: 'Solidity',
    sources: {},
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
};
  
input.sources[contractFileName] = {
  content: source,
};

let output = JSON.parse(solc.compile(JSON.stringify(input)));
let contracts = output.contracts[contractFileName]; 
// console.log(output);

console.log(contracts)

// fs.mkdirSync(buildPath); 
fs.ensureDirSync(buildPath); 

for(let contract in contracts){
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
  }
}