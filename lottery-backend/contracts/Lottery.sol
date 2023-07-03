//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    function enter() public payable {
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }

    function _randomNumberGenerator() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public onlyManager {
        uint index = _randomNumberGenerator() % players.length;
        payable(players[index]).transfer(address(this).balance);
        winner = players[index];
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}



