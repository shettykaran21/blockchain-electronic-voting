import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import FormButton from '../../ui/form-button'
import FormContainer from '../../ui/form-container'
import FormError from '../../ui/form-error'
import FormInput from '../../ui/form-input'
import Election from '../../../smart-contracts/election'
import storage from '../../../ipfs'
import FormFileInput from '../../ui/form-file-input'
import api from '../../../api'
import web3 from '../../../smart-contracts/web3'

const CandidateForm = ({ electionDetails }) => {
  const [file, setFile] = useState(null)
  const [urlArr, setUrlArr] = useState([])

  const retrieveFile = (e) => {
    const data = e.target.files[0]
    setFile(data)

    e.preventDefault()
  }

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
      const { name, description, email } = values
      try {
        const cid = await storage.put([file])
        console.log('Content added with CID:', cid)
        const url = `https://dweb.link/ipfs/${cid}`
        setUrlArr((prev) => [...prev, url])

        const address = Cookies.get('address')
        const election = Election(address)
        const accounts = await web3.eth.getAccounts()
        await election.methods
          .addCandidate(name, description, cid, email)
          .send({ from: accounts[0] })

        await api.post(
          '/candidate/registerCandidate',
          JSON.stringify({
            email,
            election_name: electionDetails.electionName,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
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
        <FormFileInput onChange={retrieveFile} />
        <FormButton>Register</FormButton>
        {status && <FormError>{status}</FormError>}
      </form>
    </FormContainer>
  )
}

export default CandidateForm
