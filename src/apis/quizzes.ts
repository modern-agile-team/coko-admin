import Quiz from '../types/Quiz';
import api from './axios/instance';

const quizzesApis = {
  getQuizzes: async (params?: {
    sectionId?: number;
    partId?: number;
  }): Promise<Quiz[]> => {
    const response = await api.get('/quizzes', { params });
    return response.data;
  },
  postQuizzes: async (quiz: Quiz): Promise<void> => api.post('/quizzes', quiz),
  putQuiz: async (quiz: Quiz): Promise<void> => {
    const { id, ...rest } = quiz;
    api.put(`/quizzes/${id}`, rest);
  },
  deleteQuiz: async (id: number): Promise<void> => api.delete(`/quizzes/${id}`),
};
export default quizzesApis;
