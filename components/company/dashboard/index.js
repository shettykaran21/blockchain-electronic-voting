import Charts from './charts'

const Dashboard = ({
  candidateNames,
  candidateVotes,
  votersList,
  numOfVoters,
  numOfCandidates,
}) => {
  return (
    <Charts
      candidateNames={candidateNames}
      candidateVotes={candidateVotes}
      votersList={votersList}
      numOfVoters={numOfVoters}
      numOfCandidates={numOfCandidates}
    />
  )
}

export default Dashboard
