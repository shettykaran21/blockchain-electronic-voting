import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

import Election from '../../../smart-contracts/election'

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

const Dashboard = () => {
  const endElection = async (event) => {
    let candidate = 0
    try {
      setLoading(true)
      const election = Election(Cookies.get('address'))
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

  return <Bar data={data} width={120} height={50} options={options} />
}

export default Dashboard