import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { setUser } from "../redux/slices/authSlice"
import type { Role, User } from "../types/auth"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const user: User = {
        id: "2",
        email,
        name,
        roles: ["USER"],
    }

    dispatch(setUser(user))
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  )
}
