
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/api.js'

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        if (alive) setProduct(data)
      } catch (e) {
        if (alive) setError(e.message || 'No se pudo cargar el detalle')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [id])

  if (loading) return <p className="state">Cargando detalle...</p>
  if (error)   return <p className="state error">{error}</p>
  if (!product) return <p className="state">Producto no encontrado.</p>

  return (
    <article className="detail">
      <img src={product.image} alt={product.title} />
      <div className="detail-body">
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <h3>$ {product.price?.toFixed(2)}</h3>
        <button className="btn" onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}
