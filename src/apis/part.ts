import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios/instance';
import Part from '../types/Part';
interface Params {
  parms: Record<string, any>;
}
const partApis = {
  get: (params: Params | undefined = undefined) => {
    return useQuery<Part[]>({
      queryKey: params ? ['parts', params] : ['parts'],
      queryFn: () =>
        api({
          method: 'GET',
          url: 'parts',
          params,
        }).then(response => response.data),
      //gcTime : 캐시에 남아있는 시간 5분
      gcTime: 5 * 60 * 1000,
      //staleTime: 데이터가 썩기까지 걸리는 시간 1분
      staleTime: 1 * 60 * 1000,
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (part: Part) => api.post('/parts', part),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (part: Part) => {
        const { id, ...rest } = part;
        return api.put(`/parts/${id}`, rest);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => api.delete(`/parts/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
};
export default partApis;
