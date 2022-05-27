import Head from 'next/head'

import Main from '../components/home/main'
import Layout from '../components/layout'

const HomePage = () => (
  <>
    <Head>
      <title>BlockVote</title>
    </Head>
    <Layout>
      <Main />
    </Layout>
  </>
)

export default HomePage
