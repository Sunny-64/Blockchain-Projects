import React, { Component } from "react";
import campaignFactory from './../ethereum/campaignFactory';
import Layout from "../components/Layout";
import {Link} from "./../routes"; 

class CampaignIndex extends Component{
    static async getInitialProps(){
        const campaigns = await campaignFactory.methods.getCampaigns().call(); 
        return {campaigns}; 
    }

    render(){
        return (
            <Layout>
                <div style={{marginBottom : "10px"}}>
                    Hi Welcome to Crowd funding system.
                </div>
                <div style={{marginBottom : "6px"}}>
                    <ul>
                    {this.props.campaigns.map((campaign, index) => {
                        return <li key={index}>
                            <Link route= {`/campaigns/${campaign}`}>{campaign}</Link>
                        </li>
                    })}
                    </ul>
                </div>
                <hr />
                <div>
                    <button><Link route = "/campaigns/create">Create Campaign</Link></button>
                </div>
            </Layout>

        )
    }
}

export default CampaignIndex; 