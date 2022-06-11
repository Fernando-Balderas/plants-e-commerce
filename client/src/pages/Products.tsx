import React, { useState } from 'react'

import Can from '../helpers/Can'
import ProductForm from '../components/product/Form'
import ProductsList from '../features/products/Products'

function Products() {
  const [showForm, setShowForm] = useState(false)

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
        <ProductForm title="New Product" setShowForm={setShowForm} />
      )}

      <ProductsList />
    </>
  )
}

export default Products
