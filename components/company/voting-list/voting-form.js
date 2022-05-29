import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import api from '../../../api'
import FormButton from '../../ui/form-button'
import FormContainer from '../../ui/form-container'
import FormError from '../../ui/form-error'
import FormInput from '../../ui/form-input'

const VotingForm = ({ electionName, electionDescription }) => {
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

    onSubmit: async (values, { setStatus }) => {
      try {
        const params = {
          email: values.email,
          election_address: Cookies.get('address'),
          election_name: electionName,
          election_description: electionDescription,
        }
        const { data } = await api.post(
          '/voter/register',
          JSON.stringify(params),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        console.log(data)
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
    }),
  })

  return (
    <FormContainer>
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
        <FormButton>Register</FormButton>
        {status && <FormError>{status}</FormError>}
      </form>
    </FormContainer>
  )
}

export default VotingForm
