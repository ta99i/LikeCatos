const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const zero_address = "0x0000000000000000000000000000000000000000";
const URI1 =
  "data:application/json;base64,eyJuYW1lIjogIkNhdG9zIDEiLCJkZXNjcmlwdGlvbiI6ICJDYXRvcyBpcyBBIGNvbW11bml0eS1kcml2ZW4gY29sbGVjdGlibGVzIHByb2plY3QgYmFzZWQgMTAwICUgb24gQmxvY2tjaGFpbiAsIEFsbCBuZnRzIGFyZSBjcmVhdGVkIG9uIHNtYXJ0IGNvbnRyYWN0cyBieSB1c2VycyBmb3IgdGhlaXIgY2F0cyAsIiwiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ0xUQXVOU0F4TlNBeE5TSWdjMmhoY0dVdGNtVnVaR1Z5YVc1blBTSmpjbWx6Y0VWa1oyVnpJaUIzYVdSMGFEMGlOVEF3SWo0OGNHRjBhQ0J6ZEhKdmEyVTlJaU13TURBd01EQWlJR1E5SWsweUlERm9NVTB4TWlBeGFERk5NU0F5YURGTk15QXlhREZOTVRFZ01tZ3hUVEV6SURKb01VMHhJRE5vTVUwMElETm9OMDB4TXlBemFERk5NU0EwYURGTk1UTWdOR2d4VFRFZ05XZ3hUVEV6SURWb01VMHlJRFpvTVUweE1pQTJhREZOTVNBM2FERk5NVE1nTjJneFRURWdPR2d4VFRFeklEaG9NVTB4SURsb01VMHhNeUE1YURGTk1TQXhNR2d4VFRFeklERXdhREZOTWlBeE1XZ3hUVEV5SURFeGFERk5NeUF4TW1neFRURXhJREV5YURGTk5DQXhNMmczSWk4K1BIQmhkR2dnYzNSeWIydGxQU0lqUmtaR1JrWkdJaUJrUFNKTk5pQTBhREZOT0NBMGFERk5OQ0ExYURGTk5pQTFhREZOT0NBMWFERk5NVEFnTldneFRUTWdObWd5VFRZZ05tZ3hUVGdnTm1neFRURXdJRFpvTWsweUlEZG9NVEZOTkNBNGFESk5PU0E0YURKTk1pQTVhRE5OTVRBZ09XZ3pUVFVnTVRCb01VMDVJREV3YURGTk15QXhNV2c1VFRRZ01USm9OeUl2UGp4d1lYUm9JSE4wY205clpUMGlJekl5TWpBek5DSWdaRDBpVFRJZ01tZ3hUVElnTTJneVRUSWdOR2d4VFRJZ05XZ3hJaUF2UGp4d1lYUm9JSE4wY205clpUMGlJelkyTXprek1TSWdaRDBpVFRFeUlESm9NVTB4TVNBemFESk5NVElnTkdneFRURXlJRFZvTVNJZ0x6NDhjR0YwYUNCemRISnZhMlU5SWlNME5USTRNMk1pSUdROUlrMHpJRFJvTVUweklEVm9NU0lnTHo0OEwzTjJaejQ9IiwiYXR0cmlidXRlcyI6W3sidHJhaXRfdHlwZSI6Ik5hbWUiLCJ2YWx1ZSI6Ikdob3N0In0seyJ0cmFpdF90eXBlIjoiQnJlZWQiLCJ2YWx1ZSI6IlNpYW1lc2UifSx7ImRpc3BsYXlfdHlwZSI6ImRhdGUiLCJ0cmFpdF90eXBlIjoiYmlydGhkYXkiLCJ2YWx1ZSI6IjE2NDUzMDM5OTIifV19";
