import Link from 'next/link'

const SidenavLink = ({ href, children }) => {
  return (
    <li className="relative">
      <Link href={href}>
        <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
          {children}
        </a>
      </Link>
    </li>
  )
}

export default SidenavLink
