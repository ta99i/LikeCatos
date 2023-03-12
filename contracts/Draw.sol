// SPDX-License-Identifier: MIT
//Breed = Homeless
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./Hex.sol";

contract Draw {
    using Strings for uint256;

    function generateNFT(
        string[] memory param
    ) internal pure returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 15 15" shape-rendering="crispEdges" width="500">',
            '<path stroke="',
            param[0],
            '" d="M2 1h1M12 1h1M1 2h1M3 2h1M11 2h1M13 2h1M1 3h1M4 3h7M13 3h1M1 4h1M13 4h1M1 5h1M13 5h1M2 6h1M12 6h1M1 7h1M13 7h1M1 8h1M13 8h1M1 9h1M13 9h1M1 10h1M13 10h1M2 11h1M12 11h1M3 12h1M11 12h1M4 13h7"/>',
            '<path stroke="',
            param[1],
            '" d="M6 4h1M8 4h1M4 5h1M6 5h1M8 5h1M10 5h1M3 6h2M6 6h1M8 6h1M10 6h2M2 7h11M4 8h2M9 8h2M2 9h3M10 9h3M5 10h1M9 10h1M3 11h9M4 12h7"/>',
            '<path stroke="',
            param[2],
            '" d="M2 2h1M2 3h2M2 4h1M2 5h1" />',
            '<path stroke="',
            param[3],
            '" d="M12 2h1M11 3h2M12 4h1M12 5h1" />',
            '<path stroke="',
            param[4],
            '" d="M3 4h1M3 5h1" />',
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function generateTokenURI(
        uint256 tokenId,
        string[] memory param,
        string memory name,
        uint256 birthday
    ) external pure returns (string memory) {
        bool _hex = true;
        uint i;
        for (i = 0; i < param.length; i++) {
            if (!Hex.isHex(param[i])) {
                _hex = false;
                break;
            }
        }
        require(
            _hex,
            string.concat("Parameter ", i.toString(), " not a HEX value")
        );
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Catos ',
            tokenId.toString(),
            '",',
            '"description": "Catos is A community-driven collectibles project based 100 % on Blockchain , All nfts are created on smart contracts by users for their cats ,",',
            '"image": "',
            generateNFT(param),
            '",',
            '"attributes":',
            "[",
            "{",
            '"trait_type":"Name",',
            '"value":"',
            name,
            '"'
            "},",
            "{",
            '"trait_type":"Breed",',
            '"value":"Homeless"'
            "},",
            "{",
            '"display_type":"date",',
            '"trait_type":"birthday",',
            '"value":"',
            birthday.toString(),
            '"'
            "}",
            "]",
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }
}
