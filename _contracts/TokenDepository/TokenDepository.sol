// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {rToken} from "./rToken.sol";

import "hardhat/console.sol";

contract TokenDepository {

  address public aave;
  address public uni;
  address public weth;
  rToken public rAave;
  rToken public rUni;
  rToken public rWeth;
  mapping (address => uint) public aaveDeposits;
  mapping (address => uint) public uniDeposits;
  mapping (address => uint) public wethDeposits;


  constructor(address _aave, address _uni, address _weth) {
    aave = _aave;
    uni = _uni;
    weth = _weth;

    rAave = new rToken(_aave, "Deposited Aave", "RAAVE");
    rUni = new rToken(_uni, "Deposited Uni", "RUNI");
    rWeth = new rToken(_weth, "Deposited Weth", "RWETH");
  }

  function deposit(address token, uint256 amount) public {
    require(token == aave || token == uni || token == weth, "Token not supported");
    bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
    require(success, "Transfer failed");
    if (token == aave) {
      rAave.mint(msg.sender, amount);
      aaveDeposits[msg.sender] += amount;
    } else if (token == uni) {
      rUni.mint(msg.sender, amount);
      uniDeposits[msg.sender] += amount;
    } else if (token == weth) {
      rWeth.mint(msg.sender, amount);
      wethDeposits[msg.sender] += amount;
    } else {
      revert("Token not supported");
    }
  }

  function withdraw(address token, uint256 amount) public {
    require(token == aave || token == uni || token == weth, "Token not supported");
    if (token == aave) {
      require(aaveDeposits[msg.sender] >= amount, "Not enough deposited");
      rAave.burn(msg.sender, amount);
      aaveDeposits[msg.sender] -= amount;
    } else if (token == uni) {
      require(uniDeposits[msg.sender] >= amount, "Not enough deposited");
      rUni.burn(msg.sender, amount);
      uniDeposits[msg.sender] -= amount;
    } else if (token == weth) {
      require(wethDeposits[msg.sender] >= amount, "Not enough deposited");
      rWeth.burn(msg.sender, amount);
      wethDeposits[msg.sender] -= amount;
    } else {
      revert("Token not supported");
    }
    bool success = IERC20(token).transfer(msg.sender, amount);
    require(success, "Transfer failed");
  }

}

