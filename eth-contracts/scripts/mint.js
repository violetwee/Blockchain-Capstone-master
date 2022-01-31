const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
let data = require("../../zokrates/code/square/proofs.json");

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;

let tokenId = 10;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

async function main() {
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY
  );

  const web3Instance = new web3(provider);

  let networkId = await web3Instance.eth.net.getId();

  let SolnSquareVerifier = require('../build/contracts/SolnSquareVerifier.json');
  let contractAddress = SolnSquareVerifier.networks[networkId].address;
  console.log('Contract address: ', contractAddress);

  let contract = new web3Instance.eth.Contract(SolnSquareVerifier.abi, contractAddress);
  for (let i = 0; i < data.length; i++) {
    let proof = data[i].proof;
    let { a, b, c } = proof;

    let result = await contract.methods
      .mintNFT(OWNER_ADDRESS, tokenId, a, b, c, data[i].inputs)
      .send({ from: OWNER_ADDRESS });

    console.log(`Minted token id: ${tokenId}. Transaction: ${result.transactionHash}`);
    tokenId += 1;
  }
}

main();