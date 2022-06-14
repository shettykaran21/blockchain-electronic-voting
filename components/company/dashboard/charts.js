import { Bar, Doughnut } from 'react-chartjs-2'
import { mapColorsToLabels } from '../../../utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
}

const doughnutOptions = { responsive: true, maintainAspectRatio: false }

const Charts = ({ candidateNames, candidateVotes }) => {
  const barChartData = {
    labels: candidateNames,
    datasets: [
      {
        label: 'Vote Count',
        backgroundColor: '#0390fc33',
        borderColor: '#0390fc',
        borderWidth: 2,
        hoverBackgroundColor: '#0390fc66',
        data: candidateVotes,
      },
    ],
  }

  const { hoverBackgroundColors, backgroundColors, borderColors } =
    mapColorsToLabels(candidateNames)
  const doughnutData = {
    labels: candidateNames,
    datasets: [
      {
        label: 'Vote Count',
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 2,
        data: candidateVotes,
      },
    ],
  }
  return (
    <div className="p-8 flex gap-8 h-[30rem] w-[40rem]">
      <Bar
        data={barChartData}
        options={barChartOptions}
        width={100}
        height={100}
      />
      <Doughnut
        data={doughnutData}
        options={doughnutOptions}
        width={100}
        height={100}
      />
    </div>
  )
}

export default Charts
