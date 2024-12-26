import api from '../../apis/axios/instance';
import { Part } from './types';

const partsApis = {
  getParts: async (): Promise<Part[]> => {
    const response = await api.get('/parts');
    return response.data;
  },
  postParts: async (part: Part): Promise<void> => api.post('/parts', part),
  putPart: async (part: Part): Promise<void> => {
    const { id, ...rest } = part;
    return api.put(`/parts/${id}`, rest);
  },
  deletePart: async (id: number): Promise<void> => api.delete(`/parts/${id}`),
};
export default partsApis;
