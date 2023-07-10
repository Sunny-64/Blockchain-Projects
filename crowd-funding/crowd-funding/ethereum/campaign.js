import Campaign from './build/Campaign.json'; 
import web3 from './web3'; 

const campaignInstance = async (address) => {
    return await new web3.eth.Contract(Campaign.abi, address); 
}

export default campaignInstance; 