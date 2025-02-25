import api from '@/axios/instance';
import { Opinions } from '@/features/opinions/types';

export const opinionsApis = {
  getOpinions: async (): Promise<Opinions[]> => {
    const response = await api.get<{ opinions: Opinions[] }>('/opinions');
    return response.data.opinions;
  },
  deleteOpinion: async (params: { id: number }): Promise<void> =>
    await api.delete(`/users/me/opinions/${params.id}`),
};
