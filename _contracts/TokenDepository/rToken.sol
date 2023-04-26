// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract rToken is ERC20 {

    address public owner;
    address public underlyingToken;

    modifier onlyOwner{
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
    
    constructor(address _underlyingToken, string memory _name, string memory _symbol)
    ERC20(_name, _symbol) {
        owner = msg.sender;
        underlyingToken = _underlyingToken;
    }

    function mint(address minter, uint256 value) public onlyOwner {
        _mint(minter, value);
    }

    function burn(address redeemer, uint256 value) public onlyOwner {
        _burn(redeemer, value);
    }
}
