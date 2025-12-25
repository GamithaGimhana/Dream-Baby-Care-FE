import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addProduct, updateProduct, deleteProduct } from "../redux/slices/productSlice"
import ProductForm from "../components/ProductForm"
import ConfirmModal from "../components/ConfirmModal"
import type { Product } from "../types/product"


export default function AdminDashboard() {
  const products = useAppSelector((state) => state.products.items)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">Rs. {product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        className="text-blue-600"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => setDeleteId(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              <ProductForm
                initialData={editingProduct ?? undefined}
                onSubmit={(product) => {
                  if (editingProduct) {
                    // dispatch(updateProduct(product))
                    setEditingProduct(null)
                  } else {
                    // dispatch(addProduct(product))
                  }
                }}
              />
            </section>
            {deleteId && (
              <ConfirmModal
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                  // dispatch(deleteProduct(deleteId))
                  setDeleteId(null)
                }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  )
}
