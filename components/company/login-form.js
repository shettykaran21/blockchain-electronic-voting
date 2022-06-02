import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import api from '../../api'
import FormButton from '../ui/form-button'
import FormInput from '../ui/form-input'
import FormError from '../ui/form-error'
import web3 from '../../smart-contracts/web3'
import Election_Factory from '../../smart-contracts/election_factory'
import { Router } from '../../routes'
import Alert from '../ui/alert'

const LoginForm = ({ toggleVisibility }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { email: '', password: '' },

    onSubmit: async (values, { setStatus }) => {
      try {
        const { data } = await api.post(
          '/company/authenticate',
          JSON.stringify(values),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        Cookies.set('company_id', encodeURI(data.data.id))
        Cookies.set('company_email', encodeURI(data.data.email))
        setIsAlertOpen(true)
        setTimeout(() => {
          setIsAlertOpen(false)
        }, 5000)

        const accounts = await web3.eth.getAccounts()
        const summary = await Election_Factory.methods
          .getDeployedElection(email)
          .call({ from: accounts[0] })

        if (summary[2] == 'Create an election.') {
          Router.pushRoute(`/election/create_election`)
        } else {
          Cookies.set('address', summary[0])
          Router.pushRoute(`/election/${summary[0]}/company_dashboard`)
        }
      } catch (err) {
        setStatus(err.response.data.message)
      }
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required')
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Invalid email'
        ),
      password: Yup.string().required('Required'),
    }),
  })

  return (
    <>
      {isAlertOpen && <Alert>Logged In successfully! Redirecting...</Alert>}
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          hasError={touched.email && errors.email}
          errorMsg={errors.email && errors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          hasError={touched.password && errors.password}
          errorMsg={errors.password && errors.password}
        />
        <FormButton>Sign In</FormButton>
        {status && <FormError>{status}</FormError>}
        <p className="text-gray-500 mt-6 text-center cursor-pointer">
          Not a registered company?{' '}
          <a
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            onClick={toggleVisibility}
          >
            Register
          </a>
        </p>
      </form>
    </>
  )
}

export default LoginForm
