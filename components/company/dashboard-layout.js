import React from 'react'

import Sidenav from './sidenav'

const DashboardLayout = ({ electionAddress, children }) => {
  return (
    <div className="flex">
      <aside className="h-screen sticky top-0">
        <Sidenav electionAddress={electionAddress} />
      </aside>
      <main className="text-white">{children}</main>
    </div>
  )
}

export default DashboardLayout
