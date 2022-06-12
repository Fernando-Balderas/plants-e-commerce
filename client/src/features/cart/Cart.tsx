import React from 'react'
import { useStoreSelector } from '../../store/hooks'
import { selectCart, selectShowCart } from './cartSlice'

function Cart() {
  const showCart = useStoreSelector(selectShowCart)
  const cart = useStoreSelector(selectCart)

  console.log('showCart ', showCart)

  return (
    <>
      <h2>Cart</h2>
      {cart.length === 0 && 'Empty'}
      <ul>
        {cart.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Cart
