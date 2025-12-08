import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <div className="bg-light">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}
