import Head from 'next/head'

import DashboardLayout from '../../components/company/dashboard-layout'

const VotingList = () => {
  return (
    <>
      <Head>
        <title>Voting list</title>
      </Head>
      <DashboardLayout>CandidateList</DashboardLayout>
    </>
  )
}

export default VotingList
