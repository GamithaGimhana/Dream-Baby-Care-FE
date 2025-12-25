import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { removeFromCart, clearCart } from "../redux/slices/cartSlice"

export default function Cart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.product.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <h3 className="font-semibold">{item.product.name}</h3>
            <p>Qty: {item.quantity}</p>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Rs. {item.product.price * item.quantity}
            </span>
            <button
              onClick={() => dispatch(removeFromCart(item.product.id))}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <strong>Total: Rs. {total}</strong>
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
