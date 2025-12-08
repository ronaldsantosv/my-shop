import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import { useCart } from '../contexts/CartContext.jsx'
import { getProductById } from '../services/api.js'
import { useProducts } from '../contexts/ProductsContext.jsx'
import { formatPrice } from '../lib/format.js'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const { products } = useProducts()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const existing = products.find(p => String(p.id) === String(id))
    if (existing) {
      setProduct(existing)
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        if (active) setProduct(data)
      } catch (e) {
        if (active) setError(e.message || 'No se pudo cargar el detalle')
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [id, products])

  if (loading) return <p className="alert" aria-live="polite">Cargando detalle...</p>
  if (error)   return <p className="alert" role="alert" aria-live="assertive">{error}</p>
  if (!product) return <p className="alert" role="status">Producto no encontrado.</p>

  return (
    <article className="card p-4 shadow-sm">
      <Helmet>
        <title>{product.name} | Mi Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />
        </div>
        <div className="col-12 col-md-6">
          <h2>{product.name}</h2>
          <p className="badge">{product.category}</p>
          <p>{product.description}</p>
          <h3>$ {formatPrice(product.price)}</h3>
          <button className="btn" onClick={() => addItem(product)} aria-label="Agregar al carrito">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
