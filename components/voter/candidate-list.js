import { useState } from 'react'

import Loader from '../ui/loader'
import VoterCard from './voter-card'
import Alert from '../ui/alert'

const CandidateList = ({ loading, candidates, fetchCandidates }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  return (
    <>
      {isAlertOpen && <Alert>{alertMsg}</Alert>}
      {isErrorAlertOpen && <Alert isError>{alertMsg}</Alert>}
      <div className="pr-16 p-8">
        <div className="grid grid-cols-4 gap-4 mt-8">
          {loading && <Loader />}
          {!loading && candidates.length === 0 && (
            <p>No registered candidates</p>
          )}
          {!loading && candidates.length > 0 && (
            <>
              {candidates.map((c, i) => (
                <VoterCard
                  key={i}
                  candidateId={i}
                  candidateDetails={c}
                  fetchCandidates={fetchCandidates}
                  setAlertMsg={setAlertMsg}
                  setIsAlertOpen={setIsAlertOpen}
                  setIsErrorAlertOpen={setIsErrorAlertOpen}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CandidateList
