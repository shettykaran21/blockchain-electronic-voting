import Sidenav from '../sidenav'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside className="h-screen sticky top-0">
        <Sidenav />
      </aside>
      <main className="text-white ml-52">{children}</main>
    </div>
  )
}

export default DashboardLayout
