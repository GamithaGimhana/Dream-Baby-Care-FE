// src/redux/slices/productSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type Product = {
  id: string
  name: string
  price: number
  image: string
}

type ProductState = {
  list: Product[]
}

const initialState: ProductState = {
  list: [],
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
