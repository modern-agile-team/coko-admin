import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import dailyQuestsApis from './apis';

const dailyQuestsKeys = {
  all: ['dailyQuests'] as const,
};

const useDailyQuestsQuery = {
  getDailyQuests: () =>
    useSuspenseQuery({
      queryKey: dailyQuestsKeys.all,
      queryFn: dailyQuestsApis.getDailyQuests,
    }),
  createDailyQuest: () =>
    useMutation({ mutationFn: dailyQuestsApis.postDailyQuests }),
  updateDailyQuest: () =>
    useMutation({ mutationFn: dailyQuestsApis.patchDailyQuests }),
  deleteDailyQuest: () =>
    useMutation({ mutationFn: dailyQuestsApis.deleteDailyQuests }),
};

export default useDailyQuestsQuery;
