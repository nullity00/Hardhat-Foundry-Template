// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

import "hardhat/console.sol";

contract Investing is VestingWallet {

  constructor(
    address beneficiaryAddress,
    uint64 startTimestamp,
    uint64 durationSeconds
  ) payable VestingWallet(beneficiaryAddress, startTimestamp, durationSeconds) {}

}