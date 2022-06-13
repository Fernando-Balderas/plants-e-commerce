import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Order } from '../../types/types'
import axios from '../../helpers/axios/instance'
import { clearCart } from '../cart/cartSlice'

export interface ProductsState {
  orders: Order[]
  status: 'idle' | 'loading' | 'failed'
  editingOrder: Order | null
}

const initialState: ProductsState = {
  orders: [],
  status: 'idle',
  editingOrder: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('/orders')
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order: Partial<Order>, { dispatch }) => {
    console.log('into createOrder ', order)
    const response = await axios.post('/orders', order)
    console.log('response ', response)
    if (response.status === 200) dispatch(clearCart())
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (product: Partial<Order>) => {
    const response = await axios.put(`/orders/${product._id}`, product)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const productsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setEditingOrder: (state, action: PayloadAction<Order | null>) => {
      state.editingOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [action.payload as Order, ...state.orders]
        state.status = 'idle'
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (product) => product._id === action.payload._id
        )
        if (index > -1) state.orders[index] = action.payload
        state.status = 'idle'
      })
      .addCase(updateOrder.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setEditingOrder } = productsSlice.actions

export const selectOrders = (state: RootState) => state.orders.orders
export const selectEditingOrder = (state: RootState) =>
  state.orders.editingOrder

export default productsSlice.reducer
