import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Product } from '../../types/types'
import axios from '../../helpers/axios/instance'

export interface ProductsState {
  products: Product[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/products')
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: Partial<Product>) => {
    const response = await axios.post('/products', product)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string) => {
    await axios.delete(`/products/${productId}`)
    // The value we return becomes the `fulfilled` action payload
    return productId
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload as Product, ...state.products]
        state.status = 'idle'
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload
        )
        if (index > -1) state.products.splice(index, 1)
        state.status = 'idle'
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

// export const {} = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer
