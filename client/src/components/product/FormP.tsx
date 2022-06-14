import React from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
  let treeProps: object = { checked: true }
  let fruitProps: object = {}
  if (product !== null) {
    if (product.categories.find((category: string) => category === 'fruit')) {
      treeProps = {}
      fruitProps = { checked: true }
    }
  }

  const onSubmit = (data: any) => {
    data.categories = [data.categories]
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
        <Form.Group className="m-3">
          <Form.Check
            inline
            label="Tree"
            type="radio"
            value="tree"
            {...treeProps}
            {...register('categories')}
          />
          <Form.Check
            inline
            label="Fruit"
            type="radio"
            value="fruit"
            {...fruitProps}
            {...register('categories')}
          />
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
