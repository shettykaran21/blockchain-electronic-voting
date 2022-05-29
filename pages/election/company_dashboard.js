import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Election from '../../smart-contracts/election'
import api from '../../api'
import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import Dashboard from '../../components/company/dashboard'

const CompanyDashboardPage = () => {
  const [votersList, setVotersList] = useState(null)
  const [numOfVoters, setNumOfVoters] = useState(0)
  const [numOfCandidates, setNumOfCandidates] = useState(0)
  const [electionName, setElectionName] = useState('')
  const [electionDescription, setElectionDescription] = useState('')

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

        console.log(summary)

        for (let i = 0; i < noOfCandidates; i++) {
          const candidate = await election.methods.getCandidate(i).call()
          graphEmail.push(candidate[0])
          graphVotes.push(candidate[3])
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
        <Dashboard />
      </DashboardLayout>
    </>
  )
}

export default CompanyDashboardPage
