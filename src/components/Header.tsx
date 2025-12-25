import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { logout } from "../redux/slices/authSlice"

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header>
      {user && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
      {user?.roles.includes("ADMIN") && (
        <Link to="/admin">Admin</Link>
      )}
    </header>
  )
}
