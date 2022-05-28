import Head from 'next/head'
import { useState } from 'react'
import Cookies from 'js-cookie'

import { Router } from '../routes'
import web3 from '../smart-contracts/web3'
import Election_Factory from '../smart-contracts/election_factory'
import Layout from '../components/layout'
import LoginForm from '../components/company/login-form'
import SignupForm from '../components/company/signup-form'

const CompanyForm = () => {
  const [visible, setVisible] = useState(true)

  const toggleVisibility = () => setVisible((prevVisible) => !prevVisible)

  return (
    <>
      <Head>
        <title>Company Login</title>
      </Head>
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="block px-6 py-12 w-1/2 rounded-lg shadow-2xl shadow-zinc-900 bg-white-primary max-w-sm">
            {visible ? (
              <LoginForm toggleVisibility={toggleVisibility} />
            ) : (
              <SignupForm toggleVisibility={toggleVisibility} />
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CompanyForm
