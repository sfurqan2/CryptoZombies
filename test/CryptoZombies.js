const CryptoZombies = artifacts.require("CryptoZombies");
const utils = require("./helpers/utils");
const time = require("./helpers/time");

// Meaning full testing instead of assertions
var expect = require("chai").expect;

// Zombie names
const zombieNames = ["Zombie 1", "Zombie 2"];

contract("CryptoZombies", (accounts) => {
  let [alice, bob] = accounts;
  let contractInstance;
  
  // Instantiating contract
  // Before each hook runs before every test
  beforeEach(async () => {
    contractInstance = await CryptoZombies.new();
  });

  // Test to comfirm zombie creation
  it("should be able to create a new zombie", async () => {
    const result = await contractInstance.createRandomZombie(zombieNames[0], {
      from: alice,
    });
    expect(result.receipt.status).to.equal(true);
    expect(result.logs[0].args.name).to.equal(zombieNames[0]);
  });

  // Test to not allow more than two zombies for one user

  it("should not allow two zombies", async () => {
    await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
    await utils.shouldThrow(
      contractInstance.createRandomZombie(zombieNames[1], { from: alice })
    );
  });

  // Scenario based test case
  context("with the single-step transfer scenario", async () => {
    it("should transfer a zombie", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
  });

  context("with the two-step transfer scenario", async () => {
    it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, { from: bob });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
    it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
  });
  it("zombies should be able to attack another zombie", async () => {
    let result;
    result = await contractInstance.createRandomZombie(zombieNames[0], {
      from: alice,
    });
    const firstZombieId = result.logs[0].args.zombieId.toNumber();
    result = await contractInstance.createRandomZombie(zombieNames[1], {
      from: bob,
    });
    const secondZombieId = result.logs[0].args.zombieId.toNumber();
    await time.increase(time.duration.days(1));
    await contractInstance.attack(firstZombieId, secondZombieId, {
      from: alice,
    });
    expect(result.receipt.status).to.equal(true);
  });
});
