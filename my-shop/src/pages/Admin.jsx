import { useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import { FaEdit, FaSearch, FaTrash } from 'react-icons'
import ProductForm from '../components/ProductForm.jsx'
import { useProducts } from '../contexts/ProductsContext.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'

export default function Admin() {
  const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts()
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return products
    return products.filter(p =>
      (p.name || '').toLowerCase().includes(term) ||
      (p.category || '').toLowerCase().includes(term)
    )
  }, [products, query])

  const handleSubmit = async (values) => {
    if (!values.name || values.price <= 0 || values.description.length < 10) return
    if (editing) {
      await editProduct(editing.id, values)
      setEditing(null)
    } else {
      await addProduct(values)
    }
  }

  const askDelete = (id) => setConfirmId(id)
  const confirmDelete = async () => {
    if (!confirmId) return
    await removeProduct(confirmId)
    setConfirmId(null)
  }

  return (
    <section className="mt-3">
      <Helmet>
        <title>Administración | Mi Shop</title>
        <meta name="description" content="Crea, edita y elimina productos usando MockAPI" />
      </Helmet>
      <div className="d-flex justify-content-between flex-wrap gap-2 mb-3 align-items-center">
        <div>
          <p className="badge">MockAPI CRUD</p>
          <h2 style={{ margin: 0 }}>Gestión de productos</h2>
        </div>
        <div className="search">
          <FaSearch />
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por nombre o categoría"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>
      </div>

      {error && <p className="alert" role="alert">{error}</p>}

      <div className="row">
        <div className="col-12 col-md-5">
          <ProductForm onSubmit={handleSubmit} editing={editing} />
        </div>
        <div className="col-12 col-md-7">
          <div className="card p-3 shadow-sm" aria-live="polite">
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              <table className="table" aria-label="Tabla de productos">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={p.image} alt={p.name} style={{ width: 46, height: 46, borderRadius: 10, objectFit: 'cover' }} />
                          <div>
                            <strong>{p.name}</strong>
                            <div className="text-muted" style={{ fontSize: '.9rem' }}>{p.description.slice(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td>$ {Number(p.price || 0).toFixed(2)}</td>
                      <td><span className="badge">{p.category}</span></td>
                      <td className="text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-outline" onClick={() => setEditing(p)} aria-label={`Editar ${p.name}`}><FaEdit /> Editar</button>
                          <button className="btn btn-danger" onClick={() => askDelete(p.id)} aria-label={`Eliminar ${p.name}`}><FaTrash /> Borrar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="4">No hay resultados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(confirmId)}
        title="Confirmar eliminación"
        message="Esta acción eliminará el producto en MockAPI."
        onConfirm={confirmDelete}
        onClose={() => setConfirmId(null)}
      />
    </section>
  )
}
