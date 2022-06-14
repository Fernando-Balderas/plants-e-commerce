import Button from 'react-bootstrap/Button'
import {
  addToCart,
  removeFromCart,
  selectCart,
} from '../../features/cart/cartSlice'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { Product } from '../../types/types'

type Fn = () => {}

type AddToCartButtonProps = {
  product: Product
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useStoreDispatch()
  const cart = useStoreSelector(selectCart)

  let fn: Fn = () => dispatch(addToCart(product))
  let msg = 'Add'
  const index = cart.findIndex((cartProduct) => cartProduct._id === product._id)
  if (index !== -1) {
    fn = () => dispatch(removeFromCart(product._id))
    msg = 'Remove'
  }

  return (
    <Button
      variant="outline-success"
      className="mx-1"
      aria-label="Add product"
      onClick={fn}
    >
      {msg}
    </Button>
  )
}

export default AddToCartButton
