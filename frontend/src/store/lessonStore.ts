import { create } from 'zustand';
import { lessonsApi } from '@/lib/api';

interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description?: string;
  type: string;
  level: number;
  order: number;
}

interface LessonState {
  lessons: Lesson[];
  currentLesson: any | null;
  isLoading: boolean;
  error: string | null;
  fetchLessons: (params?: any) => Promise<void>;
  fetchLessonById: (id: string) => Promise<void>;
  setCurrentLesson: (lesson: any) => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,

  fetchLessons: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await lessonsApi.getAll(params);
      set({
        lessons: data.lessons,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch lessons',
        isLoading: false,
      });
    }
  },

  fetchLessonById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await lessonsApi.getById(id);
      set({
        currentLesson: data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch lesson',
        isLoading: false,
      });
    }
  },

  setCurrentLesson: (lesson: any) => {
    set({ currentLesson: lesson });
  },
}));
