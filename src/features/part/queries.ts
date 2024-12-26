import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part } from './types';
const partKeys = {
  all: ['parts'],
};
const partsQueries = {
  read: () => {
    return useQuery<Part[]>({
      queryKey: partKeys.all,
      queryFn: partsApis.get,
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: partsApis.post,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partKeys.all,
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
          queryKey: partKeys.all,
        });
      },
    });
  },
};
export default partsQueries;
