import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part } from './types';
import { QuizFilters } from '../quiz/types';

const partKeys = {
  all: ['parts'] as const,
  lists: () => [...partKeys.all, 'list'] as const,
};

const partsQueries = {
  getParts: (params: Omit<QuizFilters, 'partId'>) => {
    return useQuery<Part[]>({
      queryKey: partKeys.lists(),
      queryFn: partsApis.getParts,
      select: quizzes => {
        const { sectionId } = params;

        return quizzes.filter(quiz => {
          const matchesSection =
            sectionId === 0 || quiz.sectionId === sectionId;

          return matchesSection;
        });
      },
    });
  },
  createPart: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: partsApis.createPart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.lists(),
        });
      },
    });
  },
  deletePart: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: partsApis.deletePart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.lists(),
        });
      },
    });
  },
  updatePartOrder: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: partsApis.patchPartOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.lists(),
        });
      },
    });
  },
};
export default partsQueries;
