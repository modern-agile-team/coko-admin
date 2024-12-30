import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { partsApis, partsOrderApi } from './apis';
import { Part } from './types';

const partKeys = {
  all: ['parts'] as const,
  lists: () => [...partKeys.all, 'list'] as const,
};

export const partsQueries = {
  read: () => {
    return useQuery<Part[]>({
      queryKey: partKeys.lists(),
      queryFn: partsApis.get,
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: partsApis.post,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.lists(),
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: partsApis.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.lists(),
        });
      },
    });
  },
};

export const partsQuery = {
  patch: () => {
    return useMutation({
      mutationFn: partsOrderApi.patch,
    });
  },
};
