import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Product } from '../../types/types'
// import axios from '../../helpers/axios/instance'

export interface CartState {
  cart: Product[]
  status: 'idle' | 'loading' | 'failed'
  showCart: boolean
}

const initialState: CartState = {
  cart: [],
  status: 'idle',
  showCart: false,
}

// export const createOrder = createAsyncThunk('orders/createOrder', async (order: Partial<Order>) => {
//   const response = await axios.post('/orders', order)
//   // The value we return becomes the `fulfilled` action payload
//   return response.data
// })

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart = [action.payload, ...state.cart]
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        (product) => product._id === action.payload
      )
      if (index > -1) state.cart.splice(index, 1)
    },
    setShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createOrder.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(createOrder.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.users = action.payload
  //     })
  //     .addCase(createOrder.rejected, (state) => {
  //       state.status = 'failed'
  //     })
  // },
})

export const { addToCart, removeFromCart, setShowCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart
export const selectShowCart = (state: RootState) => state.cart.showCart

export default cartSlice.reducer
