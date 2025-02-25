import { opinionsApis } from '@/features/opinions/apis';
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

const opinionsKeys = {
  all: ['opinions'] as const,
};

export const useOpinionsQuery = {
  getOpinionsList: () =>
    useQuery({ queryKey: opinionsKeys.all, queryFn: opinionsApis.getOpinions }),
  deleteOpinion: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: opinionsApis.deleteOpinion,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: opinionsKeys.all });
      },
    });
  },
};
