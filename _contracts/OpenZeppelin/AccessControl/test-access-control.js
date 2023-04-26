const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control NFT", function () {
  let deployer, user1, user2, user3;

  before(async () => {
    [deployer, user1, user2, user3] = await ethers.getSigners();

    const nftContract = await ethers.getContractFactory(
      "contracts/AccessControl.sol:AccessControlNFT",
      deployer
    );
    this.nftAccessContract = await nftContract.deploy([
      deployer.address,
      user1.address,
      user2.address,
    ]);
    await this.nftAccessContract.deployed();
  });

  it("Actions", async () => {
    // User 1 mints 4 nfts
    for (let i = 0; i < 4; i++) {
      await this.nftAccessContract.connect(user1).mint();
    }

    // User 1 transfers 2 nfts to user 2
    for (let i = 1; i <= 2; i++) {
      await this.nftAccessContract
        .connect(user1)
        .transferFrom(user1.address, user2.address, i);
    }

    // User 3 tries to mint
    await expect(
      this.nftAccessContract.connect(user3).mint()
    ).to.be.revertedWith("AccessControlNFT: must have minter role to mint");

    // user 2 tries to leave the group with no minted nfts of own
    await expect(
      this.nftAccessContract.connect(user2).leave()
    ).to.be.revertedWith(
      "AccessControlNFT: You didn't mint any NFTs"
    );
  });

  after(async () => {
    expect(await this.nftAccessContract.balanceOf(user1.address)).to.equal(2);
    expect(await this.nftAccessContract.balanceOf(user2.address)).to.equal(2);
    expect(await this.nftAccessContract.nft_count()).to.equal(4);
  });
});
