// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ActionTrigger {
    address public nftAddress;
    address public owner;

    constructor(address _nftAddress) {
        nftAddress = _nftAddress;
        owner = msg.sender;
    }

    function triggerAction(address to) public {
        require(msg.sender == owner, "Only owner can trigger this action");
        IERC721 nft = IERC721(nftAddress);
        nft.transferFrom(owner, to, 1);
    }
}
