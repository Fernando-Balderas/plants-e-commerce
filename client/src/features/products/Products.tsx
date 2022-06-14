import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'

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
    let msg = 'Add'
    const index = cart.findIndex(
      (cartProduct: any) => cartProduct._id === product._id
    )
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

  return (
    <ListGroup>
      {products.length > 0 &&
        products.map((product) => (
          <ListGroup.Item as="li" key={product._id} className="list-group-item">
            <Link
              to={`/product/${product._id}`}
            >{`${product.name} - ${product.price}`}</Link>
            <Can
              perform="products:edit"
              yes={() => (
                <div className="list-group-item__options">
                  {cartButton(product, cart)}
                  <Button
                    variant="outline-warning"
                    className="mx-1"
                    aria-label="Edit product"
                    onClick={() => dispatch(setEditingProduct(product))}
                  >
                    <BiEdit size="1.2em" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="mx-1"
                    aria-label="Remove product"
                    onClick={() => dispatch(deleteProduct(product._id))}
                  >
                    <RiDeleteBin6Line size="1.2em" />
                  </Button>
                </div>
              )}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export default Products
