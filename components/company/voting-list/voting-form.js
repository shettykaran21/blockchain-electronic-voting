import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import api from '../../../api'
import FormButton from '../../ui/form-button'
import FormContainer from '../../ui/form-container'
import FormError from '../../ui/form-error'
import FormInput from '../../ui/form-input'
import Alert from '../../ui/alert'

const VotingForm = ({ electionName, electionDescription, fetchVoters }) => {
  const [loading, setLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { email: '' },

    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)

      try {
        const params = {
          email: values.email,
          election_address: Cookies.get('address'),
          election_name: electionName,
          election_description: electionDescription,
        }

        await api.post('/voter/register', JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        fetchVoters()

        setIsAlertOpen(true)
        setAlertMsg('Voter added successfully')
        resetForm()
        setTimeout(() => {
          setIsAlertOpen(false)
        }, 5000)
      } catch (err) {
        setIsErrorAlertOpen(true)
        setTimeout(() => {
          setIsErrorAlertOpen(false)
        }, 5000)
        setAlertMsg(err.response.data.message)
        setStatus(err.response.data.message)
      }
      setLoading(false)
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required')
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Invalid email'
        ),
    }),
  })

  return (
    <>
      {isAlertOpen && <Alert>{alertMsg}</Alert>}
      {isErrorAlertOpen && <Alert isError>{alertMsg}</Alert>}
      <div className="sticky">
        <FormContainer width="full" center={false}>
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
            <FormButton isLoading={loading}>Register</FormButton>
            {status && <FormError>{status}</FormError>}
          </form>
        </FormContainer>
      </div>
    </>
  )
}

export default VotingForm
