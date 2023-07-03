const ganache = require('ganache');
const { Web3 } = require('web3');
const mocha = require("mocha");
const assert = require("assert"); 
// updated imports added for convenience
const {abi, evm} = require("./../compile.js"); 
const web3 = new Web3(ganache.provider()); 

let accounts; 
let lottery; 

beforeEach(async () => {
    accounts = await web3.eth.getAccounts(); 
    lottery = await new web3.eth.Contract(abi)
    .deploy({
        data : evm.bytecode.object
    })
    .send({
        from : accounts[0], 
        gas : "1000000",
        // value : web3.utils.toWei("0.02", "ether")
    });
})


// mocha.describe
describe("Lottery Contract", () => {
    it("Deploys the Contract", () => {
        assert.ok(lottery.options.address); 
    });

    it("Enters one player in the contest", async () => {
        // console.log(lottery);
        let result = await lottery.methods.enter().send({
            from : accounts[0], 
            value : web3.utils.toWei("0.2", "ether")
        }); 

        // assert.ok(result);
        const players = await lottery.methods.getPlayers().call(); 
        assert.equal(accounts[0], players[0]); 

    }); 

    it("Enters Multiple players in the contest", async () => {
        await lottery.methods.enter().send({
            from : accounts[0], 
            value : web3.utils.toWei("0.2", "ether")
        }); 
        await lottery.methods.enter().send({
            from : accounts[1], 
            value : web3.utils.toWei("0.2", "ether")
        }); 
        await lottery.methods.enter().send({
            from : accounts[2], 
            value : web3.utils.toWei("0.2", "ether")
        }); 

        const players = await lottery.methods.getPlayers().call({
            from : accounts[0]
        }); 
        assert.equal(accounts[0], players[0]); 
        assert.equal(accounts[1], players[1]); 
        assert.equal(accounts[2], players[2]); 
        assert.equal(3, players.length);
    }); 
    
    it("Should not allow players to enter if they're sending less than 0.2 ether", async () => {
        try{
            await lottery.methods.enter().send({
                from : accounts[3], 
                value : 0
            }); 
            assert(false); 
        }
        catch(error){
            assert(error); 
        }
    });

    it("Only allows manager to call pickWinner function", async () => {
        try{
            await lottery.methods.pickWinner().send({
                from : accounts[1]
            }); 
            assert(false);
        }   
        catch(error){
            assert(error); 
        }
    });

    it("Sends money to the winner and resets the lottery", async () => {
        // account 1 has entered the lottery
        await lottery.methods.enter().send({
            from : accounts[1], 
            value : web3.utils.toWei("5", "ether")
        }); 

        let etherAfterEnteringTheLottery = await web3.eth.getBalance(accounts[1]);
        // manager account picks the winner 
        await lottery.methods.pickWinner().send({
            from : accounts[0]
        }); 

        let etherAfterWinningTheLottery = await web3.eth.getBalance(accounts[1]); 
        let players = await lottery.methods.getPlayers().call(); 
        assert(etherAfterEnteringTheLottery < etherAfterWinningTheLottery); 
        assert.equal(0, players.length); 
    }); 
}); 