import { createContext, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)


const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@admin.com'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '1234'

function makeFakeToken(role) {
  return `faketoken:${role}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2,8)}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth-user')
    if (!saved) return null
    try { return JSON.parse(saved) } catch (_) { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('auth-token') || null)
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!credentials.email || !credentials.password) {
          setLoading(false)
          reject(new Error('Debes ingresar email y contraseña'))
          return
        }

        let nextUser
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          nextUser = { name: 'Admin', email: ADMIN_EMAIL, role: 'admin' }
        } else {
          nextUser = { name: credentials.email.split('@')[0] || 'Usuario', email: credentials.email, role: 'user' }
        }

        const nextToken = makeFakeToken(nextUser.role)
        setUser(nextUser)
        setToken(nextToken)
        localStorage.setItem('auth-user', JSON.stringify(nextUser))
        localStorage.setItem('auth-token', nextToken)
        setLoading(false)
        toast.success('Sesión iniciada')
        resolve({ user: nextUser, token: nextToken })
      }, 600)
    })
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth-user')
    localStorage.removeItem('auth-token')
    toast.info('Sesión cerrada')
  }

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(user),
    login,
    logout,
    loading,
  }), [user, token, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)