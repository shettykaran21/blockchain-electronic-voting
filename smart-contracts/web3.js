import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
  console.log('Web3: ', web3)
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/d56187ca3c624a199a1ef998b30a9cd4'
  )
  web3 = new Web3(provider)
  console.log('Web3 else: ', web3)
}

export default web3
