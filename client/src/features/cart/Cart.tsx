import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import {
  removeFromCart,
  selectCart,
  selectShowCart,
  setShowCart,
} from './cartSlice'
import { Product } from '../../types/types'
import { createOrder } from '../orders/ordersSlice'
import addCurrency from '../../util/addCurrency'

function Cart() {
  const dispatch = useStoreDispatch()
  const showCart = useStoreSelector(selectShowCart)
  const cart = useStoreSelector(selectCart)

  const { total, products } = cart.reduce(
    (reducer, currProduct) => {
      return {
        total: reducer.total + currProduct.price,
        products: [...reducer.products, currProduct._id],
      }
    },
    {
      total: 0,
      products: [] as string[],
    }
  )

  const props = cart.length <= 0 ? { disabled: true } : null

  const makeCard = (product: Product) => (
    <Alert
      key={`incart-${product._id}`}
      variant="light"
      className="p-0 cart-card"
    >
      <Link
        to={`/products/${product._id}`}
        className="ms-2"
        aria-label="Product detail"
      >
        {product.name}
      </Link>
      <div className="cart-card__body">
        <Badge bg="secondary" className="cart-card__price">
          {addCurrency(product.price)}
        </Badge>
        <Button
          variant="outline-danger"
          className="mx-1 cart-card__button"
          aria-label="Remove product"
          onClick={() => dispatch(removeFromCart(product._id))}
        >
          <RiDeleteBin6Line size="1.2em" />
        </Button>
      </div>
    </Alert>
  )

  const handlePlaceOrder = async () => {
    const placed = await dispatch(createOrder({ total, products }))
    if (placed.meta.requestStatus === 'fulfilled') alert('Order placed')
    else alert('Error')
  }

  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onHide={() => dispatch(setShowCart(!showCart))}
      aria-labelledby="cart-title"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as="h2" id="cart-title">
          Order
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={0} className="mx-auto">
          {cart.length <= 0 && <div>Empty</div>}
          {cart.map((product) => makeCard(product))}
        </Stack>
      </Offcanvas.Body>
      <hr />
      <Alert variant="light" className="m-0 cart-footer">
        <p className="cart-footer__text">Total: {addCurrency(total)}</p>
        <Button
          variant="success"
          className="m-0 card-footer__button"
          onClick={handlePlaceOrder}
          {...props}
        >
          Place order
        </Button>
      </Alert>
    </Offcanvas>
  )
}

export default Cart
