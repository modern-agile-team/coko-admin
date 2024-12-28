import api from '../../axios/instance';
import { Section } from './types';

const sectionsApis = {
  get: async (): Promise<Section[]> => {
    const response = await api.get('/sections');
    return response.data;
  },
  post: async (section: Omit<Section, 'id'>): Promise<void> =>
    api.post('/sections', section),
  delete: async (id: Section['id']): Promise<void> =>
    api.delete(`/sections/${id}`),
};

export default sectionsApis;
