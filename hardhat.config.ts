require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

// Un comment when using ZK Sync
// require("@matterlabs/hardhat-zksync-deploy");
// require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const POLYGON_MAINNET = process.env.POLYGON_MAINNET;
const POLYGON_MUMBAI = process.env.POLYGON_MUMBAI;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

const ETHEREUM_MAINNET = process.env.ETHEREUM_MAINNET;
const ETHEREUM_GOERLI = process.env.ETHEREUM_GOERLI;
const ARBITRUM_GOERLI = process.env.ARBITRUM_GOERLI;

module.exports = getConfig("goerli", "0.8.4");

function getConfig(network: string, solidity_version: string) {
  switch (network) {
    case "mumbai":
    case "goerli":
    case "sepolia":
    case "litchi":
    case "wallaby":
    case "optimism_goerli":
    case "arbitrum_goerli":
    case "fuji":
      const config = {
        solidity: { version: solidity_version },
        defaultNetwork: network,
        networks: {
          mumbai: {
            url: POLYGON_MUMBAI,
            accounts: [PRIVATE_KEY],
          },
          goerli: {
            url: ETHEREUM_GOERLI,
            accounts: [PRIVATE_KEY],
          },
          sepolia: {
            url: "https://rpc.sepolia.org",
            accounts: [PRIVATE_KEY],
          },
          litchi: {
            url: "https://rpc.public.zkevm-test.net",
            accounts: [PRIVATE_KEY],
          },
          wallaby: {
            url: "https://wallaby.node.glif.io/rpc/v0",
            accounts: [PRIVATE_KEY],
          },
          optimism_goerli: {
            url: "https://goerli.optimism.io/",
            accounts: [PRIVATE_KEY],
          },
          arbitrum_goerli: {
            url: ARBITRUM_GOERLI,
            accounts: [PRIVATE_KEY],
          },
          fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            accounts: [PRIVATE_KEY],
          },
        },
      };
      return config;
    case "zksync":
      const zkSyncConfig = {
        solidity: { version: solidity_version },
        defaultNetwork: "zksync",
        networks: {
          zksync: {
            url: "https://zksync2-testnet.zksync.dev",
            ethNetwork: ETHEREUM_GOERLI,
            zksync: true,
          },
        },
        zksolc: {
          version: "1.2.2",
          compilerSource: "binary",
          settings: {
            optimizer: {
              enabled: true,
            },
            experimental: {},
          },
        },
      };
      return zkSyncConfig;
    default:
      break;
  }
}
