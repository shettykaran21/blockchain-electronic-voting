const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    test: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          'minute end cushion nature maximum lounge elite parent mad civil green seek',
          'https://rinkeby.infura.io/v3/d56187ca3c624a199a1ef998b30a9cd4'
        ),
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: '0.8.9',
    },
  },
}
