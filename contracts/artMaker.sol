//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract ArtMaker is ERC721, Ownable{
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    uint8 public artRegistered = 6;

    constructor() ERC721("NFARMCow","NFC"){
        for (uint i = 0; i<artRegistered; i++){
            console.log("Mintando cuadro de arte numero %d", i);
            safeMint(msg.sender);
        }
    }

    function safeMint(address to) public onlyOwner{
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment(); 
    }

    function _baseURI() internal pure override(ERC721) returns(string memory){
        return "./images/"; //aqui iria el dns del server, la ruta de acceso donde esten alojados nuestros .json y lo que el profe fued diga jeje, no le se a esto ayuda.
    }

    function _burn(uint256 tokenId) internal override(ERC721){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns(string memory){
        return string (abi.encodePacked(super.tokenURI(tokenId),".json"));
    }


}