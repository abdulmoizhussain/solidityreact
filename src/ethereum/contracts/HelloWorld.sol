// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

contract HelloWorld {
    string thisMessage;

    function sendMessage(string memory message) public {
        thisMessage = message;
    }

    function fetchMessage() public view returns (string memory) {
        return thisMessage;
    }
}
