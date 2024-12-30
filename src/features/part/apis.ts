import api from '../../axios/instance';
import { Part } from './types';

export const partsApis = {
  get: async (): Promise<Part[]> => {
    const response = await api.get('/parts');
    return response.data;
  },
  post: async (params: Omit<Part, 'id'>): Promise<void> =>
    api.post('/parts', params),
  delete: async (id: number): Promise<void> => api.delete(`/parts/${id}`),
};

export const partsOrderApi = {
  patch: async (params: Omit<Part, 'sectionId' | 'name'>) => {
    const { id, order } = params;
    api.patch(`/parts/${id}/order`, { order });
  },
};
