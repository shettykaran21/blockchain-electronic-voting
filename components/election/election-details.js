import { useState } from 'react'
import { MdOutlineHowToVote } from 'react-icons/md'
import Cookies from 'js-cookie'

import useStickyState from '../../hooks/useStickyState'
import Election from '../../smart-contracts/election'

const ElectionDetails = ({ electionName, electionDescription, endButton }) => {
  const [isButtonVisible, setIsButtonVisible] = useStickyState(
    true,
    'endButton'
  )
  const [loading, setLoading] = useState(false)

  const endElection = async () => {
    try {
      setLoading(true)

      const election = Election(Cookies.get('address'))
      console.log(Cookies.get('address'))
      const winningCandidateId = await election.methods.winnerCandidate().call()
      console.log(winningCandidateId)
      const winningCandidateDetails = await election.methods
        .getCandidate(winningCandidateId)
        .call()

      const params = {
        election_address: Cookies.get('address'),
        election_name: electionName,
        candidate_email: winningCandidateDetails[4],
        winner_candidate: winningCandidateDetails[0],
      }

      // await api.post('/voter/resultMail', params, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })

      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-heading font-bold text-xl flex items-center gap-2">
        <MdOutlineHowToVote />
        {electionName}
      </h1>
      <h2 className="font-heading">{electionDescription}</h2>
      {endButton && isButtonVisible && (
        <div className="absolute right-10">
          <button
            className="rounded-xl py-2 px-4 text-md text-white flex justify-center items-center border-blue-primary border-2"
            onClick={endElection}
          >
            End Election
          </button>
        </div>
      )}
    </div>
  )
}

export default ElectionDetails
