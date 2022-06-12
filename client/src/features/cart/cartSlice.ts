import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Product } from '../../types/types'
import axios from '../../helpers/axios/instance'

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

// export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('/users')
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
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loadUsers.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(loadUsers.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.users = action.payload
  //     })
  //     .addCase(loadUsers.rejected, (state) => {
  //       state.status = 'failed'
  //     })
  // },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart
export const selectShowCart = (state: RootState) => state.cart.showCart

export default cartSlice.reducer
