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
  createDailyQuests: () =>
    useMutation({ mutationFn: dailyQuestsApis.postDailyQuests }),
  updateDailyQuests: () =>
    useMutation({ mutationFn: dailyQuestsApis.patchDailyQuests }),
  deleteDailyQuests: () =>
    useMutation({ mutationFn: dailyQuestsApis.deleteDailyQuests }),
};

export default useDailyQuestsQuery;
