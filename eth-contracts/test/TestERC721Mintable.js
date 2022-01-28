var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const name = "ReMarket";
    const symbol = "REM";

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new(name, symbol, { from: account_one });

            // TODO: mint multiple tokens
            // mint 5 tokens for account_one
            for (let tokenId = 1; tokenId <= 5; tokenId++) {
                await this.contract.mint(account_one, tokenId);
            }
            // mint another 5 tokens for account_two
            for (let tokenId = 6; tokenId <= 10; tokenId++) {
                await this.contract.mint(account_two, tokenId);
            }
        })

        it('should return total supply', async function () {
            let supply = await this.contract.totalSupply();
            assert.equal(supply, 10, 'should have 10 tokens');
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account_one);
            assert.equal(balance, 5, 'should have 5 tokens');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenId = 1;
            let uri = await this.contract.tokenURI(tokenId);
            assert.equal(uri, `https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/${tokenId}`);
        })

        it('should transfer token from one owner to another', async function () {
            let tokenId = 3;
            await this.contract.transferFrom(account_one, account_two, tokenId);
            let owner = await this.contract.ownerOf(tokenId);
            assert.equal(owner, account_two, "owner should be account_two")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new(name, symbol, { from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let tokenId = 11;
            let success = false;

            try {
                await this.contract.mint(account_two, tokenId, { from: account_two });
                success = true;
            }
            catch (error) {
                success = false;
            }
            assert.equal(success, false, 'should not be able to mint')
        })

        it('should return contract owner', async function () {
            let contractOwner = await this.contract._owner.call();
            assert.equal(contractOwner, account_one, "contract owner should be account_one");
        })
    });
})