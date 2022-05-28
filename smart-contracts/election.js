import web3 from './web3'
import Election from './Build/Election.json'

const election = (address) => {
  return new web3.eth.Contract(JSON.parse(Election.interface), address)
}
export default election
