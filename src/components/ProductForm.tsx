import { useState, type FormEvent } from "react"
import type { Product } from "../types/product"

type Props = {
  initialData?: Product
  onSubmit: (product: Product) => void
}

export default function ProductForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name ?? "")
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  )
  const [price, setPrice] = useState(
    initialData?.price ?? 0
  )
  const [stock, setStock] = useState(
    initialData?.stock ?? 0
  )
  const [category, setCategory] = useState(
    initialData?.category ?? ""
  )
  const [image, setImage] = useState(
    initialData?.image ?? ""
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const product: Product = {
      id: initialData?.id ?? crypto.randomUUID(),
      name,
      description,
      price,
      stock,
      category,
      image,
    }

    onSubmit(product)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />

      <input
        className="border p-2 w-full"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? "Update Product" : "Add Product"}
      </button>
    </form>
  )
}
