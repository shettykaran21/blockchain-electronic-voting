import { useFormik } from 'formik'
import * as Yup from 'yup'

import FormButton from '../../ui/form-button'
import FormContainer from '../../ui/form-container'
import FormError from '../../ui/form-error'
import FormInput from '../../ui/form-input'
import Election from '../../../smart-contracts/election'

const CandidateForm = () => {
  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { name: '', description: '', email: '' },

    onSubmit: async (values, { setStatus }) => {
      console.log(values)
      try {
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          this.setState({ ipfsHash: ipfsHash[0].hash })

          const add = Cookies.get('address')
          const election = Election(add)

          election.methods
            .addCandidate(
              this.state.cand_name,
              this.state.cand_desc,
              this.state.ipfsHash,
              document.getElementById('email').value
            )
            .send(
              {
                from: accounts[0],
              },
              (error, transactionHash) => {}
            )
        })
      } catch (err) {
        setStatus(err.response.data.message)
      }
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
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
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          hasError={touched.name && errors.name}
          errorMsg={errors.name && errors.name}
        />
        <FormInput
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          hasError={touched.description && errors.description}
          errorMsg={errors.description && errors.description}
        />
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

export default CandidateForm
