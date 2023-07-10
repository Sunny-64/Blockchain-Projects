// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory{
    address [] campaignAddresses; 

    function createNewCampaign(uint _minContribution) public {
        Campaign contractAdd = new Campaign(_minContribution, msg.sender); 
        campaignAddresses.push(address(contractAdd)); 
    }

    function getCampaigns() public view returns(address [] memory){
        return campaignAddresses; 
    }
}

contract Campaign{

    address public manager; 
    uint public minimumContribution; 
    uint reqCount = 0; 
    mapping(address => bool) contributors; 
    uint contributorsCount = 0; 

    struct Request{
        string description; 
        address payable recipient; 
        uint value; 
        bool isComplete; 
        uint approvalCount; 
        mapping(address => bool) approvals; 
    }

    Request [] public requests; 

    constructor(uint _minimumContribution, address _sender){
        manager = _sender; // initialize manager 
        minimumContribution = _minimumContribution;  // set minimum contribution
    }
    // modifiers...

    modifier onlyManager{
        require(msg.sender == manager, "Only manager can access this functions");
        _; 
    }

    function contribute() public payable {
        // check if the ether sent is greater than or equal to required contribution
        require(msg.value >= minimumContribution); 
        // add to approvers if above condition is true
        contributors[msg.sender] = false; 
        contributorsCount++; 
    }

    function request(uint _value, string memory _description, address payable _recipient) public onlyManager{
        // add new request to requests array
        Request storage r = requests.push();  // fails here.
        r.description = _description; 
        r.value = _value; 
        r.recipient = _recipient; 
        r.isComplete = false; 
        r.approvalCount = 0; 
        reqCount++; 
    }

    function approveRequest(uint _index) public {

        require(!contributors[msg.sender], "Only Contributers can vote");
        Request storage req = requests[_index]; 
        require(!req.approvals[msg.sender], "You have already Voted");

        req.approvals[msg.sender] = true; // request approved
        req.approvalCount++; 
    }
    // 1 // 1

    function finalizeRequest(uint _index) public payable onlyManager {
        Request storage req = requests[_index]; 
        require(req.approvalCount > contributorsCount/2, "Request needs more approvals"); // if finalization doesn't have enough approvals
        require(!req.isComplete, "Request has been already approved"); // if request is already approved
        req.recipient.transfer(req.value); // send the value to the recipient
        req.isComplete = true; // marks the request as compelete
    }

    function getRequestsCount() public view returns(uint) {
        return reqCount; 
    }

    function getApproveRequestCount(uint _index) public view returns(uint){
        Request storage req = requests[_index]; 
        return req.approvalCount;  
    }

    function noOfContributors() public view returns(uint){
        return contributorsCount; 
    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        
        return(
            minimumContribution, 
            address(this).balance,
            requests.length,
            contributorsCount,
            manager
        );
    }
}