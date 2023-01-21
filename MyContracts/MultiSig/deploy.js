const hre = require("hardhat");

async function deploy() {
  const amount = hre.ethers.utils.parseEther("1");
  const Greeter = await hre.ethers.getContractFactory("MultiSig");
  const greeter = await Greeter.deploy(
    ["0x70997970c51812dc3a010c7d01b50e0d17dc79c8"],
    {
      value: amount,
    }
  );

  await greeter.deployed();

  console.log(`Contract deployed to ${greeter.address}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});