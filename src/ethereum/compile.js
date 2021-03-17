const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// const contractFileName = "HelloWorld.sol";
const contractFileName = "Lottery.sol";

const contractFilePath = path.resolve(__dirname, 'contracts', contractFileName);
const contractCode = fs.readFileSync(contractFilePath, 'utf8');

const solcInput = {
  language: 'Solidity',
  sources: {
    [contractFileName]: { content: contractCode },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const solcOutput = JSON.parse(solc.compile(JSON.stringify(solcInput)));
const contracts = solcOutput.contracts[contractFileName];

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath); // create if does not exist.

for (const contract in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    contracts[contract]
  );
}

// const abi = solcOutput.contracts[contractFileName]['Inbox']['abi'];
// const bytecode = solcOutput.contracts[contractFileName]['Inbox']['evm']['bytecode']['object'];

// old solc version code
// const output = solc.compile(source, 1).contracts;
// const buildPath = path.resolve(__dirname, 'build');
// fs.removeSync(buildPath);
// fs.ensureDirSync(buildPath); // create if does not exist.

// for (let contract in output) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(':', '') + '.json'),
//     output[contract]
//   );
// }
