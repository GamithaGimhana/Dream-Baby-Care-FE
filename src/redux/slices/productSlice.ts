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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload)
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (p) => p.id === action.payload.id
      )
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
  },
})

export const { setProducts, addProduct, updateProduct } = productSlice.actions
export default productSlice.reducer
