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

  deleteDailyQuests: (params: { id: DailyQuest['id'] }): Promise<void> =>
    api.delete(`/quests/daily/${params.id}`),
};

export default questsApis;
