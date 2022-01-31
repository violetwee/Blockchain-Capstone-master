// migrating the appropriate contracts
let SquareVerifier = artifacts.require("./verifier.sol");
let SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function (deployer) {
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier, "ReMarket", "REM", SquareVerifier.address);
};
