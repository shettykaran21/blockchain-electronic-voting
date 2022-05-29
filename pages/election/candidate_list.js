import Head from 'next/head'

import DashboardLayout from '../../components/company/dashboard/dashboard-layout'
import CandidateList from '../../components/company/candidate-list'

const CandidateListPage = () => {
  return (
    <>
      <Head>
        <title>BlockVote | Candidate List</title>
      </Head>
      <DashboardLayout>
        <CandidateList />
      </DashboardLayout>
    </>
  )
}

export default CandidateListPage
