import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import FormButton from '../ui/form-button'
import FormError from '../ui/form-error'
import FormInput from '../ui/form-input'
import FormTextArea from '../ui/form-textarea'
import FormAlert from './form-alert'

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
        console.log(values)
        res.json({ message: 'Yo!' })
      } catch (err) {
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
      <FormButton>Submit</FormButton>
      {status && <FormError>{status}</FormError>}
      <FormAlert>Election creation will take several minutes.</FormAlert>
    </form>
  )
}

export default ElectionForm
