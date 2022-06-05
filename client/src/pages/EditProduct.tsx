import React from 'react'
import { useParams } from 'react-router-dom'

function EditProduct() {
  let { productId } = useParams()
  return (
    <>
      <h1>Edit product page</h1>
      {productId}
    </>
  )
}

export default EditProduct
