import FormError from './form-error'

const FormTextArea = ({ name, hasError, errorMsg, ...props }) => {
  return (
    <div className="form-group mb-6">
      <textarea
        id={name}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
        border border-solid  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        ${hasError ? 'border-red-400' : 'border-gray-300'}`}
        rows="3"
        {...props}
      ></textarea>
      {hasError ? <FormError>{errorMsg}</FormError> : null}
    </div>
  )
}

export default FormTextArea
