import LotteryJson from '../build/Lottery.json';

function Lottery(web3, addressOfDeployedContract) { // address of deployed contract on the blockchain network.
  return new web3.eth.Contract(LotteryJson.abi, addressOfDeployedContract);
}

export default Lottery;
