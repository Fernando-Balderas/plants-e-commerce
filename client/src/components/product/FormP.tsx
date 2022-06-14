import React from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
  createProduct,
  selectEditingProduct,
  setEditingProduct,
  setShowForm,
  updateProduct,
} from '../../features/products/productsSlice'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'

function FormP({ title = '' }: any) {
  const dispatch = useStoreDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const product = useStoreSelector(selectEditingProduct)

  const onSubmit = (data: any) => {
    if (!product) dispatch(createProduct(data))
    else {
      const update = { ...product, ...data }
      dispatch(updateProduct(update))
      dispatch(setEditingProduct(null))
    }
    dispatch(setShowForm(false))
  }

  const handleCancel = () => {
    if (product !== null) dispatch(setEditingProduct(null))
    dispatch(setShowForm(false))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <fieldset>
        <legend>{title}</legend>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            {...register('name', { required: true })}
            defaultValue={product?.name || ''}
          />
          {errors.name && <span>This field is required</span>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            type="text"
            {...register('price', { required: true })}
            defaultValue={product?.price || ''}
          />
          {errors.price && <span>This field is required</span>}
        </Form.Group>
        <div className="product-form__footer">
          <Button variant="secondary" onClick={handleCancel} className="px-4">
            Cancel
          </Button>
          <Button variant="success" type="submit" className="px-4">
            Submit
          </Button>
        </div>
      </fieldset>
    </Form>
  )
}

export default FormP
