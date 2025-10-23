
const BASE_URL = 'https://fakestoreapi.com'

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`Error al cargar productos (${res.status}) ${msg}`.trim())
  }
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`No se pudo cargar el producto (${res.status}) ${msg}`.trim())
  }
  return res.json()
}
