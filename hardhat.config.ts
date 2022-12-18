require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
const QUICKNODE_POLYGON_MUMBAI_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ALCHEMY_POLYGON_MAINNET_API_KEY =
  process.env.ALCHEMY_POLYGON_MAINNET_API_KEY;
const ALCHEMY_ETHEREUM_MAINNET_API_KEY =
  process.env.ALCHEMY_ETHEREUM_MAINNET_API_KEY;
const ALCHEMY_ETHEREUM_GOERLI_API_KEY =
  process.env.ALCHEMY_ETHEREUM_GOERLI_API_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: ALCHEMY_ETHEREUM_GOERLI_API_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
};
