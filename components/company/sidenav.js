import { FiLogOut } from 'react-icons/fi'
import Cookies from 'js-cookie'

import { Router } from '../../routes'
import SidenavLink from './sidenav-link'

const Sidenav = ({ electionAddress }) => {
  const signOut = () => {
    Cookies.remove('address')
    Cookies.remove('company_email')
    Cookies.remove('company_id')

    console.log('Logging out....')

    Router.pushRoute('/home')
  }

  return (
    <div className="w-52 h-full shadow-md bg-gray-800 px-1 absolute">
      <ul className="relative">
        <SidenavLink
          href={`/election/${Cookies.get('address')}/company_dashboard`}
        >
          Dashboard
        </SidenavLink>
        <SidenavLink
          href={`/election/${Cookies.get('address')}/candidate_list`}
        >
          Candidates List
        </SidenavLink>
        <SidenavLink href={`/election/${Cookies.get('address')}/voting_list`}>
          Voters List
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
