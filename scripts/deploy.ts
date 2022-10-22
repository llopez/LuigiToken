import { ethers } from "hardhat";

async function main() {
  const Luigi = await ethers.getContractFactory("Luigi");

  const initialSupply = ethers.utils.parseEther("5000");

  const luigi = await Luigi.deploy(initialSupply);

  const { address } = await luigi.deployed();

  console.log("Contract deployed to: ", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
