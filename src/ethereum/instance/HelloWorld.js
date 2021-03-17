import web3 from './web3';
import HelloWorldJson from '../build/HelloWorld.json';

function HelloWorld(addressOfDeployedContract) { // address of deployed contract on the blockchain network.
  return new web3.eth.Contract(HelloWorldJson.abi, addressOfDeployedContract);
}

export default HelloWorld;
