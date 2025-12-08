const BASE_URL = 'https://692f84ad778bbf9e006daf21.mockapi.io/products/products'

async function handleResponse(res, defaultMessage) {
  if (res.ok) return res.json()
  const msg = await res.text().catch(() => '')
  throw new Error(`${defaultMessage} (${res.status}) ${msg}`.trim())
}

export async function getProducts() {
  const res = await fetch(BASE_URL)
  const data = await handleResponse(res, 'Error al cargar productos')
  return data.map(p => ({
    ...p,
    price: Number(p.price || 0),
    name: p.name || p.title || 'Producto',
    description: p.description || '',
    category: p.category || 'General',
  }))
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  const data = await handleResponse(res, 'No se pudo cargar el producto')
  return { ...data, price: Number(data.price || 0) }
}

export async function createProduct(payload) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(res, 'No se pudo crear el producto')
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(res, 'No se pudo actualizar el producto')
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`No se pudo eliminar (${res.status}) ${msg}`.trim())
  }
  return true
}
