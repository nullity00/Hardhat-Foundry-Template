# Hardhat Foundry Super Kit

Hardhat - Foundry kit with constants & necessary packages for testing, deployment & verification with support for over 10 EVM Chains.

## How to Use

- Install the packages

```
npm install --global hardhat-shorthand
yarn install
forge install
```

- Run this after installing libraries via foundry

```
forge remappings > remappings.txt
```

## Transaction tracing

```
hh test test/test.js --trace
forge test -vvvv
```

## API Keys

- Get your API Keys from your preferred RPC Provider. Fill in the `.env` file.
- Edit the Contracts & the scripts file
- Specify the Network and the Solidity Version in `hardhat.config.ts` file.
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

