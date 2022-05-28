import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const LoginForm = ({ toggleVisibility }) => {
  const signin = async (event) => {
    const email = document.getElementById('signin_email').value
    setEmail(email)
    const password = document.getElementById('signin_password').value

    var http = new XMLHttpRequest()
    var url = 'company/authenticate'
    var params = 'email=' + email + '&password=' + password
    http.open('POST', url, true)
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText)
        if (responseObj.status == 'success') {
          Cookies.set('company_id', encodeURI(responseObj.data.id))
          Cookies.set('company_email', encodeURI(responseObj.data.email))
        } else {
          alert(responseObj.message)
        }
      }
    }
    http.send(params)
    try {
      const accounts = await web3.eth.getAccounts()
      const summary = await Election_Factory.methods
        .getDeployedElection(email)
        .call({ from: accounts[0] })
      if (summary[2] == 'Create an election.') {
        Router.pushRoute(`/election/create_election`)
      } else {
        Cookies.set('address', summary[0])
        Router.pushRoute(`/election/${summary[0]}/company_dashboard`)
      }
    } catch (err) {
      console.log(err.Message)
    }
  }

  return (
    <form>
      <div className="form-group mb-6">
        <input
          type="email"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="password"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleInputPassword2"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150ease-in-out"
      >
        Sign in
      </button>
      <p className="text-gray-500 mt-6 text-center cursor-pointer">
        Not a member?{' '}
        <a
          className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          onClick={toggleVisibility}
        >
          Register
        </a>
      </p>
    </form>
  )
}

export default LoginForm
