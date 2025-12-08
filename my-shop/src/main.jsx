import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from './contexts/CartContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductsProvider } from './contexts/ProductsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
