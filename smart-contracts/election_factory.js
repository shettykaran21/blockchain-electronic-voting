import web3 from './web3'
import ElectionFactory from './Build/ElectionFact.json'

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xC69C9648785829b8017Be4c28a62A77F6Fca559d'
)

export default instance
