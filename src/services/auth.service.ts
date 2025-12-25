import type { User, Role } from "../types/auth"

type RegisterInput = {
  name: string
  email: string
  password: string
  role: Role
}

export const fakeLogin = async (
  email: string,
  password: string
): Promise<User> => {
  await new Promise((res) => setTimeout(res, 500))

  return {
    id: "u1",
    email,
    name: "Demo User",
    roles: email.includes("admin") ? ["ADMIN"] : ["USER"], 
  }
}

export const fakeRegister = async (
  data: RegisterInput
): Promise<User> => {
  await new Promise((res) => setTimeout(res, 500))

  return {
    id: "u2",
    email: data.email,
    name: data.name,
    roles: [data.role], 
  }
}
