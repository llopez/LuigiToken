import { ethers } from "hardhat";

async function main() {
  const Luigi = await ethers.getContractFactory("Luigi");

  const initialSupply = ethers.utils.parseEther("5000");

  const luigi = await Luigi.deploy(initialSupply);

  await luigi.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
