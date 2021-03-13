import web3 from './web3';
import HelloWorld from './build/HelloWorld.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(HelloWorld.interface), address);
};
