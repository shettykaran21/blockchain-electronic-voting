const FormFileInput = ({ onChange }) => {
  return (
    <input
      className="form-control block w-full px-3 py-1.5 mb-6 text-sm font-normal text-gray-700 file:bg-clip-padding border border-solid border-gray-300 rounded file:transition ease-in-out m-0 focus:file:text-gray-700 focus:file:bg-white focus:file:border-blue-600 focus:file:outline-none file:text-sm file:font-semibold file:border-0 file:cursor-pointer file:bg-blue-50 file:text-blue-700"
      type="file"
      onChange={onChange}
    />
  )
}

export default FormFileInput
