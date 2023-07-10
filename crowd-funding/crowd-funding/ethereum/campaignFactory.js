import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'; 

const instance = new web3.eth.Contract(
    campaignFactory.abi, 
    "0xbba0f1b945d7A3555198Fbc4399b50a13B60fe76"
); 

export default instance; 