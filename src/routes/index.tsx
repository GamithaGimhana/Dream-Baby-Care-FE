import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAppSelector } from '../redux/hooks'
import type { Role } from "../types/auth"

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))

type RequireAuthTypes = {
  children: ReactNode
  roles?: Role[]
}

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.some((role) => user.roles.includes(role))) {
    return (
      <div className="p-6 text-center">
        <h2>Access Denied</h2>
      </div>
    )
  }

  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth roles={['ADMIN']}>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
