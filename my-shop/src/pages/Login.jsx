import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import { FaSignInAlt } from 'react-icons'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(form)
      const redirect = location.state?.from || '/'
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="row align-items-center" style={{ minHeight: '60vh' }}>
      <Helmet>
        <title>Login | Mi Shop</title>
        <meta name="description" content="Autentícate para acceder al carrito y administrar productos" />
      </Helmet>
      <div className="col-12 col-md-6">
        <h1>Bienvenido</h1>
        <p>Inicia sesión para acceder a las secciones protegidas y gestionar tu carrito.</p>
      </div>
      <div className="col-12 col-md-6">
        <form className="card p-4 shadow-sm" onSubmit={handleSubmit} aria-label="Formulario de login">
          <h3 className="mb-3 d-flex align-items-center gap-2"><FaSignInAlt /> Login</h3>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label className="form-label" htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control mb-3"
            value={form.password}
            onChange={handleChange}
            required
            aria-required="true"
          />

          {error && <p className="alert" role="alert">{error}</p>}

          <button className="btn" type="submit" disabled={loading} aria-label="Entrar">
            <FaSignInAlt /> {loading ? 'Validando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
