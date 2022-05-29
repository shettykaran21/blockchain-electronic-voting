import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'
import Cookies from 'js-cookie'

import Election from '../../smart-contracts/election'
import api from '../../api'
import DashboardLayout from '../../components/company/dashboard-layout'

let cand = []
let graphEmail = []
let graphVotes = []

const options = {
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    yAxes: [
      {
        height: '500px',
        stacked: true,
        gridLines: {
          display: true,
          color: 'rgba(255,99,132,0.2)',
        },
      },
    ],
    xAxes: [
      {
        width: '500px',
        gridLines: {
          display: false,
        },
      },
    ],
  },
}

const data = {
  labels: graphEmail,
  datasets: [
    {
      label: 'Vote Counts',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: graphVotes,
    },
  ],
}

const DashboardPage = () => {
  const [votersList, setVotersList] = useState(null)
  const [numOfVoters, setNumOfVoters] = useState(0)
  const [numOfCandidates, setNumOfCandidates] = useState(0)
  const [electionName, setElectionName] = useState('')
  const [electionDescription, setElectionDescription] = useState('')

  const electionAddress = Cookies.get('address')

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.post(
        '/voter',
        JSON.stringify({ election_address: electionAddress }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setVotersList(data)
    }

    fetchData()
  }, [electionAddress])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const election = Election(electionAddress)

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
  }, [electionAddress])

  const endElection = async (event) => {
    let candidate = 0
    try {
      setLoading(true)
      const election = Election(electionAddress)
      candidate = await election.methods.winnerCandidate().call()
      cand = await election.methods.getCandidate(candidate).call()

      const params = {
        election_address: electionAddress,
        election_name: electionName,
        candidate_email: cand[4],
        winner_candidate: cand[0],
      }

      await api.post('/voter/resultMail', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Head>
        <title>Company Dashboard</title>
      </Head>
      <DashboardLayout electionAddress={electionAddress}>
        <Bar data={data} width={120} height={50} options={options} />
      </DashboardLayout>
    </>
  )
}

export default DashboardPage
