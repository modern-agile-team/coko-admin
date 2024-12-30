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
      queryKey: quizKeys.lists(),
      queryFn: () => quizzesApis.get(),
      select: quizzes => {
        const { partId, sectionId } = params;

        return quizzes.filter(quiz => {
          const matchesSection =
            sectionId === 0 || quiz.sectionId === sectionId;
          const matchesPart = partId === 0 || quiz.partId === partId;

          return matchesSection && matchesPart;
        });
      },
    });
  },
  createQuiz: () => {
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
  updateQuiz: () => {
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
  deleteQuiz: () => {
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
