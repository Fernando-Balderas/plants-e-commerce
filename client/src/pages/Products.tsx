import React, { useState } from 'react'

import Can from '../helpers/Can'
import ProductForm from '../components/product/Form'
import ProductsList from '../features/products/Products'
import { createProduct } from '../features/products/productsSlice'
import { useStoreDispatch } from '../store/hooks'

function Products() {
  const dispatch = useStoreDispatch()
  const [showForm, setShowForm] = useState(false)

  const handleNewProduct = async (data: any) => {
    dispatch(createProduct(data))
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
          title="New Product"
          handleNewProduct={handleNewProduct}
          handleCancelProduct={handleCancelProduct}
        />
      )}

      <ProductsList />
    </>
  )
}

export default Products
