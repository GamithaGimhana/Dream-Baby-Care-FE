import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { setUser } from "../redux/slices/authSlice"
import type { User } from "../types/auth"

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const user: User = {
        id: "1",
        email,
        name: "Demo User",
        roles: email.includes("admin") ? ["ADMIN"] : ["USER"],
    }

    dispatch(setUser(user))
    navigate(user.roles.includes("ADMIN") ? "/admin" : "/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