describe("Catos", function () {
  async function HelloWorld() {
    const HEX = await ethers.getContractFactory("Hex");
    const hex = await HEX.deploy();

    const CATOS = await ethers.getContractFactory("Catos", {
      libraries: {
        Hex: await hex.address,
      },
    });
    const catos = await CATOS.deploy(
      "0xEab5F7eF9dE6981A8CbEa82Ee2B80f0522721997",
      10,
      50
    );
    return catos;
  }
  describe("Mint", () => {
    it("Should be number of NFT minted to be 0", async () => {
      const catos = await loadFixture(HelloWorld);
      const nftminted = await catos.nftMinted();
      expect(nftminted).to.equal(0);
    });
    it("Should reverted with No Enough Money", async () => {
      const catos = await loadFixture(HelloWorld);

      await expect(
        catos.mint(
          ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
          "Ghost",
          "Siamese",
          1645303992,
          { value: 49 }
        )
      ).to.be.revertedWith("No Enough Money");
    });
    it("Should be number of NFT minted to be 1 after minte", async () => {
      const catos = await loadFixture(HelloWorld);
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 123456 }
      );
      const nftminted = await catos.nftMinted();
      expect(nftminted).to.equal(1);
    });
    it("Should URI of first nft look like ower URI", async () => {
      const catos = await loadFixture(HelloWorld);
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 123456 }
      );
      const tokenURI = await catos.tokenURI(1);
      expect(tokenURI).to.equal(URI1);
    });
  });
  describe("Withdraw", () => {
    it("Donations earnings 90 %", async () => {
      const catos = await loadFixture(HelloWorld);
      const expected = 450000;
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 500000 }
      );
      await catos.withdraw();
      const balance = await ethers.provider.getBalance(
        "0xEab5F7eF9dE6981A8CbEa82Ee2B80f0522721997"
      );
      expect(balance).to.equal(expected);
    });
    it("Should owner earnings 10 %", async () => {
      const [owner, Account2] = await ethers.getSigners();
      const catos = await loadFixture(HelloWorld);
      const expected =
        BigInt(await ethers.provider.getBalance(owner.address)) + BigInt(50000);
      await catos
        .connect(Account2)
        .mint(
          ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
          "Ghost",
          "Siamese",
          1645303992,
          { value: 500000 }
        );
      await catos.connect(Account2).withdraw();
      const balance = await ethers.provider.getBalance(owner.address);
      expect(balance).to.equal(expected);
    });
  });
  describe("Donation ", () => {
    it("should not allow transfer to address 0", async () => {
      const catos = await loadFixture(HelloWorld);
      await expect(catos.setDonation(zero_address)).to.be.revertedWith(
        "Address cannot be zero"
      );
    });
    it("should not allow transfer if the caller not the owner", async () => {
      const [owner, Account2] = await ethers.getSigners();
      const catos = await loadFixture(HelloWorld);
      await expect(
        catos.connect(Account2).setDonation(Account2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should owner can transfer address", async () => {
      const [owner, Account2] = await ethers.getSigners();
      const catos = await loadFixture(HelloWorld);
      await catos.setDonation(Account2.address);

      expect(await catos._donationWallet()).to.equal(Account2.address);
    });
  });
  describe("Prix ", () => {
    it("should not allow change if the caller not the owner", async () => {
      const [owner, Account2] = await ethers.getSigners();
      const catos = await loadFixture(HelloWorld);
      await expect(
        catos.connect(Account2).setPrix(Account2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should owner can change prix", async () => {
      const [owner, Account2] = await ethers.getSigners();
      const catos = await loadFixture(HelloWorld);
      await catos.setPrix(100);

      expect(await catos._prix()).to.equal(100);
    });
  });
  describe("ERC original function", () => {
    it("Should Account 1 transfer token 1 to Account 3", async () => {
      const catos = await loadFixture(HelloWorld);
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 123456 }
      );
      const [Account1, Account2, Account3] = await ethers.getSigners();

      await catos.transferFrom(Account1.address, Account3.address, 1);
      const balance = await catos.balanceOf(Account1.address);
      const balance3 = await catos.balanceOf(Account3.address);
      expect(balance).to.equal(0);
      expect(balance3).to.equal(1);
    });
    it("Should Account 2 get approve from Account 1 for token 1", async () => {
      const catos = await loadFixture(HelloWorld);
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 123456 }
      );
      const [Account1, Account2] = await ethers.getSigners();
      await catos.approve(Account2.address, 1);
      const getApproved = await catos.getApproved(1);
      expect(getApproved).to.equal(Account2.address);
    });
    it("Should Account 2 transfer token 1 to Account 3 (Approve)", async () => {
      const catos = await loadFixture(HelloWorld);
      await catos.mint(
        ["#000000", "#FFFFFF", "#222034", "#663931", "#45283c"],
        "Ghost",
        "Siamese",
        1645303992,
        { value: 123456 }
      );
      const [Account1, Account2, Account3] = await ethers.getSigners();
      await catos.approve(Account2.address, 1);

      await catos
        .connect(Account2)
        .transferFrom(Account1.address, Account3.address, 1);
      const balance = await catos.balanceOf(Account1.address);
      const balance3 = await catos.balanceOf(Account3.address);
      expect(balance).to.equal(0);
      expect(balance3).to.equal(1);
    });
  });
});
