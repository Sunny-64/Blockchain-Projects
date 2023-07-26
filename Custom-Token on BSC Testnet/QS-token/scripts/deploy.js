const {Web3} = require("web3"); 
const path = require("path"); 
const HDWalletProvider = require('@truffle/hdwallet-provider');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.API_KEY
)

const web3 = new Web3(provider); 

const filePath = path.resolve(__dirname, "../", "artifacts", "contracts", "QS-token.sol", "QsToken.json")
const contractJson = require(filePath);

const deployContract = async() => {
    const abi = contractJson.abi; 
   try{
        const accounts = await web3.eth.getAccounts();  

        console.log("Deploying....");
        const deploy = await new web3.eth.Contract(abi)
        .deploy({
            data : contractJson.bytecode, 
            arguments : [50]
        })
        .send({
            from : accounts[0], 
            gas : "1500000"
        }); 

        console.log("Deployed Successfully....");
        const contractAddress = deploy.options.address;
        console.log("contract address : ", contractAddress);
        provider.engine.stop();
   }
   catch(err){
    console.log(err);
   } 
}

deployContract(); // deploys the contract...


