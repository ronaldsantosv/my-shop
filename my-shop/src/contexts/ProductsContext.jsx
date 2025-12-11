import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/api.js'
import { useAuth } from './AuthContext.jsx'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los productos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const ensureAdmin = () => {
    if (!user || user.role !== 'admin') {
      const msg = 'Acceso denegado: se requiere perfil admin'
      toast.error(msg)
      const err = new Error(msg)
      err.isAuth = true
      throw err
    }
  }

  const addProduct = async (payload) => {
    try {
      ensureAdmin()
      const created = await createProduct(payload)
      setProducts(prev => [...prev, created])
      toast.success('Producto creado correctamente')
      return created
    } catch (e) {
      if (!e.isAuth) toast.error(e.message || 'No se pudo crear el producto')
      throw e
    }
  }

  const editProduct = async (id, payload) => {
    try {
      ensureAdmin()
      const updated = await updateProduct(id, payload)
      setProducts(prev => prev.map(p => p.id === id ? updated : p))
      toast.success('Producto actualizado')
      return updated
    } catch (e) {
      if (!e.isAuth) toast.error(e.message || 'No se pudo actualizar el producto')
      throw e
    }
  }

  const removeProduct = async (id) => {
    try {
      ensureAdmin()
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.info('Producto eliminado')
    } catch (e) {
      if (!e.isAuth) toast.error(e.message || 'No se pudo eliminar el producto')
      throw e
    }
  }

  const value = useMemo(() => ({
    products,
    loading,
    error,
    refresh: loadProducts,
    addProduct,
    editProduct,
    removeProduct,
    setError,
  }), [products, loading, error, loadProducts, user])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
