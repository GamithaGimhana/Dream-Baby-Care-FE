import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setProducts } from "../redux/slices/productSlice"
import ProductCard from "../components/ProductCard"
import type { Product } from "../types/product"

export default function Home() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.items)

  useEffect(() => {
    const demoProducts: Product[] = [
      {
        id: "1",
        name: "Baby Sleeping Bag",
        description: "Soft and warm sleeping bag for babies.",
        price: 4500,
        image: "https://via.placeholder.com/300",
        stock: 10,
        category: "Sleep",
      },
      {
        id: "2",
        name: "Feeding Pillow",
        description: "Comfortable pillow for feeding time.",
        price: 3200,
        image: "https://via.placeholder.com/300",
        stock: 0,
        category: "Feeding",
      },
    ]

    dispatch(setProducts(demoProducts))
  }, [dispatch])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
