import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Dashboard types
export interface EventPhase {
  id: string
  name: string
  description: string
  startTime: string
  endTime: string
  status: 'upcoming' | 'active' | 'completed'
  checkpoints: string[]
}

export interface TeamProgress {
  teamId: string
  teamName: string
  completedCheckpoints: string[]
  currentPhase: string
  progress: number
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  isGlobal: boolean
  targetRoles?: string[]
}

export interface DashboardStats {
  totalParticipants: number
  totalTeams: number
  submissionsCount: number
  activeUsers: number
}

export interface DashboardState {
  eventPhases: EventPhase[]
  currentPhase: EventPhase | null
  teamProgress: TeamProgress | null
  announcements: Announcement[]
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  eventPhases: [
    {
      id: '1',
      name: 'Registration & Team Formation',
      description: 'Check-in, team assignment, and kit distribution',
      startTime: '2025-10-24T09:00:00Z',
      endTime: '2025-10-24T11:00:00Z',
      status: 'completed',
      checkpoints: ['Check-in', 'Team Assignment', 'Kit Distribution']
    },
    {
      id: '2',
      name: 'Problem Statement Release',
      description: 'Problem reveal and Q&A session',
      startTime: '2025-10-24T11:00:00Z',
      endTime: '2025-10-24T12:00:00Z',
      status: 'active',
      checkpoints: ['Problem Reveal', 'Q&A Session']
    },
    {
      id: '3',
      name: 'Design & Development Phase',
      description: 'Ideation, prototyping, testing, and refinement',
      startTime: '2025-10-24T12:00:00Z',
      endTime: '2025-10-25T12:00:00Z',
      status: 'upcoming',
      checkpoints: ['Ideation', 'Prototyping', 'Testing', 'Refinement']
    },
    {
      id: '4',
      name: 'Submission Phase',
      description: 'File upload and presentation preparation',
      startTime: '2025-10-25T12:00:00Z',
      endTime: '2025-10-25T14:00:00Z',
      status: 'upcoming',
      checkpoints: ['File Upload', 'Presentation Prep']
    },
    {
      id: '5',
      name: 'Presentation & Judging',
      description: 'Team presentations, judging, and results',
      startTime: '2025-10-25T14:00:00Z',
      endTime: '2025-10-25T18:00:00Z',
      status: 'upcoming',
      checkpoints: ['Presentations', 'Judging', 'Results']
    }
  ],
  currentPhase: null,
  teamProgress: null,
  announcements: [],
  stats: null,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/v1/dashboard/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch dashboard data')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchAnnouncements = createAsyncThunk(
  'dashboard/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/v1/announcements', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch announcements')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateCurrentPhase: (state, action: PayloadAction<EventPhase>) => {
      state.currentPhase = action.payload
    },
    addAnnouncement: (state, action: PayloadAction<Announcement>) => {
      state.announcements.unshift(action.payload)
    },
    updatePhaseStatus: (state, action: PayloadAction<{ phaseId: string; status: EventPhase['status'] }>) => {
      const phase = state.eventPhases.find(p => p.id === action.payload.phaseId)
      if (phase) {
        phase.status = action.payload.status
      }
    },
    updateTeamProgress: (state, action: PayloadAction<TeamProgress>) => {
      state.teamProgress = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPhase = action.payload.currentPhase
        state.teamProgress = action.payload.teamProgress
        state.stats = action.payload.stats
        state.error = null
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload
      })
  },
})

export const {
  updateCurrentPhase,
  addAnnouncement,
  updatePhaseStatus,
  updateTeamProgress,
  clearError,
} = dashboardSlice.actions

export default dashboardSlice.reducer