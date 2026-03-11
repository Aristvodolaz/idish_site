import { create } from 'zustand';
import { progressApi } from '@/lib/api';

interface ProgressState {
  progress: any[];
  flashcardStats: any | null;
  isLoading: boolean;
  error: string | null;
  fetchProgress: () => Promise<void>;
  fetchFlashcardStats: () => Promise<void>;
  updateLessonProgress: (lessonId: string, data: any) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: [],
  flashcardStats: null,
  isLoading: false,
  error: null,

  fetchProgress: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await progressApi.getMyProgress();
      set({
        progress: data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch progress',
        isLoading: false,
      });
    }
  },

  fetchFlashcardStats: async () => {
    try {
      const { data } = await progressApi.getFlashcardStats();
      set({ flashcardStats: data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch flashcard stats',
      });
    }
  },

  updateLessonProgress: async (lessonId: string, progressData: any) => {
    set({ isLoading: true, error: null });
    try {
      await progressApi.updateProgress(lessonId, progressData);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update progress',
        isLoading: false,
      });
    }
  },
}));
