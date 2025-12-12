import { FaMinus, FaPlus, FaTrash } from 'react-icons'
import { useCart } from '../contexts/CartContext.jsx'
import { formatPrice } from '../lib/format.js'

export default function Cart() {
  const { items, addItem, removeItem, clearCart, total } = useCart()

  if (items.length === 0) {
    return <p className="alert" role="status">Tu carrito está vacío.</p>
  }

  return (
    <section aria-label="Carrito de compras" className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 style={{ margin: 0 }}>Carrito</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline" onClick={clearCart} aria-label="Vaciar carrito"><FaTrash /> Vaciar</button>
          <button className="btn btn-primary" aria-label="Comprar">Comprar</button>
        </div>
      </div>

      <ul className="list-group">
        {items.map(item => {
          const label = item.name || item.title
          return (
          <li key={item.id} className="list-group-item d-flex justify-content-between gap-3 align-items-center">
            <div className="d-flex align-items-center gap-3">
              <img src={item.image} alt={label} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
              <div>
                <h4 style={{ margin: '0 0 .25rem' }}>{label}</h4>
                <small className="text-muted">$ {formatPrice(item.price)}</small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline" onClick={() => removeItem(item.id)} aria-label="Quitar unidad">
                <FaMinus />
              </button>
              <strong>{item.qty}</strong>
              <button className="btn btn-outline" onClick={() => addItem(item)} aria-label="Agregar unidad">
                <FaPlus />
              </button>
            </div>

            <div style={{ minWidth: 110, textAlign: 'end', fontWeight: 700 }}>
              $ {formatPrice(Number(item.price || 0) * item.qty)}
            </div>
          </li>
          )
        })}
      </ul>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <strong>Total</strong>
        <strong>$ {formatPrice(total)}</strong>
      </div>
    </section>
  )
}
