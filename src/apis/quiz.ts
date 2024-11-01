import { useMutation, useQuery } from '@tanstack/react-query';
import api from './axios/instance';
import Quiz from '../types/Quiz';
const quizApis = {
  read: (params: Record<string, any> | undefined = undefined) => {
    return useQuery<Quiz[]>({
      queryKey: params ? ['quizzes', params] : ['quizzes'],
      queryFn: ({ queryKey }) => {
        const [_, queryParams] = queryKey;
        return api({
          method: 'GET',
          url: '/quizzes',
          params: queryParams,
        }).then(response => response.data);
      },
      //gcTime : 캐시에 남아있는 시간 5분
      gcTime: 5 * 60 * 1000,
      //staleTime: 데이터가 썩기까지 걸리는 시간 1분
      staleTime: 1 * 60 * 1000,
    });
  },
  create: () =>
    useMutation({
      mutationFn: (data: Quiz) => api.post('/quizzes', data),
    }),
  update: () =>
    useMutation({
      mutationFn: (quiz: Quiz) => {
        const { id, ...rest } = quiz;
        return api.put(`/quizzes/${id}`, rest);
      },
    }),
  delete: () =>
    useMutation({
      mutationFn: (id: number) => api.delete(`/quizzes/${id}`),
    }),
};
export default quizApis;
