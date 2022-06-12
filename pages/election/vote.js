import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Election from '../../smart-contracts/election'
import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import CandidateList from '../../components/voter/candidate-list'

const VotingPage = () => {
  const [electionAddress, setElectionAddress] = useState(Cookies.get('address'))
  const [electionDetails, setElectionDetails] = useState({})
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setElectionAddress(Cookies.get('address'))
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)

    const election = await Election(electionAddress)

    const summary = await election.methods.getElectionDetails().call()

    setElectionDetails({
      electionName: summary[0],
      electionDescription: summary[1],
    })

    const noOfCandidates = await election.methods.getNumOfCandidates().call()
    let candidates = []
    for (let i = 0; i < noOfCandidates; i++) {
      candidates.push(await election.methods.getCandidate(i).call())
    }

    const candidatesTransformed = candidates.map((c) => {
      return {
        name: c[0],
        description: c[1],
        imageUrl: `https://dweb.link/ipfs/${c[2]}`,
        voteCount: c[3],
      }
    })

    setCandidates(candidatesTransformed)

    setLoading(false)
  }, [electionAddress])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <DashboardLayout>
      {electionDetails && (
        <CandidateList
          loading={loading}
          candidates={candidates}
          fetchCandidates={fetchData}
        />
      )}
    </DashboardLayout>
  )
}

export default VotingPage
