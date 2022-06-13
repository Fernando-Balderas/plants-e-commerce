import React from 'react'
import { useParams } from 'react-router-dom'

function EditProduct() {
  let { productId } = useParams<{ productId: string }>()
  return (
    <>
      <h1>Edit product</h1>
      {productId}
    </>
  )
}

export default EditProduct
