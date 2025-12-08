import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart-items')
    if (!saved) return []
    try { return JSON.parse(saved) } catch (_) { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      if (idx === -1) return [...prev, { ...product, qty: 1 }]
      const copy = [...prev]
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
      return copy
    })
  }

  const removeItem = (id) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === id)
      if (idx === -1) return prev
      const item = prev[idx]
      if (item.qty > 1) {
        const copy = [...prev]
        copy[idx] = { ...item, qty: item.qty - 1 }
        return copy
      }
      return prev.filter(p => p.id !== id)
    })
  }

  const clearCart = () => setItems([])

  const totals = useMemo(() => ({
    count: items.reduce((acc, it) => acc + it.qty, 0),
    total: items.reduce((acc, it) => acc + Number(it.price || 0) * it.qty, 0),
  }), [items])

  const value = useMemo(() => ({ items, addItem, removeItem, clearCart, ...totals }), [items, totals])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
