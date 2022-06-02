import { FiLogOut } from 'react-icons/fi'
import Cookies from 'js-cookie'

import { Router } from '../../routes'
import SidenavLink from './sidenav-link'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Sidenav = () => {
  const [electionAddress, setElectionAddress] = useState(null)

  useEffect(() => {
    setElectionAddress(Cookies.get('address'))
  }, [])

  const signOut = () => {
    Cookies.remove('address')
    Cookies.remove('company_email')
    Cookies.remove('company_id')

    console.log('Logging out....')

    Router.pushRoute('/home')
  }

  return (
    <div className="w-52 h-full shadow-md shadow-slate-600 bg-black-primary px-1 absolute">
      <h1 className="font-extrabold font-logo text-3xl cursor-pointer text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-gradient-1 to-blue-gradient-2">
        <Link href="/home">
          <a>BlockVote</a>
        </Link>
      </h1>
      <ul className="relative">
        <SidenavLink href={`/election/${electionAddress}/company_dashboard`}>
          Dashboard
        </SidenavLink>
        <SidenavLink href={`/election/${electionAddress}/candidate_list`}>
          Candidate List
        </SidenavLink>
        <SidenavLink href={`/election/${electionAddress}/voting_list`}>
          Voter List
        </SidenavLink>
        <button
          className="text-white-800 ml-6 text-sm flex items-center gap-4 mt-8"
          onClick={signOut}
        >
          <FiLogOut />
          Sign Out
        </button>
      </ul>
    </div>
  )
}

export default Sidenav
