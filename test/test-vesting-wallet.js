const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vesting Wallet", function () {
  let deployer, user1, user2, user3;

  before(async () => {
    [deployer, user1, user2, user3] = await ethers.getSigners();

    const vestingwallet = await ethers.getContractFactory(
      "contracts/VestingWallet.sol:Investing",
      deployer
    );
    this.vestingWalletContract = await vestingwallet.deploy([
      deployer.address,
      user1.address,
      user2.address,
    ]);
    await this.vestingWalletContract.deployed();
  });

  it("Actions", async () => {

  });

  after(async () => {

  });
});
