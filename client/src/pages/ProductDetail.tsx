import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailCard from '../components/product/DetailCard'

function ProductDetail() {
  let { productId } = useParams<{ productId: string }>()
  return (
    <>
      <h1>Product detail page</h1>
      <ProductDetailCard id={productId} />
    </>
  )
}

export default ProductDetail
