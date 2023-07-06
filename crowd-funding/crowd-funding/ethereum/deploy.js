const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const provider = new HDWalletProvider(
  process.env.SECRET_PHRASE,
  process.env.API_KEY
)
let compiledCampaignFactory = require("./build/CampaignFactory.json"); 
let compiledCampaign = require("./build/Campaign.json"); 

// console.log(compiledCampaignFactory);

// console.log(compiledCampaignFactory.evm.bytecode.object); 
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledCampaignFactory.abi)
    .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
    .send({ gas: '1500000', from: accounts[0] });
 
  console.log('Contract deployed to', result.options.address);
  console.log("abi : ", compiledCampaignFactory.abi); 
  provider.engine.stop();
};

deploy();