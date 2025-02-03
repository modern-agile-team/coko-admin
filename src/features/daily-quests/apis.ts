import api from '../../axios/instance';
import { DailyQuest } from './types';

const dailyQuestsApis = {
  getDailyQuests: async (): Promise<DailyQuest[]> => {
    const response = await api.get('/daily-quests');
    return response.data;
  },
  postDailyQuests: (params: Omit<DailyQuest, 'id'>): Promise<void> =>
    api.post('/daily-quests', params),
  patchDailyQuests: (params: {
    id: DailyQuest['id'];
    dailyQuest: DailyQuest;
  }): Promise<void> => {
    const { id, ...rest } = params;
    return api.patch(`/daily-quests/${params.id}`, rest);
  },
  deleteDailyQuests: (params: { id: DailyQuest['id'] }): Promise<void> =>
    api.delete(`/daily-quests/${params.id}`),
};

export default dailyQuestsApis;
