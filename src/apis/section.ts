import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios/instance';
import Section from '../types/Section';
interface Params {
  parms: Record<string, any>;
}
const sectionApis = {
  read: (params: Params | undefined = undefined) => {
    return useQuery<Section[]>({
      queryKey: params ? ['sections', params] : ['sections'],
      queryFn: () =>
        api({
          method: 'GET',
          url: 'sections',
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
      mutationFn: (section: Section) => api.post('/sections', section),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (section: Section) => {
        const { id, ...rest } = section;
        return api.patch(`/sections/${id}`, rest);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => api.delete(`/sections/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
        });
      },
    });
  },
};
export default sectionApis;
