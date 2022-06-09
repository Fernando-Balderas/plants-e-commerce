import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
        const response = await axios.get(
          'http://localhost:5000/api/v1/products',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
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
      const response = await axios.post(
        'http://localhost:5000/api/v1/products',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log('response:', response.data)
    } catch (error: any) {
      console.log('error:', error.response.data)
    }
    setShowForm(false)
  }

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

      {showForm && <ProductForm handleNewProduct={handleNewProduct} />}

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
