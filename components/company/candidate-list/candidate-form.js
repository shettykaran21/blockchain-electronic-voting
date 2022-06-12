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
import FormAlert from '../../election/form-alert'
import Alert from '../../ui/alert'

const CandidateForm = ({ electionDetails, fetchCandidates }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

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
      setLoading(true)

      const { name, description, email } = values
      try {
        const cid = await storage.put([file])
        console.log('Content added with CID:', cid)

        const address = Cookies.get('address')
        const election = Election(address)
        const accounts = await web3.eth.getAccounts()
        await election.methods
          .addCandidate(name, description, `${cid}/${file.name}`, email)
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

        setIsAlertOpen(true)
        setAlertMsg(
          'Candidate registered successfully. Please check your mail for confirmation'
        )

        fetchCandidates()
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
    <>
      {isAlertOpen && <Alert>{alertMsg}</Alert>}
      {isErrorAlertOpen && <Alert isError>{alertMsg}</Alert>}
      <div className="sticky">
        <FormContainer width="full" center={false}>
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
            <FormButton isLoading={loading}>Register</FormButton>
            {status && <FormError>{status}</FormError>}
            <FormAlert>
              Candidate registration might take several minutes.
            </FormAlert>
          </form>
        </FormContainer>
      </div>
    </>
  )
}

export default CandidateForm
