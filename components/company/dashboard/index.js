import Election from '../../../smart-contracts/election'
import Charts from './charts'

const Dashboard = ({ candidateNames, candidateVotes }) => {
  const endElection = async (event) => {
    let candidate = 0
    try {
      setLoading(true)
      const election = Election(Cookies.get('address'))
      candidate = await election.methods.winnerCandidate().call()
      cand = await election.methods.getCandidate(candidate).call()

      const params = {
        election_address: electionAddress,
        election_name: electionName,
        candidate_email: cand[4],
        winner_candidate: cand[0],
      }

      await api.post('/voter/resultMail', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Charts candidateNames={candidateNames} candidateVotes={candidateVotes} />
  )
}

export default Dashboard
