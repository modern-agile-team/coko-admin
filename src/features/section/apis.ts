import api from '../../axios/instance';
import { Section } from './types';

const sectionsApis = {
  getSections: async (): Promise<Section[]> => {
    const response = await api.get('/sections');
    return response.data;
  },
  createSection: async (section: Omit<Section, 'id'>): Promise<void> =>
    api.post('/sections', section),
  deleteSection: async (id: Section['id']): Promise<void> =>
    api.delete(`/sections/${id}`),
  updateSectionOrder: async (params: Omit<Section, 'name'>) => {
    const { id, order } = params;
    return api.patch(`/sections/${id}/order`, { order });
  },
};
export default sectionsApis;
