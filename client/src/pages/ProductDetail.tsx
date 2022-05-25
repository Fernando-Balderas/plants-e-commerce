import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  let { productId } = useParams()
  return (
    <>
      <h1>Product detail page</h1>
      {productId}
    </>
  )
}

export default ProductDetail
