pragma solidity ^0.8.2;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "Value must be greater than 0.1 ether.");
        players.push(msg.sender);
    }

    function random() private view returns (uint) { // difference between random and pseudo random
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, players)));
    }

    function pickWinner() public payable restricted {
        uint index = random() % players.length;
        
        payable(players[index]).transfer((address(this)).balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager, "You must be a manager.");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
