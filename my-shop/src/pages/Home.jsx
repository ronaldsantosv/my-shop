
import { useEffect, useState } from 'react'
import { getProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        if (alive) setProducts(data)
      } catch (e) {
        if (alive) setError(e.message || 'No se pudo cargar la lista')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  if (loading) return <p className="state">Cargando productos...</p>
  if (error)   return <p className="state error">{error}</p>

  return (
    <section>
      <h2>Inicio</h2>
      <p>Productos desde la API FakeStore:</p>

      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </section>
  )
}






