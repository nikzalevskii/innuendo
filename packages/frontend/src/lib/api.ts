import axios from "axios";
import { CreateNoteDto, Note, UpdateNoteDto } from "./types";

const API_BASE_URL = "http://localhost:3001/api";

// Создаём экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API методы для заметок
export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const response = await api.get("/notes");
    return response.data;
  },

  // Получить заметку по ID
  getById: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Создать заметку
  create: async (data: CreateNoteDto): Promise<Note> => {
    const response = await api.post("/notes", data);
    return response.data;
  },

  // Обновить заметку
  update: async (id: string, data: UpdateNoteDto): Promise<Note> => {
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },

  // Удалить заметку
  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get("/health");
    return true;
  } catch (error) {
    console.error("API Health Check Failed:", error);
    return false;
  }
};
