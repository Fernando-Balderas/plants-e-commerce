import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Can from '../helpers/Can'
import ModalP from '../components/product/ModalP'
import ProductsList from '../features/products/Products'
import { useStoreDispatch, useStoreSelector } from '../store/hooks'
import { selectShowForm, setShowForm } from '../features/products/productsSlice'

function Products() {
  const dispatch = useStoreDispatch()
  const showForm = useStoreSelector(selectShowForm)

  return (
    <>
      <h1>Products</h1>
      {!showForm && (
        <Can
          perform="products:create"
          yes={() => (
            <Button
              variant="success"
              className="mx-1"
              onClick={() => dispatch(setShowForm(true))}
            >
              New Product
            </Button>
          )}
        />
      )}
      <ModalP />

      <Row className="justify-content-md-center">
        <Col md={8}>
          <ProductsList />
        </Col>
      </Row>
    </>
  )
}

export default Products
