import { useAppDispatch } from "../redux/hooks"
import { addToCart } from "../redux/slices/cartSlice"
import type { Product } from "../types/product"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
    const dispatch = useAppDispatch()
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-blue-600">
            Rs. {product.price}
          </span>

          <button
            disabled={product.stock === 0}
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
