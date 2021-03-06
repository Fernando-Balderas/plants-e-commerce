import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { User } from '../../types/types'
import axios from '../../helpers/axios/instance'

export interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loadUsers(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/users')
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload
      const index = state.users.findIndex((user) => user._id === id)
      if (index > -1) state.users[index].status = status
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action.payload
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { updateUserStatus } = usersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
