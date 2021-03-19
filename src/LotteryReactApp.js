import React from 'react';
import web3 from './ethereum/web3Truffle';
import ContractAddresses from "./ethereum/config/deployedAddress.json";
import Lottery from "./ethereum/instance/Lottery";
const contractAddress = ContractAddresses[0];

function App() {
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  React.useEffect(() => { // gets called at only first time render of react application.
    async  function asyncMethod () {
      const accounts = await web3.eth.getAccounts();
      setAddresses(accounts);
      setSelectedAddress(accounts[0]);
    }

    asyncMethod();
  }, []);

  async function onClickLotteryEntrance() {
    try {
      const lottery = Lottery(web3, contractAddress);

      // source: https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=towei#towei
      console.log("before conversion: ", amount);
      const amountInWei = web3.utils.toWei(amount, "ether");
      console.log("after conversion: ", amountInWei);

      const response = await lottery.methods.enter().send({
        from: selectedAddress,
        value: amountInWei
      });

      console.log(response);
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <label>Select Address: &nbsp;</label>
      <select onChange={(event) => { setSelectedAddress(event.target.value); }}>
        {addresses.map((value, index) => <option key={index} value={value}>{`${index} ${value}`}</option>)}
      </select>
      <br />
      <br />
      <input type="text" placeholder="amount in ether" value={amount} onChange={event => setAmount(event.target.value)} />
      <button onClick={onClickLotteryEntrance}>Enter</button>
    </div>
  );
}

export default App;
