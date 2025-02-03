import api from '../../axios/instance';
import { DailyQuests } from './types';

const dailyQuestsApis = {
  getDailyQuests: async (): Promise<DailyQuests[]> => {
    const response = await api.get('/daily-quests');
    return response.data;
  },
  postDailyQuests: (params: Omit<DailyQuests, 'id'>): Promise<void> =>
    api.post('/daily-quests', params),
  patchDailyQuests: (params: { id: DailyQuests['id'] }): Promise<void> =>
    api.patch(`/daily-quests/${params.id}`),
  deleteDailyQuests: (params: { id: DailyQuests['id'] }): Promise<void> =>
    api.delete(`/daily-quests/${params.id}`),
};

export default dailyQuestsApis;
