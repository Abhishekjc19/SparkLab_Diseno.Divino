import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store/store'
import { refreshToken } from './store/slices/authSlice'

// Components
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import SubmissionPage from './pages/SubmissionPage'
import LeaderboardPage from './pages/LeaderboardPage'
import ProfilePage from './pages/ProfilePage'
import LoadingSpinner from './components/common/LoadingSpinner'

// Protected Route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Public Route component (redirect if already authenticated)
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { token, isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Try to refresh token on app start
    if (token) {
      dispatch(refreshToken())
    }
  }, [dispatch, token])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="submission" element={<SubmissionPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

export default App