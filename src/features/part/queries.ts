import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part, PartFilter } from './types';
import { QuizFilters } from '../quiz/types';

const partKeys = {
  all: ['parts'] as const,
  lists: () => [...partKeys.all, 'list'] as const,
  list: (section: PartFilter) => [...partKeys.lists(), section],
};

const partsQueries = {
  getParts: (params?: PartFilter) => {
    return useQuery<Part[]>({
      queryKey: !params ? partKeys.lists() : partKeys.list(params),
      queryFn: partsApis.getParts,
      select: parts => {
        if (!params) {
          return parts;
        }

        const { sectionId } = params;

        return parts.filter(part => {
          const matchesSection =
            sectionId === 0 || part.sectionId === sectionId;
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
