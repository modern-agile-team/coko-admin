import Part from '../types/Part';
import api from './axios/instance';

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
