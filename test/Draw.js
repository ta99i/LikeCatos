const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const data =
  "data:application/json;base64,eyJuYW1lIjogIkNhdG9zIDEiLCJkZXNjcmlwdGlvbiI6ICJDYXRvcyBpcyBBIGNvbW11bml0eS1kcml2ZW4gY29sbGVjdGlibGVzIHByb2plY3QgYmFzZWQgMTAwICUgb24gQmxvY2tjaGFpbiAsIEFsbCBuZnRzIGFyZSBjcmVhdGVkIG9uIHNtYXJ0IGNvbnRyYWN0cyBieSB1c2VycyBmb3IgdGhlaXIgY2F0cyAsIiwiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ0xUQXVOU0F4TlNBeE5TSWdjMmhoY0dVdGNtVnVaR1Z5YVc1blBTSmpjbWx6Y0VWa1oyVnpJaUIzYVdSMGFEMGlOVEF3SWo0OGNHRjBhQ0J6ZEhKdmEyVTlJaU13TURBd01EQWlJR1E5SWsweUlERm9NVTB4TWlBeGFERk5NU0F5YURGTk15QXlhREZOTVRFZ01tZ3hUVEV6SURKb01VMHhJRE5vTVUwMElETm9OMDB4TXlBemFERk5NU0EwYURGTk1UTWdOR2d4VFRFZ05XZ3hUVEV6SURWb01VMHlJRFpvTVUweE1pQTJhREZOTVNBM2FERk5NVE1nTjJneFRURWdPR2d4VFRFeklEaG9NVTB4SURsb01VMHhNeUE1YURGTk1TQXhNR2d4VFRFeklERXdhREZOTWlBeE1XZ3hUVEV5SURFeGFERk5NeUF4TW1neFRURXhJREV5YURGTk5DQXhNMmczSWk4K1BIQmhkR2dnYzNSeWIydGxQU0lqUmtaR1JrWkdJaUJrUFNKTk5pQTBhREZOT0NBMGFERk5OQ0ExYURGTk5pQTFhREZOT0NBMWFERk5NVEFnTldneFRUTWdObWd5VFRZZ05tZ3hUVGdnTm1neFRURXdJRFpvTWsweUlEZG9NVEZOTkNBNGFESk5PU0E0YURKTk1pQTVhRE5OTVRBZ09XZ3pUVFVnTVRCb01VMDVJREV3YURGTk15QXhNV2c1VFRRZ01USm9OeUl2UGp4d1lYUm9JSE4wY205clpUMGlJekl5TWpBek5DSWdaRDBpVFRJZ01tZ3hUVElnTTJneVRUSWdOR2d4VFRJZ05XZ3hJaUF2UGp4d1lYUm9JSE4wY205clpUMGlJelkyTXprek1TSWdaRDBpVFRFeUlESm9NVTB4TVNBemFESk5NVElnTkdneFRURXlJRFZvTVNJZ0x6NDhjR0YwYUNCemRISnZhMlU5SWlNME5USTRNMk1pSUdROUlrMHpJRFJvTVUweklEVm9NU0lnTHo0OEwzTjJaejQ9IiwiYXR0cmlidXRlcyI6W3sidHJhaXRfdHlwZSI6Ik5hbWUiLCJ2YWx1ZSI6Ikdob3N0In0seyJ0cmFpdF90eXBlIjoiQnJlZWQiLCJ2YWx1ZSI6IlNpYW1lc2UifSx7ImRpc3BsYXlfdHlwZSI6ImRhdGUiLCJ0cmFpdF90eXBlIjoiYmlydGhkYXkiLCJ2YWx1ZSI6IjE2NDUzMDM5OTIifV19";
