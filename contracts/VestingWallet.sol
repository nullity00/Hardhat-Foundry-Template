// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract Investing is VestingWallet {

  constructor(
    address beneficiaryAddress,
    uint64 startTimestamp,
    uint64 durationSeconds
  ) VestingWallet(beneficiaryAddress, startTimestamp, durationSeconds) {}

}