import { React, useState } from "react";
import Layout from "../../components/Layout";
import campaignFactory from "./../../ethereum/campaignFactory";
import web3 from "../../ethereum/web3";
import { Router } from "./../../routes";

function create() {
  const [minContribution, setMinContribution] = useState(0);
  // const [accounts, setAccounts] = useState(); 
  const [errorMessage, setErrorMessage] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(web3);

    try {
      setErrorMessage("Processing...."); 
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);

      const result = await campaignFactory.methods.createNewCampaign(minContribution).send({
        from: accounts[0]
      });
      console.log(result);
      setErrorMessage("campaign registered"); 
      Router.pushRoute("/")
    }
    catch (error) {
      console.log(error);
      setErrorMessage(`There was an error : ${error}`); 
    }
  }
  return (
    <Layout>
      <div>
        Create new campaign here :
      </div>
      {errorMessage}
      <hr />

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Minimum Contribution Required : </label>
        <input type="number" placeholder="minimum Contribution in ETH" value={minContribution} onChange={(e) => setMinContribution(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </Layout>
  );
}

export default create;
