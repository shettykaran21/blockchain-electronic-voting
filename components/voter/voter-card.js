/* eslint-disable @next/next/no-img-element */
import { MdOutlineHowToVote } from 'react-icons/md'

import Button from '../ui/button'

const VoterCard = ({ candidateDetails }) => {
  const { name, description, imageUrl, voteCount } = candidateDetails

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
            <button className="rounded-md inline-block py-2 px-4 text-sm text-white justify-center items-center bg-blue-primary">
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterCard
