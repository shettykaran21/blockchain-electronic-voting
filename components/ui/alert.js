import React from 'react'

const Alert = ({ children, isError = false }) => {
  return (
    <div
      className={`${
        isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      } rounded-lg py-5 px-6 mb-4 text-base fixed bottom-4 right-4 z-50`}
      role="alert"
    >
      {children}
    </div>
  )
}

export default Alert
