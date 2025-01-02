import api from '../../axios/instance';
import { Part } from './types';

const partsApis = {
  getParts: async (): Promise<Part[]> => {
    const response = await api.get('/parts');
    return response.data;
  },
  createPart: async (params: Omit<Part, 'id'>): Promise<void> =>
    api.post('/parts', params),
  deletePart: async (id: number): Promise<void> => api.delete(`/parts/${id}`),
  patchPartOrder: async (params: Omit<Part, 'sectionId' | 'name'>) => {
    const { id, order } = params;
    return api.patch(`/parts/${id}/order`, { order });
  },
};
export default partsApis;
