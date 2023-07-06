import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json'; 

const instance = new web3.eth.Contract(
    campaignFactory.abi, 
    "0x14BF99cB511F742276ad639B5339354A695068Ea"
); 

export default instance; 