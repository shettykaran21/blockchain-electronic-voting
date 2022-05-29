const ElectionFactory = artifacts.require('ElectionFactory')

const utils = require('./utils')

const { assertVMException } = utils

contract('election', () => {
  it('Create an election', async () => {
    const electionFactory = await ElectionFactory.deployed()

    try {
      const tx = await electionFactory.createElection(
        'company@testing.com',
        'election-name',
        'Testing election contract'
      )
      assert.isOk(tx)
    } catch (err) {
      assertVMException(err)
    }
  })
})
