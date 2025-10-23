
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Mi Tienda</Link>
      <div className="links">
        <NavLink to="/" end>Inicio</NavLink>
        <br/>
        <NavLink to="/moda">Moda</NavLink>
         <br/>
        <NavLink to="/carrito">Carrito ({cartCount})</NavLink>
      </div>
    </nav>
  )
}


