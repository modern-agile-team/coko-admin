import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Quiz from '../types/Quiz';
import quizzesApis from '../apis/quizzes';
const quizzesQueries = {
  read: (params?: { sectionId?: number; partId?: number }) => {
    return useQuery<Quiz[]>({
      queryKey: ['quizzes', params],
      queryFn: () => quizzesApis.getQuizzes(params),
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.postQuizzes,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: quizzesApis.putQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: quizzesApis.deleteQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['quizzes'],
        });
      },
    });
  },
};
export default quizzesQueries;
