const hre = require("hardhat");

async function deploy() {

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello !");

  await greeter.deployed();

  console.log(`Contract deployed to ${greeter.address}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});