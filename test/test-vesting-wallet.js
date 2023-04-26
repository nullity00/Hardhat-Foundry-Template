const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Vesting Wallet", function () {
  let deployer, beneficiery;

  const DURATION = 60 * 60 * 24 * 30; // 30 days

  before(async () => {
    [deployer, beneficiery] = await ethers.getSigners();

    const vestingwallet = await ethers.getContractFactory(
      "contracts/VestingWallet.sol:Investing",
      deployer
    );

    const block = await ethers.provider.getBlock();
    const duration = ethers.BigNumber.from(DURATION);
    this.vestingWalletContract = await vestingwallet.deploy(
      beneficiery.address,
      block.timestamp,
      duration,
      {
        value: ethers.utils.parseEther("1"),
      }
    );
    await this.vestingWalletContract.deployed();
    this.initialBalanceBeneficiery = await ethers.provider.getBalance(
      beneficiery.address
    );
  });

  it("Actions", async () => {
    await time.increase(DURATION);
    const tx = await this.vestingWalletContract["release()"]();
  });

  after(async () => {
    const balance = await ethers.provider.getBalance(
      this.vestingWalletContract.address
    );
    const balanceBeneficiery = await ethers.provider.getBalance(
      beneficiery.address
    );

    expect(balance).to.equal(ethers.utils.parseEther("0"));
    expect(balanceBeneficiery).to.equal(
      this.initialBalanceBeneficiery.add(ethers.utils.parseEther("1"))
    );
  });
});
