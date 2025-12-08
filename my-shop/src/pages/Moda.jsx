import Helmet from 'react-helmet'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { useProducts } from '../contexts/ProductsContext.jsx'

export default function Moda() {
  const { products, loading, error } = useProducts()
  const { addItem } = useCart()

  const clothing = products.filter(p => (p.category || '').toLowerCase().includes('moda'))

  return (
    <section className="mt-3">
      <Helmet>
        <title>Moda | Mi Shop</title>
        <meta name="description" content="Filtra el catálogo por la categoría de moda" />
      </Helmet>
      <h2>Moda</h2>
      <p>Todos los productos de la categoría moda.</p>

      {loading && <p className="alert">Cargando moda...</p>}
      {error && <p className="alert" role="alert">{error}</p>}

      {!loading && !error && clothing.length === 0 && (
        <p className="alert">No hay productos en moda todavía.</p>
      )}

      <div className="row">
        {clothing.map(p => (
          <div className="col-12 col-md-4" key={p.id}>
            <ProductCard product={p} onAdd={addItem} />
          </div>
        ))}
      </div>
    </section>
  )
}
