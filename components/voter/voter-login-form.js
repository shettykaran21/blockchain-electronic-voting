import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import api from '../../api'
import FormButton from '../ui/form-button'
import FormInput from '../ui/form-input'
import FormError from '../ui/form-error'
import Alert from '../ui/alert'
import { Router } from '../../routes'

const VoterLoginForm = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  useEffect(() => {
    return () => {
      setIsAlertOpen(false)
    }
  })

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
          '/voter/authenticate',
          JSON.stringify(values),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        setIsAlertOpen(true)

        Cookies.set('voter_email', encodeURI(values.email))
        Cookies.set('address', encodeURI(data.data.election_address))
        Router.pushRoute(`/election/${data.data.election_address}/vote`)
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
      </form>
    </>
  )
}

export default VoterLoginForm
