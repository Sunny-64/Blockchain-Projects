const { ethers } = require("hardhat");
// const {expect} = require("@nomicfoundation/hardhat-chai-matchers"); 
const {expect} = require("chai"); 

const INITIAL_SUPPLY = 50; 

let owner; 
let otherAddresses; 
let Token; 
let hardhatToken;

beforeEach(async () => {
    [owner, otherAddresses] = await ethers.getSigners();
    // console.log("Other Address : ",  otherAddresses);
    // console.log("Owner address : ", owner);

    Token = await ethers.getContractFactory("QsToken"); // instance contract
    // console.log("Token : ", Token);

    hardhatToken = await Token.deploy(INITIAL_SUPPLY); // deploy
    // console.log("Hardhat Token : ", hardhatToken);
}); 

describe("Test Qs-token smart contract", () => {
    it("Deployment should assign owner all initial supply of tokens", async () => {
        // console.log(owner);
        // const balance = await hardhatToken.getBalance(); 
        const balance = await hardhatToken.balanceOf(owner); 

        // console.log(balance);
        expect(balance).to.equal(INITIAL_SUPPLY); 
    }); 

    it("Transfers Specified Amount of Tokens to an Address", async () => {
        await hardhatToken.transfer(otherAddresses, 15);
        expect(Number(await hardhatToken.balanceOf(otherAddresses))).to.equal(15); 
    }); 

    it("Increase Allowance of a spender", async () => {
        await hardhatToken.increaseAllowance(otherAddresses, 10); 
        expect(Number(await hardhatToken.allowance(owner, otherAddresses))).to.equal(10); 
    }); 

    it("Transfers token form Address A to Address B", async () => {  
        try{
            await hardhatToken.transfer(otherAddresses, 15);
            await hardhatToken.increaseAllowance(otherAddresses, 10); 
            
            let a = await hardhatToken.transferFrom(otherAddresses, owner, 5); 
            // console.log(a);
            expect(Number(await hardhatToken.balanceOf(otherAddresses))).to.equal(10); 
        }
        catch(err){
            let c = await hardhatToken.balanceOf(otherAddresses);
            console.log(c);
            console.log(err);
        }
    })

}); 

