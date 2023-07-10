import React from 'react'
import Campaign from './../../../ethereum/campaign'; 

const requestIndex = ({...props}) => {
  
  return (
    <div>
      <h1>Requests</h1>
      <table>
         {/* {props.requests.map((el, index) => {
            return (
              <tr>
                  <td>{el.value}</td>
              </tr>
            )
         })} */}
      </table>
    </div>
  )
}

requestIndex.getInitialProps = async (props) => {
    const campaign = await Campaign(props.query.address); 
    console.log(campaign);
    // fetch all the requests

    // const requests = await campaign.methods.requests().call(); 
    // console.log(requests);
    // return {requests}
}

export default requestIndex
