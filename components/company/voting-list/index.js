import VotingForm from './voting-form'
import VotingListContent from './voting-list-content'

const VotingList = ({
  loading,
  electionName,
  electionDescription,
  voters,
  fetchVoters,
}) => {
  return (
    <div className="pr-16 p-8">
      <h1 className="font-heading font-semibold text-2xl">Voter List</h1>
      <div className="flex justify-between items-start relative">
        <VotingListContent voters={voters} loading={loading} />
        <VotingForm
          electionName={electionName}
          electionDescription={electionDescription}
          fetchVoters={fetchVoters}
        />
      </div>
    </div>
  )
}

export default VotingList
