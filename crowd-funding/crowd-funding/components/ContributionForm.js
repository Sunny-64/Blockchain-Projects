import React, {useState} from 'react'
import Campaign from './../ethereum/campaign'; 
import web3 from '../ethereum/web3';
// import Route from './../routes'; 
import Router from 'next/router';

function ContributionForm(props) {
    const [amount, setAmount] = useState(0); 
    const [msg, setMsg] = useState("")
    const handleSubmit = async (e) => {
        setMsg("Processing Transaction...."); 
        e.preventDefault(); 
        // get accounts 
        const accounts = await web3.eth.getAccounts(); 
        
        // get the right contract
        const campaign = await Campaign(props.address); 
        console.log(campaign);

        // contribute
        try{    
            const result = await campaign.methods.contribute().send({
                from : accounts[0], 
                value : web3.utils.toWei(amount, "ether")
            }); 
            setMsg("Transaction Successful. You are now a contributor of this Campaign")
            Router.reload(`/campaigns/${props.address}`)

        }catch(err){
            setMsg(`There was an Error while processing transaction...${err}`); 
            console.log(err);
        }

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Contribute : </label>
                <input type="number" placeholder='Amount in ETH' value={amount} onChange={(e) =>setAmount(e.target.value)}/> <br /> <br />
                <button type='submit'>Contribute</button>
            </form>
            <br />
            <div className="status">
                {msg}
            </div>
        </div> 
    )
}

export default ContributionForm
