// https://docs.chain.link/vrf/v2/subscription/supported-networks/#polygon-matic-mainnet

const LINK_TOKEN = "0xb0897686c545045aFc77CF20eC7A532E3120E0F1";
const VRF_COORDINATOR = "0xAE975071Be8F8eE67addBC1A82488F1C24858067";
const KEY_HASH_200GWEI =
  "0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93";
const KEY_HASH_500GWEI =
  "0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd";
const KEY_HASH_1000GWEI =
  "0xd729dc84e21ae57ffb6be0053bf2b0668aa2aaf300a2a7b2ddf7dc0bb6e875a8";

// Polygon Mainnet DAI Address
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

// Random user's address that happens to have a lot of DAI on Polygon Mainnet
const DAI_WHALE = "0xdfD74E3752c187c4BA899756238C76cbEEfa954B";

// Mainnet Pool contract address
// Address of the PoolAddressProvider:
// you can find it here: https://docs.aave.com/developers/deployed-contracts/v3-mainnet/polygon
const POOL_ADDRESS_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb";


module.exports = {
  DAI,
  DAI_WHALE,
  POOL_ADDRESS_PROVIDER,
  LINK_TOKEN,
  VRF_COORDINATOR,
  KEY_HASH_200GWEI,
  KEY_HASH_500GWEI,
  KEY_HASH_1000GWEI,
};
