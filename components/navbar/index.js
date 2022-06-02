import Link from 'next/link'
import Button from '../ui/button'

const Navbar = () => {
  return (
    <nav className="flex py-4 justify-between">
      <h1 className="font-extrabold font-logo text-4xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-gradient-1 to-blue-gradient-2">
        <Link href="/home">
          <a>BlockVote</a>
        </Link>
      </h1>
      <div className="flex gap-4">
        <Button href="/voter_login">Voters</Button>
        <Button href="/company_login" primary={false}>
          Companies
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
