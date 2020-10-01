var TraceBackContract = artifacts.require("./TraceBackContract.sol");

module.exports = function(deployer) {
  deployer.deploy(TraceBackContract);
};
