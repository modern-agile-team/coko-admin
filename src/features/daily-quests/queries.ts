import {
  useMutation,
  useSuspenseQuery,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
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
  createDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.postDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: dailyQuestsKeys.all });
      },
    });
  },
  updateDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.patchDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: dailyQuestsKeys.all });
      },
    });
  },
  deleteDailyQuest: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: dailyQuestsApis.deleteDailyQuests,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: dailyQuestsKeys.all });
      },
    });
  },
};

export default useDailyQuestsQuery;
