import CandidateForm from './candidate-form'
import CandidateListContent from './candidate-list-content'

const CandidateList = ({ electionDetails }) => {
  return (
    <div className="flex justify-between pr-16 p-8">
      <CandidateListContent />
      <CandidateForm electionDetails={electionDetails} />
    </div>
  )
}

export default CandidateList
