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
- MetaMask v10.8.1
- Infura

# Contract Addresses & ABIs (Rinkeby)

## Verifier

- Contract Address: 0xB8F6d49970897C84D7B065717F3B3F3D44401b13
- Transaction Hash: 0x1ef9b82f8d727cb6993be33f06e573b09ec4ee90b5d46e0939805901aed7860e
- ABI: eth-contracts/build/contracts/Verifier.json

## SolnSquareVerifier

- Contract Address: 0x695b253D8212908B976e00fd958671b3d95565e1
- Transaction Hash: 0x4ea071aaa7386f37cd3934425728fc469820edf1ad2991e57d14e430639bfebf
- ABI: eth-contracts/build/contracts/SolnSquareVerifier.json

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

<img src="https://github.com/violetwee/Blockchain-Capstone-master/blob/main/images/test-cases.png" width="800px" height="auto"/>

# Deploy to Rinkeby

```sh
cd eth-contracts
truffle deploy --network rinkeby --reset
```

<img src="https://github.com/violetwee/Blockchain-Capstone-master/blob/main/images/deployment.png" width="800px" height="auto"/>

<img src="https://github.com/violetwee/Blockchain-Capstone-master/blob/main/images/deployment.png" width="800px" height="auto"/>

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

This will mint 5 NFTs to OpenSea Testnet.
Token ids 10 to 14.

You may access the NFT at
https://testnets.opensea.io/assets/. Append the SolnSquareVerifier Contract Address and TokenId to view a specific NFT.

- Eg. https://testnets.opensea.io/assets/0x695b253d8212908b976e00fd958671b3d95565e1/10

```sh
cd eth-contracts
node scripts/mint.js
```

# OpenSea

Marketplace Storefront: https://testnets.opensea.io/collection/remarket-v3

## Completed Transactions

Minting

- Token #10 / Transaction: 0xd235d9856e923d25c1356d51b8cf1f372dc3e67f94494ddbfe295c654764df21
- Token #11 / Transaction: 0x02e30ada88e4db6aa2b0cc2310ec2dd254686b19ce76082abf3070481bca28ee
- Token #12 / Transaction: 0x7f9cd93f2eb1597f0e56e63ef9c8426619ee7f08fbecd056f4f6c56268e05521
- Token #13 / Transaction: 0x440803f8fd12298114a7cc51efe5b8da4fe92826d139613f23f176a52bcc11f5
- Token #14 / Transaction: 0x6534223c45f39b06d81338431780048fba0ced32324c8973ece48278fc55eed7

  Transfers

- Token #10 / Transaction: 0x7534aebfb88b750c4453f50966d109f133a999cd29a0f360916d596eb727d0d0
- Token #11 / Transaction: 0x1344c00d1cacf6ae34858bafefcaf7ea5197635c8791370591b95ffa803d1e17
- Token #12 / Transaction: 0x95c40164c49ddcece36e9f0fb395900dda798c06450e8597e610df9ac2914cb8
- Token #13 / Transaction: 0x82c6a67193ba4945445feb4d5581d4af20938bab4d7e03f30dc6d5162b30d300
- Token #14 / Transaction: 0x5344685f767de57dafe7ff0562c7550e090be3621cdb3e42889bfe7f930bcfa4

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
