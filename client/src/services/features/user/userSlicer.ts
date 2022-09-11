import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../models/user'
import axios from 'axios'

const config = {
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
}

// async actions
export const loginUserThunk = createAsyncThunk('user/loginUser', async ({ username, password }: {username: string, password: string}) => {
  try {
    const { data } = await axios.post('http://localhost:3001/loginUser', { username, password }, config)
    console.log(data)
    if (data.errors) return { errors: data.errors }
    if (data.username && data.notes) {
      localStorage.setItem('user', JSON.stringify(data))
      return { notes: data.notes, username: data.username }
    }
  } catch (error) {
    return { errors: ['server error'] }
  }
})

export const createUserThunk = createAsyncThunk('user/createUser', async ({ username, password, repeatPassword }: {username: string, password: string, repeatPassword: string}) => {
  try {
    const { data } = await axios.post('http://localhost:3001/createUser', { username, password, repeatPassword }, config)
    if (data.errors) return { errors: data.errors }
    if (data.username && data.notes) {
      localStorage.setItem('user', JSON.stringify(data))
      return { notes: data.notes, username: data.username }
    }
  } catch (error) {
    return { errors: ['server Error'] }
  }
})

export interface UserType{
  user: User
  loading: boolean
  errors: string[]
}

const initialState: UserType = {
  user: { username: '', notes: [] },
  loading: false,
  errors: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      action.payload?.errors ? state.errors = action.payload.errors : state.user = { username: action.payload?.username, notes: action.payload?.notes }
    })
    builder.addCase(createUserThunk.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })

    builder.addCase(loginUserThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      action.payload?.errors ? state.errors = action.payload.errors : state.user = { username: action.payload?.username, notes: action.payload?.notes }
    })
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })
  }

})

export default userSlice.reducer
