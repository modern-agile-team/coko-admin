import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part } from './types';

const partKeys = {
  all: ['parts'] as const,
  lists: () => [...partKeys.all, 'list'] as const,
};

const partsQueries = {
  getParts: () => {
    return useQuery<Part[]>({
      queryKey: partKeys.lists(),
      queryFn: partsApis.getParts,
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
    return useMutation({
      mutationFn: partsApis.patchPartOrder,
    });
  },
};
export default partsQueries;
