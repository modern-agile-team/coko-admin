import api from '../../axios/instance';

const dailyQuestsApis = {
  getDailyQuests: async () => {
    const response = await api.get('/daily-quests');
    return response.data;
  },
  postDailyQuests: () => api.post('/daily-quests'),
  patchDailyQuests: () => api.patch('/daily-quests'),
  deleteDailyQuests: () => api.delete('/daily-quests'),
};
