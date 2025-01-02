import api from '../../axios/instance';
import { Quiz } from './types';

const quizzesApis = {
  getQuizzes: async (params?: {
    sectionId?: number;
    partId?: number;
  }): Promise<Quiz[]> => {
    const response = await api.get('/quizzes', { params });
    return response.data;
  },
  createQuiz: async (quiz: Omit<Quiz, 'id' | 'sectionId'>): Promise<void> =>
    await api.post('/quizzes', quiz),
  updateQuiz: async (quiz: Omit<Quiz, 'sectionId'>): Promise<void> => {
    const { id, ...rest } = quiz;
    return await api.put(`/quizzes/${id}`, rest);
  },
  deleteQuiz: async (id: number): Promise<void> =>
    await api.delete(`/quizzes/${id}`),
};

export default quizzesApis;
