var NoteContract = artifacts.require("./NoteContract.sol");

module.exports = function(deployer) {
  deployer.deploy(NoteContract);
};
