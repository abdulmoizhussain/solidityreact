import web3 from './ethereum/web3';
import React from 'react';
import ContractAddresses from "./ethereum/deployedAddress.json";
import HelloWorld from "./ethereum/hwInstance";
const contractAddress = ContractAddresses[0];

function App() {
  const [message, setMessage] = React.useState("");
  const [messageFromSol, setMessageFromSol] = React.useState("");


  async function onSubmitNewMessage() {
    const hwInstance = HelloWorld(contractAddress);

    // console.log(await web3.eth.requestAccounts());
    const accounts = await web3.eth.getAccounts();

    await hwInstance.methods.sendMessage(message).send({
      from: accounts[0],
    });
  }

  async function onFetchLastMessage() {
    const hwInstance = HelloWorld(contractAddress);
    // const accounts = await web3.eth.getAccounts();
    const msg = await (hwInstance.methods.fetchMessage().call());
    console.log(msg);
    setMessageFromSol(msg);
  }


  return (
    <div>
      <input type="text" value={message} onChange={event => setMessage(event.target.value)} />
      <button onClick={onSubmitNewMessage}>Send Message</button>

      <hr />
      <div>{messageFromSol}</div>
      <button onClick={onFetchLastMessage}>Fetch last message</button>
    </div>
  );
}

export default App;
