// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QsToken is ERC20 {
    string public tokenName = "Qservices-token"; 
    string public tokenSymbol = "QS"; 
    address public owner; 

    constructor(uint _initialSupply) ERC20(tokenName, tokenSymbol){
        _mint(msg.sender, _initialSupply * 10 ** 18);
        owner = msg.sender;
    }

    function decimals() public view virtual override returns (uint8) {
        return 4;
    }
}