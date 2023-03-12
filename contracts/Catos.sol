// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Pet {
    function generateTokenURI(
        uint256 tokenId,
        string[] memory param,
        string memory name,
        uint256 birthday
    ) external pure returns (string memory);
}

contract Catos is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public nftMinted;
    address payable public _donationWallet;
    uint public _pOwner;
    uint public _prix;
    mapping(address => bool) public pets;

    constructor(
        address payable donationWallet,
        uint pOwner,
        uint prix
    ) ERC721("Catos", "CTS") {
        _donationWallet = donationWallet;
        _pOwner = pOwner;
        _prix = prix;
    }

    function addPet(address petContract) external onlyOwner {
        pets[petContract] = true;
    }

    function deletPet(address petContract) external onlyOwner {
        pets[petContract] = false;
    }

    function getPet(address petContract) public view returns (bool) {
        return (pets[petContract]);
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
        uint256 birthday,
        address petsContract
    ) external payable {
        require(msg.value >= _prix, "No Enough Money");
        require(pets[petsContract] == true, "No contract for this pet");
        nftMinted.increment();
        uint256 newItemId = nftMinted.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(
            newItemId,
            Pet(petsContract).generateTokenURI(newItemId, param, name, birthday)
        );
    }
}
