import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'

import Can from '../../helpers/Can'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import {
  deleteProduct,
  fetchProducts,
  selectFilteredProducts,
  selectIsFilterActive,
  selectProducts,
  setEditingProduct,
} from './productsSlice'
import AddToCartButton from '../../components/product/AddToCartButton'
import addCurrency from '../../util/addCurrency'

function Products() {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const allProducts = useStoreSelector(selectProducts)
  const filteredProducts = useStoreSelector(selectFilteredProducts)
  const isFilterActive = useStoreSelector(selectIsFilterActive)

  const products = isFilterActive ? filteredProducts : allProducts

  return (
    <ListGroup>
      {products.length > 0 &&
        products.map((product) => (
          <ListGroup.Item as="li" key={product._id} className="list-group-item">
            <div>
              <Link to={`/product/${product._id}`}>{product.name}</Link>
              <Badge bg="secondary" className="product-price">
                {addCurrency(product.price)}
              </Badge>
            </div>
            <Can
              perform="products:edit"
              yes={() => (
                <div className="list-group-item__options">
                  <AddToCartButton product={product} />
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
