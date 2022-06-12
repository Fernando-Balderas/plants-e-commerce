import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Can from '../../helpers/Can'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { addToCart, removeFromCart, selectCart } from '../cart/cartSlice'
import {
  deleteProduct,
  fetchProducts,
  selectProducts,
  setEditingProduct,
} from './productsSlice'

type Fn = () => {}

function Products() {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const products = useStoreSelector(selectProducts)
  const cart = useStoreSelector(selectCart)

  const cartButton = (product: any, cart: any) => {
    let fn: Fn = () => dispatch(addToCart(product))
    let msg = 'Add to cart'
    const index = cart.findIndex(
      (cartProduct: any) => cartProduct._id === product._id
    )
    if (index !== -1) {
      fn = () => dispatch(removeFromCart(product._id))
      msg = 'Remove from cart'
    }
    return <button onClick={fn}>{msg}</button>
  }

  return (
    <ul>
      {products.length > 0 &&
        products.map((product) => (
          <li key={product._id}>
            <Link
              to={`/product/${product._id}`}
            >{`${product.name} - ${product.price}`}</Link>
            <Can
              perform="products:edit"
              yes={() => (
                <>
                  {cartButton(product, cart)}
                  <button onClick={() => dispatch(setEditingProduct(product))}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(deleteProduct(product._id))}>
                    Delete
                  </button>
                </>
              )}
            />
          </li>
        ))}
    </ul>
  )
}

export default Products
