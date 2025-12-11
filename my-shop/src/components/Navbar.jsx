import { Link, NavLink } from 'react-router-dom'
import { FaBoxOpen, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons'
import { useCart } from '../contexts/CartContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Navbar() {
  const { count } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="brand d-flex align-items-center gap-2" aria-label="Inicio">
          <FaBoxOpen /> Mi Shop
        </Link>

        <div className="links">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/moda">Moda</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          <NavLink to="/carrito">
            <FaShoppingCart /> Carrito ({count})
          </NavLink>
        </div>

        <div className="links">
          {isAuthenticated ? (
            <>
              <span className="badge" aria-label="Usuario autenticado"><FaUser /> {user?.name}</span>
              <button className="btn btn-outline" onClick={logout} aria-label="Cerrar sesión">
                <FaSignOutAlt /> Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-outline" aria-label="Iniciar sesión">
              <FaSignInAlt /> Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
