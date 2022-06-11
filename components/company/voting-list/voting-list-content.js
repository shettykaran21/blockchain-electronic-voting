import Loader from '../../ui/loader'
import VoterCard from './voter-card'

const VotingListContent = ({ loading, voters }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {loading && <Loader />}
      {!loading && voters.length === 0 && <p>No registered voters</p>}
      {!loading && voters.length > 0 && (
        <>
          {voters.map((v) => (
            <VoterCard key={v.name} voterDetails={v} />
          ))}
        </>
      )}
    </div>
  )
}

export default VotingListContent
