import '../styles/layouts/AdminLayout.css'
import { Outlet } from 'react-router-dom'
import { AdminHeader, AdminFooter, AdminSidebar } from '../pages/admin'
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  )
}
export default AdminLayout
