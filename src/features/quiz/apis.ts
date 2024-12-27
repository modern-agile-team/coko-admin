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
  post: async (quiz: Quiz): Promise<void> => api.post('/quizzes', quiz),
  put: async (quiz: Quiz): Promise<void> => {
    const { id, ...rest } = quiz;
    api.put(`/quizzes/${id}`, rest);
  },
  delete: async (id: number): Promise<void> => api.delete(`/quizzes/${id}`),
};
export default quizzesApis;