const URI =
  "data:application/json;base64,eyJuYW1lIjogIkNhdG9zIDEiLCJkZXNjcmlwdGlvbiI6ICJDYXRvcyBpcyBBIGNvbW11bml0eS1kcml2ZW4gY29sbGVjdGlibGVzIHByb2plY3QgYmFzZWQgMTAwICUgb24gQmxvY2tjaGFpbiAsIEFsbCBuZnRzIGFyZSBjcmVhdGVkIG9uIHNtYXJ0IGNvbnRyYWN0cyBieSB1c2VycyBmb3IgdGhlaXIgY2F0cyAsIiwiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ0xUQXVOU0F4TlNBeE5TSWdjMmhoY0dVdGNtVnVaR1Z5YVc1blBTSmpjbWx6Y0VWa1oyVnpJaUIzYVdSMGFEMGlOVEF3SWo0OGNHRjBhQ0J6ZEhKdmEyVTlJaU13TURBd01EQWlJR1E5SWsweUlERm9NVTB4TWlBeGFERk5NU0F5YURGTk15QXlhREZOTVRFZ01tZ3hUVEV6SURKb01VMHhJRE5vTVUwMElETm9OMDB4TXlBemFERk5NU0EwYURGTk1UTWdOR2d4VFRFZ05XZ3hUVEV6SURWb01VMHlJRFpvTVUweE1pQTJhREZOTVNBM2FERk5NVE1nTjJneFRURWdPR2d4VFRFeklEaG9NVTB4SURsb01VMHhNeUE1YURGTk1TQXhNR2d4VFRFeklERXdhREZOTWlBeE1XZ3hUVEV5SURFeGFERk5NeUF4TW1neFRURXhJREV5YURGTk5DQXhNMmczSWk4K1BIQmhkR2dnYzNSeWIydGxQU0lqUmtaR1JrWkdJaUJrUFNKTk5pQTBhREZOT0NBMGFERk5OQ0ExYURGTk5pQTFhREZOT0NBMWFERk5NVEFnTldneFRUTWdObWd5VFRZZ05tZ3hUVGdnTm1neFRURXdJRFpvTWsweUlEZG9NVEZOTkNBNGFESk5PU0E0YURKTk1pQTVhRE5OTVRBZ09XZ3pUVFVnTVRCb01VMDVJREV3YURGTk15QXhNV2c1VFRRZ01USm9OeUl2UGp4d1lYUm9JSE4wY205clpUMGlJekl5TWpBek5DSWdaRDBpVFRJZ01tZ3hUVElnTTJneVRUSWdOR2d4VFRJZ05XZ3hJaUF2UGp4d1lYUm9JSE4wY205clpUMGlJelkyTXprek1TSWdaRDBpVFRFeUlESm9NVTB4TVNBemFESk5NVElnTkdneFRURXlJRFZvTVNJZ0x6NDhjR0YwYUNCemRISnZhMlU5SWlNME5USTRNMk1pSUdROUlrMHpJRFJvTVUweklEVm9NU0lnTHo0OEwzTjJaejQ9IiwiYXR0cmlidXRlcyI6W3sidHJhaXRfdHlwZSI6Ik5hbWUiLCJ2YWx1ZSI6Ikdob3N0In0seyJ0cmFpdF90eXBlIjoiQnJlZWQiLCJ2YWx1ZSI6IlNpYW1lc2UifSx7ImRpc3BsYXlfdHlwZSI6ImRhdGUiLCJ0cmFpdF90eXBlIjoiYmlydGhkYXkiLCJ2YWx1ZSI6IjE2NDUzMDM5OTIifV19";
describe("Draw", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const HEX = await ethers.getContractFactory("Hex");
    const hex = await HEX.deploy();
    const DRAW = await ethers.getContractFactory("Draw", {
      libraries: {
        Hex: await hex.address,
      },
    });
    const draw = await DRAW.deploy();

    return { draw, owner, otherAccount };
  }

  describe("generateNFT", function () {
    it("Should the data genrated equal our data", async function () {
      const { draw } = await loadFixture(deployOneYearLockFixture);
      expect(
        await draw.generateTokenURI(
          1,
          ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
          "Ghost",
          "Siamese",
          1645303992
        )
      ).to.equal(data);
    });
  });
  describe("generateTokenURI", function () {
    it("Should Fail if one of param not an Hex Color", async function () {
      const { draw } = await loadFixture(deployOneYearLockFixture);
      await expect(
        draw.generateTokenURI(
          1,
          ["#000000", "#FFFPFF", "#222034", "#663931", "#45283c"],
          "Ghost",
          "Siamese",
          1645303992
        )
      ).to.be.revertedWith("Parameter 1 not a HEX value");
    });
    it("Should the URI genrated equal our URI", async function () {
      const { draw } = await loadFixture(deployOneYearLockFixture);
      expect(
        await draw.generateTokenURI(
          1,
          ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
          "Ghost",
          "Siamese",
          1645303992
        )
      ).to.be.equal(URI);
    });
  });
});
