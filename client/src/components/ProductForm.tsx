import React from 'react'
import { useForm } from 'react-hook-form'

function ProductForm({ handleNewProduct }: any) {
  console.log('func ', handleNewProduct)
  console.log('func ', typeof handleNewProduct)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(handleNewProduct)}>
      <fieldset>
        <legend>Product Form</legend>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" {...register('price', { required: true })} />
          {errors.price && <span>This field is required</span>}
        </div>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  )
}

export default ProductForm
