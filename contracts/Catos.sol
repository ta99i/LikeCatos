// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Draw.sol";

contract Catos is ERC721URIStorage, Draw, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public nftMinted;
    address payable public _donationWallet;
    uint public _pOwner;
    uint public _prix;

    constructor(
        address payable donationWallet,
        uint pOwner,
        uint prix
    ) ERC721("Catos", "CTS") {
        _donationWallet = donationWallet;
        _pOwner = pOwner;
        _prix = prix;
    }

    function withdraw() public payable {
        uint256 forOwner = address(this).balance / _pOwner;
        (bool s, ) = payable(owner()).call{value: forOwner}("");
        require(s);
        (bool t, ) = _donationWallet.call{value: address(this).balance}("");
        require(t);
    }

    function setDonation(address payable donationWallet) public onlyOwner {
        require(donationWallet != address(0), "Address cannot be zero");
        _donationWallet = donationWallet;
    }

    function setPrix(uint newPrix) public onlyOwner {
        _prix = newPrix;
    }

    function mint(
        string[] memory param,
        string memory name,
        string memory breed,
        uint256 birthday
    ) external payable {
        require(msg.value >= _prix, "No Enough Money");
        nftMinted.increment();
        uint256 newItemId = nftMinted.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(
            newItemId,
            generateTokenURI(newItemId, param, name, breed, birthday)
        );
    }
}
