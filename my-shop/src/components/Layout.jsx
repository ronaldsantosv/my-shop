
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout({ cartCount = 0 }) {
  return (
    <div className="app">
      <header>
        <Navbar cartCount={cartCount} />
      </header>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


