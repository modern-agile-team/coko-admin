import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios/instance';
import Quiz from '../types/Quiz';
const quizApis = {
  read: (params?: Record<string, any>) => {
    return useQuery<Quiz[]>({
      queryKey: ['quizzes', params],
      queryFn: async ({ queryKey }) => {
        const [_, queryParams] = queryKey;
        const response = await api({
          method: 'GET',
          url: '/quizzes',
          params: queryParams,
        });
        return response.data;
      },
      //gcTime : 캐시에 남아있는 시간 5분
      gcTime: 5 * 60 * 1000,
      //staleTime: 데이터가 썩기까지 걸리는 시간 1분
      staleTime: 1 * 60 * 1000,
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (quiz: Quiz) => api.post('/quizzes', quiz),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (quiz: Quiz) => {
        const { id, ...rest } = quiz;
        return api.put(`/quizzes/${id}`, rest);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => api.delete(`/quizzes/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
};
export default quizApis;
