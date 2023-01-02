require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

// Un comment when using ZK Sync
// require("@matterlabs/hardhat-zksync-deploy");
// require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const POLYGON_MAINNET = process.env.POLYGON_MAINNET;
const POLYGON_MUMBAI = process.env.POLYGON_MUMBAI;

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const ETHEREUM_MAINNET = process.env.ETHEREUM_MAINNET;
const ETHEREUM_GOERLI = process.env.ETHEREUM_GOERLI;
const ETHEREUM_SEPOLIA = process.env.ETHEREUM_SEPOLIA;

const ARBITRUM_GOERLI = process.env.ARBITRUM_GOERLI;
const OPTIMISM_GOERLI = process.env.OPTIMISM_GOERLI;

const AVALANCHE_FUJI = process.env.AVALANCHE_FUJI;

module.exports = getConfig("hardhat", "0.8.4");

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
    case "polygon":
    case "mainnet":
    case "hardhat":
      const config = {
        solidity: { version: solidity_version },
        defaultNetwork: network,
        etherscan: {
          apiKey: {
            [network]:
              network == "mumbai" || network == "polygon"
                ? POLYGONSCAN_API_KEY
                : ETHERSCAN_API_KEY,
          },
        },
        networks: {
          mumbai: {
            url: POLYGON_MUMBAI || "https://matic-mumbai.chainstacklabs.com",
            accounts: [PRIVATE_KEY],
          },
          goerli: {
            url: ETHEREUM_GOERLI || "https://rpc.ankr.com/eth_goerli",
            accounts: [PRIVATE_KEY],
          },
          sepolia: {
            url: ETHEREUM_SEPOLIA || "https://rpc.sepolia.org",
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
            url: OPTIMISM_GOERLI || "https://goerli.optimism.io/",
            accounts: [PRIVATE_KEY],
          },
          arbitrum_goerli: {
            url: ARBITRUM_GOERLI || "https://goerli-rollup.arbitrum.io/rpc",
            accounts: [PRIVATE_KEY],
          },
          fuji: {
            url: AVALANCHE_FUJI || "https://api.avax-test.network/ext/bc/C/rpc",
            accounts: [PRIVATE_KEY],
          },
          mainnet: {
            url: ETHEREUM_MAINNET || "https://rpc.ankr.com/eth",
            accounts: [PRIVATE_KEY],
          },
          polygon: {
            url: POLYGON_MAINNET || "https://polygon-bor.publicnode.com",
            accounts: [PRIVATE_KEY],
          },
          hardhat: {

          }
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
            ethNetwork: ETHEREUM_GOERLI || "https://rpc.ankr.com/eth_goerli",
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
