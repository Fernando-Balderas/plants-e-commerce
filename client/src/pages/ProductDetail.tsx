import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  let { productId } = useParams<{ productId: string }>()
  return (
    <>
      <h1>Product detail page</h1>
      {productId}
    </>
  )
}

export default ProductDetail
