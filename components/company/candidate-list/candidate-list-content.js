import Loader from '../../ui/loader'
import CandidateCard from './candidate-card'

const CandidateListContent = ({ loading, candidates }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {loading && <Loader />}
      {!loading && candidates.length === 0 && <p>No registered candidates</p>}
      {!loading && candidates.length > 0 && (
        <>
          {candidates.map((c) => (
            <CandidateCard key={c.name} candidateDetails={c} />
          ))}
        </>
      )}
    </div>
  )
}

export default CandidateListContent
