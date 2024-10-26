// src/lib/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: number) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: number, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
}

export const cloudApi = {
  getFiles: () => api.get('/cloud/files'),
  uploadFile: (formData: FormData) => api.post('/cloud/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteFile: (id: number) => api.delete(`/cloud/files/${id}`),
}

export const catalogApi = {
  getItems: () => api.get('/catalog'),
  getItemById: (id: number) => api.get(`/catalog/${id}`),
  createItem: (data: any) => api.post('/catalog', data),
  updateItem: (id: number, data: any) => api.put(`/catalog/${id}`, data),
  deleteItem: (id: number) => api.delete(`/catalog/${id}`),
}

export default api