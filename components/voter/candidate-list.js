import Loader from '../ui/loader'
import VoterCard from './voter-card'

const CandidateList = ({ loading, candidates, fetchCandidates }) => {
  return (
    <div className="pr-16 p-8">
      <div className="grid grid-cols-4 gap-4 mt-8">
        {loading && <Loader />}
        {!loading && candidates.length === 0 && <p>No registered candidates</p>}
        {!loading && candidates.length > 0 && (
          <>
            {candidates.map((c, i) => (
              <VoterCard
                key={i}
                candidateId={i}
                candidateDetails={c}
                fetchCandidates={fetchCandidates}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default CandidateList
