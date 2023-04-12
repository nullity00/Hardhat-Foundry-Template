const hre = require("hardhat");

const ethers = require("ethers");
const fa = require("@glif/filecoin-address");
const util = require("util");
const request = util.promisify(require("request"));

const DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY;
const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);

async function callRpc(method, params) {
  var options = {
    method: "POST",
    url: "https://api.hyperspace.node.glif.io/rpc/v1",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    }),
  };
  const res = await request(options);
  return JSON.parse(res.body).result;
}

async function main() {
  const priorityFee = await callRpc("eth_maxPriorityFeePerGas");
  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();

  console.log("Wallet Ethereum Address:", deployer.address);
  console.log("Wallet f4Address: ", f4Address);

  const Greeter = await hre.ethers.getContractFactory("MarketMockAPI");
  const greeter = await Greeter.deploy({
    gasLimit: 1000000000, // BlockGasLimit / 10
    maxPriorityFeePerGas: priorityFee,
  });

  await greeter.deployed();
  console.log(`Contract deployed to ${greeter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
