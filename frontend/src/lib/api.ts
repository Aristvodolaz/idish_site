import axios from 'axios';

// In browser: use same host as page (so IP access works); else use env or localhost
function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || `http://${window.location.hostname}:4000/api`;
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
}
const API_URL = getApiUrl();

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    interfaceLang?: string;
  }) => api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

// Users API
export const usersApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/me', data),
};

// Lessons API
export const lessonsApi = {
  getAll: (params?: any) => api.get('/lessons', { params }),
  getById: (id: string) => api.get(`/lessons/${id}`),
  getByType: (type: string) => api.get(`/lessons/type/${type}`),
};

// Words API
export const wordsApi = {
  getAll: (params?: any) => api.get('/words', { params }),
  getById: (id: string) => api.get(`/words/${id}`),
  getRandom: (count: number, level?: number) =>
    api.get(`/words/random/${count}`, { params: { level } }),
};

// Phrases API
export const phrasesApi = {
  getAll: (params?: any) => api.get('/phrases', { params }),
  getById: (id: string) => api.get(`/phrases/${id}`),
};

// Grammar API
export const grammarApi = {
  getAll: (params?: any) => api.get('/grammar', { params }),
  getById: (id: string) => api.get(`/grammar/${id}`),
};

// Letters API (Hebrew alphabet)
export const lettersApi = {
  getAll: () => api.get<unknown[]>('/letters'),
};

// Progress API
export const progressApi = {
  getMyProgress: () => api.get('/progress/me'),
  getLessonProgress: (lessonId: string) =>
    api.get(`/progress/lesson/${lessonId}`),
  updateProgress: (lessonId: string, data: any) =>
    api.post(`/progress/lesson/${lessonId}`, data),
  getDueFlashcards: (limit?: number) =>
    api.get('/progress/flashcards/due', { params: { limit } }),
  reviewFlashcard: (wordId: string, quality: number) =>
    api.post(`/progress/flashcards/${wordId}/review`, { quality }),
  getFlashcardStats: () => api.get('/progress/flashcards/stats'),
};

// Tests API
export const testsApi = {
  getAll: (params?: any) => api.get('/tests', { params }),
  getById: (id: string) => api.get(`/tests/${id}`),
  submitResult: (testId: string, data: any) =>
    api.post(`/tests/${testId}/submit`, data),
  getMyResults: (testId?: string) =>
    api.get('/tests/results/me', { params: { testId } }),
};

// AI API
export const aiApi = {
  chat: (message: string, context?: string) =>
    api.post('/ai/chat', { message, context }),
  explainWord: (word: string, targetLang?: string) =>
    api.post('/ai/explain', { word, targetLang }),
  correctText: (text: string, targetLang?: string) =>
    api.post('/ai/correct', { text, targetLang }),
  generateExercises: (topic: string, level: number, targetLang?: string) =>
    api.post('/ai/exercises', { topic, level, targetLang }),
  getChatHistory: () => api.get('/ai/history'),
  clearChatHistory: () => api.delete('/ai/history'),
};

// Statistics API
export const statisticsApi = {
  getMyStatistics: () => api.get('/statistics/me'),
  updateStreak: () => api.post('/statistics/streak'),
  addStudyTime: (minutes: number) =>
    api.post('/statistics/study-time', { minutes }),
  getProgressOverTime: (days?: number) =>
    api.get('/statistics/progress', { params: { days } }),
  getTestResults: (limit?: number) =>
    api.get('/statistics/tests', { params: { limit } }),
};
