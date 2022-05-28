import Head from 'next/head'
import { useState } from 'react'

import Layout from '../components/layout'
import LoginForm from '../components/company/login-form'
import SignupForm from '../components/company/signup-form'
import FormContainer from '../components/ui/form-container'

const CompanyForm = () => {
  const [visible, setVisible] = useState(true)

  const toggleVisibility = () => setVisible((prevVisible) => !prevVisible)

  return (
    <>
      <Head>
        <title>Company Login</title>
      </Head>
      <Layout>
        <FormContainer>
          {visible ? (
            <LoginForm toggleVisibility={toggleVisibility} />
          ) : (
            <SignupForm toggleVisibility={toggleVisibility} />
          )}
        </FormContainer>
      </Layout>
    </>
  )
}

export default CompanyForm
