import { useEffect, useState } from 'react'
import Head from 'next/head'
import Cookies from 'js-cookie'

import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import CandidateList from '../../components/company/candidate-list'
import Election from '../../smart-contracts/election'

const CandidateListPage = () => {
  const [electionAddress, setElectionAddress] = useState(Cookies.get('address'))
  const [electionDetails, setElectionDetails] = useState({})
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    setElectionAddress(Cookies.get('address'))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
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
    }

    fetchData()
  }, [electionAddress])

  return (
    <>
      <Head>
        <title>BlockVote | Candidate List</title>
      </Head>
      <DashboardLayout>
        {electionDetails && (
          <CandidateList
            electionDetails={electionDetails}
            candidates={candidates}
          />
        )}
      </DashboardLayout>
    </>
  )
}

export default CandidateListPage
