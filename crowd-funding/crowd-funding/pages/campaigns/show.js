import React from 'react'
import Campaign from './../../ethereum/campaign'; 
import ContributionForm from '../../components/ContributionForm';
import web3 from '../../ethereum/web3';
import {Link} from "./../../routes"; 

const show = ({...props}) => {
  return (
    <div>
        <div className="campaign-details" style={{border : "1px solid #000", width : "300px", wordBreak : "break-word", padding : "1% 2%", marginBottom : "30px", float : "left", marginRight : "30px"}}>
            <h3>Manager : {props.manager}</h3>
            <h4>Balance of the Campaign : {props.balance}</h4>
            <h4>No Of requests : {props.requests}</h4>
            <h4>No of contributors : {props.contributors}</h4>
            <h4>minimum contribution : {web3.utils.fromWei(props.minimumContribution, "ether")} ETH</h4>
            <button><Link route={`/campaigns/${props.campaignAddress}/requests`}>View Requests</Link></button>
        </div> 

        <ContributionForm address = {props.campaignAddress}/>
    </div>
  )
}

show.getInitialProps = async (props) => {

  const campaign = await Campaign(props.query.address); 
  const summary = await campaign.methods.getSummary().call(); 
  return {
      minimumContribution : parseInt(summary[0]), 
      balance : parseInt(summary[1]), 
      requests : parseInt(summary[2]), 
      contributors : parseInt(summary[3]),
      manager : summary[4], 
      campaignAddress : props.query.address
  }
}


export default show
