import { Outlet } from 'react-router-dom'
import AdminHeader from '../pages/admin/AdminHeader'
import AdminSidebar from '../pages/admin/AdminSidebar'
import AdminFooter from '../pages/admin/AdminFooter'
import '../styles/layouts/AdminLayout.css'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar className="admin-sidebar" />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
