import CandidateForm from './candidate-form'
import CandidateListContent from './candidate-list-content'

const CandidateList = ({
  loading,
  electionDetails,
  candidates,
  fetchCandidates,
}) => {
  return (
    <div className="pr-16 p-8">
      <h1 className="font-heading font-semibold text-2xl">Candidate List</h1>
      <div className="flex justify-between items-start relative">
        <CandidateListContent candidates={candidates} loading={loading} />
        <CandidateForm
          electionDetails={electionDetails}
          fetchCandidates={fetchCandidates}
        />
      </div>
    </div>
  )
}

export default CandidateList
