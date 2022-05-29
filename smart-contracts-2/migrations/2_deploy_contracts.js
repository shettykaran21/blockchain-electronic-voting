const ElectionFactory = artifacts.require('ElectionFactory')
const Election = artifacts.require('Election')

module.exports = async (deployer) => {
  await deployer.deploy(ElectionFactory)

  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]

  deployer.deploy(Election, owner, '', '')
}
