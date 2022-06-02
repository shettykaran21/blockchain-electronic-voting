import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import api from '../../api'
import FormButton from '../ui/form-button'
import FormInput from '../ui/form-input'
import FormError from '../ui/form-error'
import Alert from '../ui/alert'

const SignupForm = ({ toggleVisibility }) => {
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
    initialValues: { email: '', password: '', passwordConfirmation: '' },

    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        const { data } = await api.post(
          '/company/register',
          JSON.stringify(values),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        Cookies.set('company_email', encodeURI(data.data.email))
        setIsAlertOpen(true)
        setTimeout(() => {
          toggleVisibility()
          setIsAlertOpen(false)
        }, 5000)
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
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number & One Special Character'
        ),
      passwordConfirmation: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  })

  return (
    <>
      {isAlertOpen && <Alert>Signed Up successfully! Please login</Alert>}

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
        <FormInput
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirmation}
          hasError={touched.passwordConfirmation && errors.passwordConfirmation}
          errorMsg={errors.passwordConfirmation && errors.passwordConfirmation}
        />
        <FormButton>Sign Up</FormButton>
        {status && <FormError>{status}</FormError>}
        <p className="text-gray-500 mt-6 text-center cursor-pointer">
          Already registered?{' '}
          <a
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            onClick={toggleVisibility}
          >
            Sign In
          </a>
        </p>
      </form>
    </>
  )
}

export default SignupForm
