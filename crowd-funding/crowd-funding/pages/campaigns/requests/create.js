import React, { useState } from 'react'
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

function createNewRequest({ ...props }) {
    const [value, setValue] = useState(0);
    const [desc, setDesc] = useState("");
    const [add, setAdd] = useState("");
    const [msg, setMsg] = useState("");
    // console.log(props.address);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("Trying to add request...");
        const campaign = await Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        try {
            // add request
            const val = web3.utils.toWei(value, "ether")
            console.log(val);
            await campaign.methods.request(val, desc, add).send({
                from : accounts[0]
            })
            // const result = await campaign.methods.request(val, desc, add).send({
            //     from: accounts[0]
            // });

            setMsg("Requested Added successfully");
        }
        catch (error) {
            console.log(error);
            setMsg(`There was an error : ${error}`);
        }


    }

    return (
        <div>
            <h3>{msg}</h3>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="value">Required ETH : </label> <br />
                <input type="number" placeholder='Enter ETH' value={value} onChange={(e) => setValue(e.target.value)} />
                <br />
                <label htmlFor="desc">Description : </label> <br />
                <input type="text" value = {desc} onChange={(e) => setDesc(e.target.value)}/>
                {/* <textarea name="desc" id="desc" cols="30" rows="10" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea> */}
                <br />
                <label htmlFor="desc">Recipient Address : </label> 
                <br />
                <input type="text" value={add} onChange={(e) => setAdd(e.target.value)} /> 
                
                <br /> <br />

                <button type="submit">Submit Request</button>
            </form>
        </div>
    )
}

createNewRequest.getInitialProps = async (props) => {
    const address = props.query.address;
    return { address };
}

export default createNewRequest
