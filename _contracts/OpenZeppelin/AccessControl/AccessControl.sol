// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract AccessControlNFT is AccessControl, ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (address => bool) minter;
    mapping (address => uint256[]) public nfts;
    uint256 public nft_count;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    constructor(address[] memory _minters) ERC721 ('Sample NFT', 'NFT') {
        for(uint i = 0; i < _minters.length; i++) {
            _grantRole(MINTER_ROLE, _minters[i]);
            minter[_minters[i]] = true;
        }
        _tokenIds.increment();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl, ERC721) returns (bool) {}

    function mint() public {
        require(hasRole(MINTER_ROLE, msg.sender), 'AccessControlNFT: must have minter role to mint');
        _mint(msg.sender, _tokenIds.current());
        nfts[msg.sender].push(_tokenIds.current()); 
        _tokenIds.increment();
        nft_count++;
    }

    function leave() public {
        require(hasRole(MINTER_ROLE, msg.sender), "AccessControlNFT: You are not a minter");
        uint256[] memory nft_ids = nfts[msg.sender];
        require(nft_ids.length > 0, "AccessControlNFT: You didn't mint any NFTs");
        for(uint i = 0; i < nft_ids.length; i++) {
          console.log("NFT ID: %s", nft_ids[i]);
          if (ownerOf(nft_ids[i]) == msg.sender) _burn(nft_ids[i]);
        }
        nft_count -= nft_ids.length;
    }


}