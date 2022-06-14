import React from 'react'
import { useForm } from 'react-hook-form'
import {
  createProduct,
  selectEditingProduct,
  setEditingProduct,
  setShowForm,
  updateProduct,
} from '../../features/products/productsSlice'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'

function Form({ title = '' }: any) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>{title}</legend>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            defaultValue={product?.name || ''}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            {...register('price', { required: true })}
            defaultValue={product?.price || ''}
          />
          {errors.price && <span>This field is required</span>}
        </div>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  )
}

export default Form
