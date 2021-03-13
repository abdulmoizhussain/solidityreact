pragma solidity ^0.4.17;

contract HelloWorld {
    string thisMessage;

    function sendMessage(string message) public {
        thisMessage = message;
    }

    function fetchMessage() public view returns (string) {
        return thisMessage;
    }
}
