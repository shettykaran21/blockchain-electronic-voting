import Spinner from './spinner'

const FormButton = ({ isLoading = false, children }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-gradient-1 to-blue-gradient-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-gradient-2 hover:shadow-lg focus:bg-blue-gradient-2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-gradient-2 active:shadow-lg transition duration-150ease-in-out relative"
      >
        {isLoading && <Spinner />}
        {children}
      </button>
    </div>
  )
}

export default FormButton
