
import { useEffect, useState } from 'react'
import { getProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Moda({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        const clothing = data.filter(p =>
          String(p.category || '').toLowerCase().includes('clothing')
        )
        if (alive) setProducts(clothing)
      } catch (e) {
        if (alive) setError(e.message || 'No se pudo cargar Moda')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  if (loading) return <p className="state">Cargando moda…</p>
  if (error)   return <p className="state error">{error}</p>
  if (products.length === 0) return <p className="state">No hay productos de moda.</p>

  return (
    <section>
      <h2>Moda</h2>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </section>
  )
}



