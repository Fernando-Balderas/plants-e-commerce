import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import productsReducer from '../features/products/productsSlice'
import usersReducer from '../features/users/usersSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    products: productsReducer,
    cart: cartReducer,
  },
})

export type StoreDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type StoreThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
