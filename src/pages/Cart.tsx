import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addToCart, removeFromCart, clearCart } from "../redux/slices/cartSlice"

export default function Cart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center border p-4 rounded"
          >
            {/* Product Info */}
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-sm text-gray-600">
                Rs. {item.product.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      product: item.product,
                      quantity: -1,
                    })
                  )
                }
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <span className="font-medium">{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      product: item.product,
                      quantity: 1,
                    })
                  )
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* Price + Remove */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">
                Rs. {item.product.price * item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.product.id))
                }
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: Rs. {total}
        </h2>

        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
