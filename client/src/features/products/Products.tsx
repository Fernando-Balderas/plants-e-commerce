import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { fetchProducts, selectProducts } from './productsSlice'

function Products() {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const products = useStoreSelector(selectProducts)

  return (
    <ul>
      {products.length > 0 &&
        products.map((product) => (
          <li key={product._id}>
            <Link
              to={`/product/${product._id}`}
            >{`${product.name} - ${product.price}`}</Link>
            <button onClick={() => console.log('edit product clicked')}>
              Edit
            </button>
            <button onClick={() => console.log('delete product clicked')}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Products
