const h = require("hardhat");

async function main() {
  const multiSig = await h.ethers.getContractAt(
    "MultiSig",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  );

  const amount = h.ethers.utils.parseEther("0.01");

  // const res = await multiSig.submitTransaction("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", amount, "0x");
  const res2 = await multiSig.getTransactions();
  console.log(res2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
