import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import FormButton from '../ui/form-button'
import FormError from '../ui/form-error'
import FormInput from '../ui/form-input'
import FormTextArea from '../ui/form-textarea'
import FormAlert from './form-alert'
import web3 from '../../smart-contracts/web3'
import Election_Factory from '../../smart-contracts/election_factory'
import { Router } from '../../routes'

const ElectionForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { electionName: '', electionDescription: '' },

    onSubmit: async (values, { setStatus }) => {
      setLoading(true)

      try {
        const { electionName, electionDescription } = values
        const email = Cookies.get('company_email')

        const accounts = await web3.eth.getAccounts()

        const bool = await Election_Factory.methods
          .createElection(email, electionName, electionDescription)
          .send({ from: accounts[0] })

        if (bool) {
          const summary = await Election_Factory.methods
            .getDeployedElection(email)
            .call({ from: accounts[0] })

          Cookies.set('address', summary[0])
          Router.pushRoute(`/election/${summary[0]}/company_dashboard`)
        }
      } catch (err) {
        console.log(err)
        setStatus(err.response.data.message)
      }

      setLoading(false)
    },

    validationSchema: Yup.object({
      electionName: Yup.string()
        .required('Required')
        .matches(
          /^[a-zA-Z0-9\-]+$/,
          'No special characters and digits allowed'
        ),
      electionDescription: Yup.string()
        .required('Required')
        .min(10, 'Minimum 10 characters'),
    }),
  })

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        name="electionName"
        type="text"
        placeholder="Election Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.electionName}
        hasError={touched.electionName && errors.electionName}
        errorMsg={errors.electionName && errors.electionName}
      />
      <FormTextArea
        name="electionDescription"
        placeholder="Election Description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.electionDescription}
        hasError={touched.electionDescription && errors.electionDescription}
        errorMsg={errors.electionDescription && errors.electionDescription}
      />
      <FormButton isLoading={loading}>Submit</FormButton>
      {status && <FormError>{status}</FormError>}
      <FormAlert>Election creation might take several minutes.</FormAlert>
    </form>
  )
}

export default ElectionForm
