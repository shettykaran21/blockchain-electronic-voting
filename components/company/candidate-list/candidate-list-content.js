import CandidateCard from './candidate-card'

const CandidateListContent = ({ candidates }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {candidates.map((c) => (
          <CandidateCard key={c.name} candidateDetails={c} />
        ))}
      </div>
    </div>
  )
}

export default CandidateListContent
