import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import dailyQuestsApis from './apis';

const questsKeys = {
  all: ['quests'] as const,
  dailyQuests: () => [...questsKeys.all, 'daily'] as const,
};

const useQuestsQuery = {
  getDailyQuests: () =>
    useSuspenseQuery({
      queryKey: questsKeys.dailyQuests(),
      queryFn: dailyQuestsApis.getDailyQuests,
    }),
  createDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.postDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.dailyQuests() });
      },
    });
  },
  updateDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.patchDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.dailyQuests() });
      },
    });
  },
  deleteDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.deleteDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: questsKeys.dailyQuests() });
      },
    });
  },
};

export default useQuestsQuery;
