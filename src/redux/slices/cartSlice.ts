import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "../../types/cart"
import type { Product } from "../../types/product"

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        existingItem.quantity += quantity
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== product.id
          )
        }
      } else {
        state.items.push({ product, quantity })
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      )
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
