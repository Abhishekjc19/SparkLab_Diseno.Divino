import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { 
  LayoutDashboard, 
  MessageCircle, 
  Upload, 
  Trophy, 
  User,
  Settings,
  HelpCircle
} from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  roles?: string[]
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Chat',
    href: '/chat',
    icon: MessageCircle,
  },
  {
    name: 'Submission',
    href: '/submission',
    icon: Upload,
    roles: ['PARTICIPANT', 'TEAM_LEAD']
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    icon: Trophy,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
]

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const filteredNavigation = navigation.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  )

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 glass-card border-r border-dark-border">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-card'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-dark-border">
          <div className="space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-dark-card rounded-lg transition-all duration-300 w-full">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            
            <button className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-dark-card rounded-lg transition-all duration-300 w-full">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help</span>
            </button>
          </div>

          {/* Event Status */}
          <div className="mt-4 p-3 glass-card rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-secondary">Event Status</p>
                <p className="text-sm font-semibold text-accent-emerald">Live</p>
              </div>
              <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar