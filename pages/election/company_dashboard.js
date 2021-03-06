import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Election from '../../smart-contracts/election'
import api from '../../api'
import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import Dashboard from '../../components/company/dashboard'
import ElectionDetails from '../../components/election/election-details'

const CompanyDashboardPage = () => {
  const [votersList, setVotersList] = useState(null)
  const [numOfVoters, setNumOfVoters] = useState(0)
  const [numOfCandidates, setNumOfCandidates] = useState(0)
  const [electionName, setElectionName] = useState('')
  const [electionDescription, setElectionDescription] = useState('')
  const [candidateNames, setCandidateNames] = useState([])
  const [candidateVotes, setCandidateVotes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.post(
        '/voter',
        JSON.stringify({ election_address: Cookies.get('address') }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setVotersList(data.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const election = Election(Cookies.get('address'))

        const summary = await election.methods.getElectionDetails().call()
        const noOfVoters = await election.methods.getNumOfVoters().call()

        const noOfCandidates = await election.methods
          .getNumOfCandidates()
          .call()

        setNumOfVoters(noOfVoters)
        setNumOfCandidates(noOfCandidates)
        setElectionName(summary[0])
        setElectionDescription(summary[1])

        for (let i = 0; i < noOfCandidates; i++) {
          const candidate = await election.methods.getCandidate(i).call()
          setCandidateNames((prev) => [...prev, candidate[0]])
          setCandidateVotes((prev) => [...prev, candidate[3]])
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Company Dashboard</title>
      </Head>
      <DashboardLayout>
        <ElectionDetails
          electionName={electionName}
          electionDescription={electionDescription}
          endButton
        />
        <Dashboard
          candidateNames={candidateNames}
          candidateVotes={candidateVotes}
          votersList={votersList}
          numOfVoters={numOfVoters}
          numOfCandidates={numOfCandidates}
        />
      </DashboardLayout>
    </>
  )
}

export default CompanyDashboardPage
