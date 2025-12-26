import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { logout } from "../redux/slices/authSlice"

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const cartItems = useAppSelector((state) => state.cart.items)

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header>
      <Link to="/cart" className="relative">
        <span className="text-xl">🛒</span>

        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        )}
      </Link>
      {user?.roles.includes("ADMIN") && (
        <Link to="/admin">Admin</Link>
      )}
      {user && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  )
}
