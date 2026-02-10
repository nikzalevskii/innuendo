import axios from 'axios'
import { CreateNoteDto, Note, UpdateNoteDto, PaginatedResponse } from '@innuendo/shared'

const API_BASE_URL = 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export const notesApi = {
  getAll: async (): Promise<PaginatedResponse<Note>> => {
    const response = await api.get('/notes')
    return response.data
  },

  getById: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`)
    return response.data
  },

  create: async (data: CreateNoteDto): Promise<Note> => {
    const response = await api.post('/notes', data)
    return response.data
  },

  update: async (id: string, data: UpdateNoteDto): Promise<Note> => {
    const response = await api.patch(`/notes/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`)
  },

  upload: async (file: File, title?: string): Promise<Note> => {
    const formData = new FormData()
    formData.append('file', file)
    if (title) {
      formData.append('title', title)
    }

    const response = await api.post('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000,
    })

    return response.data.note
  },
}

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health')
    return true
  } catch (error) {
    console.error('API Health Check Failed:', error)
    return false
  }
}
