import api from '../../apis/axios/instance';
import { Quiz } from './types';

const quizzesApis = {
  get: async (params?: {
    sectionId?: number;
    partId?: number;
  }): Promise<Quiz[]> => {
    const response = await api.get('/quizzes', { params });
    return response.data;
  },
  post: async (quiz: Omit<Quiz, 'id' | 'sectionId'>): Promise<void> =>
    await api.post('/quizzes', quiz),
  put: async (quiz: Omit<Quiz, 'sectionId'>): Promise<void> => {
    const { id, ...rest } = quiz;
    await api.put(`/quizzes/${id}`, rest);
  },
  delete: async (id: number): Promise<void> => api.delete(`/quizzes/${id}`),
};
export default quizzesApis;
