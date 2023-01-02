const h = require("hardhat");

async function main() {
  const greeter = await h.ethers.getContractAt(
    "Greeter",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const res = await greeter.greet();
  console.log(res);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
