import VotingForm from './voting-form'

const VotingList = ({ electionName, electionDescription, votersList }) => {
  console.log(votersList)
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
