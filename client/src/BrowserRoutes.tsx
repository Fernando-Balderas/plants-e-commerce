import React from 'react'
import { Routes, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RequireAuth from './components/RequireAuth'

function BrowserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />}></Route>
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route
          path="product/:productId/edit"
          element={
            <RequireAuth>
              <EditProduct />
            </RequireAuth>
          }
        />
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default BrowserRoutes
