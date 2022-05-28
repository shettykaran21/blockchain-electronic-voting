import React from 'react'

const FormInput = ({ name, type, hasError, errorMsg, ...props }) => {
  return (
    <div className="form-group mb-6">
      <input
        id={name}
        type={type}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
          hasError ? 'border-red-400' : 'border-gray-300'
        }`}
        {...props}
      />
      {hasError ? (
        <div className="text-red-400 mt-1 ml-2 text-xs">{errorMsg}</div>
      ) : null}
    </div>
  )
}

export default FormInput
