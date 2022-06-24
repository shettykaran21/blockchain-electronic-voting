import Link from 'next/link'

const Button = ({ href = '/', primary = true, children }) => {
  return (
    <Link href={href}>
      <a
        className={`rounded-xl py-2 px-4 text-md text-white flex justify-center items-center ${
          primary
            ? 'bg-gradient-to-br from-blue-gradient-1 to-blue-gradient-2'
            : 'border-blue-primary border-2'
        }`}
      >
        {children}
      </a>
    </Link>
  )
}

export default Button
