
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store/store'
import { logoutUser } from '../../store/slices/authSlice'
import { Bell, User, LogOut } from 'lucide-react'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-dark-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold gradient-text">
              SparkLab 2025
            </h1>
            <p className="text-xs text-text-secondary">NMIT Design Challenge</p>
          </div>
        </Link>

        {/* Center - Event Timer */}
        <div className="hidden md:flex items-center space-x-4 glass-card px-4 py-2 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-text-secondary">Event Ends In</p>
            <p className="text-lg font-mono font-bold text-accent-gold">
              23:45:30
            </p>
          </div>
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-dark-card rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-rose rounded-full text-xs"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-text-secondary capitalize">{user?.role.toLowerCase()}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-dark-card rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header