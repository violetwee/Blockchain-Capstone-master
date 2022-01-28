// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const assert = require('assert');
let data = require("../../zokrates/code/square/proof.json")

// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
let solnSquareVerifier = artifacts.require("../contracts/SolnSquareVerifier.sol")

contract("TestSolnSquareVerifier", async (accounts) => {
  before('setup contract', async () => {
    this.solnSquareVerifier = await solnSquareVerifier.new("ReMarket", "REM", { from: accounts[0] });
  })

  describe("Test solution square verifier", () => {
    it("can add a new solution", async () => {
      let { a, b, c } = data.proof;

      await this.solnSquareVerifier.addSolution(a, b, c, data.inputs, { from: accounts[0] });
      let counter = await this.solnSquareVerifier.getCounter();
      assert.equal(counter, 1, "should be able add a new solution")
    })

    // Test verification with incorrect proof
    it("can mint a new NFT based on a new solution", async () => {
      let { a, b, c } = data.proof;
      let counter = await this.solnSquareVerifier.getCounter();

      await this.solnSquareVerifier.mintNFT(accounts[0], counter++, a, b, c, data.inputs);
      let balance = await this.solnSquareVerifier.balanceOf(accounts[0]);
      assert.equal(balance, 1, "should be able to mint a new NFT based on a solution")
    })
  })
})


