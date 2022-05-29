import VotingForm from './voting-form'

const VotingList = ({ electionName, electionDescription }) => {
  return (
    <div>
      <VotingForm
        electionName={electionName}
        electionDescription={electionDescription}
      />
    </div>
  )
}

export default VotingList
