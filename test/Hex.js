const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Hex", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const HEX = await ethers.getContractFactory("Hex");
    const hex = await HEX.deploy();

    return { hex, owner, otherAccount };
  }

  describe("Length", function () {
    it("Should return false if the input not equal to 7 or 4", async function () {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#1234")).to.equal(false);
    });
  });
  describe("#", function () {
    it("Should return false if the first input not a '#'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("0123456")).to.equal(false);
    });
  });
  describe("Hex Input", function () {
    it("Should return false if one of bytes big then F '#00000G'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#00000G")).to.equal(false);
    });
    it("Should return false if one of bytes big then F '#0000G0'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#0000G0")).to.equal(false);
    });
    it("Should return false if one of bytes big then F '#000G00'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#000G00")).to.equal(false);
    });
    it("Should return false if one of bytes big then F '#00G000'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#00G000")).to.equal(false);
    });
    it("Should return false if one of bytes big then F '#0G0000'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#0G0000")).to.equal(false);
    });
    it("Should return false if one of bytes big then F '#G00000'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#G00000")).to.equal(false);
    });
    it("Should return false if the Hex input not written correctly '#o@A0pK'", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#o@)0pK")).to.equal(false);
    });
    it("should return true with input '#000000", async () => {
      const { hex } = await loadFixture(deployOneYearLockFixture);
      expect(await hex.isHex("#000000")).to.equal(true);
    });
  });

  /*  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });*/
});
