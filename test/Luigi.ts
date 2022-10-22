import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Luigi", () => {
  const deployFixture = async () => {
    const [owner, otherAccount] = await ethers.getSigners();

    const Luigi = await ethers.getContractFactory("Luigi");

    const initialSupply = ethers.utils.parseEther("5000");

    const luigi = await Luigi.deploy(initialSupply);

    return { luigi, initialSupply, owner, otherAccount };
  };

  describe("Deployment", () => {
    it("Should set totalSupply", async () => {
      const { luigi, initialSupply } = await loadFixture(deployFixture);

      expect(await luigi.totalSupply()).to.be.equal(initialSupply);
    });

    it("Should set owner balance", async () => {
      const { owner, luigi, initialSupply } = await loadFixture(deployFixture);

      expect(await luigi.balanceOf(owner.address)).to.be.equal(initialSupply);
    });
  });

  describe("Transfers", () => {
    it("Should transfer tokens", async () => {
      const { owner, otherAccount, luigi, initialSupply } = await loadFixture(
        deployFixture
      );

      const amount = ethers.utils.parseEther("5");

      await luigi.transfer(otherAccount.address, amount);

      expect(await luigi.balanceOf(otherAccount.address)).to.be.equal(amount);

      const ownerBalance = initialSupply.sub(amount);

      expect(await luigi.balanceOf(owner.address)).to.be.equal(ownerBalance);
    });

    it("Should emit event", async () => {
      const { luigi, otherAccount, owner } = await loadFixture(deployFixture);

      const amount = ethers.utils.parseEther("5");

      await luigi.transfer(otherAccount.address, amount);

      expect(await luigi.transfer(otherAccount.address, amount))
        .to.emit(luigi, "Transfer")
        .withArgs(owner.address, otherAccount.address, amount);
    });
  });
});
