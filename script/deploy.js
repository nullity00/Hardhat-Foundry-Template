const hre = require("hardhat");

async function deploy() {

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log(`Contract deployed to ${counter.address}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});