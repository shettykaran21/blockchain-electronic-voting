/* eslint-disable @next/next/no-img-element */
import { MdOutlineHowToVote } from 'react-icons/md'
import Cookies from 'js-cookie'

import Election from '../../smart-contracts/election'
import web3 from '../../smart-contracts/web3'
import Spinner from '../ui/spinner'
import { useState } from 'react'

const VoterCard = ({
  candidateDetails,
  candidateId,
  fetchCandidates,
  setAlertMsg,
  setIsAlertOpen,
  setIsErrorAlertOpen,
}) => {
  const [loading, setLoading] = useState(false)

  const { name, description, imageUrl, voteCount } = candidateDetails

  const vote = async (event) => {
    setLoading(true)
    const e = Number(parseInt(event.target.id))

    const accounts = await web3.eth.getAccounts()
    const address = Cookies.get('address')
    const election = Election(address)

    try {
      await election.methods
        .vote(e, Cookies.get('voter_email'))
        .send({ from: accounts[0] })

      fetchCandidates()
      setIsAlertOpen(true)
      setTimeout(() => {
        setIsAlertOpen(false)
      }, 5000)
      setAlertMsg('Voted successfully')
    } catch (err) {
      setIsErrorAlertOpen(true)
      setTimeout(() => {
        setIsErrorAlertOpen(false)
      }, 5000)

      if (err.code === 4001) {
        setAlertMsg(err.message)
      } else {
        setAlertMsg('Cannot vote more than once 😢')
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-[16rem]">
        <div className="h-[200px] overflow-hidden">
          <img
            className="rounded-t-lg object-cover"
            src={imageUrl}
            alt="Candidate"
            width={256}
            height={150}
          />
        </div>
        <div className="p-6 pb-0">
          <h5 className="text-gray-900 text-l font-medium mb-2">{name}</h5>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <div className="border-solid border-b-2 border-gray-300"></div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-700 text-sm flex items-center gap-2">
              <MdOutlineHowToVote />
              {voteCount}
            </p>
            <button
              className="rounded-md inline-block w-16 h-8 text-sm text-white justify-center items-center bg-gradient-to-br from-blue-gradient-1 to-blue-gradient-2 relative"
              id={candidateId}
              onClick={vote}
            >
              {loading ? <Spinner /> : 'Vote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterCard
