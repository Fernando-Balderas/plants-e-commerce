import React, { useEffect, useState } from 'react'

import axios from '../helpers/axios/instance'
import useAuth from '../hooks/useAuth'
import Can from '../helpers/Can'
import { Product } from '../types/types'
import ProductForm from '../components/product/Form'
import { Link } from 'react-router-dom'

function Products() {
  const { accessToken } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await axios.get('/products')
        console.log('response:', response.data)
        setProducts(response.data)
      } catch (error: any) {
        console.log('error:', error.response.data)
      }
    }
    handleGetProducts()
  }, [accessToken, showForm])

  const handleNewProduct = async (data: any) => {
    console.log('data ', data)
    try {
      const response = await axios.post('/products', data)
      console.log('response:', response.data)
    } catch (error: any) {
      console.log('error:', error.response.data)
    }
    setShowForm(false)
  }

  const handleCancelProduct = () => setShowForm(false)

  return (
    <>
      <h1>Products page</h1>
      {!showForm && (
        <Can
          perform="products:create"
          yes={() => (
            <button onClick={() => setShowForm(true)}>New Product</button>
          )}
        />
      )}

      {showForm && (
        <ProductForm
          handleNewProduct={handleNewProduct}
          handleCancelProduct={handleCancelProduct}
        />
      )}

      <ul>
        {products.length > 0 &&
          products.map((product) => (
            <li key={product._id}>
              <Link
                to={`/product/${product._id}`}
              >{`${product.name} - ${product.price}`}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Products
