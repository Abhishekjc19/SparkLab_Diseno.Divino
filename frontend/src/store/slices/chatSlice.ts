import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Chat types
export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  channelId: string
  message: string
  timestamp: string
  type: 'text' | 'file' | 'announcement'
  fileUrl?: string
  fileName?: string
  reactions?: { emoji: string; users: string[] }[]
}

export interface ChatChannel {
  id: string
  name: string
  type: 'global' | 'team' | 'organizer'
  participants: string[]
  isPrivate: boolean
  lastMessage?: ChatMessage
  unreadCount: number
}

export interface OnlineUser {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'away' | 'busy'
  lastSeen: string
}

export interface ChatState {
  channels: ChatChannel[]
  activeChannel: ChatChannel | null
  messages: { [channelId: string]: ChatMessage[] }
  onlineUsers: OnlineUser[]
  isConnected: boolean
  isLoading: boolean
  error: string | null
  typing: { [channelId: string]: string[] }
}

const initialState: ChatState = {
  channels: [],
  activeChannel: null,
  messages: {},
  onlineUsers: [],
  isConnected: false,
  isLoading: false,
  error: null,
  typing: {},
}

// Async thunks
export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/v1/chat/channels', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch channels')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (channelId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/v1/chat/channels/${channelId}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch messages')
      }

      const messages = await response.json()
      return { channelId, messages }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData: { channelId: string; message: string; type?: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/v1/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to send message')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChannel: (state, action: PayloadAction<ChatChannel>) => {
      state.activeChannel = action.payload
      // Mark channel as read
      const channel = state.channels.find(c => c.id === action.payload.id)
      if (channel) {
        channel.unreadCount = 0
      }
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      const message = action.payload
      if (!state.messages[message.channelId]) {
        state.messages[message.channelId] = []
      }
      state.messages[message.channelId].push(message)
      
      // Update channel's last message
      const channel = state.channels.find(c => c.id === message.channelId)
      if (channel) {
        channel.lastMessage = message
        // Increment unread count if not active channel
        if (!state.activeChannel || state.activeChannel.id !== message.channelId) {
          channel.unreadCount += 1
        }
      }
    },
    updateOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    addTypingUser: (state, action: PayloadAction<{ channelId: string; userId: string }>) => {
      const { channelId, userId } = action.payload
      if (!state.typing[channelId]) {
        state.typing[channelId] = []
      }
      if (!state.typing[channelId].includes(userId)) {
        state.typing[channelId].push(userId)
      }
    },
    removeTypingUser: (state, action: PayloadAction<{ channelId: string; userId: string }>) => {
      const { channelId, userId } = action.payload
      if (state.typing[channelId]) {
        state.typing[channelId] = state.typing[channelId].filter(id => id !== userId)
      }
    },
    addReaction: (state, action: PayloadAction<{ messageId: string; channelId: string; emoji: string; userId: string }>) => {
      const { messageId, channelId, emoji, userId } = action.payload
      const messages = state.messages[channelId]
      if (messages) {
        const message = messages.find(m => m.id === messageId)
        if (message) {
          if (!message.reactions) {
            message.reactions = []
          }
          const existingReaction = message.reactions.find(r => r.emoji === emoji)
          if (existingReaction) {
            if (!existingReaction.users.includes(userId)) {
              existingReaction.users.push(userId)
            }
          } else {
            message.reactions.push({ emoji, users: [userId] })
          }
        }
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isLoading = false
        state.channels = action.payload
        state.error = null
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { channelId, messages } = action.payload
        state.messages[channelId] = messages
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload
        if (!state.messages[message.channelId]) {
          state.messages[message.channelId] = []
        }
        state.messages[message.channelId].push(message)
      })
  },
})

export const {
  setActiveChannel,
  addMessage,
  updateOnlineUsers,
  setConnectionStatus,
  addTypingUser,
  removeTypingUser,
  addReaction,
  clearError,
} = chatSlice.actions

export default chatSlice.reducer