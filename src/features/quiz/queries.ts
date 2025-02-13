import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quizzesApis from './apis';
import { Quiz, QuizFilters } from './types';

const quizKeys = {
  all: ['quizzes'] as const,
  lists: () => [...quizKeys.all, 'list'] as const,
  list: (filters?: QuizFilters) => [...quizKeys.lists(), filters] as const,
};

const quizzesQueries = {
  getQuizzes: (params: QuizFilters) => {
    return useQuery<Quiz[]>({
      queryKey: quizKeys.list(params),
      queryFn: () => quizzesApis.getQuizzes(params),
    });
  },
  createQuiz: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.createQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
  updateQuiz: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.updateQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
  deleteQuiz: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.deleteQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: quizKeys.lists(),
        });
      },
    });
  },
};

export default quizzesQueries;
