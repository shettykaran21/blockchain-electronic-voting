import { MdOutlineHowToVote } from 'react-icons/md'

const ElectionDetails = ({ electionName, electionDescription }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-heading font-bold text-xl flex items-center gap-2">
        <MdOutlineHowToVote />
        {electionName}
      </h1>
      <h2 className="font-heading">{electionDescription}</h2>
    </div>
  )
}

export default ElectionDetails
