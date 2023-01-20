# Hardhat Foundry Super Kit

Hardhat kit with constants & necessary packages for testing, deployment & verification with support for over 10 EVM Chains.

## How to Use

- Install the packages

```
yarn
```

#### Deploying on networks other than ZK Sync

- Get your API Keys from your preferred RPC Provider. Fill in the `.env` file.
- Edit the Contracts & the scripts file
- Specify the Network and the Solidity Version in `hardhat.config.ts` file.

```
hh compile
hh deploy scripts/deploy.ts
```

#### Deploying on ZK Sync

- Edit the Contracts & the Deploy folder
- In `hardhat.config.ts` file, uncomment the ZKSync imports and change the exports to `module.exports = getConfig("zksync", "0.8.4");`.

```
hh compile
hh deploy-zksync
```

## Network Support

```
Mumbai
Goerli
Sepolia
Polygon ZKEVM - Mango
Filecoin - Wallaby
Filecoin - Hyperspace
Optimism - goerli
Arbitrum - goerli
Fuji
ZKSync v2- Alpha
Polygon Mainnet
Ethereum Mainnet
```

## Package Info

#### Contract Libraries

```
@openzeppelin/contracts @chainlink/contracts @aave/core-v3
```

### Deploying Proxy Contracts
```
@openzeppelin/hardhat-upgrades
```

#### Cryptographic Helper Libraries

```
keccak256 merkletreejs
```

#### Flashbot Libraries

```
@flashbots/ethers-provider-bundle
```

#### Filecoin Libraries
```
@glif/filecoin-address @zondax/filecoin-solidity @zondax/filecoin-solidity-mock-apis
```

#### ZKSync Libraries

```
zksync-web3
@matterlabs/hardhat-zksync-solc
@matterlabs/hardhat-zksync-deploy
@matterlabs/hardhat-zksync-chai-matchers
```

#### Testing

```
@nomicfoundation/hardhat-chai-matchers
mocha
chai
@types/chai
@types/mocha
```

#### Verification

```
@nomiclabs/hardhat-etherscan
```

#### Essentials Packages

```
@nomicfoundation/hardhat-toolbox
@nomicfoundation/hardhat-network-helpers
@nomiclabs/hardhat-ethers
hardhat-gas-reporter
solidity-coverage
@typechain/hardhat
typechain
@typechain/ethers-v5
@ethersproject/abi
@ethersproject/providers
hardhat-shorthand
```

#### Typescript Support

```
ts-node
typescript
```
