
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <Link to={`/producto/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>

      <h3 className="title">
        <Link to={`/producto/${product.id}`}>{product.title}</Link>
      </h3>

      <p className="price">$ {product.price.toFixed(2)}</p>

      <button className="btn" onClick={() => onAdd?.(product)}>
        Agregar al carrito
      </button>
    </article>
  )
}


