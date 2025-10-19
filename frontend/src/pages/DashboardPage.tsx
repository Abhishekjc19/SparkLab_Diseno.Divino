import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '../store/store'
import { fetchDashboardData } from '../store/slices/dashboardSlice'
import { Clock, Users, Trophy, Upload, Calendar, AlertCircle } from 'lucide-react'

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { currentPhase, eventPhases, teamProgress, announcements, stats, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  )

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchDashboardData(user.id))
    }
  }, [dispatch, user?.id])

  const currentPhaseData = eventPhases.find(phase => phase.status === 'active') || eventPhases[1]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold gradient-text">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-text-secondary mt-1">
              Ready to create something amazing? Let's make SparkLab 2025 unforgettable.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-text-secondary">Your Role</p>
                <p className="font-semibold capitalize text-primary-400">
                  {user?.role.toLowerCase().replace('_', ' ')}
                </p>
              </div>
              {user?.teamId && (
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Team ID</p>
                  <p className="font-semibold text-accent-gold">#{user.teamId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalParticipants}</p>
                <p className="text-sm text-text-secondary">Participants</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-electric-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-electric-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalTeams}</p>
                <p className="text-sm text-text-secondary">Teams</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neon-600/20 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-neon-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.submissionsCount}</p>
                <p className="text-sm text-text-secondary">Submissions</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-emerald/20 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
                <p className="text-sm text-text-secondary">Online Now</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-primary-400" />
              <h2 className="text-xl font-heading font-bold">Event Timeline</h2>
            </div>
            
            <div className="space-y-4">
              {eventPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`relative flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    phase.status === 'active'
                      ? 'bg-primary-600/10 border border-primary-500/20'
                      : phase.status === 'completed'
                      ? 'bg-accent-emerald/10 border border-accent-emerald/20'
                      : 'bg-dark-card/50 border border-dark-border'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      phase.status === 'active'
                        ? 'bg-primary-500 animate-pulse'
                        : phase.status === 'completed'
                        ? 'bg-accent-emerald'
                        : 'bg-text-secondary'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{phase.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          phase.status === 'active'
                            ? 'bg-primary-600/20 text-primary-400'
                            : phase.status === 'completed'
                            ? 'bg-accent-emerald/20 text-accent-emerald'
                            : 'bg-text-secondary/20 text-text-secondary'
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.checkpoints.map((checkpoint, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-dark-card rounded-full text-text-secondary"
                        >
                          {checkpoint}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Current Phase */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-accent-gold" />
              <h3 className="font-heading font-bold">Current Phase</h3>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">{currentPhaseData.name}</h4>
              <div className="bg-accent-gold/20 text-accent-gold px-4 py-2 rounded-lg mb-4">
                <p className="text-sm">Phase Active</p>
                <p className="text-xl font-mono font-bold">23:45:30</p>
              </div>
              <p className="text-sm text-text-secondary">{currentPhaseData.description}</p>
            </div>
          </div>

          {/* Announcements */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-accent-rose" />
              <h3 className="font-heading font-bold">Latest Announcements</h3>
            </div>
            <div className="space-y-3">
              {announcements.length > 0 ? (
                announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`p-3 rounded-lg text-sm ${
                      announcement.type === 'warning'
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                        : announcement.type === 'error'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : announcement.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}
                  >
                    <p className="font-medium mb-1">{announcement.title}</p>
                    <p className="text-xs opacity-80">{announcement.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-text-secondary text-sm">No announcements yet.</p>
              )}
            </div>
          </div>

          {/* Team Progress */}
          {teamProgress && (
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-heading font-bold mb-4">Team Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Progress</span>
                  <span className="font-bold text-primary-400">{teamProgress.progress}%</span>
                </div>
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-electric-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${teamProgress.progress}%` }}
                  />
                </div>
                <div className="text-xs text-text-secondary">
                  <p>Team: {teamProgress.teamName}</p>
                  <p>Current Phase: {teamProgress.currentPhase}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage