// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Hex {
    function isHex(string memory input) public pure returns (bool) {
        bytes memory inputs = bytes(input);
        if ((inputs.length != 7) && (inputs.length != 4)) return false;
        if (inputs[0] != 0x23) return false;
        for (uint i = 1; i < inputs.length; i++) {
            if (
                (inputs[i] < 0x30 || inputs[i] > 0x39) &&
                (inputs[i] < 0x41 || inputs[i] > 0x46) &&
                (inputs[i] < 0x61 || inputs[i] > 0x66)
            ) return false;
        }
        return true;
    }
}
