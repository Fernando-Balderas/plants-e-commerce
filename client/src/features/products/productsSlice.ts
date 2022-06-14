import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Product } from '../../types/types'
import axios from '../../helpers/axios/instance'

type Filters = {
  [key: string]: boolean
}

export interface ProductsState {
  products: Product[]
  status: 'idle' | 'loading' | 'failed'
  editingProduct: Product | null
  showForm: boolean
  filters: Filters
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  editingProduct: null,
  showForm: false,
  filters: {},
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Partial<Product>) => {
    const response = await axios.put(`/products/${product._id}`, product)
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
  reducers: {
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload
    },
    setEditingProduct: (state, action: PayloadAction<Product | null>) => {
      state.editingProduct = action.payload
      state.showForm = true
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload
    },
  },
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
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        )
        if (index > -1) state.products[index] = action.payload
        state.status = 'idle'
      })
      .addCase(updateProduct.rejected, (state) => {
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

export const { setShowForm, setEditingProduct, setFilters } =
  productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products
export const selectShowForm = (state: RootState) => state.products.showForm
export const selectEditingProduct = (state: RootState) =>
  state.products.editingProduct
export const selectFilters = (state: RootState) => state.products.filters
export const selectIsFilterActive = (state: RootState) =>
  Object.values(state.products.filters).find((filter) => filter === true)
export const selectFilteredProducts = (state: RootState) => {
  const filters: string[] = []
  Object.entries(
    state.products.filters as { tree: boolean; fruit: boolean }
  ).forEach(([k, v]) => {
    if (v) filters.push(k)
  })
  return state.products.products.filter((product) =>
    product.categories.find((category) => filters.includes(category))
  )
}
export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find((product) => product._id === productId)

export default productsSlice.reducer
