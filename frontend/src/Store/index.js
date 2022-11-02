import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = !state
    },
  },
})

export const authActions = authSlice.actions

export const store = configureStore({
  reducer: authSlice.reducer,
})
