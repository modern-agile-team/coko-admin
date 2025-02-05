import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import dailyQuestsApis from './apis';

const questsKeys = {
  all: ['quests'] as const,
  daily: () => [...questsKeys.all, 'daily'] as const,
};

const useQuestsQuery = {
  getDailyQuests: () =>
    useSuspenseQuery({
      queryKey: questsKeys.daily(),
      queryFn: dailyQuestsApis.getDailyQuests,
    }),
  createDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.postDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.daily() });
      },
    });
  },
  updateDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.patchDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.daily() });
      },
    });
  },
  deleteDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.deleteDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.daily() });
      },
    });
  },
};

export default useQuestsQuery;
