import Head from 'next/head'

import DashboardLayout from '../../components/company/dashboard-layout'

const CandidateList = () => {
  return (
    <>
      <Head>
        <title>Voting list</title>
      </Head>
      <DashboardLayout>CandidateList</DashboardLayout>
    </>
  )
}

export default CandidateList
