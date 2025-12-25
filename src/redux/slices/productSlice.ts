import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../../types/product"

type ProductState = {
  items: Product[]
}

const initialState: ProductState = {
  items: [],
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
