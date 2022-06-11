const FormContainer = ({ width, center = true, children }) => {
  return (
    <div
      className={`${
        center && 'justify-center'
      } flex flex-col items-center min-h-[calc(100vh-80px)]`}
    >
      <div
        className={`${
          width ? `w-${width}` : 'w-1/2'
        } block px-6 py-10  rounded-lg shadow-2xl shadow-zinc-900 bg-white-primary max-w-sm`}
      >
        {children}
      </div>
    </div>
  )
}

export default FormContainer
