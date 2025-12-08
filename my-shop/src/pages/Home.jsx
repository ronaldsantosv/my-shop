import { useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import { FaSearch } from 'react-icons'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { useProducts } from '../contexts/ProductsContext.jsx'

const PAGE_SIZE = 6

export default function Home() {
  const { products, loading, error } = useProducts()
  const { addItem } = useCart()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const list = !term
      ? products
      : products.filter(p =>
        (p.name || '').toLowerCase().includes(term) ||
        (p.category || '').toLowerCase().includes(term)
      )
    return list
  }, [products, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <section className="mt-3">
      <Helmet>
        <title>Mi Shop | Catálogo</title>
        <meta name="description" content="Explora productos desde MockAPI con búsqueda y paginación" />
      </Helmet>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <p className="badge">Catálogo público</p>
          <h2 style={{ margin: 0 }}>Productos destacados</h2>
        </div>
        <div className="search" aria-label="Buscador de productos">
          <FaSearch />
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por nombre o categoría"
            value={query}
            onChange={handleSearch}
            aria-label="Buscar"
          />
        </div>
      </div>

      {loading && <p className="alert">Cargando productos...</p>}
      {error && <p className="alert" role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <div className="row">
            {pageItems.map(p => (
              <div key={p.id} className="col-12 col-md-4">
                <ProductCard product={p} onAdd={addItem} />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <ul className="pagination" aria-label="Paginación">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1
                return (
                  <li key={pageNumber} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPage(pageNumber)} aria-label={`Ir a página ${pageNumber}`}>
                      {pageNumber}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  )
}
