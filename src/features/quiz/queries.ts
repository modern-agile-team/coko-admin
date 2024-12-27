import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quizzesApis from './apis';
import { Quiz, Quizfilters } from './types';
const quizKeys = {
  all: ['quizzes'] as const,
  lists: () => [...quizKeys.all, 'list'] as const,
  list: (filters?: Quizfilters) => [...quizKeys.lists(), filters] as const,
};
const quizzesQueries = {
  read: (params?: Quizfilters) => {
    return useQuery<Quiz[]>({
      queryKey: quizKeys.list(params),
      queryFn: () => quizzesApis.get(params),
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.post,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.put,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: quizzesApis.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
};
export default quizzesQueries;
