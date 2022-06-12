import Loader from '../ui/loader'
import VoterCard from './voter-card'

const CandidateList = ({ loading, candidates }) => {
  return (
    <div className="pr-16 p-8">
      <div className="grid grid-cols-4 gap-4 mt-8">
        {loading && <Loader />}
        {!loading && candidates.length === 0 && <p>No registered candidates</p>}
        {!loading && candidates.length > 0 && (
          <>
            {candidates.map((c) => (
              <VoterCard key={c.name} candidateDetails={c} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default CandidateList
