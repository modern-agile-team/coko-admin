import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part, PartFilter } from './types';
import { useCallback } from 'react';

const partKeys = {
  all: ['parts'] as const,
  lists: () => [...partKeys.all, 'list'] as const,
  list: (params: PartFilter) => [...partKeys.lists(), params],
};

const partsQueries = {
  getParts: (select?: (data: Part[]) => Part[]) => {
    return useQuery<Part[]>({
      queryKey: partKeys.lists(),
      queryFn: partsApis.getParts,
      select,
    });
  },
  getFilteredParts: (params: PartFilter) => {
    return partsQueries.getParts(
      useCallback(
        (parts: Part[]) => {
          const { sectionId } = params;

          if (sectionId === 0) {
            return parts;
          }

          return parts.filter(part => part.sectionId === sectionId);
        },
        [params]
      )
    );
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
