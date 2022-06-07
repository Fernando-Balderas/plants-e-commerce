import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
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
