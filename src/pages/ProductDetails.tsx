import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addToCart } from "../redux/slices/cartSlice"

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.id === id)
  )

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div className="p-6">Product not found.</div>
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      // dispatch(addToCart(product))
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-2xl font-semibold mb-2">
          Rs. {product.price}
        </p>

        <p className="mb-4">
          Stock:{" "}
          <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? "Available" : "Out of stock"}
          </span>
        </p>

        <div className="flex items-center gap-4 mb-6">
          <label>Quantity:</label>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border px-3 py-1 w-20"
          />
        </div>

        <button
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
