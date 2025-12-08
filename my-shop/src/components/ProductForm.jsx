import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaCheckCircle, FaPlus } from 'react-icons'

const Panel = styled.div`
  background: #0f172a;
  color: white;
  border-radius: 14px;
  padding: 1.2rem;
  display: grid;
  gap: .85rem;
  box-shadow: 0 12px 40px rgba(15,23,42,0.35);
`

const Label = styled.label`
  font-weight: 600;
  margin-bottom: .25rem;
  display: inline-block;
`

export default function ProductForm({ onSubmit, editing }) {
  const [values, setValues] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Moda',
  })

  useEffect(() => {
    if (editing) {
      setValues({
        name: editing.name || '',
        price: editing.price ?? '',
        description: editing.description || '',
        image: editing.image || '',
        category: editing.category || 'Moda',
      })
    }
  }, [editing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...values, price: Number(values.price) })
  }

  const isEdit = Boolean(editing)

  return (
    <Panel>
      <div className="d-flex align-items-center gap-2">
        <FaCheckCircle />
        <div>
          <h4 style={{ margin: 0 }}>{isEdit ? 'Editar producto' : 'Agregar nuevo'}</h4>
          <p style={{ margin: 0, opacity: .8 }}>Completa los campos requeridos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid-form" aria-label="Formulario de producto">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <input
            id="name"
            name="name"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="Producto"
          />
        </div>

        <div>
          <Label htmlFor="price">Precio</Label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            name="price"
            className="form-control"
            value={values.price}
            onChange={handleChange}
            required
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="category">Categoría</Label>
          <input
            id="category"
            name="category"
            className="form-control"
            value={values.category}
            onChange={handleChange}
            placeholder="Moda, Hogar, etc."
          />
        </div>

        <div>
          <Label htmlFor="image">Imagen (URL)</Label>
          <input
            id="image"
            name="image"
            className="form-control"
            value={values.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            minLength={10}
            rows={3}
            value={values.description}
            onChange={handleChange}
            required
            placeholder="Descripción detallada"
          />
          <small className="form-text">Mínimo 10 caracteres.</small>
        </div>

        <button type="submit" className="btn btn-success">
          <FaPlus /> {isEdit ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </form>
    </Panel>
  )
}
