import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaPlus } from 'react-icons'
import { formatPrice } from '../lib/format.js'

const Card = styled.article`
  display: grid;
  gap: .6rem;
  height: 100%;
`

const Thumb = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  min-height: 180px;
  display: grid;
  place-items: center;
`

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
`

export default function ProductCard({ product, onAdd }) {
  const name = product.name || product.title

  return (
    <Card className="card">
      <Link to={`/producto/${product.id}`}>
        <Thumb>
          <img src={product.image} alt={name} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
        </Thumb>
      </Link>

<div className="card-body">
  <Title>
    <Link to={`/producto/${product.id}`}>{name}</Link>
  </Title>
  <p className="card-text">{product.category}</p>
  <p className="card-text"><strong>$ {formatPrice(product.price)}</strong></p>
</div>
    </Card>
  )
}
