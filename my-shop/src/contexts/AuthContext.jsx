import { createContext, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth-user')
    if (!saved) return null
    try { return JSON.parse(saved) } catch (_) { return null }
  })
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
        const nextUser = {
          name: credentials.email.split('@')[0] || 'Usuario',
          email: credentials.email,
        }
        setUser(nextUser)
        localStorage.setItem('auth-user', JSON.stringify(nextUser))
        setLoading(false)
        toast.success('Sesión iniciada')
        resolve(nextUser)
      }, 600)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-user')
    toast.info('Sesión cerrada')
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
    loading,
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
