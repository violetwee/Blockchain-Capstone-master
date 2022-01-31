# Udacity Blockchain Capstone

This is the capstone project for Udacity's Blockchain Developer Nanodegree Course.

Here we use blockchain technology to create a decentralized house listing service.

In this project, we will mint our own tokens (ReMarket/REM) to represent a title to a property.
Before minting a token, we will verify that we own the property using zk-SNARKS (via Zokrates).
Once it is verified, we will mint the NFT and place it on the blockchain market place (OpenSea Testnet) for others to purchase.

# Requirements

- Ganache CLI v6.12.2 (ganache-core: 2.13.2)
- Truffle v5.4.23 (core: 5.4.23)
- Solidity v0.5.16 (solc-js)
- Node v15.2.0
- Web3.js v1.5.3
-MetaMask v10.8.1
- Infura

# Contract Addresses (Rinkeby)

## Verifier

- Contract Address: 0xB8F6d49970897C84D7B065717F3B3F3D44401b13
- Transaction Hash: 0x1ef9b82f8d727cb6993be33f06e573b09ec4ee90b5d46e0939805901aed7860e

## SolnSquareVerifier

- Contract Address: 0x695b253D8212908B976e00fd958671b3d95565e1
- Transaction Hash: 0x4ea071aaa7386f37cd3934425728fc469820edf1ad2991e57d14e430639bfebf

# Testing

Run ganache-cli:

```sh
ganache-cli -m "play biology off sister label jar round vanish witness spike rail dress" -a 50 -e 1000
```

Run truffle tests:

```sh
cd eth-contracts
truffle compile
truffle migrate --reset
truffle test
```

All 10 tests should pass.

# Deploy to Rinkeby

```sh
cd eth-contracts
truffle deploy --network rinkeby --reset
```

# Zokrates

We require the generated verfiier.sol to be in ABI v1, therefore we will use an older Zokrates version (v0.4.10).
- Zokrates v0.4.10: https://github.com/Zokrates/ZoKrates/releases/tag/0.4.10

On MacOSX, download and unzip zokrates-0.4.10-i686-apple-darwin.tar.gz.
The run the following from the directory:

```sh
zokrates compile -i <path to square.code>
zokrates setup
zokrates compute-witness -a 3 9
zokrates generate-proof
zokrates export-verifier
```

Zokrates should have generated a number of files in the directory.
Copy and paste the files to zokrates/code/square directory.

# Minting NFTs to OpenSea

This will mint 3 NFTs to OpenSea Testnet.
Token ids 10, 11 and 12.

You may access the NFT at https://testnets.opensea.io/assets/<SolnSquareVerifier Contract Address>/<TokenId>.
- Eg. https://testnets.opensea.io/assets/0x695b253d8212908b976e00fd958671b3d95565e1/10

```sh
cd eth-contracts
node scripts/mint.js
```

# OpenSea

Marketplace Storefront: https://testnets.opensea.io/collection/remarket-v3

## Completed Transactions

Minting

- Transaction: 0xd235d9856e923d25c1356d51b8cf1f372dc3e67f94494ddbfe295c654764df21
- Transaction: 0x02e30ada88e4db6aa2b0cc2310ec2dd254686b19ce76082abf3070481bca28ee
- Transaction: 0x7f9cd93f2eb1597f0e56e63ef9c8426619ee7f08fbecd056f4f6c56268e05521

Transfer

- Transaction: 0x7534aebfb88b750c4453f50966d109f133a999cd29a0f360916d596eb727d0d0

# Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
- [Infura](https://infura.io/)
- [OpenSea Testnet](https://testnets.opensea.io/)
- [Rinkeby Etherscan](https://rinkeby.etherscan.io/)
