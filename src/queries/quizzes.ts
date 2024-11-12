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

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      },
    });
  },
  update: (params?: { sectionId?: number; partId?: number }) => {
    const queryClient = useQueryClient();
    const queryKey = ['quizzes', params];
    return useMutation({
      mutationFn: quizzesApis.putQuiz,
      onMutate: async newQuiz => {
        await queryClient.cancelQueries({ queryKey });
        const prevQuizzes = queryClient.getQueryData<Quiz[]>(queryKey);
        queryClient.setQueryData<Quiz[]>(queryKey, prevQuizzes =>
          prevQuizzes?.map(prevQuiz =>
            prevQuiz.id === newQuiz.id ? newQuiz : prevQuiz
          )
        );
        return { prevQuizzes };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context?.prevQuizzes);
        console.error('Update mutation error:', err);
      },
      onSettled: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        queryClient.invalidateQueries({ queryKey });
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
