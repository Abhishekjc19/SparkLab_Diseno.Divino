import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Submission types
export interface SubmissionFile {
  id: string
  name: string
  type: string
  size: number
  url?: string
  uploadProgress?: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
}

export interface Submission {
  id?: string
  teamId: string
  files: {
    presentation?: SubmissionFile
    demo?: SubmissionFile
    documentation?: SubmissionFile
    sourceCode?: SubmissionFile
  }
  metadata: {
    projectTitle: string
    description: string
    technologies: string[]
    teamMembers: Array<{
      id: string
      name: string
      role: string
    }>
  }
  submissionTime?: string
  status: 'draft' | 'submitted' | 'under_review' | 'evaluated'
  score?: number
  feedback?: string
}

export interface SubmissionState {
  currentSubmission: Submission | null
  submissions: Submission[]
  uploadProgress: { [fileId: string]: number }
  isLoading: boolean
  isUploading: boolean
  error: string | null
}

const initialState: SubmissionState = {
  currentSubmission: null,
  submissions: [],
  uploadProgress: {},
  isLoading: false,
  isUploading: false,
  error: null,
}

// Async thunks
export const fetchSubmission = createAsyncThunk(
  'submission/fetch',
  async (teamId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/v1/submissions/team/${teamId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch submission')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const saveSubmissionDraft = createAsyncThunk(
  'submission/saveDraft',
  async (submissionData: Partial<Submission>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/v1/submissions/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to save draft')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const submitProject = createAsyncThunk(
  'submission/submit',
  async (submissionId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/v1/submissions/${submissionId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to submit project')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const uploadFile = createAsyncThunk(
  'submission/uploadFile',
  async (
    { file, fileType, submissionId }: { file: File; fileType: string; submissionId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileType', fileType)
      formData.append('submissionId', submissionId)

      const response = await fetch('/api/v1/submissions/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to upload file')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    updateSubmissionMetadata: (state, action: PayloadAction<Partial<Submission['metadata']>>) => {
      if (state.currentSubmission) {
        state.currentSubmission.metadata = {
          ...state.currentSubmission.metadata,
          ...action.payload,
        }
      }
    },
    setUploadProgress: (state, action: PayloadAction<{ fileId: string; progress: number }>) => {
      state.uploadProgress[action.payload.fileId] = action.payload.progress
    },
    addFileToSubmission: (state, action: PayloadAction<{ fileType: keyof Submission['files']; file: SubmissionFile }>) => {
      if (state.currentSubmission) {
        state.currentSubmission.files[action.payload.fileType] = action.payload.file
      }
    },
    removeFileFromSubmission: (state, action: PayloadAction<keyof Submission['files']>) => {
      if (state.currentSubmission) {
        delete state.currentSubmission.files[action.payload]
      }
    },
    clearError: (state) => {
      state.error = null
    },
    resetSubmission: (state) => {
      state.currentSubmission = null
      state.uploadProgress = {}
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmission.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentSubmission = action.payload
        state.error = null
      })
      .addCase(fetchSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(saveSubmissionDraft.fulfilled, (state, action) => {
        state.currentSubmission = action.payload
      })
      .addCase(submitProject.fulfilled, (state, action) => {
        state.currentSubmission = action.payload
      })
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isUploading = false
        const { fileType, fileData } = action.payload
        if (state.currentSubmission) {
          state.currentSubmission.files[fileType] = fileData
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isUploading = false
        state.error = action.payload as string
      })
  },
})

export const {
  updateSubmissionMetadata,
  setUploadProgress,
  addFileToSubmission,
  removeFileFromSubmission,
  clearError,
  resetSubmission,
} = submissionSlice.actions

export default submissionSlice.reducer