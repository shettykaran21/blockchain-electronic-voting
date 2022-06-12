/* eslint-disable @next/next/no-img-element */
import { MdOutlineHowToVote } from 'react-icons/md'

const CandidateCard = ({ candidateDetails }) => {
  const { name, description, imageUrl, voteCount } = candidateDetails

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-[16rem]">
        <div className="h-[120px] overflow-hidden">
          <img
            className="rounded-t-lg object-cover object-center"
            src={imageUrl}
            alt="Candidate"
            width={256}
            height={120}
          />
        </div>
        <div className="p-6 pb-0">
          <h5 className="text-gray-900 text-l font-medium mb-2">{name}</h5>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <div className="border-solid border-b-2 border-gray-300 mb-4"></div>
          <p className="text-gray-700 text-sm mb-4 flex items-center gap-2">
            <MdOutlineHowToVote />
            {voteCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
