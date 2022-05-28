import Link from 'next/link'
import Button from '../ui/button'

const Navbar = () => {
  return (
    <nav className="flex py-4 justify-between">
      <h1 className="font-bold font-heading text-3xl cursor-pointer">
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
