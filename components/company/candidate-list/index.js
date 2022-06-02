import React from 'react'
import CandidateForm from './candidate-form'

const CandidateList = ({ electionDetails }) => {
  return (
    <div>
      <CandidateForm electionDetails={electionDetails} />
    </div>
  )
}

export default CandidateList
