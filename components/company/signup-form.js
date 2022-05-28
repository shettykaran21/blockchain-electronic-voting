import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../ui/form-input'
import Cookies from 'js-cookie'

import api from '../../api'

const SignupForm = ({ toggleVisibility }) => {
  const [loading, setLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: { email: '', password: '', passwordConfirmation: '' },

    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)

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
      setLoading(false)
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
      {isAlertOpen && (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 absolute bottom-4 right-4"
          role="alert"
        >
          Signed Up successfully! Please login
        </div>
      )}

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
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Sign up
        </button>
        {status && (
          <div className="text-red-400 mt-1 ml-2 text-xs">{status}</div>
        )}
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
