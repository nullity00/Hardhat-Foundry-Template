const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Counter Contract", function () {

  before(async () => {
    const counterFactory = await ethers.getContractFactory(
      "src/Counter.sol:Counter"
    );
    this.counter = await counterFactory.deploy();
    await this.counter.deployed();

  });

  it("Actions", async () => {

    await this.counter.setNumber(10);
    await this.counter.increment();

  });

  after(async () => {
    const number = await this.counter.number();
    expect(number).to.equal(11);
  });
});
