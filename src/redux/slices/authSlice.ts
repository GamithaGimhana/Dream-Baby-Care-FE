// src/redux/slices/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type User = {
  id: string
  email: string
  roles: string[]
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
