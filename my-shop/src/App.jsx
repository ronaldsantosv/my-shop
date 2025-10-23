
import { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Moda from './pages/Moda.jsx'
import Cart from './components/Cart.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

export default function App() {
 
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const i = prev.findIndex(p => p.id === product.id)
      if (i === -1) return [...prev, { ...product, qty: 1 }]
      const copy = [...prev]
      copy[i] = { ...copy[i], qty: copy[i].qty + 1 }
      return copy
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => {
      const i = prev.findIndex(p => p.id === id)
      if (i === -1) return prev
      const item = prev[i]
      if (item.qty > 1) {
        const copy = [...prev]
        copy[i] = { ...item, qty: item.qty - 1 }
        return copy
      }
      return prev.filter(p => p.id !== id)
    })
  }

  
  const cartCount = useMemo(
    () => cart.reduce((acc, it) => acc + it.qty, 0),
    [cart]
  )

  return (
    <Routes>
      <Route element={<Layout cartCount={cartCount} />}>
        <Route index element={<Home addToCart={addToCart} />} />
        <Route path="moda" element={<Moda addToCart={addToCart} />} />
        <Route path="producto/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route
          path="carrito"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Route>
    </Routes>
  )
}







