import Section from '../types/Section';
import api from './axios/instance';

const sectionsApis = {
  getSections: async (): Promise<Section[]> => {
    const response = await api.get('/sections');
    return response.data;
  },
  postSections: async (section: Section): Promise<void> =>
    api.post('/sections', section),
  putSection: async (section: Section): Promise<void> => {
    const { id, ...rest } = section;
    return api.patch(`/sections/${id}`, rest);
  },
  deleteSection: async (id: number): Promise<void> =>
    api.delete(`/sections/${id}`),
};
export default sectionsApis;
