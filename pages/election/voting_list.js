import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import api from '../../api'
import Election from '../../smart-contracts/election'
import VotingList from '../../components/company/voting-list'

const VotingListPage = () => {
  const [votersList, setVotersList] = useState(null)
  const [numOfVoters, setNumOfVoters] = useState(0)
  const [numOfCandidates, setNumOfCandidates] = useState(0)
  const [electionName, setElectionName] = useState(null)
  const [electionDescription, setElectionDescription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await api.post(
        '/voter',
        JSON.stringify({ election_address: Cookies.get('address') }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setVotersList(data.data.voterList)
      setLoading(false)
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
        <title>Voting list</title>
      </Head>
      {votersList && (
        <DashboardLayout>
          <VotingList
            loading={loading}
            electionName={electionName}
            electionDescription={electionDescription}
            voters={votersList}
          />
        </DashboardLayout>
      )}
    </>
  )
}

export default VotingListPage
