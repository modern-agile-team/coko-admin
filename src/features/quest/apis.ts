import { AxiosResponse } from 'axios';
import api from '../../axios/instance';
import { DailyQuest } from './types';

const questsApis = {
  getDailyQuests: async (): Promise<DailyQuest[]> => {
    const response = await api.get('/quests/daily');
    return response.data;
  },
  postDailyQuests: (params: Omit<DailyQuest, 'id'>): Promise<void> =>
    api.post('/quests/daily', params),
  patchDailyQuests: (params: DailyQuest): Promise<void> => {
    const { id, ...rest } = params;
    return api.patch(`/quests/daily/${params.id}`, { ...rest });
  },
  deleteDailyQuests: (params: { id: DailyQuest['id'] }): Promise<void> =>
    api.delete(`/quests/daily/${params.id}`),
};

export default questsApis;
