import { useMutation, useQuery } from '@tanstack/react-query';
import api from './axios/instance';
import Quiz from '../types/Quiz';
interface Params {
  parms: Record<string, any>;
}
const quizApis = {
  get: (params: Params | undefined = undefined) => {
    return useQuery<Quiz[]>({
      queryKey: params ? ['quizzes', params] : ['quizzes'],
      queryFn: () =>
        api({
          method: 'GET',
          url: 'quizzes',
          params,
        }).then(response => response.data),
      //gcTime : 캐시에 남아있는 시간 5분
      gcTime: 5 * 60 * 1000,
      //staleTime: 데이터가 썩기까지 걸리는 시간 1분
      staleTime: 1 * 60 * 1000,
    });
  },
  create: (data: any) => api.post('quizzes', { data }),
};
export default quizApis;
