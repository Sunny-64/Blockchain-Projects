const ganache = require('ganache');
const { Web3 } = require('web3');
const mocha = require("mocha");
const assert = require("assert"); 
// updated imports added for convenience
const web3 = new Web3(ganache.provider()); 


let compiledCampaignFactory = require("./../ethereum/build/CampaignFactory.json"); 
let compiledCampaign = require("./../ethereum/build/Campaign.json"); 


let accounts; 
let campaignFactory; 
let campaign; 
let campaignAddress; 

beforeEach(async () => {
    accounts = await web3.eth.getAccounts(); 
    campaignFactory = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.abi))
    .deploy({
        data : compiledCampaignFactory.evm.bytecode.object
    })
    .send({
        from : accounts[0], 
        gas : "1500000",
    });

    await campaignFactory.methods.createNewCampaign("100").send({
        from : accounts[0], 
        gas : "1500000"
    }); 

    [campaignAddress] = await campaignFactory.methods.getCampaigns().call(); 
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.abi), campaignAddress); 
}); 

