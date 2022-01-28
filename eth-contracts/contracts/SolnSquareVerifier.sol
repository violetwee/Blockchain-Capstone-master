// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.11;

import "./verifier.sol";
import "./ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

// TODO define a solutions struct that can hold an index & an address

// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted

// TODO Create an event to emit when a solution is added

// TODO Create a function to add the solutions to the array and emit the event

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

contract SolnSquareVerifier is ERC721MintableComplete {
    Verifier private verifierContract = new Verifier();

    struct Solution {
        uint256 index;
        address owner;
        bool minted;
    }

    Solution[] private solutions;
    mapping(bytes32 => Solution) uniqueSolutions;
    uint256 public counter = 0;

    event SolutionAdded(uint256 index);

    constructor(string memory name, string memory symbol)
        public
        ERC721MintableComplete(name, symbol)
    {}

    function getCounter() public view returns (uint256) {
        return counter;
    }

    // input formats are based on data in proof.json
    // only add verified solutions
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(input[0], input[1]));

        Solution memory newSolution = Solution(counter, msg.sender, false);
        solutions.push(newSolution);
        uniqueSolutions[key] = newSolution;

        emit SolutionAdded(counter);
        counter = counter.add(1);
    }

    function mintNFT(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(input[0], input[1]));
        require(uniqueSolutions[key].minted == false, "Solution is not unique");

        bool verified = verifierContract.verifyTx(a, b, c, input);
        require(verified, "Solution cannot be verified");

        addSolution(a, b, c, input);
        super.mint(to, tokenId);
    }
}
