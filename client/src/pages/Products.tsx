import { useForm } from 'react-hook-form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Can from '../helpers/Can'
import ModalP from '../components/product/ModalP'
import ProductsList from '../features/products/Products'
import { useStoreDispatch, useStoreSelector } from '../store/hooks'
import {
  selectFilters,
  selectShowForm,
  setFilters,
  setShowForm,
} from '../features/products/productsSlice'
import useQuery from '../hooks/useQuery'
import { useEffect, useState } from 'react'

function Products() {
  const dispatch = useStoreDispatch()
  const showForm = useStoreSelector(selectShowForm)
  const filters = useStoreSelector(selectFilters)
  const query = useQuery()
  const { register, handleSubmit } = useForm()
  console.log('query ', query.get('filter'))
  const [check, setCheck] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    setCheck(filters)
  }, [filters])

  const onSubmitFilters = (data: any) => dispatch(setFilters(data))

  return (
    <>
      <h1 className="page-title">Products</h1>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="filter-options">
            <Form
              onSubmit={handleSubmit(onSubmitFilters)}
              className="filters-form"
            >
              <Form.Group className="me-3">
                <Form.Check
                  type="checkbox"
                  label="Tree"
                  {...register('tree')}
                  checked={check.tree || false}
                  onClick={() => setCheck({ ...check, tree: !check.tree })}
                />
              </Form.Group>
              <Form.Group className="me-3">
                <Form.Check
                  type="checkbox"
                  label="Fruit"
                  {...register('fruit')}
                  checked={check.fruit || false}
                  onClick={() => setCheck({ ...check, fruit: !check.fruit })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Filter
              </Button>
            </Form>
            {!showForm && (
              <Can
                perform="products:create"
                yes={() => (
                  <Button
                    variant="success"
                    onClick={() => dispatch(setShowForm(true))}
                  >
                    New Product
                  </Button>
                )}
              />
            )}
          </div>
        </Col>
        <Col md={8}>
          <ProductsList />
        </Col>
      </Row>
      <ModalP />
    </>
  )
}

export default Products
