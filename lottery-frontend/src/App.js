import logo from './logo.svg';
import './App.css';
import lottery from './scripts/lottery';
import web3 from './scripts/web3';
import { useEffect, useState } from 'react';

function App() {
  console.log(lottery);
  const [manager, setManager] = useState(""); 
  const [winner, setWinner] = useState(""); 
  const [ether, setEther] = useState(""); 
  const [user, setUser] = useState(""); 
  const [accounts, setAccounts] = useState(""); 
  const [balance, setBalance] = useState(0); 
  // const [isWinnerPicked, setIsWinnerPicked] = useState(false); 

  const [isEnteredInLottery, setIsEnteredInLottery] = useState(false); 

  useEffect(() => {
      const fetchData = async () => {

          const getAccounts = await web3.eth.getAccounts(); 
          const getManager = await lottery.methods.manager().call(); 
          const getBalance = await web3.eth.getBalance(lottery.options.address); 
          const getWinner = await lottery.methods.winner().call(); 
          // console.log(getBalance)
          setWinner(getWinner); 
          setAccounts(getAccounts); 
          setManager(getManager); 
          setBalance(web3.utils.fromWei(getBalance, "ether")); 
          setUser(accounts[0]); 
      }
      fetchData(); 
  }, [winner, balance]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const result = await lottery.methods.enter().send({
        from : accounts[0], 
        value : web3.utils.toWei(ether, "ether")
    }); 

    setIsEnteredInLottery(true); 
  }

  const pickWinner = async (e) => {
      e.preventDefault(); 
      const winner = await lottery.methods.pickWinner().send({
        from : accounts[0]
      }); 

      console.log(winner); 
  }
  return (
    <div className="container">
        <h1>Lottery System</h1>
        
        {!winner ? 
          <div className="winner">
            Winner is not declared yet...
        </div>
        : 
        <div className="winner">
            Winner is : {winner}
        </div>
        }

        <div className="manager">
            <p>Contract is Managed By </p>
            <span className='highlight'>{manager}</span>
        </div>

        <div className="participate">
            {/* <p>Enter in the Lottery. Amount at stake : </p> */}
            <span>Amount at Stake : {balance} ETH</span>
            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="ether">Ether : </label>
                  <input type="number" name='ether' id='ether' placeholder='Enter the amount : ' value={ether} onChange={(e)=> setEther(e.target.value)}/>
                <button type="submit">Enter</button>
                </div>
            </form>

            {isEnteredInLottery && <h3>You have been Entered in the Lottery</h3>}

        </div>

        {/* Only visible to the manager */}
        {
          accounts[0] === manager && 
          <div className="pick-winner">
            <button onClick={pickWinner}>Pick a Winner</button>
        </div>
        }
        
      
    </div>
  );
}

export default App;
