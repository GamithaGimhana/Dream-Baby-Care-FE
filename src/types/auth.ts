export type Role = "ADMIN" | "USER"

export type User = {
  id: string
  email: string
  name: string
  roles: Role[]
}
